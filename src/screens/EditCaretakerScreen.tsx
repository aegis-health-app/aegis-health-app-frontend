import React from "react";
import { Box, Text, View, Image } from "native-base";
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
import HeaderBack from "../components/molecules/HeaderBack";
import ProfileInfoCard from "../components/organisms/ProfileInfoCard";

const theme = extendTheme({
  main: {}
});

const EditCaretakerScreen = () => {
  return (
    <SafeAreaProvider>
      <NativeBaseProvider>
          <HeaderBack name="ผู้ดูแลของฉัน"/>
            <View bgColor="#FAFAFA">
                <ProfileInfoCard/>
                <Divider/>
                <Box flexDir="row">
                    <Text mb="1" ml="5" color="gray.600" fontSize={16}>เปลี่ยนชื่อผู้ใช้</Text>
                </Box>
                <NameChangeInput placeholder="เปลี่ยนชื่อผู้ใช้"/>
                <Divider/>
                <RemButton/>
                
            </View>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
};
export default EditCaretakerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
    justifyContent: 'center',
  },});
