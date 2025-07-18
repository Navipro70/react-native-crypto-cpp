import {
  Text,
  View,
  StyleSheet,
  Button,
  TextInput,
  ScrollView,
} from 'react-native';
import { useState } from 'react';
import {
  md2,
  md4,
  md5,
  sha256,
  hmacSha256,
  uuidv4,
} from 'react-native-cryptopp-cpp';
import BenchmarkModal from './BenchmarkModal/BenchmarkModal';

export default function App() {
  const [input, setInput] = useState('');
  const [md2Result, setMd2Result] = useState('');
  const [md4Result, setMd4Result] = useState('');
  const [md5Result, setMd5Result] = useState('');
  const [sha256Result, setSha256Result] = useState('');
  const [hmacSha256Result, setHmacSha256Result] = useState('');
  const [uuidResult, setUuidResult] = useState('');
  const [showBenchmark, setShowBenchmark] = useState(false);

  const handleChangeText = (text: string) => {
    setInput(text);
    setMd2Result(md2(text));
    setMd4Result(md4(text));
    setMd5Result(md5(text));
    setSha256Result(sha256(text));
    setHmacSha256Result(hmacSha256(text, 'key'));
    setUuidResult(uuidv4(true));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          title="Open Benchmark"
          onPress={() => setShowBenchmark(true)}
          color="#007AFF"
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Enter text"
        value={input}
        onChangeText={handleChangeText}
      />
      <Text>
        MD2: {md2Result}
        {`\n`}
      </Text>
      <Text>
        MD4: {md4Result}
        {`\n`}
      </Text>
      <Text>
        MD5: {md5Result}
        {`\n`}
      </Text>
      <Text>
        SHA256: {sha256Result}
        {`\n`}
      </Text>
      <Text>
        HMAC SHA256: {hmacSha256Result}
        {`\n`}
      </Text>
      <Text>
        UUID v4: {uuidResult}
        {`\n`}
      </Text>

      <BenchmarkModal
        visible={showBenchmark}
        onClose={() => setShowBenchmark(false)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  buttonContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '100%',
  },
});
