import { StyleSheet } from 'react-native';
import { View, Text, Box, Divider, VStack, HStack } from 'native-base';
import moment from 'moment';
import React from 'react';

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
  return (
    <Box w="96" padding="4" borderColor="gray.100" style={styles.cardContainer}>
      <VStack>
        <HStack justifyContent="space-between">
          <Text color="darkBlue.600" fontSize="16">
            {moduleName}
          </Text>
          <Text color="darkBlue.600" fontSize="16">
            {moment(time).format('hh:mm')}
          </Text>
        </HStack>
        <View>
          <Text fontSize="2xl" bold>
            {title}
          </Text>
          {description && <Text fontSize="xl">{description}</Text>}
        </View>
        <HStack w="full" justifyContent="space-between" my={4}>
          <View flex={2} alignItems="center">
            <Text fontSize="2xl" color="blue.500">
              I did it
            </Text>
          </View>
          <Divider orientation="vertical" mx="6" bg="gray.200" thickness={2} />
          <View flex={2} alignItems="center">
            <Text fontSize="2xl" color="blue.500">
              Dismiss
            </Text>
          </View>
        </HStack>
      </VStack>
    </Box>
  );
};

export default ModuleAlertCard;

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    shadowColor: '#020202',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 1
  }
});
