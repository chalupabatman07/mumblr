import React from 'react';
import { Button, Text, View } from 'react-native';

import { styles } from './styles';

export const Lander = () => {
  const handleSignInPressed = async (): Promise<void> => {
    try {
      const response = await fetch('http://10.0.2.2:8080/api/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'blah111@gmail.com',
          password: 'Welcome1!',
        }),
      });
      const data = await response.json();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Text>sup bitch</Text>
      <Button title={'Press here to sign in'} color={'#f194ff'} onPress={handleSignInPressed} />
    </View>
  );
};
