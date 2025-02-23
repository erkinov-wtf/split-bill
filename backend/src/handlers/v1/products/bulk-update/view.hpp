#pragma once

#include <userver/components/component_list.hpp>
#include <userver/server/handlers/http_handler_base.hpp>
#include <userver/storages/postgres/cluster.hpp>

#include "../../../../models/product-bulk-update.hpp"
#include "../../../lib/auth.hpp"

namespace split_bill {

class ProductBulkUpdateHandler final : public userver::server::handlers::HttpHandlerBase {
public:
    static constexpr std::string_view kName = "handler-v1-product-bulk-update";

    ProductBulkUpdateHandler(const userver::components::ComponentConfig& config,
                     const userver::components::ComponentContext& context);

    std::string HandleRequestThrow(
        const userver::server::http::HttpRequest& request,
        userver::server::request::RequestContext&) const override;

private:
    userver::storages::postgres::ClusterPtr pg_cluster_;
};

void AppendProductBulkUpdate(userver::components::ComponentList& component_list);

}  // namespace split_bill