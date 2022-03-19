import React from 'react';
import { View, Icon, ScrollView } from 'native-base';
import ManageModuleCard from '../components/organisms/ManageModuleCard';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const ModuleManageScreen = () => {
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
          title="Reminder"
          description="Create reminder for yourself or share them with caretakers."
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
          title="Health Records"
          description="Keep track of your health over time and view your trends."
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
          title="Health Records"
          description="Keep track of your health over time and view your trends."
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
          title="Health Blogs"
          description="Stay up to date with accurate heath information."
          comingSoon={true}
        />
      </View>
    </ScrollView>
  );
};

export default ModuleManageScreen;
