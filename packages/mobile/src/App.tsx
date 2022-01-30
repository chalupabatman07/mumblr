import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { createClient, Provider } from 'urql';

import { Home } from './pages/home';
import { Lander } from './pages/lander';

const App = () => {
  const [mumblrToken, setMumblrToken] = useState<string | null>(null);
  const [initialRoute, setInitialRoute] = useState<string>('lander');

  const Stack = createNativeStackNavigator();

  const getToken = async (): Promise<string | null> => {
    return await SecureStore.getItemAsync('mumblrToken');
  };

  const client = createClient({
    url: 'http://10.0.2.2:8080/graphql',
    fetchOptions: () => {
      return {
        headers: {
          authorization: `Bearer ${mumblrToken}`,
        },
      };
    },
  });

  useEffect(() => {
    const getMumblrToken = async (): Promise<void> => {
      const token = await getToken();
      setMumblrToken(token);
    };
    getMumblrToken();
  }, []);

  useEffect(() => {
    if (!mumblrToken) {
      setInitialRoute('lander');
    }
  }, [mumblrToken, initialRoute]);

  return (
    <Provider value={client}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
          <Stack.Screen name={'home'} component={Home} />
          <Stack.Screen name={'lander'} component={Lander} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
