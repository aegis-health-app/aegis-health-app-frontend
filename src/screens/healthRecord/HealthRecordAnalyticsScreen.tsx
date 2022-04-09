import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScrollView, View } from 'native-base';
import React, { useContext, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Spacer from '../../components/atoms/Spacer';
import { HealthRecordContext } from '../../contexts/HealthRecordContext';
import { RootStackParamList } from '../../navigation/types';
import HealthRecordChart from './HealthRecordChart';

const HealthRecordAnalyticsScreen = () => {
  const { currentHrName } = useContext(HealthRecordContext);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    navigation.setOptions({ title: currentHrName });
    // getData();
  }, []);

  return (
    <SafeAreaView edges={['right', 'left']}>
      <ScrollView>
        <Spacer />
        <View>
          <HealthRecordChart
            hrName="ความดัน"
            columnName="Lower"
            timeFrame="YEAR"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HealthRecordAnalyticsScreen;
