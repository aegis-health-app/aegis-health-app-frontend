import { TouchableOpacity, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import { View, Text, AspectRatio, Box, Heading, Image } from 'native-base';
import images from '../../assets/images';
import { useTranslation } from 'react-i18next';
import { UserContext } from '../../contexts/UserContext';

const ReminderItem = () => {
  const { user } = useContext(UserContext);
  const { t } = useTranslation();

  // hardcode waiting for backend
  const imageExists = true;
  const isOverdue = true;
  const enableBottomBar = true;
  const isFinished = false;
  // both enableBottomBar and isFinished can't be true at the same time
  const elderly = true;

  const sidebarColor = isOverdue ? '#FDBA74' : '#7CC2FF';

  return elderly ? (
    <View flex={1} flexDirection="row" mb={4}>
      <View flex={1} alignItems="center" h="full" mr="3">
        <View
          justifyContent="center"
          alignItems="center"
          backgroundColor={sidebarColor}
          w="100%"
          h="8"
          mb="2"
          rounded="md">
          <Text fontSize={16} fontWeight="medium">
            08:00
          </Text>
        </View>
        {/* TODO: not render this one when it's the last item */}
        <View flex={1} backgroundColor={sidebarColor} w="1" h="full" />
      </View>
      <Box flex={5} shadow="2" rounded="lg" style={styles.card}>
        <TouchableOpacity onPress={() => console.log('reminder item pressed')}>
          {imageExists && (
            <AspectRatio w="100%">
              <Image
                source={images.authBanner}
                alt="reminder image"
                w="100%"
                h="100%"
                roundedTop="lg"
              />
            </AspectRatio>
          )}
          <View
            p="4"
            backgroundColor="white"
            roundedTop={imageExists ? null : 'lg'}
            roundedBottom={enableBottomBar || isFinished ? null : 'lg'}>
            <Heading size={['md', 'lg', 'md']} fontWeight="medium">
              Placeholder Reminder
            </Heading>
            <Text>Description description description</Text>
          </View>
        </TouchableOpacity>
        {enableBottomBar && !isFinished && (
          <View
            flexDirection="row"
            justifyContent="flex-end"
            px="3"
            py="2"
            backgroundColor="#F1F1F1"
            roundedBottom="lg">
            <TouchableOpacity onPress={() => console.log('complete')}>
              <Text color="#005DB4">{t('reminders.markAsComplete')}</Text>
            </TouchableOpacity>
          </View>
        )}
        {isFinished && !enableBottomBar && (
          <View
            flexDirection="row"
            justifyContent="space-between"
            px="3"
            py="2"
            backgroundColor="#F1F1F1"
            roundedBottom="lg">
            <TouchableOpacity onPress={() => console.log('delete')}>
              <View backgroundColor="#FDBA74" px={5} rounded="md">
                <Text color="#C2410C">{t('reminders.delete')}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('incomplete')}>
              <Text color="#C2410C">{t('reminders.markAsIncomplete')}</Text>
            </TouchableOpacity>
          </View>
        )}
      </Box>
    </View>
  ) : (
    <View flex={1} flexDirection="row" mb={4}>
      <View flex={1} alignItems="center" h="full" mr="3">
        <View
          justifyContent="center"
          alignItems="center"
          backgroundColor={sidebarColor}
          w="100%"
          h="8"
          mb="2"
          rounded="md">
          <Text fontSize={16} fontWeight="medium">
            08:00
          </Text>
        </View>
        {/* TODO: not render this one when it's the last item */}
        <View flex={1} backgroundColor={sidebarColor} w="1" h="full" />
      </View>
      <Box flex={5} shadow="2" rounded="lg" style={styles.card}>
        <TouchableOpacity onPress={() => console.log('reminder item pressed')}>
          {imageExists && (
            <AspectRatio w="100%">
              <Image
                source={images.authBanner}
                alt="reminder image"
                w="100%"
                h="100%"
                roundedTop="lg"
              />
            </AspectRatio>
          )}
          <View
            p="4"
            backgroundColor="white"
            rounded={imageExists ? null : 'lg'}
            roundedBottom={imageExists && 'lg'}>
            <Heading size={['md', 'lg', 'md']} fontWeight="medium">
              Placeholder Reminder
            </Heading>
            <Text>Description description description</Text>
          </View>
        </TouchableOpacity>
      </Box>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: '#999',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    borderRadius: 8
  }
});

export default ReminderItem;
