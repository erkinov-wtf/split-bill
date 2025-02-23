#include "product-bulk-update.hpp"

namespace split_bill {

void Parse(TBulkUpdateRequest& request, const userver::formats::json::Value& json) {
    const auto& data = json["data"];
    request.data.reserve(data.GetSize());

    for (const auto& item : data) {
        TBulkUpdateItem update_item{
            item["user_id"].As<int>(),
            item["room_id"].As<int>(),
            item["product_id"].As<int>(),
            item["product_status"].As<std::string>()
        };
        request.data.push_back(std::move(update_item));
    }
}

userver::formats::json::Value Serialize(
    const TBulkUpdateResponse& response,
    userver::formats::serialize::To<userver::formats::json::Value>) {
    userver::formats::json::ValueBuilder builder;
    builder["updated"] = response.updated;

    userver::formats::json::ValueBuilder errors = builder["errors"];
    for (const auto& error : response.errors) {
        userver::formats::json::ValueBuilder error_builder;
        error_builder["user_id"] = error.user_id;
        error_builder["room_id"] = error.room_id;
        error_builder["product_id"] = error.product_id;
        error_builder["message"] = error.message;
        errors.PushBack(error_builder.ExtractValue());
    }

    return builder.ExtractValue();
}

}  // namespace split_bill