import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import UserLinkScreen from './../screens/UserLinkScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const TabNavigation = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" color={color} size={26} />
          )
        }}
      />
      <Tab.Screen
        name="UserLinkScreen"
        component={UserLinkScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'My Caretakers',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="people-outline" color={color} size={26} />
          )
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
