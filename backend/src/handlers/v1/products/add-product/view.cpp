#include "view.hpp"

#include <fmt/format.h>
#include <regex>

#include <userver/components/component_context.hpp>
#include <userver/formats/json.hpp>
#include <userver/server/handlers/http_handler_base.hpp>

#include <userver/storages/postgres/cluster.hpp>
#include <userver/storages/postgres/component.hpp>
#include <userver/utils/assert.hpp>

#include "../../../../models/product.hpp"
#include "../../../lib/auth.hpp"

namespace split_bill {

namespace {

class AddProduct final : public userver::server::handlers::HttpHandlerBase {
 public:
  static constexpr std::string_view kName = "handler-v1-add-product";

  AddProduct(const userver::components::ComponentConfig& config,
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

    auto request_body =
        userver::formats::json::FromString(request.RequestBody());
    auto name = request_body["name"].As<std::optional<std::string>>();
    auto price = request_body["price"].As<std::optional<int64_t>>();
    auto room_id = request_body["room_id"].As<std::optional<int>>();

    if (!name || !price || !room_id) {
      request.SetResponseStatus(userver::server::http::HttpStatus::kBadRequest);
      userver::formats::json::ValueBuilder response;
      response["error"] = "'name', 'price', and 'room_id' fields are required.";
      return userver::formats::json::ToString(response.ExtractValue());
    }
    auto check_result = pg_cluster_->Execute(
        userver::storages::postgres::ClusterHostType::kMaster,
        "SELECT 1 FROM rooms WHERE id = $1 "
        "LIMIT 1",
        *room_id);

    if (check_result.IsEmpty()) {
      request.SetResponseStatus(userver::server::http::HttpStatus::kNotFound);
      userver::formats::json::ValueBuilder response;
      response["error"] = "Room ID is Invalid!";
      return userver::formats::json::ToString(response.ExtractValue());
    }
    LOG_INFO() << "Adding product: " << *name << " " << *price << " "
               << *room_id;

    auto result = pg_cluster_->Execute(
        userver::storages::postgres::ClusterHostType::kSlave,
        "INSERT INTO products (name, price, room_id) VALUES($1, $2, $3) "
        "ON CONFLICT (name, room_id) DO NOTHING "
        "RETURNING id, name, price, room_id",
        name.value(), price.value(), room_id.value());

    if (!result.IsEmpty()) {
      auto product =
          result.AsSingleRow<TProduct>(userver::storages::postgres::kRowTag);
      return ToString(
          userver::formats::json::ValueBuilder{product}.ExtractValue());
    } else {
      request.SetResponseStatus(userver::server::http::HttpStatus::kConflict);
      userver::formats::json::ValueBuilder response;
      response["error"] = "Product already exists.";
      return userver::formats::json::ToString(response.ExtractValue());
    }
  }

 private:
  userver::storages::postgres::ClusterPtr pg_cluster_;
};

}  // namespace

void AppendAddProduct(userver::components::ComponentList& component_list) {
  component_list.Append<AddProduct>();
}

}  // namespace split_bill
