import React from 'react';
import { Text, View } from 'react-native';

import { LanderButton } from '../../components/Button';
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

  const handleCreateAccount = (): void => {
    // Navigate to create account screen
    console.log('we are navigating to create account');
  };

  const showLoginOptions = (): void => {
    console.log('we are displaying login options');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mumblr</Text>
        <Text>Your personality matters</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.option}>
          <Text style={{ maxWidth: 250, fontSize: 12 }}>
            By signing up for Mumblr, you agree to our Terms of Service. Learn how we process your data in our Privacy
            Policy and Cookies Policy.
          </Text>
        </View>
        <View style={styles.option}>
          <LanderButton text={'Create account'} handlePress={handleCreateAccount} type={'secondary'} />
        </View>
        <View>
          <LanderButton text={'Sign in'} handlePress={showLoginOptions} type={'transparent'} height={'thin'} />
        </View>
      </View>
    </View>
  );
};
