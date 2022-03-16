import React from "react";
import { Box, Text } from "native-base";
import { SafeAreaView,StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NativeBaseProvider } from "native-base";
import { extendTheme } from "native-base";
import AddButton from "./src/components/atoms/AddButton";
import { Button } from "native-base";
import RemButton from "./src/components/atoms/RemButton";
import Card from "./src/components/organisms/CaretakerCard";
import Divider from "./src/components/atoms/Divider";
import NameChangeInput from "./src/components/atoms/NameChangeInput";

const theme = extendTheme({
  main: {}
});

const App = () => {
  return (
    <SafeAreaProvider>
      <NativeBaseProvider>
      {/* <Text>Hello Test</Text> */}
      <Card/>
      <Card/>
      <AddButton/>
      <NameChangeInput/>
      <Divider/>
      <RemButton/>
      <Text>HI</Text>
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