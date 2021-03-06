import { View, Text, Image, VStack } from 'native-base';
import React from 'react';
import { useWindowDimensions, StyleSheet } from 'react-native';
import { OnBoardingSLide } from '../../interfaces/onBoarding';

type OnBoardingItemProps = {
  slide: OnBoardingSLide;
};

const OnBoardingItem = ({ slide }: OnBoardingItemProps) => {
  const { width } = useWindowDimensions();

  return (
    <View
      w={width}
      height="500"
      justifyContent="center"
      alignItems="center"
      position="relative">
      <View width="full" height="64">
        <Image
          source={slide.image}
          width={width}
          style={styles.image}
          alt={`On-boarding page ${slide.page} image`}
          mb={6}
        />
      </View>
      <VStack px={8} space={4}>
        <Text
          fontWeight="bold"
          fontSize="2xl"
          textAlign="center"
          color="primary.500">
          {slide.title}
        </Text>
        <Text fontWeight="400" fontSize="md" textAlign="center">
          {slide.desc}
        </Text>
      </VStack>
    </View>
  );
};

export default OnBoardingItem;

const styles = StyleSheet.create({
  image: {
    resizeMode: 'contain'
  }
});
