#include "view.hpp"

#include <fmt/format.h>

#include <userver/components/component_context.hpp>
#include <userver/formats/json/value_builder.hpp>
#include <userver/server/handlers/http_handler_base.hpp>
#include <userver/server/http/http_status.hpp>
#include <userver/storages/postgres/cluster.hpp>
#include <userver/storages/postgres/component.hpp>
#include <userver/utils/assert.hpp>
#include <userver/formats/json/serialize.hpp>
#include <userver/formats/json/value.hpp>

namespace split_bill {

ProductBulkUpdateHandler::ProductBulkUpdateHandler(
    const userver::components::ComponentConfig& config,
    const userver::components::ComponentContext& context)
    : HttpHandlerBase(config, context),
      pg_cluster_(
          context.FindComponent<userver::components::Postgres>("postgres-db-1")
              .GetCluster()) {}

std::string ProductBulkUpdateHandler::HandleRequestThrow(
    const userver::server::http::HttpRequest& request,
    userver::server::request::RequestContext&) const {

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

    const auto& json = userver::formats::json::FromString(request.RequestBody());

    TBulkUpdateRequest bulk_request;
    Parse(bulk_request, json);

    TBulkUpdateResponse response;

    auto transaction = pg_cluster_->Begin(
        userver::storages::postgres::ClusterHostTypeFlags{
            userver::storages::postgres::ClusterHostType::kMaster},
        userver::storages::postgres::TransactionOptions{});


    for (const auto& item : bulk_request.data) {
        try {
            // Verify user has access to the room
            const auto room_access = transaction.Execute(
                "SELECT 1 FROM user_rooms "
                "WHERE user_id = $1 AND room_id = $2",
                item.user_id, item.room_id);

            if (room_access.IsEmpty()) {
                response.errors.push_back(TBulkUpdateError{
                    item.user_id,
                    item.room_id,
                    item.product_id,
                    "User does not have access to this room"
                });
                continue;
            }

            // Verify product belongs to the room
            const auto product_check = transaction.Execute(
                "SELECT 1 FROM products "
                "WHERE id = $1 AND room_id = $2",
                item.product_id, item.room_id);

            if (product_check.IsEmpty()) {
                response.errors.push_back(TBulkUpdateError{
                    item.user_id,
                    item.room_id,
                    item.product_id,
                    "Product does not belong to the specified room"
                });
                continue;
            }

            // Update status
            const auto update_result = transaction.Execute(
                "UPDATE user_products "
                "SET status = $1 "
                "WHERE user_id = $2 AND product_id = $3 "
                "RETURNING id",
                item.product_status, item.user_id, item.product_id);

            if (update_result.IsEmpty()) {
                response.errors.push_back(TBulkUpdateError{
                    item.user_id,
                    item.room_id,
                    item.product_id,
                    "No matching user_product record found"
                });
                continue;
            }

            response.updated++;

        } catch (const std::exception& e) {
            response.errors.push_back(TBulkUpdateError{
                item.user_id,
                item.room_id,
                item.product_id,
                std::string("Error processing update: ") + e.what()
            });
        }
    }

    transaction.Commit();
    return userver::formats::json::ToString(
        Serialize(response, userver::formats::serialize::To<userver::formats::json::Value>{}));
}

void AppendProductBulkUpdate(userver::components::ComponentList& component_list) {
    component_list.Append<ProductBulkUpdateHandler>();
}

}  // namespace split_bill