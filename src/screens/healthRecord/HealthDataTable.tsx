import { t } from 'i18next';
import moment from 'moment';
import { Icon, ScrollView, Text, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { DataTable } from 'react-native-paper';
import {
  HealthRecordingData,
  HealthRecordingDataRow
} from '../../interfaces/healthRecording';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';
import Spacer from '../../components/atoms/Spacer';

export enum TableMode {
  EDIT = 'EDIT',
  VIEW = 'VIEW'
}

type HealthDataTableProps = {
  mode: TableMode;
  onDeleteRow?: (value: string) => Promise<void>;
};

const HealthDataTable = (props: HealthDataTableProps) => {
  const { mode, onDeleteRow } = props;
  const [page, setPage] = useState<number>(0);

  // Temporary data
  const tempData: HealthRecordingData = {
    tableName: 'Blood Pressure',
    columnNames: ['Systolic', 'Diastolic', 'test'],
    units: ['mmHg', 'mmHg'],
    data: [
      {
        dateTime: '2010-04-10 12:00:00',
        values: ['120', '90', 'test']
      },
      {
        dateTime: '2010-04-19 12:00:00',
        values: ['120', '', 'test']
      },
      {
        dateTime: '2010-04-20 12:00:00',
        values: ['120', '80', 'test']
      },
      {
        dateTime: '2010-04-20 12:00:00',
        values: ['120', '80', 'test']
      },
      {
        dateTime: '2010-04-20 12:00:00',
        values: ['120', '80', 'test']
      },
      {
        dateTime: '2010-04-20 12:00:00',
        values: ['120', '80', 'test']
      },
      {
        dateTime: '2010-04-20 12:00:00',
        values: ['120', '80', 'test']
      },
      {
        dateTime: '2010-04-20 12:00:00',
        values: ['120', '80', 'test']
      }
    ]
  };

  const [currentData, setCurrentData] = useState<HealthRecordingDataRow[]>([]);

  useEffect(() => {
    setPage(0);
  }, []);

  useEffect(() => {
    setCurrentData(tempData.data.slice(page * 5, (page + 1) * 5));
  }, [page]);

  if (currentData.length <= 0)
    return (
      <View justifyContent="center">
        <Spacer />
        <Text textAlign="center">{t('healthRecording.noData')}</Text>
      </View>
    );
  return (
    <View>
      <ScrollView horizontal>
        <View height={300}>
          <DataTable>
            <View>
              <DataTable.Header>
                {mode === TableMode.EDIT && <View width={12} />}
                <View width={90}>
                  <DataTable.Title>{t('healthRecording.date')}</DataTable.Title>
                </View>
                <DataTable.Title>{t('healthRecording.time')}</DataTable.Title>
                {tempData.columnNames.map((column, index) => (
                  <View width={82} key={index}>
                    <DataTable.Title numeric key={index}>
                      {column}
                    </DataTable.Title>
                  </View>
                ))}
              </DataTable.Header>
            </View>
            <View>
              {/* <Text>{t('healthRecording.noData')}</Text> */}
              {currentData.map((row, index) => (
                <DataTable.Row key={index}>
                  {mode === TableMode.EDIT && (
                    <View width={12}>
                      <DataTable.Cell centered>
                        <TouchableOpacity
                          onPress={() => {
                            if (onDeleteRow) onDeleteRow(row.dateTime);
                          }}>
                          <Icon
                            as={MaterialIcons}
                            name="clear"
                            size="7"
                            opacity={30}
                          />
                        </TouchableOpacity>
                      </DataTable.Cell>
                    </View>
                  )}
                  <View width={90}>
                    <DataTable.Cell>{`${moment(row.dateTime).format(
                      'DD/MM/YYYY'
                    )}`}</DataTable.Cell>
                  </View>
                  <DataTable.Cell>{`${moment(row.dateTime).format(
                    'LT'
                  )}`}</DataTable.Cell>
                  {row.values.map((value, valueIndex) => (
                    <View width={82} key={valueIndex}>
                      <DataTable.Cell numeric>{value}</DataTable.Cell>
                    </View>
                  ))}
                </DataTable.Row>
              ))}
            </View>
          </DataTable>
        </View>
      </ScrollView>
      <View>
        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(tempData.data.length / 5)}
          onPageChange={(pageIndex) => setPage(pageIndex)}
          label={`${(page + 1) % 5} - ${((page + 1) % 5) + 4} ${t('of')} ${
            tempData.data.length
          }`}
          numberOfItemsPerPage={5}
        />
      </View>
    </View>
  );
};
export default HealthDataTable;
