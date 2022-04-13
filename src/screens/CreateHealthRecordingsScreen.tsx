import React, { useContext, useState } from 'react';
import {
  Button,
  ChevronDownIcon,
  ChevronUpIcon,
  ScrollView,
  Text,
  View,
  VStack
} from 'native-base';
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
import Collapsible from 'react-native-collapsible';

const CreateHealthRecordingsScreen = () => {
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { user } = useContext(UserContext);
  const [templates, setTemplates] = useState<HealthRecording[]>([]);

  const { currentElderlyUid } = useContext(HealthRecordContext);

  const [collapsed, setCollapsed] = useState(true);
  const toggleExpanded = () => {
    setCollapsed(!collapsed);
  };

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
          <TouchableOpacity onPress={toggleExpanded}>
            <View mt={4} style={styles.advanced}>
              <FormSubHeader
                headerText={t('healthRecordingsCreate.advanced')}
              />
              {collapsed ? (
                <ChevronDownIcon name="chevron-down" size="9" />
              ) : (
                <ChevronUpIcon name="chevron-down" size="9" />
              )}
            </View>
          </TouchableOpacity>
          <Collapsible duration={0} collapsed={collapsed} align="center">
            <Button
              variant="outline"
              onPress={() => {
                navigation.navigate('CreateHealthRecordingsScreen');
              }}>
              <Text display="flex" color={'primary.500'} flexDirection="column">
                {t('healthRecordingsCreate.createCustom')}
              </Text>
            </Button>
          </Collapsible>
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
    marginBottom: 10
  }
});

export default CreateHealthRecordingsScreen;
