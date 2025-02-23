#pragma once

#include <string>
#include <vector>
#include <userver/formats/json/value_builder.hpp>

namespace split_bill {

struct TBulkUpdateItem {
    int user_id;
    int room_id;
    int product_id;
    std::string product_status;
};

struct TBulkUpdateRequest {
    std::vector<TBulkUpdateItem> data;
};

struct TBulkUpdateError {
    int user_id;
    int room_id;
    int product_id;
    std::string message;
};

struct TBulkUpdateResponse {
    int updated{0};
    std::vector<TBulkUpdateError> errors;
};

void Parse(TBulkUpdateRequest& request, const userver::formats::json::Value& json);

userver::formats::json::Value Serialize(
    const TBulkUpdateResponse& response,
    userver::formats::serialize::To<userver::formats::json::Value>);

}  // namespace split_bill