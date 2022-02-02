import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Home, Lander, SignUpDetails, SignUpNumber, SignUpVerification } from '../pages';
import { MainRoutes, MainStackParamList } from '.';

interface Props {
  initialRoute: keyof MainStackParamList;
}

const MainNavigation = ({ initialRoute }: Props): React.ReactElement => {
  const Stack = createNativeStackNavigator<MainStackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
        {/* Lander */}
        <Stack.Screen name={MainRoutes.Lander} component={Lander} />

        {/* Auth Stack */}
        <Stack.Screen name={MainRoutes.SignUpNumber} component={SignUpNumber} />
        <Stack.Screen name={MainRoutes.SignUpVerification} component={SignUpVerification} />
        <Stack.Screen name={MainRoutes.SignUpDetails} component={SignUpDetails} />

        {/* App Stack */}
        <Stack.Screen name={MainRoutes.Home} component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MainNavigation;
