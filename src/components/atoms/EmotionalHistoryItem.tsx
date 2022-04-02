import { Text, Icon, HStack, View, Divider } from 'native-base';
import React from 'react';
import { Emotion } from '../../dto/modules/emotionRecord';
import Fontisto from 'react-native-vector-icons/Fontisto';
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
      return <Icon as={Fontisto} name="frowning" size="9" color="black" />;
    } else if (emotion === 'HAPPY') {
      return <Icon as={Fontisto} name="smiley" size="9" color="black" />;
    } else if (emotion === 'NEUTRAL') {
      return <Icon as={Fontisto} name="neutral" size="9" color="black" />;
    } else {
      return (
        <Text fontWeight="semibold" fontSize="xl">
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
          <Text fontSize="md">{moment(date).format('D/M/yyyy')}</Text>
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
