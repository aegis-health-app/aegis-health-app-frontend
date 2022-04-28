import { CheckIcon, Select, View, VStack, Text } from 'native-base';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dataset } from 'react-native-chart-kit/dist/HelperTypes';
import { DataTable } from 'react-native-paper';
import Spacer from '../../components/atoms/Spacer';
import { client } from '../../config/axiosConfig';
import {
  chartConfig,
  TimeFrame
} from '../../constants/HealthRecordingConstants';
import { CaretakerContext } from '../../contexts/CaretakerContext';
import { UserContext } from '../../contexts/UserContext';
import { useTimeFrameOption } from '../../hooks/useTimeFrameOption';
import { HealthRecordAnalytic } from '../../interfaces/healthRecording';
import { getPeriodLable } from '../../utils/module/healthRecord';

type Props = {
  hrName: string;
  columnName: string;
  unit: string;
};

const HealthRecordChart = (props: Props) => {
  const { hrName, columnName, unit } = props;
  const screenWidth = Dimensions.get('window').width;
  const { t } = useTranslation();
  const timeFrameOption = useTimeFrameOption();
  const { user } = useContext(UserContext);
  const { currentElderlyUid } = useContext(CaretakerContext);

  const [labels, setLabels] = useState<string[]>([]);
  const [datasets, setDatasets] = useState<Dataset[]>();
  const [data, setData] = useState<HealthRecordAnalytic>();
  const [timeFrame, setTimeFrame] = useState<TimeFrame>(TimeFrame.WEEK);

  const getData = async (
    hrName: string,
    columnName: string,
    timeFrame: string
  ) => {
    const result = await client.get(
      `healthRecord/analytics/${
        user?.isElderly ? '' : `${currentElderlyUid}/`
      }${hrName}/${columnName}/${timeFrame}`
    );
    const data = result.data as HealthRecordAnalytic;
    setData(data);
    const datapoints = data.data.map((item) => {
      return item.value;
    });
    if (datapoints && timeFrame)
      setLabels(getPeriodLable(data.data, timeFrame as TimeFrame));
    setDatasets([{ data: datapoints }]);
  };

  useEffect(() => {
    getData(hrName, columnName, timeFrame);
  }, [hrName, columnName, timeFrame]);
  return (
    <View>
      <VStack space={2} px={4} alignItems="center">
        <View flexDirection="row" justifyContent="space-between">
          <View
            alignItems="center"
            justifyContent="space-between"
            width="full"
            flexDirection="row">
            <View
              flexDirection="row"
              justifyItems="flex-end"
              alignItems="flex-end">
              <Text fontSize="lg">{columnName}</Text>
              <Text fontSize="md" color="muted.500">{` (${unit})`}</Text>
            </View>
            <View width="1/4">
              <Select
                selectedValue={timeFrame}
                accessibilityLabel="Choose Service"
                placeholder="Year"
                _selectedItem={{
                  bg: 'teal.600',
                  endIcon: <CheckIcon size="5" />
                }}
                mt={1}
                onValueChange={(itemValue) =>
                  setTimeFrame(itemValue as TimeFrame)
                }>
                {timeFrameOption.map((option, index) => {
                  return (
                    <Select.Item
                      key={index}
                      label={option.label}
                      value={option.value}
                    />
                  );
                })}
              </Select>
            </View>
          </View>
        </View>
        {datasets && (
          <View mx={4}>
            <LineChart
              style={{ ...styles.card, paddingVertical: 4 }}
              data={{ labels: labels, datasets: datasets }}
              width={screenWidth - 32}
              height={220}
              chartConfig={chartConfig}
            />
          </View>
        )}
      </VStack>
      <Spacer />
      <View style={styles.card} bgColor="white" mx={4}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>{t('analytics.value')}</DataTable.Title>
            <DataTable.Title>{t('analytics.max')}</DataTable.Title>
            <DataTable.Title>{t('analytics.mean')}</DataTable.Title>
            <DataTable.Title>{t('analytics.min')}</DataTable.Title>
          </DataTable.Header>
          <DataTable.Row>
            <DataTable.Cell>{data?.columnName}</DataTable.Cell>
            <DataTable.Cell>{data?.analyticData?.max}</DataTable.Cell>
            <DataTable.Cell>{data?.analyticData?.mean}</DataTable.Cell>
            <DataTable.Cell>{data?.analyticData?.min}</DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </View>
      <Spacer />
    </View>
  );
};

export default HealthRecordChart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  wrapper: {
    borderBottomColor: 'black',
    borderBottomWidth: 2
  },
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    borderRadius: 6
  }
});
