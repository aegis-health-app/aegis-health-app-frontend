import React from 'react';
import { Button, ScrollView, Text, VStack } from 'native-base';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import HealthRecordingCard from '../components/molecules/HealthRecordingCard';
import FormSubHeader from '../components/atoms/FormSubHeader';
import ExpansibleToggle from '../components/atoms/ExpansibleToggle';
import feverImage from '../assets/images/healthRecordTemplate/fever.json';
import bloodPressureImage from '../assets/images/healthRecordTemplate/bloodPressure.json';
import bloodSugarLevelImage from '../assets/images/healthRecordTemplate/bloodSugarLevel.json';

const CreateHealthRecordingsScreen = () => {
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const templates = [
    {
      imageid:
        'https://lh3.googleusercontent.com/hGXa9-HtYGmlMNJ8gpAehU_78KP7OZmhCaMLXDrPGIBXvAawaBOjmHyciXCOhaMQEvWtRKQ3qCeAvCvsz9pDkKSKhk2srpAndWD6jiqFdYvG0b5h0E6hE6XMhDasQzWY-3esenJwszu0nTsHLI_eBgH0GsrO-QJiSq24hxFQfLOVHVjWAVzlV0WlccWWiKFJx6PYKI6uegwGtkcLfgUQILth66kcbrDtM9fy2gwlR8dFdeWe4MwlOAt-Itu6dnkwXvOJKDu_RVaFVJrCxhr1wdEWPckTb0pSWXEDXU9zOGO4fgMLtPYaVf_38bX_g3HmyAGB9GY2VHTc6_nZ-d1iJgro719w8jFYAIaWFAa-e_yLKq1QNJCx6zdY38ZuGcmelBK1YDbGnU4_46clDp1uYU9IUKuOBuW0i62r4sgVemHvNTpOu96lpHQcmMrPG45T4c9oDuFYk0fLdE56lB-Z9rGlJwAGtnRTOgIN4l_ZhSSl22rGPdNoHvEqY6tjSHwR2Q2X6GazzbDWs80S-GvTLZ4GI4ce-FegrAys65Jbqxe9B-IU8fclf9tc7COT499qkQRhUtJiVwlLmto4eZWnXD1_SdjFua2D9G1CcN7zbcnL2wCr-mGR9ayp4edJCkF468pdkR0_VDzd1QN-V0cAvr6ldb9nHDrfcokfX9Bf3LHvFHgCF7zFjHt0Fr-JBVTpmUV8Y5e63IQRMOnzbQka4Gp-A5G0B7f0184QOccOWFQBMwSNi_Bg8-yqilU=w768-h395-no?authuser=0',
      hrName: t('healthRecordingsTemplates.fever'),
      params: {
        _title: t('healthRecordingsTemplates.fever'),
        _picture: feverImage,
        _defaultPictureUri:
          'https://lh3.googleusercontent.com/hGXa9-HtYGmlMNJ8gpAehU_78KP7OZmhCaMLXDrPGIBXvAawaBOjmHyciXCOhaMQEvWtRKQ3qCeAvCvsz9pDkKSKhk2srpAndWD6jiqFdYvG0b5h0E6hE6XMhDasQzWY-3esenJwszu0nTsHLI_eBgH0GsrO-QJiSq24hxFQfLOVHVjWAVzlV0WlccWWiKFJx6PYKI6uegwGtkcLfgUQILth66kcbrDtM9fy2gwlR8dFdeWe4MwlOAt-Itu6dnkwXvOJKDu_RVaFVJrCxhr1wdEWPckTb0pSWXEDXU9zOGO4fgMLtPYaVf_38bX_g3HmyAGB9GY2VHTc6_nZ-d1iJgro719w8jFYAIaWFAa-e_yLKq1QNJCx6zdY38ZuGcmelBK1YDbGnU4_46clDp1uYU9IUKuOBuW0i62r4sgVemHvNTpOu96lpHQcmMrPG45T4c9oDuFYk0fLdE56lB-Z9rGlJwAGtnRTOgIN4l_ZhSSl22rGPdNoHvEqY6tjSHwR2Q2X6GazzbDWs80S-GvTLZ4GI4ce-FegrAys65Jbqxe9B-IU8fclf9tc7COT499qkQRhUtJiVwlLmto4eZWnXD1_SdjFua2D9G1CcN7zbcnL2wCr-mGR9ayp4edJCkF468pdkR0_VDzd1QN-V0cAvr6ldb9nHDrfcokfX9Bf3LHvFHgCF7zFjHt0Fr-JBVTpmUV8Y5e63IQRMOnzbQka4Gp-A5G0B7f0184QOccOWFQBMwSNi_Bg8-yqilU=w768-h395-no?authuser=0',
        _fieldList: [
          {
            name: t('healthRecordingsTemplates.temperature'),
            unit: t('healthRecordingsTemplates.celcius')
          }
        ]
      }
    },
    {
      imageid:
        'https://lh3.googleusercontent.com/1YVDOREIA4qlbtK5pT9VMbgUnWO1n3tl8Wu_m10QS97204Rc2_EcPuqdgPfLVaxD6jOfgPW_36MI_FnIcNJoXM5AxrMFPJk8VWV-sWfdx3prjBZoCF1PVM4LWrl59pb-bzXDlHjlAchHHnbqylw2WFTidvuXJhn_87qoo0xZ_yzydVT1-xIc4XoJJqotQ5IF1EgVSh3Ke-Svxppm0a_0rNjUlo5p67yHq2suvf1XIW8pywCI_D4LAPikwl3ZlH4ccmd9ECy8jhTDPDL2H4Ocv-muI_DjXZMrZ-tgte9MUzmep4aTeW0oRCslr3-QTDxG_lueJFbtvGEdl8NhPRxcVdIE_oKJsTPBDO8A0Xw2gCoGAg8NOYENQ2KRg9XOC6V4j2_QF1mlQJzKqT5BArNIgrBTw1ndDOnduGVHbCimekNazyrXAjtAZZZZUQ7f-t70krM-RHbiZGh4MPaQ3NRGgO0JRQeC0rszTDeZusJOuSptaDtVCiXyozqJ3YRHmmzGuuKR0F1RH4lWe5ecLK6Z5yb836NEQRZ_c_CT7UhnlO22Q-RGoaxxwrXf6fXsErm8XFPYHUAbNHu3h8GKZXUZdnkHOQ0-J5ynM73u2xWg6FPG3PIqMUajxDJYVxs8DhQV7uBVvl00_0MNr_0TcpYbSHZb8mg0MUWChFM9lEYhS0yN-qzvQ3KtH92fJxJr5cf-gTF1511qHtQI8Oihj3stAjcGUym4XAgy149a67yWXM6Ld955g5LnBQhq5tg=w1110-h624-no?authuser=0',
      hrName: t('healthRecordingsTemplates.bloodPressure'),
      params: {
        _title: t('healthRecordingsTemplates.bloodPressure'),
        _picture: bloodPressureImage,
        _defaultPictureUri:
          'https://lh3.googleusercontent.com/1YVDOREIA4qlbtK5pT9VMbgUnWO1n3tl8Wu_m10QS97204Rc2_EcPuqdgPfLVaxD6jOfgPW_36MI_FnIcNJoXM5AxrMFPJk8VWV-sWfdx3prjBZoCF1PVM4LWrl59pb-bzXDlHjlAchHHnbqylw2WFTidvuXJhn_87qoo0xZ_yzydVT1-xIc4XoJJqotQ5IF1EgVSh3Ke-Svxppm0a_0rNjUlo5p67yHq2suvf1XIW8pywCI_D4LAPikwl3ZlH4ccmd9ECy8jhTDPDL2H4Ocv-muI_DjXZMrZ-tgte9MUzmep4aTeW0oRCslr3-QTDxG_lueJFbtvGEdl8NhPRxcVdIE_oKJsTPBDO8A0Xw2gCoGAg8NOYENQ2KRg9XOC6V4j2_QF1mlQJzKqT5BArNIgrBTw1ndDOnduGVHbCimekNazyrXAjtAZZZZUQ7f-t70krM-RHbiZGh4MPaQ3NRGgO0JRQeC0rszTDeZusJOuSptaDtVCiXyozqJ3YRHmmzGuuKR0F1RH4lWe5ecLK6Z5yb836NEQRZ_c_CT7UhnlO22Q-RGoaxxwrXf6fXsErm8XFPYHUAbNHu3h8GKZXUZdnkHOQ0-J5ynM73u2xWg6FPG3PIqMUajxDJYVxs8DhQV7uBVvl00_0MNr_0TcpYbSHZb8mg0MUWChFM9lEYhS0yN-qzvQ3KtH92fJxJr5cf-gTF1511qHtQI8Oihj3stAjcGUym4XAgy149a67yWXM6Ld955g5LnBQhq5tg=w1110-h624-no?authuser=0',
        _fieldList: [
          {
            name: t('healthRecordingsTemplates.systolic'),
            unit: t('healthRecordingsTemplates.mmhg')
          },
          {
            name: t('healthRecordingsTemplates.diastolic'),
            unit: t('healthRecordingsTemplates.mmhg')
          },
          {
            name: t('healthRecordingsTemplates.heartRate'),
            unit: t('healthRecordingsTemplates.bpm')
          }
        ]
      }
    },
    {
      imageid:
        'https://lh3.googleusercontent.com/pw/AM-JKLXh3aZrOZwRk1_72UF3C235QC1V5IJGqhlIvNLDWGHW4egEbmQXaWJ0kkxVwP3vuIYc7O7MDjhMqj6-CH40-LM-RoEYRUMxYZfvAmC-S86cxTCo0Qcdh7g_t1pQrQTsK7AKBLIZblYzxTjLQxZqQ1tI=w1178-h582-no?authuser=0',
      hrName: t('healthRecordingsTemplates.bloodSugarLevel'),
      params: {
        _title: t('healthRecordingsTemplates.bloodSugarLevel'),
        _picture: bloodSugarLevelImage,
        _defaultPictureUri:
          'https://lh3.googleusercontent.com/pw/AM-JKLXh3aZrOZwRk1_72UF3C235QC1V5IJGqhlIvNLDWGHW4egEbmQXaWJ0kkxVwP3vuIYc7O7MDjhMqj6-CH40-LM-RoEYRUMxYZfvAmC-S86cxTCo0Qcdh7g_t1pQrQTsK7AKBLIZblYzxTjLQxZqQ1tI=w1178-h582-no?authuser=0',
        _fieldList: [
          {
            name: t('healthRecordingsTemplates.fpg'),
            unit: t('healthRecordingsTemplates.mgPercent')
          }
        ]
      }
    }
  ];

  return (
    <>
      <ScrollView flex={1}>
        <VStack px={4} flex={1}>
          <FormSubHeader
            headerText={t('healthRecordingsCreate.selectTemplate')}
            mt={4}
          />
          {templates.map((template, i) => (
            <HealthRecordingCard
              key={i}
              backgroundColor="#fff"
              image={template.imageid}
              hrName={template.hrName}
              handlePress={() =>
                navigation.navigate('CustomHealthRecordingScreen', {
                  info: template.params ?? {}
                })
              }
            />
          ))}
          <ExpansibleToggle title={t('healthRecordingsCreate.advanced')}>
            <Button
              variant="outline"
              onPress={() => {
                navigation.navigate('CustomHealthRecordingScreen', {
                  info: {}
                });
              }}>
              <Text display="flex" color={'primary.500'} flexDirection="column">
                {t('healthRecordingsCreate.createCustom')}
              </Text>
            </Button>
          </ExpansibleToggle>
        </VStack>
      </ScrollView>
    </>
  );
};

export default CreateHealthRecordingsScreen;
