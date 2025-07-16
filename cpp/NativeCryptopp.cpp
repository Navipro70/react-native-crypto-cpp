//
//  NativeCryptopp.h
//  react-native-cryptopp-cpp
//
//  Created by Dmitry Matatov on 12.07.2025.
//

#include "NativeCryptopp.h"
#include "HashAlgorithms.h"

#include <algorithm>
#include <vector>

namespace facebook::react {

  NativeCryptopp::NativeCryptopp(std::shared_ptr<CallInvoker> jsInvoker)
      : NativeCryptoppCxxSpec(std::move(jsInvoker)) {}

  jsi::String NativeCryptopp::md2(jsi::Runtime& rt, jsi::String input) {
    std::string inputStr = input.utf8(rt);
    std::string result = CryptoppHelpers::md2(inputStr);
    return jsi::String::createFromUtf8(rt, result);
  }

  jsi::String NativeCryptopp::md4(jsi::Runtime& rt, jsi::String input) {
    std::string inputStr = input.utf8(rt);
    std::string result = CryptoppHelpers::md4(inputStr);
    return jsi::String::createFromUtf8(rt, result);
  }

  jsi::String NativeCryptopp::md5(jsi::Runtime& rt, jsi::String input) {
    std::string inputStr = input.utf8(rt);
    std::string result = CryptoppHelpers::md5(inputStr);
    return jsi::String::createFromUtf8(rt, result);
  }

  jsi::String NativeCryptopp::sha256(jsi::Runtime& rt, jsi::String input) {
    std::string inputStr = input.utf8(rt);
    std::string result = CryptoppHelpers::sha256(inputStr);
    return jsi::String::createFromUtf8(rt, result);
  }

  jsi::String NativeCryptopp::hmacSha256(jsi::Runtime& rt, jsi::String input, jsi::String key) {
    std::string inputStr = input.utf8(rt);
    std::string keyStr = key.utf8(rt);
    std::string result = CryptoppHelpers::hmacSha256(inputStr, keyStr);
    return jsi::String::createFromUtf8(rt, result);
  }

  jsi::String NativeCryptopp::uuidv4(jsi::Runtime& rt) {
    std::string result = CryptoppHelpers::uuidv4();
    return jsi::String::createFromUtf8(rt, result);
  }

} // namespace facebook::react
