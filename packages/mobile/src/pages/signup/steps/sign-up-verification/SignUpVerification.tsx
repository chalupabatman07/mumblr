import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';

import { MainRoutes } from '../../../../routes';
import { MainNavigationProps, MainNavigationRouteProps } from '../../../../routes/types';

interface Props {
  navigation: MainNavigationProps<MainRoutes.SignUpVerification>;
  route: MainNavigationRouteProps<MainRoutes.SignUpVerification>;
}

const CELL_COUNT = 6;

const styles = StyleSheet.create({
  root: {
    padding: 20,
    minHeight: 300,
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
  },
  codeFieldRoot: {
    marginTop: 20,
    width: 280,
  },
  cellRoot: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  cellText: {
    color: '#000',
    fontSize: 18,
    textAlign: 'center',
  },
});

export const SignUpVerification = ({ route, navigation }: Props) => {
  const [phoneNumber] = useState<string>(route.params.phoneNumber);
  const [verification, setVerification] = useState<string>('');

  const ref = useBlurOnFulfill({ value: verification, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: verification,
    setValue: setVerification,
  });

  useEffect(() => {
    if (verification.length < 6) {
      return;
    }

    const handleRegisterPhoneNumber = async (): Promise<void> => {
      const num = phoneNumber.replace(/[- )(]/g, '');

      try {
        const response = await fetch('http://10.0.2.2:8080/api/signup', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            phoneNumber: num,
          }),
        });
        const data = await response.json();
        await SecureStore.setItemAsync('token', data.token);
        navigation.navigate(MainRoutes.SignUpDetails);
      } catch (e) {
        console.log(e);
      }
    };

    // TODO: Set this to check the verification code sent via text
    // For now lets just use 123456 as verification
    if (verification === '123456') {
      handleRegisterPhoneNumber();
    }
  }, [navigation, phoneNumber, verification]);

  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.title}>Underline example</Text>
      <CodeField
        ref={ref}
        {...props}
        value={verification}
        onChangeText={setVerification}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType='number-pad'
        textContentType='oneTimeCode'
        renderCell={({ index, symbol, isFocused }) => (
          <View onLayout={getCellOnLayoutHandler(index)} key={index} style={styles.cellRoot}>
            <Text style={styles.cellText}>{symbol || (isFocused ? <Cursor /> : null)}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};
