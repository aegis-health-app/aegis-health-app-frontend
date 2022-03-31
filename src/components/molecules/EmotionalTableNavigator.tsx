import React from 'react';
import { View, Text, HStack, Icon } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';

type Props = {
  currIndex: number;
  setCurrIndex: (val: number) => void;
  maxIndex: number;
};

const EmotionalTableNavigator = ({
  currIndex,
  setCurrIndex,
  maxIndex
}: Props) => {
  function handlePressBack() {
    if (currIndex <= 1) {
      return;
    }

    setCurrIndex(currIndex - 1);
  }

  const { t } = useTranslation();

  return (
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
      </HStack>
    </View>
  );
};

export default EmotionalTableNavigator;
