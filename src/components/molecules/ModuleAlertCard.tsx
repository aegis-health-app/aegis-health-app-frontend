import { StyleSheet } from 'react-native';
import { View, Text, Divider, VStack, HStack } from 'native-base';
import moment from 'moment';
import React from 'react';
import { useTranslation } from 'react-i18next';

type ModuleAlertCardProps = {
  moduleName: string;
  time: Date;
  title: string;
  description: string | undefined;
};

const ModuleAlertCard = ({
  moduleName,
  time,
  title,
  description
}: ModuleAlertCardProps) => {
  const { t } = useTranslation();

  return (
    <View>
      <VStack px="4" py="2" backgroundColor="#fff" style={styles.card}>
        <HStack justifyContent="space-between">
          <Text color="darkBlue.600" fontSize="16">
            {moduleName}
          </Text>
          <Text color="darkBlue.600" fontSize="16">
            {moment(time).format('hh:mm')}
          </Text>
        </HStack>
        <View>
          <Text fontSize="2xl" fontWeight="500">
            {title}
          </Text>
          {description && <Text fontSize="lg">{description}</Text>}
        </View>
        <HStack justifyContent="space-between" mt={4} mb={1}>
          <View flex={2} alignItems="center">
            <Text fontSize="lg" color="blue.500">
              {t('34')}
            </Text>
          </View>
          <Divider orientation="vertical" mx="6" bg="gray.200" thickness={2} />
          <View flex={2} alignItems="center">
            <Text fontSize="lg" color="blue.500">
              {t('35')}
            </Text>
          </View>
        </HStack>
      </VStack>
    </View>
  );
};

export default ModuleAlertCard;

const styles = StyleSheet.create({
  card: {
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2
  }
});
