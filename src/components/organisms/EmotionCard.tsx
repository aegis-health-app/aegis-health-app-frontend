import { Icon, Image, Modal, Text, View } from 'native-base';
import React from 'react';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { client } from '../../config/axiosConfig';
import { useSettings } from '../../hooks/useSettings';
import { getEmotionCardImage } from '../../utils/elderly/getEmotionCardImage';

type EmotionCardProps = {
  showEmotionCard: boolean;
  close: () => void;
  message: string;
};

const EmotionCard = (props: EmotionCardProps) => {
  const { showEmotionCard, close, message } = props;
  const { t } = useTranslation();
  const { language } = useSettings();
  /**
   * This function save the date that the elderly submit the emotion to the Async storage,
   * send the emotion to backend, and close the card.
   * @param emotion Emotion that user select from the emotion card.
   */
  const handleEmotionSubmit = async (emotion) => {
    await sendPayload(emotion);
    await AsyncStorage.setItem(
      'emotionDate',
      JSON.stringify(moment().format('L'))
    );
    close();
  };
  const sendPayload = async (emotion) => {
    const payload = {
      emotionLevel: emotion
    };
    try {
      await client.post('/emotion-tracking', payload);
    } catch (err) {}
  };
  /**
   * This function get the greeting image according to the day of the week.
   * @param date The day of the week
   * @returns image path inside assets
   */
  const getImageSource = (date) => {
    return getEmotionCardImage(date, language);
  };
  return (
    <Modal isOpen={showEmotionCard} onClose={() => handleEmotionSubmit('NA')}>
      <Modal.Content maxWidth="400px">
        <Modal.CloseButton />
        <Modal.Header style={styles.header}>
          <Text fontSize={'lg'} fontWeight={'bold'}>
            {t('emotionTrackingCard.' + message)}
          </Text>
        </Modal.Header>
        <Modal.Body>
          <View margin={'12px'} alignItems={'center'}>
            <Image
              width={'240 px'}
              height={'320 px'}
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
              onPress={() => handleEmotionSubmit('HAPPY')}>
              <Icon
                as={MaterialCommunityIcons}
                name="emoticon-happy-outline"
                size="12"
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.emotionButton}
              onPress={() => handleEmotionSubmit('NEUTRAL')}>
              <Icon
                as={MaterialCommunityIcons}
                name="emoticon-neutral-outline"
                size="12"
                color="black"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.emotionButton}
              onPress={() => handleEmotionSubmit('BAD')}>
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
  header: {
    alignContent: 'center',
    alignItems: 'center',
    fontSize: 'xl'
  }
});
