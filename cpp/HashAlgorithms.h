#pragma once

#include <string>
#include <vector>

namespace CryptoppHelpers {

    std::string md2(const std::string& input);
    std::string md4(const std::string& input);
    std::string md5(const std::string& input);
    std::string sha256(const std::string& input);
    std::string hmacSha256(const std::string& input, const std::string& key);
    std::string uuidv4(bool isUpperCase = false);

}
