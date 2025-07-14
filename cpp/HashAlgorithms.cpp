#include "HashAlgorithms.h"

#define CRYPTOPP_ENABLE_NAMESPACE_WEAK 1
#include "cryptopp/md2.h"
#include "cryptopp/hex.h"
#include "cryptopp/filters.h"

namespace CryptoppHelpers {

std::string md2(const std::string& input) {
    CryptoPP::Weak1::MD2 hash;
    std::string digest;
    
    CryptoPP::StringSource s(input, true, 
        new CryptoPP::HashFilter(hash,
            new CryptoPP::HexEncoder(
                new CryptoPP::StringSink(digest)
            )
        )
    );
    
    return digest;
}

}
