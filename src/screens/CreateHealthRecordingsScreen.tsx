import React from 'react';
import { ScrollView, View, VStack } from 'native-base';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import images from '../assets/images';
import HealthRecordingCard from '../components/molecules/HealthRecordingCard';
import FormSubHeader from '../components/atoms/FormSubHeader';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { HealthRecording } from '../interfaces/HealthRecording';

const CreateHealthRecordingsScreen = () => {
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const templates: HealthRecording[] = [
    {
      hrName: 'healthRecordingsTemplates.bloodPressure',
      imageId: ''
    },
    {
      hrName: 'healthRecordingsTemplates.bloodSugarLevel',
      imageId: ''
    },
    {
      hrName: 'healthRecordingsTemplates.heartRate',
      imageId: ''
    },
    {
      hrName: 'healthRecordingsTemplates.fever',
      imageId: ''
    },
    {
      hrName: 'healthRecordingsTemplates.hdlldl',
      imageId: ''
    },
    {
      hrName: 'healthRecordingsTemplates.headache',
      imageId: ''
    },
    {
      hrName: 'healthRecordingsTemplates.constipation',
      imageId: ''
    },
    {
      hrName: 'healthRecordingsTemplates.anorexia',
      imageId: ''
    },
    {
      hrName: 'healthRecordingsTemplates.insomnia',
      imageId: ''
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
              image={images.selfCare}
              header={t(template.hrName)}
              handlePress={() => console.log('card pressed')}
            />
          ))}
          <TouchableOpacity onPress={() => console.log('advanced')}>
            <View style={styles.advanced} mt={4} py={2}>
              <FormSubHeader
                headerText={t('healthRecordingsCreate.advanced')}
              />
              <FormSubHeader headerText={'arrow'} />
            </View>
          </TouchableOpacity>
        </VStack>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  advanced: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 100
  }
});

export default CreateHealthRecordingsScreen;
