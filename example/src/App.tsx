import { Text, View, StyleSheet, Button } from 'react-native';
import { quickSort, md2 } from 'react-native-cryptopp-cpp';
import { useState } from 'react';

export default function App() {
  const [result, setResult] = useState<number[]>([]);
  const [result2, setResult2] = useState<string>('');

  return (
    <View style={styles.container}>
      <Text>Result: {result.join(', ')}</Text>
      <Button title="Quick Sort" onPress={() => {
        const result = quickSort([3, 7, 1, 5, 2, 4, 6]);
        setResult(result);
      }} />
      <Text>md2: {result2}</Text>
      <Button title="md2" onPress={() => {
        const result = md2('Hello, world!Hello, world!Hello, world!Hello, world!Hello, world!Hello, world!Hello, world!Hello, world!Hello, world!Hello, world!Hello, world!Hello, world!Hello, world!Hello, world!Hello, world!Hello, world!Hello, world!Hello, world!');
        setResult2(result);
      }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
