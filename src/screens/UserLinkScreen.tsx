import React from "react";
import { Box, Text, View } from "native-base";
import { SafeAreaView,StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NativeBaseProvider } from "native-base";
import { extendTheme } from "native-base";
import AddButton from "../components/atoms/AddButton";
import { Button } from "native-base";
import RemButton from "../components/atoms/RemButton";
import Card from "../components/organisms/CaretakerCard";
import Divider from "../components/atoms/Divider";
import NameChangeInput from "../components/atoms/NameChangeInput";
import InfoCard from "../components/organisms/InfoCard";

const theme = extendTheme({
  main: {}
});

const UserLinkScreen = () => {
  return (
    <SafeAreaProvider>
      <NativeBaseProvider>
      <View bgColor="gray.100">
      {/* <Text>Hello Test</Text> */}
      <Card/>
      <Card/>
      <AddButton/>
      <NameChangeInput placeholder="เปลี่ยนชื่อผู้ใช้"/>
      <Divider/>
      <RemButton/>
      <InfoCard name="จากแอปพลิเคชันของผู้ดูแล ให้กดปุ่ม “เพิ่มผู้สูงอายุ”"/>
      <InfoCard name="สแกน QR code หรือกรอกโค้ดที่แสดงอยู่ด้านบน"/>
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
