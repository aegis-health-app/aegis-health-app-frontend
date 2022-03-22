import { Button, FlatList, Image, View, Text } from 'native-base';
import { Animated, StyleSheet } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { OnBoardingSLide } from '../dto/onBoarding';
import OnBoardingPaginator from '../components/molecules/onBoardingPaginator';
import OnBoardingLanguageSelector from '../components/molecules/OnBoardingLanguageSelector';
import { useTranslation } from 'react-i18next';
import OnBoardingItem from '../components/organisms/OnBoardingItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OnBoardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const { t } = useTranslation();
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const onBoardingSlides: OnBoardingSLide[] = [
    {
      page: 1,
      title: t('109'),
      desc: t('110'),
      image: require('../assets/images/landing/1.png')
    },
    {
      page: 2,
      title: t('91'),
      desc: t('92'),
      image: require('../assets/images/landing/2.png')
    },
    {
      page: 3,
      title: t('93'),
      desc: t('94'),
      image: require('../assets/images/landing/3.png')
    },
    {
      page: 4,
      title: t('95'),
      desc: t('96'),
      image: require('../assets/images/landing/4.png')
    },
    {
      page: 5,
      title: t('97'),
      desc: t('98'),
      image: require('../assets/images/landing/5.png')
    },
    {
      page: 6,
      title: t('99'),
      desc: t('100'),
      image: require('../assets/images/landing/6.png')
    },
    {
      page: 7,
      title: t('101'),
      desc: t('102'),
      image: require('../assets/images/landing/7.png')
    },
    {
      page: 8,
      title: t('103'),
      desc: t('104'),
      image: require('../assets/images/landing/8.png')
    }
  ];

  const scrollTo = async (index: number) => {
    if (index < onBoardingSlides.length && slidesRef.current) {
      // @ts-ignore
      slidesRef.current.scrollToIndex({ index: index });
    } else {
      try {
        await AsyncStorage.setItem('@viewedOnboarding', 'true');
      } catch (error) {
        console.log('Error @setItem: ', error);
      }
    }
  };

  useEffect(() => {
    scrollTo(currentIndex);
  }, [currentIndex]);

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
        mt={16}
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
      {currentIndex === 0 && (
        <View h={40} mb={10}>
          <OnBoardingLanguageSelector />
          <View px={5} mt={4}>
            <Button width="100%" onPress={() => scrollTo(1)}>
              {t('30')}
            </Button>
          </View>
        </View>
      )}
      {currentIndex > 0 && currentIndex < onBoardingSlides.length - 1 && (
        <View h={40} mb={10}>
          <OnBoardingPaginator
            data={onBoardingSlides}
            scrollX={scrollX}
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
        </View>
      )}
      {currentIndex === onBoardingSlides.length - 1 && (
        <View px={6} mb={10}>
          <Button colorScheme="primary" width="80" size="lg">
            <Text bold fontWeight="600" fontSize="lg" color="#fff">
              {t('113')}
            </Text>
          </Button>
        </View>
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
    left: 0
  }
});
