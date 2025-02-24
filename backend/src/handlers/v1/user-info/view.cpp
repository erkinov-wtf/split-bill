#include "view.hpp"

#include <fmt/format.h>

#include <userver/components/component_context.hpp>
#include <userver/server/handlers/http_handler_base.hpp>
#include <userver/server/http/http_status.hpp>
#include <userver/storages/postgres/cluster.hpp>
#include <userver/storages/postgres/component.hpp>
#include <userver/utils/assert.hpp>
#include <userver/formats/json/value_builder.hpp>

#include "../../../models/user-info.hpp"
#include "../../../models/user.hpp"
#include "../../lib/auth.hpp"

namespace split_bill {

namespace {

class GetUserInfo final : public userver::server::handlers::HttpHandlerBase {
 public:
  static constexpr std::string_view kName = "handler-user-info";

  GetUserInfo(const userver::components::ComponentConfig& config,
          const userver::components::ComponentContext& component_context)
      : HttpHandlerBase(config, component_context),
        pg_cluster_(
            component_context
                .FindComponent<userver::components::Postgres>("postgres-db-1")
                .GetCluster()) {}

  std::string HandleRequestThrow(
      const userver::server::http::HttpRequest& request,
      userver::server::request::RequestContext&) const override {

    request.GetHttpResponse().SetContentType(
        userver::http::content_type::kApplicationJson);

    auto session = GetSessionInfo(pg_cluster_, request);
    if (!session) {
      request.SetResponseStatus(
          userver::server::http::HttpStatus::kUnauthorized);
      userver::formats::json::ValueBuilder response;
      response["error"] = "Unauthorized";
      return userver::formats::json::ToString(response.ExtractValue());
    }

    auto user_result = pg_cluster_->Execute(
        userver::storages::postgres::ClusterHostType::kSlave,
        "SELECT * FROM users WHERE users.id = $1", session->user_id);

    if (user_result.IsEmpty()) {
      request.SetResponseStatus(userver::server::http::HttpStatus::kNotFound);
      userver::formats::json::ValueBuilder response;
      response["error"] = "User not found";
      return userver::formats::json::ToString(response.ExtractValue());
    }

    // Convert ResultSet to TUserInfo
    const auto row = user_result.Front();
    TUserInfo user_info{
        row["id"].As<int>(),
        row["username"].As<std::string>(),
        row["full_name"].As<std::string>(),
        row["photo_url"].As<std::string>()
    };

    // Use the direct serialization method
    return userver::formats::json::ToString(user_info.Serialize());
  }

 private:
  userver::storages::postgres::ClusterPtr pg_cluster_;
};

}  // namespace

void AppendUserInfo(userver::components::ComponentList& component_list) {
  component_list.Append<GetUserInfo>();
}

}  // namespace split_bill