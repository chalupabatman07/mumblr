import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Home, Lander, SignUpFlow } from '../pages';
import { MainRoutes, MainStackParamList } from '.';

interface Props {
  initialRoute: keyof MainStackParamList;
}

const MainNavigation = ({ initialRoute }: Props): React.ReactElement => {
  const Stack = createNativeStackNavigator<MainStackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
        <Stack.Screen name={MainRoutes.Home} component={Home} />
        <Stack.Screen name={MainRoutes.Lander} component={Lander} />
        <Stack.Screen name={MainRoutes.SignUpFlow} component={SignUpFlow} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MainNavigation;
