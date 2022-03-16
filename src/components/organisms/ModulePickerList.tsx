import React from 'react';
import { Text, View, Icon, VStack, HStack } from 'native-base';
import ModulePickerCard from './../molecules/ModulePickerCard';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import ManageModuleIcon from '../atoms/ManageModuleIcon';

const ModulePickerList = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View my={6} w="full">
      <Text fontSize="2xl" fontWeight="600">
        Modules
      </Text>
      <Text fontSize="md" color="gray.500">
        Choose your modules
      </Text>
      <VStack space={3} mt={4} justifyContent="center" alignItems="center">
        <HStack space={3} justifyContent="space-between" px={2}>
          <ModulePickerCard
            backgroundColor="#fff"
            icon={
              <Icon as={AntDesign} name="warning" size="10" color="red.500" />
            }
            label="Emergency"
            handlePress={() => navigation.navigate('EmergencyScreen')}
          />
          <ModulePickerCard
            backgroundColor="#fff"
            icon={
              <Icon
                as={MaterialIcons}
                name="notifications-active"
                size="10"
                color="orange.400"
              />
            }
            label="Reminder"
            handlePress={() => navigation.navigate('ReminderScreen')}
          />
        </HStack>
        <HStack space={3} justifyContent="space-between" px={2}>
          <ModulePickerCard
            backgroundColor="#fff"
            icon={
              <Icon
                as={MaterialIcons}
                name="note-add"
                size="10"
                color="green.500"
              />
            }
            label="Memory Practice"
            handlePress={() => navigation.navigate('MemoryScreen')}
          />
          <ModulePickerCard
            backgroundColor="#fff"
            icon={
              <Icon
                as={MaterialIcons}
                name="question-answer"
                size="10"
                color="pink.400"
              />
            }
            label="Health Records"
            handlePress={() => navigation.navigate('HealthRecordScreen')}
          />
        </HStack>
        <HStack space={3} justifyContent="space-between" px={2}>
          <ModulePickerCard
            backgroundColor="#fff"
            icon={
              <Icon
                as={MaterialIcons}
                name="menu-book"
                size="10"
                color="darkBlue.600"
              />
            }
            label="Health Blogs"
            handlePress={() => navigation.navigate('HealthBlogScreen')}
          />
          <ModulePickerCard
            backgroundColor="lightBlue.200"
            icon={<ManageModuleIcon />}
            label="Select Modules"
            handlePress={() => navigation.navigate('ModulePickerScreen')}
          />
        </HStack>
      </VStack>
    </View>
  );
};

export default ModulePickerList;
