import React, { useContext } from 'react';
import { Text, View, Button, HStack, FlatList } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';
import { useTranslation } from 'react-i18next';
import { ElderlyContext } from '../../contexts/ElderlyContext';
import ModulePickerItem from '../molecules/ModulePickerItem';

const ModulePickerList = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { t } = useTranslation();
  const { moduleList } = useContext(ElderlyContext);

  return (
    <View flex={1} mt={2}>
      <Text fontSize="2xl" fontWeight="600">
        {t('modules.modules')}
      </Text>
      <Text fontSize="md" color="gray.500">
        {t('modules.chooseModules')}
      </Text>
      <VStack space={3} mt={4} justifyContent="center" alignItems="center">
        <HStack space={3} justifyContent="space-between" px={2}>
          <ModulePickerCard
            backgroundColor="#fff"
            icon={
              <Icon as={AntDesign} name="warning" size="10" color="red.500" />
            }
            label={t('modules.emergency')}
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
            label={t('modules.reminder')}
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
            label={t('modules.healthRecord')}
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
            label={t('modules.memory')}
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
            label={t('modules.healthBlogs')}
            handlePress={() => navigation.navigate('HealthBlogScreen')}
          />
          <ModulePickerCard
            backgroundColor="lightBlue.200"
            icon={<ManageModuleIcon />}
            label={t('modules.selectModules')}
            handlePress={() => navigation.navigate('ModuleManageScreen')}
          />
        </HStack>
        <HStack space={3} justifyContent="space-between" px={2}>
          <ModulePickerCard
            backgroundColor="#fff"
            icon={<ManageModuleIcon />}
            label="Dummy Sign In Page"
            handlePress={() => navigation.navigate('SignInScreen')}
          />
          <ModulePickerCard
            backgroundColor="#fff"
            icon={<ManageModuleIcon />}
            label="Dummy Sign Up Page"
            handlePress={() => navigation.navigate('SignUpScreen')}
          />
        </HStack>
        <HStack space={3} justifyContent="space-between" px={2}>
          <ModulePickerCard
            backgroundColor="#fff"
            icon={<ManageModuleIcon />}
            label="Plan Selection Page"
            handlePress={() => navigation.navigate('PlanSelectionScreen')}
          />
          <ModulePickerCard
            backgroundColor="#fff"
            icon={<ManageModuleIcon />}
            label="Forgot Password Page"
            handlePress={() => navigation.navigate('ForgotPasswordScreen')}
          />
        </HStack>
      </VStack>
    </View>
  );
};

export default ModulePickerList;
