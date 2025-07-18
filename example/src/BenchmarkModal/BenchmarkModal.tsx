import { sha256 as jsSha256 } from 'js-sha256';
import { useState } from 'react';
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  hmacSha256,
  md2,
  md4,
  md5,
  sha256,
  uuidv4,
} from 'react-native-cryptopp-cpp';
import uuid from 'react-native-uuid';

interface BenchmarkResult {
  functionName: string;
  cryptopp: {
    x1: number;
    x10: number;
    x100: number;
    x1000: number;
    x10000: number;
  };
  comparison: {
    x1: number;
    x10: number;
    x100: number;
    x1000: number;
    x10000: number;
  } | null;
  comparisonName?: string;
}

interface BenchmarkModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function BenchmarkModal({
  visible,
  onClose,
}: BenchmarkModalProps) {
  const [results, setResults] = useState<BenchmarkResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const benchmarkFunction = (fn: () => void, iterations: number): number => {
    const start = performance.now();
    for (let i = 0; i < iterations; i++) {
      fn();
    }
    const end = performance.now();
    return end - start;
  };

  const runBenchmarks = async () => {
    setIsRunning(true);
    setResults([]);

    const testData = 'test data for benchmarking';
    const hmacKey = 'benchmark-key';

    const functions = [
      {
        name: 'uuid',
        cryptoppFn: () => uuidv4(true),
        comparisonFn: () => uuid.v4(),
        comparisonName: 'react-native-uuid',
      },
      {
        name: 'sha256',
        cryptoppFn: () => sha256(testData),
        comparisonFn: () => jsSha256(testData),
        comparisonName: 'js-sha256',
      },
      {
        name: 'md2',
        cryptoppFn: () => md2(testData),
        comparisonFn: null,
        comparisonName: null,
      },
      {
        name: 'md4',
        cryptoppFn: () => md4(testData),
        comparisonFn: null,
        comparisonName: null,
      },
      {
        name: 'md5',
        cryptoppFn: () => md5(testData),
        comparisonFn: null,
        comparisonName: null,
      },
      {
        name: 'hmacSha256',
        cryptoppFn: () => hmacSha256(testData, hmacKey),
        comparisonFn: null,
        comparisonName: null,
      },
    ];

    const benchmarkResults: BenchmarkResult[] = [];

    for (const func of functions) {
      try {
        const cryptoppResults = {
          x1: benchmarkFunction(func.cryptoppFn, 1),
          x10: benchmarkFunction(func.cryptoppFn, 10),
          x100: benchmarkFunction(func.cryptoppFn, 100),
          x1000: benchmarkFunction(func.cryptoppFn, 1000),
          x10000: benchmarkFunction(func.cryptoppFn, 10000),
        };

        let comparisonResults = null;
        if (func.comparisonFn) {
          comparisonResults = {
            x1: benchmarkFunction(func.comparisonFn, 1),
            x10: benchmarkFunction(func.comparisonFn, 10),
            x100: benchmarkFunction(func.comparisonFn, 100),
            x1000: benchmarkFunction(func.comparisonFn, 1000),
            x10000: benchmarkFunction(func.comparisonFn, 10000),
          };
        }

        const result: BenchmarkResult = {
          functionName: func.name,
          cryptopp: cryptoppResults,
          comparison: comparisonResults,
          comparisonName: func.comparisonName || undefined,
        };
        benchmarkResults.push(result);
      } catch (error) {
        Alert.alert('Error', `Failed to benchmark ${func.name}: ${error}`);
      }
    }

    setResults(benchmarkResults);
    setIsRunning(false);
  };

  const formatTime = (time: number) => {
    return `${time.toFixed(2)}ms`;
  };

  const calculateSpeedRatio = (cppTime: number, jsTime: number) => {
    if (jsTime === 0) return 'N/A';
    const ratio = jsTime / cppTime;
    return `${ratio.toFixed(1)}x`;
  };

  const FunctionTable = ({ result }: { result: BenchmarkResult }) => (
    <View style={styles.functionTableContainer}>
      <Text style={styles.functionTitle}>
        {result.functionName.toUpperCase()}
        {result.comparisonName && (
          <Text style={styles.comparisonSubtitle}>
            {' '}
            (cpp vs {result.comparisonName})
          </Text>
        )}
      </Text>

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableCell, styles.headerCell]}>Iterations</Text>
          <Text style={[styles.tableCell, styles.headerCell]}>
            Crypto++ (cpp)
          </Text>
          {result.comparison && (
            <>
              <Text style={[styles.tableCell, styles.headerCell]}>
                {result.comparisonName}
              </Text>
              <Text style={[styles.tableCell, styles.headerCell]}>
                Speed Ratio
              </Text>
            </>
          )}
        </View>

        {['x1', 'x10', 'x100', 'x1000', 'x10000'].map((iteration) => (
          <View key={iteration} style={styles.tableRow}>
            <Text style={[styles.tableCell, styles.iterationLabel]}>
              {iteration}
            </Text>
            <Text style={[styles.tableCell, styles.cppTime]}>
              {formatTime(
                result.cryptopp[iteration as keyof typeof result.cryptopp]
              )}
            </Text>
            {result.comparison ? (
              <>
                <Text style={[styles.tableCell, styles.jsTime]}>
                  {formatTime(
                    result.comparison[
                      iteration as keyof typeof result.comparison
                    ]
                  )}
                </Text>
                <Text style={[styles.tableCell, styles.speedRatio]}>
                  {calculateSpeedRatio(
                    result.cryptopp[iteration as keyof typeof result.cryptopp],
                    result.comparison[
                      iteration as keyof typeof result.comparison
                    ]
                  )}
                </Text>
              </>
            ) : (
              <>
                <Text style={[styles.tableCell, styles.noComparison]}>
                  No comparison
                </Text>
                <Text style={[styles.tableCell, styles.noComparison]}>-</Text>
              </>
            )}
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.container}>
          <Text style={styles.title}>Crypto++ Benchmark</Text>

          <TouchableOpacity
            style={[styles.button, isRunning && styles.buttonDisabled]}
            onPress={runBenchmarks}
            disabled={isRunning}
          >
            <Text style={styles.buttonText}>
              {isRunning ? 'Running Benchmarks...' : 'Run Benchmarks'}
            </Text>
          </TouchableOpacity>

          {results.length > 0 && (
            <View style={styles.resultsContainer}>
              {results.map((result, index) => (
                <FunctionTable key={index} result={result} />
              ))}
            </View>
          )}

          {isRunning && (
            <Text style={styles.loadingText}>
              Running performance tests, please wait...
            </Text>
          )}
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  modalHeader: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'flex-end',
  },
  closeButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  resultsContainer: {
    gap: 20,
  },
  functionTableContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  functionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  comparisonSubtitle: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#666',
    fontStyle: 'italic',
  },
  table: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tableCell: {
    flex: 1,
    padding: 12,
    textAlign: 'center',
    fontSize: 13,
  },
  headerCell: {
    fontWeight: 'bold',
    color: '#495057',
  },
  iterationLabel: {
    fontWeight: '600',
    color: '#333',
  },
  cppTime: {
    color: '#007AFF',
    fontWeight: '600',
  },
  jsTime: {
    color: '#FF9500',
    fontWeight: '600',
  },
  speedRatio: {
    color: '#34C759',
    fontWeight: 'bold',
  },
  noComparison: {
    color: '#999',
    fontStyle: 'italic',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
  },
});
