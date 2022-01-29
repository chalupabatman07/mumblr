import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { useQuery } from 'urql';

import { User } from '../../generated/graphql';

const userQuery = `
  query {
    me {
      id
      email
      phoneNumber
    }
  }
`;

export const Home = () => {
  const [result] = useQuery<User>({
    query: userQuery,
  });

  useEffect(() => {
    console.log('result loading: ', result.fetching);
    console.log('result error: ', result.error);
    console.log('result.data: ', result.data);
  }, [result]);

  return <Text>Welcome home you bitch</Text>;
};
