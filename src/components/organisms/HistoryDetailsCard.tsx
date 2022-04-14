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
  correct?: boolean;
  selectedAnswer?: number;
  answer?: number | string;
  index: number;
};

const ViewHistoryDetailsCard = ({
  imageId,
  question,
  choice1,
  choice2,
  choice3,
  choice4,
  correct,
  selectedAnswer,
  answer,
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
          {selectedAnswer == 1 ? (
            <Text fontWeight="semibold">
              {t('viewHistory.answer')}
            </Text>
          ) : null}
          <View
            pb="2"
            borderRadius="6"
            bgColor={
              selectedAnswer == 1 ? (correct ? '#D1FAE5' : '#FFE4E6') : null
            }>
            <Text mt="2" ml="2">
              {choice1}
            </Text>
          </View>
          {selectedAnswer == 2 ? (
            <Text fontWeight="semibold">
              {t('viewHistory.answer')}
            </Text>
          ) : null}
          <View
            pb="2"
            borderRadius="6"
            bgColor={
              selectedAnswer == 2 ? (correct ? '#D1FAE5' : '#FFE4E6') : null
            }>
            <Text mt="2" ml="2">
              {choice2}
            </Text>
          </View>
          {selectedAnswer == 3 ? (
            <Text fontWeight="semibold">
              {t('viewHistory.answer')}
            </Text>
          ) : null}
          <View
            pb="2"
            borderRadius="6"
            bgColor={
              selectedAnswer == 3 ? (correct ? '#D1FAE5' : '#FFE4E6') : null
            }>
            <Text mt="2" ml="2">
              {choice3}
            </Text>
          </View>
          {selectedAnswer == 4 ? (
            <Text fontWeight="semibold">
              {t('viewHistory.answer')}
            </Text>
          ) : null}
          <View
            pb="2"
            borderRadius="6"
            bgColor={
              selectedAnswer == 4 ? (correct ? '#D1FAE5' : '#FFE4E6') : null
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
          {answer}
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
        {correct || correct == undefined ? (
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
