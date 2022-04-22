import React, { memo, useContext } from 'react';
import { Icon } from 'native-base';
import { ModuleId } from '../../dto/modules/modules.dto';
import ModulePickerCard from './ModulePickerCard';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { RootStackParamList } from '../../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import ManageModuleIcon from './../atoms/ManageModuleIcon';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { UserContext } from '../../contexts/UserContext';

type ModulePickerItemProps = {
  mid: ModuleId;
};

const ModulePickerItem = ({ mid }: ModulePickerItemProps) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { t } = useTranslation();
  const { isElderly } = useContext(UserContext);

  function RenderModulePickerItemByMid() {
    if (mid === 0) {
      return (
        <ModulePickerCard
          backgroundColor="#fff"
          icon={
            <Icon as={AntDesign} name="warning" size="10" color="red.500" />
          }
          label={t('modules.emergency')}
          // don't forget to change
          handlePress={() => navigation.navigate('RemindersScreen')}
        />
      );
    } else if (mid === 1) {
      return (
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
          handlePress={() => navigation.navigate('RemindersScreen')}
        />
      );
    } else if (mid === 2) {
      return (
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
          handlePress={() => {
            navigation.navigate('HealthRecordingsScreen');
          }}
        />
      );
    } else if (mid === 3) {
      return (
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
          handlePress={() => {
            isElderly
              ? navigation.navigate('MemoryScreen')
              : navigation.navigate('ViewAssignedQuestionsScreen');
          }}
        />
      );
    } else if (mid === 4) {
      return (
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
      );
    } else if (mid === 100) {
      return (
        <ModulePickerCard
          backgroundColor="lightBlue.200"
          icon={<ManageModuleIcon />}
          label={t('modules.selectModules')}
          handlePress={() => navigation.navigate('ModuleManageScreen')}
        />
      );
    } else {
      return <></>;
    }
  }

  return <RenderModulePickerItemByMid />;
};

export default memo(ModulePickerItem);
