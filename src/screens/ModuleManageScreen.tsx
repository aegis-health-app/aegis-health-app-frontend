import React, { useContext } from 'react';
import { View, Icon, ScrollView } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';
import ManageModuleCard from './../components/molecules/ManageModuleCard';
import { ElderlyContext } from '../contexts/ElderlyContext';
import { getModuleIsAddedValue } from '../utils/module/manage';

const ModuleManageScreen = () => {
  const { t } = useTranslation();
  const { moduleList } = useContext(ElderlyContext);

  return (
    <ScrollView>
      <View px="6" py="6">
        <ManageModuleCard
          moduleId={1}
          icon={
            <Icon
              as={MaterialIcons}
              name="notifications-active"
              size="16"
              color="orange.400"
              mr={4}
            />
          }
          title={t('modules.notification')}
          description={t('moduleSelection.reminderDesc')}
          isAdded={getModuleIsAddedValue(1, moduleList)}
        />
        <ManageModuleCard
          moduleId={2}
          icon={
            <Icon
              as={MaterialIcons}
              name="note-add"
              size="16"
              color="green.500"
              mr={4}
            />
          }
          title={t('modules.healthRecord')}
          description={t('moduleSelection.trackDesc')}
          isAdded={getModuleIsAddedValue(2, moduleList)}
        />
        <ManageModuleCard
          moduleId={3}
          icon={
            <Icon
              as={MaterialIcons}
              name="question-answer"
              size="16"
              color="pink.400"
              mr={4}
            />
          }
          title={t('modules.memory')}
          description={t('46')}
          isAdded={getModuleIsAddedValue(3, moduleList)}
        />
        <ManageModuleCard
          moduleId={4}
          icon={
            <Icon
              as={MaterialIcons}
              name="menu-book"
              size="16"
              color="darkBlue.600"
              mr={4}
            />
          }
          title={t('modules.healthBlogs')}
          description={t('moduleSelection.healthBlogDsc')}
          isAdded={getModuleIsAddedValue(4, moduleList)}
        />
      </View>
    </ScrollView>
  );
};

export default ModuleManageScreen;
