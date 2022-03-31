import React from 'react';
import { View, Text, HStack, Icon } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';

type Props = {
  currPageIndex: number;
  setCurrPageIndex: (val: number) => void;
  maxPageIndex: number;
};

const EmotionalTableNavigator = ({
  currPageIndex,
  setCurrPageIndex,
  maxPageIndex
}: Props) => {
  function handlePressBack() {
    if (currPageIndex > 0) {
      setCurrPageIndex(currPageIndex - 1);
    }
  }

  function handlePressNext() {
    if (currPageIndex < maxPageIndex) {
      setCurrPageIndex(currPageIndex + 1);
    }
  }

  const { t } = useTranslation();

  return (
<<<<<<< HEAD
    <View alignSelf="flex-end" alignItems="center" w="40">
      <HStack space={2}>
        <View w={8}>
          {currPageIndex > 0 && (
            <Icon
              onPress={handlePressBack}
              as={MaterialIcons}
              name="keyboard-arrow-left"
              size={8}
              color="black"
            />
          )}
        </View>
        <Text fontSize="lg">{currPageIndex + 1}</Text>
        <Text fontSize="lg">{t('emotionalRecord.of')}</Text>
        <Text fontSize="lg">{maxPageIndex}</Text>
        <View w={8}>
          {currPageIndex + 1 !== maxPageIndex && (
            <Icon
              onPress={handlePressNext}
              as={MaterialIcons}
              name="keyboard-arrow-right"
              size={8}
              color="black"
            />
          )}
        </View>
=======
    <View alignSelf="flex-end" alignItems="center" mx={4} mb={4}>
      <HStack space={2}>
        {currIndex > 1 && (
          <Icon
            onPress={handlePressBack}
            as={MaterialIcons}
            name="keyboard-arrow-left"
            size={8}
            color="black"
          />
        )}
        <Text fontSize="lg">{currIndex}</Text>
        <Text fontSize="lg">{t('emotionalRecord.of')}</Text>
        <Text fontSize="lg">{maxIndex}</Text>
        {currIndex !== maxIndex && (
          <Icon
            as={MaterialIcons}
            name="keyboard-arrow-right"
            size={8}
            color="black"
          />
        )}
>>>>>>> 15fa944 (feat: create UI & mock data for emotion history)
      </HStack>
    </View>
  );
};

export default EmotionalTableNavigator;
