import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import UserLinkScreen from './../screens/UserLinkScreen';
import IonIcons from 'react-native-vector-icons/Ionicons';

const TabNavigation = () => {
  const Tab = createBottomTabNavigator();

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
        // tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontSize: 14
        },
        tabBarStyle: {
          height: 55,
          paddingBottom: 2
        }
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Home'
        }}
      />
      <Tab.Screen
        name="UserLinkScreen"
        component={UserLinkScreen}
        options={{
          headerShown: false
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigation;
