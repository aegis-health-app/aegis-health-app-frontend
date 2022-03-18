import React from 'react';
import { Text, View, Image } from 'native-base';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeBaseProvider } from 'native-base';
import InfoCard from '../components/organisms/InfoCard';
import HeaderBack from '../components/molecules/HeaderBack';

const QRPlaceholder = require('../assets/images/QRPlaceholder.png');

const EditCaretakerScreen = () => {
  return (
    <SafeAreaProvider>
      <NativeBaseProvider>
        <HeaderBack name="เชื่อมต่อกับผู้ดูแล" />
        <View bgColor="FAFAFA">
          <View mt="10" flexDir="row" justifyContent="center">
            <Image source={QRPlaceholder} alt="QR Code" />
          </View>
          <View mb="20" flexDir="row" justifyContent="center">
            <Text mr="2" fontSize={16}>
              โค้ดของฉัน:
            </Text>
            <Text color="orange.500" fontSize={16} fontWeight="bold">
              CODE
            </Text>
          </View>
          <InfoCard
            icon="touch-app"
            desc="จากแอปพลิเคชันของผู้ดูแล ให้กดปุ่ม “เพิ่มผู้สูงอายุ”"
          />
          <InfoCard
            icon="qr-code-scanner"
            desc="สแกน QR code หรือกรอกโค้ดที่แสดงอยู่ด้านบน"
          />
        </View>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
};
export default EditCaretakerScreen;
