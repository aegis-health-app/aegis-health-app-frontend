import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box, ScrollView, VStack } from 'native-base';
import FormHeader from '../components/atoms/FormHeader';
import FormSubHeader from '../components/atoms/FormSubHeader';
import { useTranslation } from 'react-i18next';
import AuthFooter, { AuthType } from '../components/atoms/AuthFooter';
import PlanSelectionCard from '../components/molecules/PlanSelectionCard';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import images from '../assets/images';

const PlanSelectionScreen = () => {
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <SafeAreaView>
      <ScrollView>
        <VStack px={2}>
          <FormHeader headerText={t('planSelection.header')} mt={10} mb={0} />
          <FormSubHeader
            headerText={t('planSelection.subheader')}
            mt={0}
            mb={7}
          />
          <PlanSelectionCard
            backgroundColor="#fff"
            image={images.selfCare}
            header={t('planSelection.selfCareHeader')}
            list={[
              t('planSelection.selfCareBullet1'),
              t('planSelection.selfCareBullet2'),
              t('planSelection.selfCareBullet3')
            ]}
            buttonText={t('planSelection.selfCareButtonText')}
            buttonColor={null}
            handlePress={() =>
              navigation.navigate('SignUpScreen', { isElderly: true })
            }
          />
          <PlanSelectionCard
            backgroundColor="#fff"
            image={images.elderlyCare}
            header={t('planSelection.elderlyCareHeader')}
            list={[
              t('planSelection.elderlyCareBullet1'),
              t('planSelection.elderlyCareBullet2'),
              t('planSelection.elderlyCareBullet3')
            ]}
            buttonText={t('planSelection.elderlyCareButtonText')}
            buttonColor="#ff9145"
            handlePress={() =>
              navigation.navigate('SignUpScreen', { isElderly: false })
            }
          />
          <Box flex={1} />
          <AuthFooter page={AuthType.SIGNUP} />
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PlanSelectionScreen;
