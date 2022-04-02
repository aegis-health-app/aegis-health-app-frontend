import { Icon, Image, Modal, Text, View } from 'native-base';
import React from 'react';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';
import emotionCardImage from '../../assets/images/emotionCardImage';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

type EmotionCardProps = {
  showEmotionCard: boolean;
  close: () => void;
  message: string;
};

const EmotionCard = (props: EmotionCardProps) => {
  const { showEmotionCard, close, message } = props;
  const { t } = useTranslation();
  /**
   * This function save the date that the elderly submit the emotion to the Async storage and close the card
   */
  const handleEmotionSubmit = async () => {
    await AsyncStorage.setItem(
      'emotionDate',
      JSON.stringify(moment().format('L'))
    );
    const savedEmotionDate = await AsyncStorage.getItem('emotionDate');
    const emotionDate = JSON.parse(savedEmotionDate);
    console.log('saved emotion date', { emotionDate });
    close();
  };
  /**
   * This function get the greeting image according to the day of the week.
   * @param date The day of the week
   * @returns image path inside assets
   */
  const getImageSource = (date) => {
    switch (date) {
      case 'Monday':
        return emotionCardImage.Monday;
      case 'Tuesday':
        return emotionCardImage.Tuesday;
      case 'Wednesday':
        return emotionCardImage.Wednesday;
      case 'Thursday':
        return emotionCardImage.Thursday;
      case 'Friday':
        return emotionCardImage.Friday;
      case 'Saturday':
        return emotionCardImage.Saturday;
      default:
        return emotionCardImage.Sunday;
    }
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
            <Image
              // width={'24'}
              // height={'36'}
              source={getImageSource(message)}
            />
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
              {/* <Image source={require('../../assets/images/emotionHappy.png')} /> */}
              <Icon
                as={MaterialCommunityIcons}
                name="emoticon-happy-outline"
                size="12"
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.emotionButton}
              onPress={handleEmotionSubmit}>
              {/* <Image source={require('../../assets/images/emotionNeutral.png')}/> */}
              <Icon
                as={MaterialCommunityIcons}
                name="emoticon-neutral-outline"
                size="12"
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.emotionButton}
              onPress={handleEmotionSubmit}>
              {/* <Image source={require('../../assets/images/emotionSad.png')} /> */}
              <Icon
                as={MaterialCommunityIcons}
                name="emoticon-sad-outline"
                size="12"
                color="black"
              />
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
