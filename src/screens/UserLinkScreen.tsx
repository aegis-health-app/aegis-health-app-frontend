import React from "react";
import { Box, Text, View } from "native-base";
import { SafeAreaView,StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NativeBaseProvider } from "native-base";
import { extendTheme } from "native-base";
import AddButton from "../components/atoms/AddButton";
import Card from "../components/organisms/CaretakerCard";
import Header from "../components/molecules/Header";

const theme = extendTheme({
  main: {}
});

const UserLinkScreen = () => {
  return (
    <SafeAreaProvider>
      <NativeBaseProvider>
        <Header name="ผู้ดูแลของฉัน"/>
      <View bgColor="#FAFAFA">
      {/* <Text>Hello Test</Text> */}
      <Card/>
      <Card/>
      <Card/>
      <AddButton/>
      </View>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
};
export default UserLinkScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },});
