import React from 'react';
import { NativeBaseProvider, extendTheme } from 'native-base';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainNavigation from './src/navigation/MainNavigation';

const theme = extendTheme({
  main: {},
  fontConfig: {
    Poppins: {
      300: {
        normal: 'Poppins-Light',
        italic: 'Poppins-LightItalic'
      },
      400: {
        normal: 'Poppins-Regular',
        italic: 'Poppins-Italic'
      },
      500: {
        normal: 'Poppins-Medium',
        italic: 'Poppins-MediumItalic'
      },
      600: {
        normal: 'Poppins-SemiBold',
        italic: 'Poppins-SemiBoldItalic'
      },
      700: {
        normal: 'Poppins-Bold',
        italic: 'Poppins-BoldItalic'
      }
    }
  },

  // Make sure values below matches any of the keys in `fontConfig`
  fonts: {
    heading: 'Poppins',
    body: 'Poppins',
    mono: 'Poppins'
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
