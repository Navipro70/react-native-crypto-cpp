//
//  NativeCryptopp.h
//  react-native-cryptopp-cpp
//
//  Created by Dmitry Matatov on 12.07.2025.
//

#pragma once

#include <RNCryptoppSpecJSI.h>

#include <memory>
#include <vector>

namespace facebook::react {

class NativeCryptopp
    : public NativeCryptoppCxxSpec<NativeCryptopp> {
 public:
  NativeCryptopp(std::shared_ptr<CallInvoker> jsInvoker);

  jsi::String md2(jsi::Runtime& rt, jsi::String input);
  jsi::String md4(jsi::Runtime& rt, jsi::String input);
  jsi::String md5(jsi::Runtime& rt, jsi::String input);
  jsi::String sha256(jsi::Runtime& rt, jsi::String input);
  jsi::String hmacSha256(jsi::Runtime& rt, jsi::String input, jsi::String key);
  jsi::String uuidv4(jsi::Runtime& rt);
  
};

} // namespace facebook::react
