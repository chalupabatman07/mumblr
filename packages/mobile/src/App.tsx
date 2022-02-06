import { ApolloClient, ApolloProvider, from, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import * as SecureStore from 'expo-secure-store';
import React, { useState } from 'react';

import { MainRoutes, MainStackParamList } from './routes';
import MainNavigation from './routes/MainNavigation';

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

  return (
    <ApolloProvider client={client}>
      <MainNavigation initialRoute={initialRoute} />
    </ApolloProvider>
  );
};

export default App;
