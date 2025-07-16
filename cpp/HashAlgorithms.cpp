#include "HashAlgorithms.h"
#include "uuid.h"

#define CRYPTOPP_ENABLE_NAMESPACE_WEAK 1
#include "cryptopp/md2.h"
#include "cryptopp/md4.h"
#include "cryptopp/md5.h"
#include "cryptopp/sha.h"
#include "cryptopp/hmac.h"
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

    std::string md4(const std::string& input) {
        CryptoPP::Weak1::MD4 hash;
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

    std::string md5(const std::string& input) {
        CryptoPP::Weak1::MD5 hash;
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

    std::string sha256(const std::string& input) {
        CryptoPP::SHA256 hash;
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

    std::string hmacSha256(const std::string& input, const std::string& key) {
        CryptoPP::HMAC<CryptoPP::SHA256> hmac(reinterpret_cast<const CryptoPP::byte*>(key.data()), key.size());
        std::string digest;

        CryptoPP::StringSource s(input, true,
            new CryptoPP::HashFilter(hmac,
                new CryptoPP::HexEncoder(
                    new CryptoPP::StringSink(digest)
                )
            )
        );

        return digest;
    }

    std::string uuidv4() {
        static std::random_device rd;
        static std::mt19937 eng{rd()};
        static uuids::uuid_random_generator gen{eng};
        uuids::uuid id = gen();
        return uuids::to_string(id);
    }

}
