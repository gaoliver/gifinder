/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon, NativeBaseProvider } from 'native-base';
import { customTheme } from '@/theme';
import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { Favourites } from '@/screens/Favourites';
import { GIFDetails } from '@/screens/GIFDetails';
import { colors } from '@/theme/colors';
import { Platform } from 'react-native';
import { GIFProps } from '@/@types/models';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/Redux/store';
import { Home } from '@/screens/Home';

export type RootBottomParamList = {
  Home: undefined;
  Favourites: undefined;
};

export type RootMainStackParamList = {
  TabNavigation: NavigatorScreenParams<RootBottomParamList>;
  GIFDetails: { gif: GIFProps };
};

const Tab = createBottomTabNavigator<RootBottomParamList>();
const MainStack = createNativeStackNavigator<RootMainStackParamList>();

export type AppNavigationProp = NativeStackNavigationProp<
  RootMainStackParamList,
  'TabNavigation'
>;

const TabNavigation = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: colors.primary,
        ...(Platform.OS === 'android' && {
          height: 60,
          paddingTop: 5,
          paddingBottom: 10,
        }),
      },
      tabBarInactiveTintColor: colors.white,
      tabBarActiveTintColor: colors.secondary,
    }}>
    <Tab.Screen
      name="Home"
      component={Home}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon
            color={color}
            size={size}
            as={<MaterialCommunityIcons name="home" />}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Favourites"
      component={Favourites}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon
            color={color}
            size={size}
            as={<MaterialCommunityIcons name="heart" />}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

const Navigation = () => (
  <NavigationContainer>
    <MainStack.Navigator screenOptions={{ headerShown: false }}>
      <MainStack.Screen name="TabNavigation" component={TabNavigation} />
      <MainStack.Screen name="GIFDetails" component={GIFDetails} />
    </MainStack.Navigator>
  </NavigationContainer>
);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NativeBaseProvider theme={customTheme} isSSR={false}>
          <Navigation />
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
