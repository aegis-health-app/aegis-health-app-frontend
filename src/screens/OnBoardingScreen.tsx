import { FlatList, Image, Text, View } from 'native-base';
import { Animated, StyleSheet } from 'react-native';
import React, { useState, useRef } from 'react';
import OnBoardingItem from '../components/organisms/OnBoardingItem';
import { onBoardingSlides } from '../utils/onBoarding/onBoarding';
import OnBoardingPaginator from '../components/molecules/onBoardingPaginator';
import OnBoardingLanguageSelector from '../components/molecules/OnBoardingLanguageSelector';

const OnBoardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  return (
    <View flex={1} justifyContent="center" alignItems="center">
      <Image
        source={require('../assets/images/aegis_logo.png')}
        width="24"
        style={styles.logo}
        m={6}
        alt="Aegis Logo"
      />
      <FlatList
        data={onBoardingSlides}
        renderItem={({ item }) => <OnBoardingItem slide={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(_, key) => key.toString()}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false
          }
        )}
        scrollEventThrottle={32}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
      />
      {currentIndex === 0 ? (
        <OnBoardingLanguageSelector />
      ) : (
        <OnBoardingPaginator
          data={onBoardingSlides}
          scrollX={scrollX}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      )}
    </View>
  );
};

export default OnBoardingScreen;

const styles = StyleSheet.create({
  logo: {
    resizeMode: 'contain',
    position: 'absolute',
    top: -220,
    left: 20
  }
});
