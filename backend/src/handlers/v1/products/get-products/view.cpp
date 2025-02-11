#include "view.hpp"

#include <fmt/format.h>
#include <unordered_map>

#include <userver/components/component_context.hpp>
#include <userver/formats/serialize/common_containers.hpp>
#include <userver/server/handlers/http_handler_base.hpp>
#include <userver/server/http/http_status.hpp>
#include <userver/storages/postgres/cluster.hpp>
#include <userver/storages/postgres/component.hpp>

#include "../../../../models/product.hpp"
#include "../../../lib/auth.hpp"
#include "../filters.hpp"

namespace split_bill {

namespace {

class GetProducts final : public userver::server::handlers::HttpHandlerBase {
 public:
  static constexpr std::string_view kName = "handler-v1-get-products";

  GetProducts(const userver::components::ComponentConfig& config,
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

    auto filters = TFilters::Parse(request);

    static const std::unordered_map<TFilters::ESortOrder, std::string>
        order_by_columns{
            {TFilters::ESortOrder::ID, "p.id"},
            {TFilters::ESortOrder::NAME, "p.name"},
            {TFilters::ESortOrder::PRICE, "p.price"},
            {TFilters::ESortOrder::ROOM_ID, "p.room_id"},
        };
    auto order_by_column = order_by_columns.at(filters.order_by);

    size_t offset = (filters.page - 1) * filters.limit;

    std::string query = fmt::format(
        "SELECT p.* FROM products p "
        "JOIN user_products up ON p.id = up.product_id "
        "WHERE up.user_id = $1 "
        "ORDER BY {} "
        "LIMIT $2 OFFSET $3",
        order_by_column);

    auto count_result = pg_cluster_->Execute(
        userver::storages::postgres::ClusterHostType::kSlave,
        "SELECT COUNT(*) FROM products p "
        "JOIN user_products up ON p.id = up.product_id "
        "WHERE up.user_id = $1",
        session->user_id);

    int total_count = count_result.AsSingleRow<int>();

    auto result = pg_cluster_->Execute(
        userver::storages::postgres::ClusterHostType::kSlave, query,
        session->user_id, static_cast<int>(filters.limit),
        static_cast<int>(offset));

    auto products = result.AsContainer<std::vector<TProduct>>(
        userver::storages::postgres::kRowTag);

    userver::formats::json::ValueBuilder response;
    response["items"] = products;

    response["page"] = filters.page;
    response["limit"] = filters.limit;
    response["total_count"] = total_count;
    response["total_pages"] = (total_count + filters.limit - 1) / filters.limit;

    return userver::formats::json::ToString(response.ExtractValue());
  }

 private:
  userver::storages::postgres::ClusterPtr pg_cluster_;
};

}  // namespace

void AppendGetProducts(userver::components::ComponentList& component_list) {
  component_list.Append<GetProducts>();
}

}  // namespace split_bill
