import { ApolloClient, ApolloProvider, from, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';
import React, { useState } from 'react';

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
} from './pages';
import { MainRoutes, MainStackParamList } from './routes';

const App = () => {
  const [initialRoute] = useState<keyof MainStackParamList>(MainRoutes.Lander);

  const getToken = async (): Promise<string | null> => {
    const token = await SecureStore.getItemAsync('token');
    return token;
  };

  const httpLink = new HttpLink({
    uri: 'http://10.0.2.2:8080/graphql',
  });

  const contextLink = setContext(async operation => {
    const token = await getToken();
    if (!token) {
      return {};
    }

    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: from([contextLink, httpLink]),
  });

  const Stack = createNativeStackNavigator<MainStackParamList>();

  return (
    <ApolloProvider client={client}>
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
    </ApolloProvider>
  );
};

export default App;
