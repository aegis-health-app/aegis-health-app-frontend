import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ElderlyHomeScreen from '../screens/ElderlyHomeScreen';
import UserLinkScreen from './../screens/UserLinkScreen';
import IonIcons from 'react-native-vector-icons/Ionicons';
import { Icon } from 'native-base';
import Feather from 'react-native-vector-icons/Feather';
import { useTranslation } from 'react-i18next';
import { TouchableOpacity } from 'react-native';
import { TourguideContext } from '../contexts/TourguideContext';

const TabNavigation = () => {
  const Tab = createBottomTabNavigator();
  const { t } = useTranslation();
  const { setShowElderlyLinkTourguide } = useContext(TourguideContext)

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
        component={ElderlyHomeScreen}
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
          headerStyle: { height: 70 },
          headerRight: () => (
            <TouchableOpacity
                    onPress={() => setShowElderlyLinkTourguide(true)}>
            <Icon
              as={Feather}
              name="help-circle"
              size="7"
              color="#F97316"
              mr="4"
            />
            </TouchableOpacity>
          )
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
