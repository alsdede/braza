import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { FontProvider } from './src/providers/FontProvider';
import { colors } from './src/constants/colors';
import { Text, Button } from './src/components/ui';
import UIShowcase from './src/components/examples/UIShowcase';
import FormExample from './src/components/examples/FormExample';

export default function App() {
  return (
    <FontProvider>
      <View style={styles.container}>
        <FormExample />
        <StatusBar style="auto" />
      </View>
    </FontProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
});
