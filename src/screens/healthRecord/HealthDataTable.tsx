import { t } from 'i18next';
import moment from 'moment';
import { Center, Icon, ScrollView, Text, View } from 'native-base';
import React, { useEffect, useState } from 'react';
import { DataTable } from 'react-native-paper';
import {
  HealthRecordingData,
  HealthRecordingDataRow
} from '../../interfaces/healthRecording';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native';

export enum TableMode {
  EDIT = 'EDIT',
  VIEW = 'VIEW'
}

type HealthDataTableProps = {
  healthData?: HealthRecordingData;
  mode: TableMode;
  onDeleteRow?: (value: string) => Promise<void>;
};

const HealthDataTable = (props: HealthDataTableProps) => {
  const { healthData, mode, onDeleteRow } = props;
  const [page, setPage] = useState<number>(0);
  const [currentData, setCurrentData] = useState<HealthRecordingDataRow[]>([]);

  useEffect(() => {
    setPage(0);
  }, []);

  useEffect(() => {
    if (!healthData) return;
    setCurrentData(healthData.data.slice(page * 5, (page + 1) * 5));
  }, [page, healthData]);

  return (
    <View>
      <ScrollView horizontal>
        <View minWidth="100%" height={300}>
          <DataTable>
            <View>
              <DataTable.Header>
                {mode === TableMode.EDIT && <View width={12} />}
                <View width={90}>
                  <DataTable.Title>{t('healthRecording.date')}</DataTable.Title>
                </View>
                <DataTable.Title>{t('healthRecording.time')}</DataTable.Title>
                {healthData &&
                  healthData.columnNames.map((column, index) => (
                    <View width={82} key={index}>
                      <DataTable.Title numeric key={index}>
                        {column}
                      </DataTable.Title>
                    </View>
                  ))}
              </DataTable.Header>
            </View>
            <View>
              {currentData.length <= 0 && (
                <View mt={3}>
                  <Center>
                    <Text>{t('healthRecording.noData')}</Text>
                  </Center>
                </View>
              )}
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
                            onPress={() => {
                              if (onDeleteRow) onDeleteRow(row.dateTime);
                            }}
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
        {healthData && (
          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(healthData.data.length / 5)}
            onPageChange={(pageIndex) => setPage(pageIndex)}
            label={`${(page + 1) % 5} - ${((page + 1) % 5) + 4} ${t('of')} ${
              healthData.data.length
            }`}
            numberOfItemsPerPage={5}
          />
        )}
      </View>
    </View>
  );
};
export default HealthDataTable;
