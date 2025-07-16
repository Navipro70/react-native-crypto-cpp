cmake_minimum_required(VERSION 3.4.1)
project(NativeCryptopp)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_VERBOSE_MAKEFILE ON)

get_filename_component(PROJECT_ROOT "${CMAKE_CURRENT_LIST_DIR}/.." ABSOLUTE)

set(CRYPTOPP_BUILD_TESTING OFF CACHE BOOL "")
set(CRYPTOPP_DISABLE_ASM   ON  CACHE BOOL "") 

add_subdirectory("${PROJECT_ROOT}/cryptopp-cmake"       # исходники сабмодуля
                 "${CMAKE_BINARY_DIR}/cryptopp-cmake")

add_subdirectory("${PROJECT_ROOT}/stduuid"
                 "${CMAKE_BINARY_DIR}/stduuid")

file(GLOB RN_SOURCE_FILES "${PROJECT_ROOT}/cpp/*.cpp" "${PROJECT_ROOT}/cpp/*.h")
add_library(react-native-cryptopp-cpp STATIC
  ${RN_SOURCE_FILES}
)

target_include_directories(react-native-cryptopp-cpp PUBLIC 
  ${PROJECT_ROOT}/cpp
)

target_link_libraries(react-native-cryptopp-cpp
  cryptopp::cryptopp
  stduuid
  jsi
  reactnative
  react_codegen_RNCryptoppSpec
)
