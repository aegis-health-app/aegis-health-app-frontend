import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Image, Text, View } from 'native-base';
import Spacer from '../components/atoms/Spacer';
import { useTranslation } from 'react-i18next';

const MemoryRecallFinishScreen = () => {
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <SafeAreaView edges={['right', 'top', 'left']}>
      <View alignItems={'center'} mt={32}>
        <Image
          width={'330 px'}
          height={'230 px'}
          source={require('../assets/images/memoryRecallFinish.png')}
          alt="Memory recall"
        />
        <Spacer h={34} />
        <View alignItems={'center'}>
          <Text fontWeight={'bold'} fontSize={'3xl'}>
            {t('memoryRecallElderly.nicelyDone')}
          </Text>
          <Text fontSize={'md'} textAlign={'center'}>
            {t('memoryRecallElderly.gameFinish')}
          </Text>
        </View>
        <Spacer h={128} />
        <Button
          w="80 %"
          colorScheme="primary"
          variant="solid"
          onPress={() => navigation.navigate('MemoryScreen')}>
          {t('memoryRecallElderly.returnToHomeScreen')}
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default MemoryRecallFinishScreen;
