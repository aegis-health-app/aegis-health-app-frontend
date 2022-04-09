import { Text, Icon, HStack, View, Divider } from 'native-base';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import { useWindowDimensions } from 'react-native';
import { Emotion } from '../../dto/modules/emotionTracking.dto';
import { useTranslation } from 'react-i18next';

type EmotionalHistoryItemProps = {
  date: Date;
  emotionalLevel: Emotion;
};
const EmotionalHistoryItem = ({
  date,
  emotionalLevel
}: EmotionalHistoryItemProps) => {
  const { width } = useWindowDimensions();
  const { t } = useTranslation();

  function EmotionIcon() {
    if (emotionalLevel === 'BAD') {
      return (
        <Icon
          as={MaterialCommunityIcons}
          name="emoticon-sad-outline"
          size="12"
          color="black"
        />
      );
    } else if (emotionalLevel === 'HAPPY') {
      return (
        <Icon
          as={MaterialCommunityIcons}
          name="emoticon-happy-outline"
          size="12"
          color="black"
        />
      );
    } else if (emotionalLevel === 'NEUTRAL') {
      return (
        <Icon
          as={MaterialCommunityIcons}
          name="emoticon-neutral-outline"
          size="12"
          color="black"
        />
      );
    } else if (emotionalLevel === 'NA') {
      return (
        <Text fontWeight="bold" fontSize="2xl">
          {t('emotionalRecord.NA')}
        </Text>
      );
    } else {
      return null;
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
          <Text fontSize="md">{moment(date).format('DD/MM/YYYY')}</Text>
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
