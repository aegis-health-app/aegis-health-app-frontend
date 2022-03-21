import { View, Text, Image, VStack } from 'native-base';
import React from 'react';
import { useWindowDimensions, StyleSheet } from 'react-native';
import { OnBoardingSLide } from '../../utils/onBoarding/onBoarding';

type OnBoardingItemProps = {
  slide: OnBoardingSLide;
};

const OnBoardingItem = ({ slide }: OnBoardingItemProps) => {
  const { width } = useWindowDimensions();

  return (
    <View
      w={width}
      flex={1}
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
      <VStack mt={12} px={8} space={4}>
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
