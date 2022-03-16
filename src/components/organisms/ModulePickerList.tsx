import { StyleSheet } from 'react-native';
import React from 'react';
import { Text, View, Icon, VStack, HStack } from 'native-base';
import ModulePickerCard from './../molecules/ModulePickerCard';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ModulePickerList = () => {
  return (
    <View w="full" my={6}>
      <Text fontSize="2xl" fontWeight="600">
        Modules
      </Text>
      <Text fontSize="md" color="gray.500">
        Choose your modules
      </Text>
      <VStack>
        <HStack space={2} justifyContent="space-between" px={2}>
          <ModulePickerCard
            backgroundColor="#fff"
            icon={
              <Icon
                as={AntDesign}
                name="warning"
                fontSize="xl"
                color="red.500"
              />
            }
            label="Emergency"
            handlePress={() => console.log('Emergency')}
          />
          <ModulePickerCard
            backgroundColor="#fff"
            icon={
              <Icon
                as={AntDesign}
                name="warning"
                fontSize="xl"
                color="red.500"
              />
            }
            label="Emergency"
            handlePress={() => console.log('Emergency')}
          />
        </HStack>
      </VStack>
    </View>
  );
};

export default ModulePickerList;

const styles = StyleSheet.create({});
