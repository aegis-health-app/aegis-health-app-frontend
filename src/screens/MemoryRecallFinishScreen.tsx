import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import useDimensions from '../hooks/useDimensions';
import { Button, Image, Text, View, VStack } from 'native-base';
import Spacer from '../components/atoms/Spacer';

const MemoryRecallFinishScreen = () => {
  const { ScreenWidth, ScreenHeight } = useDimensions();
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
            Nicely done!
          </Text>
          <Text fontSize={'md'} textAlign={'center'}>
            You have finished the game.{' '}
          </Text>
        </View>
        <Spacer h={128} />
        <Button
          w="80 %"
          colorScheme="primary"
          variant="solid"
          onPress={() => navigation.navigate('MemoryScreen')}>
          Exit game
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default MemoryRecallFinishScreen;
