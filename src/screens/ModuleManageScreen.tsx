import React from 'react';
import { View, Icon, ScrollView } from 'native-base';
import ManageModuleCard from '../components/organisms/ManageModuleCard';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';

const ModuleManageScreen = () => {
  const { t } = useTranslation();

  return (
    <ScrollView>
      <View px="6" py="6">
        <ManageModuleCard
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
          isAdded={true}
        />
        <ManageModuleCard
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
          isAdded={false}
        />
        <ManageModuleCard
          icon={
            <Icon
              as={MaterialIcons}
              name="question-answer"
              size="16"
              color="pink.400"
              mr={4}
            />
          }
<<<<<<< HEAD
          title={t('modules.memory')}
=======
          title={t('modules.memoryPractice')}
>>>>>>> 56a40d5 (fix: change Home page and its components to match the new translation convention)
          description={t('46')}
          isAdded={true}
        />
        <ManageModuleCard
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
          comingSoon={true}
        />
      </View>
    </ScrollView>
  );
};

export default ModuleManageScreen;
