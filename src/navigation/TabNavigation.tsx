import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import UserLinkScreen from './../screens/UserLinkScreen';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { Icon } from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import { useTranslation } from 'react-i18next';

const TabNavigation = () => {
  const Tab = createBottomTabNavigator();
  const { t } = useTranslation();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color }) => {
          if (route.name === 'Home') {
            const iconName = focused ? 'home' : 'home-outline';
            return <IonIcons name={iconName} size={26} color={color} />;
          } else if (route.name === 'UserLinkScreen') {
            const iconName = focused ? 'ios-people' : 'people-outline';
            return <IonIcons name={iconName} size={26} color={color} />;
          }
        },
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontSize: 14
        },
        tabBarStyle: {
          padding: 2,
          minHeight: 55
        }
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: t('profile.home')
        }}
      />
      <Tab.Screen
        name="UserLinkScreen"
        component={UserLinkScreen}
        options={{
          title: t('profile.myCaretaker'),
          headerTitleAlign: 'center',
          headerTitleStyle: { fontSize: 20, fontWeight: '800' },
          headerRight: () => (
            <Icon
              as={Feather}
              name="help-circle"
              size="7"
              color="#F97316"
              mr="4"
            />
          )
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
