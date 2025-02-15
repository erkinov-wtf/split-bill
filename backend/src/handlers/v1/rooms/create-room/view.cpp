#include "view.hpp"

#include <fmt/format.h>
#include <regex>

#include <userver/components/component_context.hpp>
#include <userver/formats/json.hpp>
#include <userver/server/handlers/http_handler_base.hpp>

#include <userver/storages/postgres/cluster.hpp>
#include <userver/storages/postgres/component.hpp>
#include <userver/utils/assert.hpp>

#include "../../../../models/room.hpp"
#include "../../../lib/auth.hpp"

namespace split_bill {

namespace {

class AddRoom final : public userver::server::handlers::HttpHandlerBase {
 public:
  static constexpr std::string_view kName = "handler-v1-create-room";

  AddRoom(const userver::components::ComponentConfig& config,
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
      request.SetResponseStatus(userver::server::http::HttpStatus::kUnauthorized);
      userver::formats::json::ValueBuilder response;
      response["error"] = "Unauthorized";
      return userver::formats::json::ToString(response.ExtractValue());
    }

    auto request_body =
        userver::formats::json::FromString(request.RequestBody());
    auto name = request_body["name"].As<std::optional<std::string>>();

    if (!name) {
      request.SetResponseStatus(userver::server::http::HttpStatus::kBadRequest);
      userver::formats::json::ValueBuilder response;
      response["error"] = "name is required";
      return userver::formats::json::ToString(response.ExtractValue());
    }

    auto result = pg_cluster_->Execute(
        userver::storages::postgres::ClusterHostType::kSlave,
        "WITH inserted_room AS ("
        "    INSERT INTO rooms (name, user_id) "
        "    SELECT $1, user_id "
        "    FROM auth_sessions "
        "    WHERE id = $2 "
        "    RETURNING id, name, user_id"
        "), user_room_link AS ("
        "    INSERT INTO user_rooms (user_id, room_id) "
        "    SELECT user_id, id "
        "    FROM inserted_room "
        ") "
        "SELECT ir.id, ir.name, ir.user_id "
        "FROM inserted_room ir",
        name.value(), session->id);

    if (!result.IsEmpty()) {
      auto room =
          result.AsSingleRow<TRoom>(userver::storages::postgres::kRowTag);

      userver::formats::json::ValueBuilder response;
      response["id"] = room.id;
      response["name"] = room.name;
      response["user_id"] = room.user_id;
      return userver::formats::json::ToString(response.ExtractValue());
    } else {
      request.SetResponseStatus(userver::server::http::HttpStatus::kConflict);
      userver::formats::json::ValueBuilder response;
      response["error"] = "Failed to create room";
      return userver::formats::json::ToString(response.ExtractValue());
    }
  }

 private:
  userver::storages::postgres::ClusterPtr pg_cluster_;
};

}  // namespace

void AppendAddRoom(userver::components::ComponentList& component_list) {
  component_list.Append<AddRoom>();
}

}  // namespace split_bill
