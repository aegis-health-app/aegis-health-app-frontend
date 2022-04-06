import { Text, Icon, HStack, View, Divider } from 'native-base';
import React from 'react';
import { Emotion } from '../../dto/modules/emotionRecord';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import { useWindowDimensions } from 'react-native';

type EmotionalHistoryItemProps = {
  date: Date;
  emotion: Emotion;
};
const EmotionalHistoryItem = ({ date, emotion }: EmotionalHistoryItemProps) => {
  const { width } = useWindowDimensions();

  function EmotionIcon() {
    if (emotion === 'BAD') {
      return (
        <Icon
          as={MaterialCommunityIcons}
          name="emoticon-sad-outline"
          size="12"
          color="black"
        />
      );
    } else if (emotion === 'HAPPY') {
      return (
        <Icon
          as={MaterialCommunityIcons}
          name="emoticon-happy-outline"
          size="12"
          color="black"
        />
      );
    } else if (emotion === 'NEUTRAL') {
      return (
        <Icon
          as={MaterialCommunityIcons}
          name="emoticon-neutral-outline"
          size="12"
          color="black"
        />
      );
    } else {
      return (
        <Text fontWeight="bold" fontSize="2xl">
          N/A
        </Text>
      );
    }
  }

  return (
    <View>
      <HStack
        w={width}
        color="#fff"
        alignItems="center"
        justifyContent="space-between">
        <View w={width / 2} alignItems="center">
          <Text fontSize="md">{moment(date).format('L')}</Text>
        </View>
        <View
          w={width / 2}
          alignItems="center"
          minH={12}
          justifyContent="center">
          <EmotionIcon />
        </View>
      </HStack>
      <Divider />
    </View>
  );
};

export default EmotionalHistoryItem;
