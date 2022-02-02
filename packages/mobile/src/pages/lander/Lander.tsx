import React from 'react';
import { Text, View } from 'react-native';

import { BackgroundVideo } from '../../components/backgroundVideo';
import { LanderButton } from '../../components/button';
import { TextLink } from '../../components/button/TextLink';
import { MainRoutes } from '../../routes';
import { MainNavigationProps } from '../../routes/types';
import { styles } from './styles';

interface Props {
  navigation: MainNavigationProps<MainRoutes.Lander>;
}

export const Lander = ({ navigation }: Props) => {
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
    navigation.navigate(MainRoutes.SignUpNumber);
  };

  const showLoginOptions = (): void => {
    console.log('we are displaying login options');
  };

  return (
    <View style={styles.container}>
      <BackgroundVideo />
      <View style={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Mumblr</Text>
          <Text style={styles.subtitle}>Your personality matters</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.options}>
            <Text style={styles.termsText}>
              By signing up for Mumblr, you agree to our{' '}
              <TextLink url={'terms_of_service_url'}>Terms of Service.</TextLink> Learn how we process your data in our{' '}
              <TextLink url={'privacy_policy_url'}>Privacy Policy</TextLink> and{' '}
              <TextLink url={'cookies_policy_url'}>Cookies Policy</TextLink>.
            </Text>
          </View>
          <View style={styles.options}>
            <LanderButton text={'Create account'} handlePress={handleCreateAccount} />
          </View>
          <View style={styles.options}>
            <LanderButton text={'Sign in'} handlePress={showLoginOptions} type={'transparent'} height={'thin'} />
          </View>
        </View>
      </View>
    </View>
  );
};
