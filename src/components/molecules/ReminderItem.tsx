import { TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { View, Text, AspectRatio, Box, Heading, Image } from 'native-base';
import images from '../../assets/images';
import { useTranslation } from 'react-i18next';

const ReminderItem = () => {
  const { t } = useTranslation();
  return (
    <View flex={1} flexDirection="row" mb={4}>
      <View flex={1} alignItems="center" h="full" mr="3">
        <View
          justifyContent="center"
          alignItems="center"
          backgroundColor="#FDBA74"
          w="100%"
          h="8"
          mb="2"
          rounded="md">
          <Text fontSize={16} fontWeight="medium">
            08:00
          </Text>
        </View>
        <View flex={1} backgroundColor="#FDBA74" w="1" h="full" />
      </View>
      <Box flex={5} shadow="2" rounded="lg" style={styles.card}>
        {/* <View flex={5} style={styles.card}> */}
        <TouchableOpacity onPress={() => console.log('reminder item pressed')}>
          <AspectRatio w="100%">
            <Image
              source={images.authBanner}
              alt="reminder image"
              w="100%"
              h="100%"
              roundedTop="lg"
            />
          </AspectRatio>
          <View p="4" backgroundColor="white">
            <Heading size={['md', 'lg', 'md']} fontWeight="medium">
              Placeholder Reminder
            </Heading>
            <Text>Description description description</Text>
          </View>
        </TouchableOpacity>
        <View
          flexDirection="row"
          justifyContent="flex-end"
          px="3"
          py="2"
          backgroundColor="#F1F1F1"
          roundedBottom="lg">
          <Text color="#005DB4">{t('reminders.markAsComplete')}</Text>
        </View>
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
