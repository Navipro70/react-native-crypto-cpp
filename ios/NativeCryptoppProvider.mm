//
//  NativeCryptopp.h
//  react-native-cryptopp-cpp
//
//  Created by Dmitry Matatov on 12.07.2025.
//

#import "NativeCryptoppProvider.h"

#import <ReactCommon/CallInvoker.h>
#import <ReactCommon/TurboModule.h>

#import "NativeCryptopp.h"

@implementation NativeCryptoppProvider
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
  return std::make_shared<facebook::react::NativeCryptopp>(params.jsInvoker);
}

@end
