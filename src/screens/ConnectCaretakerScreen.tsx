import React, { useContext } from 'react';
import { Text, View, Image } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeBaseProvider } from 'native-base';
import InfoCard from '../components/organisms/InfoCard';
import { useTranslation } from 'react-i18next';
import QRCode from 'react-native-qrcode-svg';
import { ElderlyContext } from '../contexts/ElderlyContext';

let base64Logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAA..';

const EditCaretakerScreen = () => {

  const {elderlyCode, setElderlyCode} = useContext(ElderlyContext)
  const { t } = useTranslation();
  return (
    <NativeBaseProvider>
      <SafeAreaView edges={['right', 'top', 'left']}>
        <View>
          <View bgColor="FAFAFA">
            <View mt="10" flexDir="row" justifyContent="center">
              <QRCode 
                logo={{uri: base64Logo}}
                size={225}
                quietZone={17.5}
                logoSize={100}
                value={elderlyCode.code}
              />
            </View>
            <View mb="20" flexDir="row" justifyContent="center">
              <Text mr="2" fontSize={16}>
                {t('userLink.myCode')}
              </Text>
              <Text color="orange.500" fontSize={16} fontWeight="bold">
                {elderlyCode.code}
              </Text>
            </View>
            <InfoCard
              icon="touch-app"
              desc={t('userLink.infoCard1')}
            />
            <InfoCard
              icon="qr-code-scanner"
              desc={t('userLink.infoCard2')}
            />
          </View>
        </View>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};
export default EditCaretakerScreen;
