#pragma once

#include <chrono>
#include <string>

#include <userver/formats/json/value_builder.hpp>

namespace split_bill {

struct TUserInfo {
    int id;
    std::string username;
    std::string full_name;
    std::string photo_url;

    userver::formats::json::Value Serialize() const {
        userver::formats::json::ValueBuilder item;
        item["id"] = id;
        item["username"] = username;
        item["full_name"] = full_name;
        item["photo_url"] = photo_url;
        return item.ExtractValue();
    }
};

}  // namespace split_bill