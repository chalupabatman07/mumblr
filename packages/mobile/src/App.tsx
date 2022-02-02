import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { createClient, Provider } from 'urql';

import { MainRoutes, MainStackParamList } from './routes';
import MainNavigation from './routes/MainNavigation';

const App = () => {
  const [mumblrToken, setMumblrToken] = useState<string | null>(null);
  const [initialRoute, setInitialRoute] = useState<keyof MainStackParamList>(MainRoutes.Lander);

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
    // const getMumblrToken = async (): Promise<void> => {
    //   const token = await getToken();
    //   setMumblrToken(token);
    // };
    // getMumblrToken();
    const deleteMumblrToken = async (): Promise<void> => {
      await SecureStore.deleteItemAsync('token');
      await SecureStore.deleteItemAsync('mumblrToken');
    };
    deleteMumblrToken();
  }, []);

  useEffect(() => {
    if (mumblrToken) {
      setInitialRoute(MainRoutes.Home);
    }
  }, [mumblrToken, initialRoute]);

  return (
    <Provider value={client}>
      <MainNavigation initialRoute={initialRoute} />
    </Provider>
  );
};

export default App;
