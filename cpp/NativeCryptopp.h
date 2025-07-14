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

  jsi::Array quickSort(jsi::Runtime& rt, jsi::Array array);
  void quickSortInPlace(jsi::Runtime& rt, jsi::Array array);
  jsi::String md2(jsi::Runtime& rt, jsi::String input);
};

} // namespace facebook::react
