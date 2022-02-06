import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import {
  BirthdayRegistration,
  EmailRegistration,
  GenderRegistration,
  Home,
  Lander,
  NameRegistration,
  PassionsRegistration,
  PhoneRegistration,
  PhoneVerification,
  ProfileAnswersRegistration,
  SchoolRegistration,
  SexualOrientationRegistration,
  ShowPreferenceRegistration,
} from '../pages';
import { MainRoutes, MainStackParamList } from './Routes';

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

        {/* Registration Stack */}
        <Stack.Screen name={MainRoutes.PhoneRegistration} component={PhoneRegistration} />
        <Stack.Screen name={MainRoutes.PhoneVerification} component={PhoneVerification} />
        <Stack.Screen name={MainRoutes.EmailRegistration} component={EmailRegistration} />
        <Stack.Screen name={MainRoutes.NameRegistration} component={NameRegistration} />
        <Stack.Screen name={MainRoutes.BirthdayRegistration} component={BirthdayRegistration} />
        <Stack.Screen name={MainRoutes.GenderRegistration} component={GenderRegistration} />
        <Stack.Screen name={MainRoutes.SexualOrientationRegistration} component={SexualOrientationRegistration} />
        <Stack.Screen name={MainRoutes.ShowPreferenceRegistration} component={ShowPreferenceRegistration} />
        <Stack.Screen name={MainRoutes.SchoolRegistration} component={SchoolRegistration} />
        <Stack.Screen name={MainRoutes.PassionsRegistration} component={PassionsRegistration} />
        <Stack.Screen name={MainRoutes.ProfileAnswersRegistration} component={ProfileAnswersRegistration} />

        {/* App Stack */}
        <Stack.Screen name={MainRoutes.Home} component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MainNavigation;
