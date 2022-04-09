import React, { useContext, useState } from 'react';
import { ChevronDownIcon, ScrollView, View, VStack } from 'native-base';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import HealthRecordingCard from '../components/molecules/HealthRecordingCard';
import FormSubHeader from '../components/atoms/FormSubHeader';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { HealthRecording } from '../interfaces/HealthRecording';
import useAsyncEffect from '../hooks/useAsyncEffect';
import { UserContext } from '../contexts/UserContext';
import { client } from '../config/axiosConfig';
import { HealthRecordContext } from '../contexts/HealthRecordContext';

const CreateHealthRecordingsScreen = () => {
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { user } = useContext(UserContext);
  const [templates, setTemplates] = useState<HealthRecording[]>([]);

  const { currentElderlyUid } = useContext(HealthRecordContext);

  useAsyncEffect(async () => {
    const fetchData = async () => {
      if (user?.isElderly) {
        try {
          const res = await client.get('/healthrecord/getAll/elderly');
          setTemplates(res.data.listHealthRecord);
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          const payload = {
            elderlyuid: currentElderlyUid
          };
          const res = await client.post(
            '/healthrecord/getAll/caretaker',
            payload
          );
          setTemplates(res.data.listHealthRecord);
        } catch (err) {
          console.log(err);
        }
      }
    };
    fetchData();
  }, [user]);

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
              handlePress={() => console.log('card pressed')}
            />
          ))}
          <TouchableOpacity
            onPress={() => navigation.navigate('CustomHealthRecordingScreen')}>
            <View style={styles.advanced} mt={4} py={2}>
              <FormSubHeader
                headerText={t('healthRecordingsCreate.advanced')}
              />
              <ChevronDownIcon name="chevron-down" size="9" />
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
