import { Image, Modal, Text, View } from 'native-base';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';
import { useEffect } from 'react';

type EmotionCardProps = {
  showEmotionCard: boolean;
  close: () => void;
  message: string;
};

const EmotionCard = (props: EmotionCardProps) => {
  const { showEmotionCard, close, message } = props;
  const { t } = useTranslation();
  const handleEmotionSubmit = async () => {
    console.log('emotion sent');
    await AsyncStorage.setItem(
      'emotionDate',
      JSON.stringify(moment().format('L'))
    );
    const savedEmotionDate = await AsyncStorage.getItem('emotionDate');
    const emotionDate = JSON.parse(savedEmotionDate);
    console.log('saved emotion date', { emotionDate });
    close();
  };
  const imagePath = '../../assets/images/temp' + message + '.png';
  const date = JSON.stringify(message);
  console.log(date);
  const getImageSource = () => {
    const imagePath = '../../assets/images/temp' + message + '.png';
    const date = JSON.stringify(message);
    console.log(date);
    return;
  };
  return (
    <Modal isOpen={showEmotionCard} onClose={close}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header style={styles.header}>
          <Text fontSize={'lg'} fontWeight={'bold'}>
            {t('emotionTrackingCard.' + message)}
          </Text>
        </Modal.Header>
        <Modal.Body>
          <View style={styles.pictureArea}>
            <Text>{imagePath}</Text>
            <Image source={require('../../assets/images/tempSaturday.png')} />
          </View>
          <Text fontSize="lg" fontWeight="400">
            {t('emotionTrackingCard.howAreYouFeelingToday')}
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <View style={styles.emotionPicker}>
            <TouchableOpacity
              style={styles.emotionButton}
              onPress={handleEmotionSubmit}>
              <Image source={require('../../assets/images/emotionHappy.png')} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.emotionButton}
              onPress={handleEmotionSubmit}>
              <Image
                source={require('../../assets/images/emotionNeutral.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.emotionButton}
              onPress={handleEmotionSubmit}>
              <Image source={require('../../assets/images/emotionSad.png')} />
            </TouchableOpacity>
          </View>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default EmotionCard;

const styles = StyleSheet.create({
  emotionPicker: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'flex-start',
    flexDirection: 'row'
  },
  emotionButton: {
    backgroundColor: '#fafafa',
    borderRadius: 20,
    padding: 10,
    margin: 8
  },
  pictureArea: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 12
  },
  header: {
    alignContent: 'center',
    alignItems: 'center',
    fontSize: 'xl'
  }
});
