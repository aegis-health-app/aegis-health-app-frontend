import React from 'react';
import { StyleSheet, useWindowDimensions, Animated } from 'react-native';
import { View, Button, HStack } from 'native-base';
import { useTranslation } from 'react-i18next';

type OnBoardingPaginatorProps = {
  data: any[];
  scrollX: any;
  currentIndex: number;
  setCurrentIndex: (val: number) => void;
};

const OnBoardingPaginator = ({
  data,
  scrollX,
  currentIndex,
  setCurrentIndex
}: OnBoardingPaginatorProps) => {
  const { width } = useWindowDimensions();
  const { t } = useTranslation();

  function onPressBack() {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  }

  function onPressNext() {
    setCurrentIndex(currentIndex + 1);
  }

  return (
    <HStack
      alignItems="center"
      justifyContent="space-between"
      mb={6}
      px={4}
      w={width}>
      <Button
        size="lg"
        variant="outline"
        colorScheme="primary"
        onPress={onPressBack}>
        {t('107')}
      </Button>
      <View flexDir="row">
        {data.map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [10, 20, 10],
            extrapolate: 'clamp'
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp'
          });

          return (
            <Animated.View
              style={[styles.dot, { width: dotWidth, opacity }]}
              key={i.toString()}
            />
          );
        })}
      </View>
      <Button size="lg" colorScheme="primary" onPress={onPressNext}>
        {t('108')}
      </Button>
    </HStack>
  );
};

export default OnBoardingPaginator;

const styles = StyleSheet.create({
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: '#1D84DF',
    marginHorizontal: 4
  }
});
