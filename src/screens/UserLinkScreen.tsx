import React from "react";
import { Box, Text, View, ScrollView } from "native-base";
import { SafeAreaView,StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NativeBaseProvider } from "native-base";
import { extendTheme } from "native-base";
import AddButton from "../components/atoms/AddButton";
import Card from "../components/organisms/CaretakerCard";
import Header from "../components/molecules/Header";
import { NavigationHelpersContext, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

const theme = extendTheme({
  main: {}
});

const UserLinkScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <ScrollView>
      <Header name="ผู้ดูแลของฉัน"/>
      <View bgColor="#FAFAFA">
      <Card name="Supatach Vanichayangkuranont"/>
      <Card name="Somying Muangyim"/>
      <Card name="Somying Muangyim"/>
      <AddButton/>
      </View>
      </ScrollView>
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
