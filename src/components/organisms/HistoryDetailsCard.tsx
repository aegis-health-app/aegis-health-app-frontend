import React from 'react';
import { View, Text, Image } from 'native-base';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import FallbackImage from '../molecules/FallbackImage';

type HistoryCardProps = {
  imageId?: string;
  question: string;
  choice1?: string;
  choice2?: string;
  choice3?: string;
  choice4?: string;
  isCorrect?: boolean;
  elderlyAnswer?: string;
  correctAnswer?: string;
  index: number;
};

const ViewHistoryDetailsCard = ({
  imageId,
  question,
  choice1,
  choice2,
  choice3,
  choice4,
  isCorrect,
  elderlyAnswer,
  correctAnswer,
  index
}: HistoryCardProps) => {
  const { t } = useTranslation();

  const handleImage = () => {
    if (imageId !== undefined)
      return (
        <Image
          mb="4"
          source={{ uri: imageId }}
          width="100%"
          height={48}
          borderRadius={16}
          fallbackElement={FallbackImage}
          alt="Question Image"
        />
      );
    return null;
  };

  const handleChoice = () => {
    if (choice1)
      return (
        <View>
          {elderlyAnswer == choice1 ? (
            <Text fontWeight="semibold">{t('viewHistory.answer')}</Text>
          ) : null}
          <View
            pb="2"
            borderRadius="6"
            bgColor={
              elderlyAnswer == choice1
                ? isCorrect
                  ? '#D1FAE5'
                  : '#FFE4E6'
                : null
            }>
            <Text mt="2" ml="2">
              {choice1}
            </Text>
          </View>
          {elderlyAnswer == choice2 ? (
            <Text fontWeight="semibold">{t('viewHistory.answer')}</Text>
          ) : null}
          <View
            pb="2"
            borderRadius="6"
            bgColor={
              elderlyAnswer == choice2
                ? isCorrect
                  ? '#D1FAE5'
                  : '#FFE4E6'
                : null
            }>
            <Text mt="2" ml="2">
              {choice2}
            </Text>
          </View>
          {elderlyAnswer == choice3 ? (
            <Text fontWeight="semibold">{t('viewHistory.answer')}</Text>
          ) : null}
          <View
            pb="2"
            borderRadius="6"
            bgColor={
              elderlyAnswer == choice3
                ? isCorrect
                  ? '#D1FAE5'
                  : '#FFE4E6'
                : null
            }>
            <Text mt="2" ml="2">
              {choice3}
            </Text>
          </View>
          {elderlyAnswer == choice4 ? (
            <Text fontWeight="semibold">{t('viewHistory.answer')}</Text>
          ) : null}
          <View
            pb="2"
            borderRadius="6"
            bgColor={
              elderlyAnswer == choice4
                ? isCorrect
                  ? '#D1FAE5'
                  : '#FFE4E6'
                : null
            }>
            <Text mt="2" ml="2">
              {choice4}
            </Text>
          </View>
        </View>
      );
    return (
      <View>
        <Text fontWeight="semibold">{t('viewHistory.answer')}</Text>
        <Text mt="2" ml="2">
          {elderlyAnswer}
        </Text>
      </View>
    );
  };
  return (
    <View flexDir="column" my={1}>
      <View flexDir="row" justifyContent="space-between" alignItems="center">
        <Text fontWeight="bold">
          {t('viewHistory.question')} {index + 1}
        </Text>
        {isCorrect || isCorrect == undefined ? (
          <Text fontWeight="bold" color="#1D84DF">
            {t('viewHistory.correct')}
          </Text>
        ) : (
          <Text fontWeight="bold" color="#C2410C">
            {t('viewHistory.incorrect')}
          </Text>
        )}
      </View>
      <Text my="2">{question}</Text>
      {handleImage()}
      <View flexDir="column">{handleChoice()}</View>
    </View>
  );
};

export default ViewHistoryDetailsCard;

const styles = StyleSheet.create({
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    borderRadius: 6
  }
});
