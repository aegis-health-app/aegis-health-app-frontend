import React from 'react';
import { NativeBaseProvider, extendTheme } from 'native-base';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainNavigation from './src/navigation/MainNavigation';

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
  },
  colors: {
    primary: {
      50: '#8ec2ef',
      100: '#77b5ec',
      200: '#61a9e9',
      300: '#4a9de5',
      400: '#3490e2',
      500: '#1d84df',
      600: '#1a77c9',
      700: '#176ab2',
      800: '#145c9c',
      900: '#114f86'
    },
    secondary: {
      50: '#fbab73',
      100: '#fb9d5c',
      200: '#fb9d5c',
      300: '#fa8f45',
      400: '#fa812d',
      500: '#f97316',
      600: '#e06814',
      700: '#c75c12',
      800: '#ae510f',
      900: '#95450d'
    }
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
