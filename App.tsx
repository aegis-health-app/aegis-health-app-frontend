import React from 'react';
import { NativeBaseProvider, extendTheme } from 'native-base';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainNavigation from './src/navigation/MainNavigation';
import Card from './src/components/organisms/CaretakerCard';
import AddButton from './src/components/atoms/AddButton';

const theme = extendTheme({
  main: {},
  fontConfig: {
    Sarabun: {
      300: {
        normal: 'Sarabun-Light',
        italic: 'Poppins-LightItalic'
      },
      400: {
        normal: 'Sarabun-Regular',
        italic: 'Sarabun-Italic'
      },
      500: {
        normal: 'Sarabun-Medium',
        italic: 'Sarabun-MediumItalic'
      },
      600: {
        normal: 'Sarabun-SemiBold',
        italic: 'Sarabun-SemiBoldItalic'
      },
      700: {
        normal: 'Sarabun-Bold',
        italic: 'Sarabun-BoldItalic'
      }
    }
  },

  fonts: {
    heading: 'Sarabun',
    body: 'Sarabun',
    mono: 'Sarabun'
  }
});

const App = () => {
  return (
    <SafeAreaProvider>
      <NativeBaseProvider theme={theme}>
        <MainNavigation />
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },});
