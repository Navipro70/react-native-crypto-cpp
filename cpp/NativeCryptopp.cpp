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

void quickSortInPlaceHelper(
    jsi::Runtime& rt,
    jsi::Array& array,
    int low,
    int high);
int partitionInPlace(jsi::Runtime& rt, jsi::Array& array, int low, int high);

NativeCryptopp::NativeCryptopp(std::shared_ptr<CallInvoker> jsInvoker)
    : NativeCryptoppCxxSpec(std::move(jsInvoker)) {}

int partition(std::vector<double>& arr, int low, int high) {
  double pivot = arr[high];
  int i = (low - 1);

  for (int j = low; j <= high - 1; j++) {
    if (arr[j] < pivot) {
      i++;
      std::swap(arr[i], arr[j]);
    }
  }
  std::swap(arr[i + 1], arr[high]);
  return (i + 1);
}

void quickSortHelper(std::vector<double>& arr, int low, int high) {
  if (low < high) {
    int pi = partition(arr, low, high);
    quickSortHelper(arr, low, pi - 1);
    quickSortHelper(arr, pi + 1, high);
  }
}

jsi::Array NativeCryptopp::quickSort(jsi::Runtime& rt, jsi::Array array) {
  std::vector<double> numbers;

  size_t length = array.length(rt);
  numbers.reserve(length);

  for (size_t i = 0; i < length; i++) {
    auto value = array.getValueAtIndex(rt, i);
    if (value.isNumber()) {
      numbers.push_back(value.asNumber());
    }
  }

  if (!numbers.empty()) {
    quickSortHelper(numbers, 0, static_cast<int>(numbers.size()) - 1);
  }

  jsi::Array result = jsi::Array(rt, numbers.size());
  for (size_t i = 0; i < numbers.size(); i++) {
    result.setValueAtIndex(rt, i, jsi::Value(numbers[i]));
  }

  return result;
}

void quickSortInPlaceHelper(
    jsi::Runtime& rt,
    jsi::Array& array,
    int low,
    int high) {
  if (low < high) {
    int pi = partitionInPlace(rt, array, low, high);
    quickSortInPlaceHelper(rt, array, low, pi - 1);
    quickSortInPlaceHelper(rt, array, pi + 1, high);
  }
}

int partitionInPlace(jsi::Runtime& rt, jsi::Array& array, int low, int high) {
  double pivot = array.getValueAtIndex(rt, high).asNumber();
  int i = low - 1;

  for (int j = low; j < high; j++) {
    if (array.getValueAtIndex(rt, j).asNumber() < pivot) {
      i++;
      jsi::Value temp = array.getValueAtIndex(rt, i);
      array.setValueAtIndex(rt, i, array.getValueAtIndex(rt, j));
      array.setValueAtIndex(rt, j, std::move(temp));
    }
  }

  jsi::Value temp = array.getValueAtIndex(rt, i + 1);
  array.setValueAtIndex(rt, i + 1, array.getValueAtIndex(rt, high));
  array.setValueAtIndex(rt, high, std::move(temp));

  return i + 1;
}

void NativeCryptopp::quickSortInPlace(jsi::Runtime& rt, jsi::Array array) {
  int length = static_cast<int>(array.length(rt));
  if (length > 1) {
    quickSortInPlaceHelper(rt, array, 0, length - 1);
  }
}

jsi::String NativeCryptopp::md2(jsi::Runtime& rt, jsi::String input) {
  std::string inputStr = input.utf8(rt);
  std::string result = CryptoppHelpers::md2(inputStr);
  return jsi::String::createFromUtf8(rt, result);
}

} // namespace facebook::react
