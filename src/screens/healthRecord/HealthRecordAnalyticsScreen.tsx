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
  const { currentHrName, healthTable } = useContext(HealthRecordContext);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    navigation.setOptions({ title: currentHrName });
  }, []);

  return (
    <SafeAreaView edges={['right', 'left']}>
      <ScrollView>
        <Spacer />
        <View>
          {healthTable?.columnNames.map((column, index) => (
            <HealthRecordChart
              key={index}
              hrName={healthTable.tableName}
              columnName={column}
            />
          ))}
        </View>
        <Spacer />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HealthRecordAnalyticsScreen;
