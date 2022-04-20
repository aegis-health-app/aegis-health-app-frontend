import React from 'react';
import { View, Text, Pressable } from 'native-base';
import { StyleSheet } from 'react-native';
import {
  getFormattedDateLong,
  getFormattedTime
} from '../../utils/getFormattedDate';
import { useSettings } from '../../hooks/useSettings';
import { useTranslation } from 'react-i18next';
import { RootStackParamList } from '../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

type HistoryCardProps = {
  date: string | Date;
};

const ViewHistoryCard = ({ date }: HistoryCardProps) => {
  const { language } = useSettings();
  const { t } = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <Pressable
      onPress={() => {
        navigation.navigate('ViewHistoryDetailsScreen');
      }}>
      <View
        flexDir="column"
        my={1.5}
        width="93%"
        p={1}
        px={2}
        py={3.5}
        style={styles.card}
        bgColor="white">
        <View flexDir="row" justifyContent="space-between">
          <View>
            <Text
              ml="2"
              flex={1}
              flexWrap="wrap"
              fontSize="15"
              fontWeight="bold"
              numberOfLines={1}>
              {getFormattedDateLong(new Date(date), language)}
            </Text>
          </View>
          <View
            flexDir="row"
            justifyContent="space-between"
            alignItems="center">
            <Text mr="2" fontSize="15" fontWeight="bold">
              {getFormattedTime(new Date(date))}
            </Text>
          </View>
        </View>
        <View ml="2" mt="1">
          <Text
            letterSpacing="0.25"
            fontWeight="bold"
            fontSize="15"
            color="#1D84DF">
            {t('viewHistory.viewDetails')}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ViewHistoryCard;

const styles = StyleSheet.create({
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
