require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::UI.puts "[react-native-cryptopp-cpp] Thank you for using react-native-cryptopp-cpp ❤️"

Pod::Spec.new do |s|
  s.name         = "NativeCryptopp"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => min_ios_version_supported }
  s.source       = { :git => "https://github.com/Navipro70/react-native-crypto-cpp.git.git", :tag => "#{s.version}" }

  s.pod_target_xcconfig = {
    "CLANG_CXX_LANGUAGE_STANDARD" => "c++17",
    "CLANG_CXX_LIBRARY" => "libc++",
    "CLANG_WARN_OBJC_IMPLICIT_RETAIN_SELF" => "NO",
    # FORCE_POSIX ensures we are using C++ types instead of Objective-C types for MMKV.
    "GCC_PREPROCESSOR_DEFINITIONS" => "$(inherited) FORCE_POSIX",
  }
  s.compiler_flags = '-x objective-c++'
  s.libraries    = "z", "c++"
  s.source_files = [
    "ios/**/*.{h,m,mm,cpp}",
    "cpp/**/*.{hpp,cpp,c,h}",
    "cryptopp/**/*.{h,cpp}",
    "stduuid/**/*.{h,cpp}"
  ]
  s.exclude_files = [
    "cryptopp/TestPrograms/**/*",
    "cryptopp/TestData/**/*",
    "cryptopp/TestVectors/**/*",
    "cryptopp/TestScripts/**/*",

    "stduuid/test/**/*"
  ]
  s.header_mappings_dir = '.'
  s.public_header_files = 'cryptopp/**/*.h'
  s.private_header_files = "ios/**/*.h"
  s.requires_arc = false
  

  install_modules_dependencies(s)
end
