import moment from 'moment';
import { CheckIcon, HStack, Select, View, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dataset } from 'react-native-chart-kit/dist/HelperTypes';
import { Text } from 'react-native-svg';
import { client } from '../../config/axiosConfig';
import {
  chartConfig,
  timeFrameOption
} from '../../constants/HealthRecordingConstants';
import { HealthRecordAnalytic } from '../../interfaces/healthRecording';

type Props = {
  hrName: string;
  columnName: string;
  timeFrame: string;
};

const HealthRecordChart = (props: Props) => {
  const { hrName, columnName, timeFrame } = props;
  const screenWidth = Dimensions.get('window').width;

  const [service, setService] = useState('');
  const [labels, setLabels] = useState<string[]>([]);
  const [datasets, setDatasets] = useState<Dataset[]>();
  const [data, setData] = useState<HealthRecordAnalytic>();

  const getData = async (
    hrName: string,
    columnName: string,
    timeFrame: string
  ) => {
    try {
      const result = await client.get(
        `healthRecord/analytics/${hrName}/${columnName}/${timeFrame}`
      ); //ความดัน/Lower/year
      const data = result.data as HealthRecordAnalytic;
      setData(data);
      setLabels(
        data.data.map((label) => {
          return moment(label.dateTime).format('M/D');
        })
      );
      const datapoints = data.data.map((item) => {
        return item.value;
      });
      setDatasets([{ data: datapoints }]);
    } catch (error) {
      console.log(error);
    }
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
            <Text fontSize="lg">Filler</Text>
            <View width="1/4">
              <Select
                selectedValue={service}
                accessibilityLabel="Choose Service"
                placeholder="Year"
                _selectedItem={{
                  bg: 'teal.600',
                  endIcon: <CheckIcon size="5" />
                }}
                mt={1}
                onValueChange={(itemValue) => setService(itemValue)}>
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
            {/* </Box> */}
          </View>
        </View>
        {datasets && (
          <View>
            <LineChart
              data={{ labels: labels, datasets: datasets }}
              width={screenWidth - 16}
              height={220}
              chartConfig={chartConfig}
            />
            <Text>asdf</Text>
          </View>
        )}

        <VStack w="full" space={1} bg="amber.100" height={300}>
          <View style={styles.wrapper}>
            <HStack justifyContent="space-evenly">
              <Text>Value</Text>
              <Text>Max</Text>
              <Text>Min</Text>
              <Text>Mean</Text>
            </HStack>
          </View>
          {/* <Divider my={0} bgColor='#000' /> */}
          <HStack justifyContent="space-evenly">
            <Text>{data?.columnName}</Text>
            <Text>{data?.analyticData?.max}</Text>
            <Text>{data?.analyticData?.mean}</Text>
            <Text>{data?.analyticData?.min}</Text>
          </HStack>
        </VStack>
      </VStack>
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
  }
});
