import React, { useEffect, useState } from 'react';
import { View, Text, Icon, Box, Pressable } from 'native-base';
import { StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { getFormattedDate } from '../../utils/getFormattedDate';
import { useSettings } from '../../hooks/useSettings';
import { useTranslation } from 'react-i18next';

type HistoryCardProps = {
  date: string | Date;
  time: string;
  score: string;
};

const ViewHistoryCard = ({ date, time, score }: HistoryCardProps) => {
  const { language } = useSettings();
  const { t } = useTranslation();

  const scoreSplit = score.split('/')

  const handleScore = () => {
    const scoreSplit = score.split('/')
    if(parseInt(scoreSplit[0])/parseInt(scoreSplit[1]) < 0.5) return '#C2410C';
    return '#005DB4'
  }
  return (
    <Pressable
      onPress={() => {
        console.log('view details');
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
        <View flexDir="row">
          <View width="30%">
            <Text
              ml="2"
              flex={1}
              flexWrap="wrap"
              fontSize="15"
              fontWeight="bold"
              numberOfLines={1}>
              {getFormattedDate(new Date(date), language)}
            </Text>
          </View>
          <View
            flexDir="row"
            justifyContent="space-between"
            width="70%"
            alignItems="center">
            <Text
              flex={1}
              flexWrap="wrap"
              fontSize="15"
              fontWeight="bold"
              numberOfLines={1}>
              {time}
            </Text>
            <Text mr="2" fontSize="15" color={handleScore()}>
              {score}
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
