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
    if (currPageIndex <= 1) {
      return;
    }

    setCurrPageIndex(currPageIndex - 1);
  }

  function handlePressNext() {
    if (currPageIndex < maxPageIndex) {
      setCurrPageIndex(currPageIndex + 1);
    }
  }

  const { t } = useTranslation();

  return (
    <View
      alignSelf="flex-end"
      alignItems="center"
      mb={4}
      w="40"
      bgColor="amber.300">
      <HStack space={2}>
        <View w={8}>
          {currPageIndex > 1 && (
            <Icon
              onPress={handlePressBack}
              as={MaterialIcons}
              name="keyboard-arrow-left"
              size={8}
              color="black"
            />
          )}
        </View>
        <Text fontSize="lg">{currPageIndex}</Text>
        <Text fontSize="lg">{t('emotionalRecord.of')}</Text>
        <Text fontSize="lg">{maxPageIndex}</Text>
        <View w={8}>
          {currPageIndex !== maxPageIndex && (
            <Icon
              onPress={handlePressNext}
              as={MaterialIcons}
              name="keyboard-arrow-right"
              size={8}
              color="black"
            />
          )}
        </View>
      </HStack>
    </View>
  );
};

export default EmotionalTableNavigator;
