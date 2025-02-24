#include "user-info.hpp"

namespace split_bill {

userver::v2_8_rc::formats::json::Value Serialize(
    const TUserInfo& user,
    userver::v2_8_rc::formats::serialize::To<userver::v2_8_rc::formats::json::Value>) {

    userver::v2_8_rc::formats::json::ValueBuilder item;
    item["id"] = user.id;
    item["username"] = user.username;
    item["full_name"] = user.full_name;
    item["photo_url"] = user.photo_url;
    return item.ExtractValue();
}

}  // namespace split_bill