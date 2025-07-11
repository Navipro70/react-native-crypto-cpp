#pragma once

#include <AppSpecsJSI.h>
#include <memory>
#include <vector>

namespace facebook::react {

class NativeSampleModule
    : public NativeSampleModuleCxxSpec<NativeSampleModule> {
 public:
  NativeSampleModule(std::shared_ptr<CallInvoker> jsInvoker);

  jsi::Array quickSort(jsi::Runtime& rt, jsi::Array array);
  void quickSortInPlace(jsi::Runtime& rt, jsi::Array array);
};

} // namespace facebook::react
