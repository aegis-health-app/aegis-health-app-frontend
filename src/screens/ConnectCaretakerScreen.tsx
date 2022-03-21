import React from 'react';
import { Text, View, Image } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeBaseProvider } from 'native-base';
import InfoCard from '../components/organisms/InfoCard';
import HeaderBack from '../components/molecules/HeaderBack';
import { useTranslation } from 'react-i18next';

const QRPlaceholder = require('../assets/images/QRPlaceholder.png');

const EditCaretakerScreen = () => {
  const { t } = useTranslation();
  return (
    <NativeBaseProvider>
      <SafeAreaView edges={['right', 'top', 'left']}>
        <View>
          {/* <HeaderBack name="เชื่อมต่อกับผู้ดูแล" /> */}
          <View bgColor="FAFAFA">
            <View mt="10" flexDir="row" justifyContent="center">
              <Image source={QRPlaceholder} alt="QR Code" />
            </View>
            <View mb="20" flexDir="row" justifyContent="center">
              <Text mr="2" fontSize={16}>
                {t('129')}
              </Text>
              <Text color="orange.500" fontSize={16} fontWeight="bold">
                CODE
              </Text>
            </View>
            <InfoCard
              icon="touch-app"
              desc={t('130')}
            />
            <InfoCard
              icon="qr-code-scanner"
              desc={t('131')}
            />
          </View>
        </View>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};
export default EditCaretakerScreen;
