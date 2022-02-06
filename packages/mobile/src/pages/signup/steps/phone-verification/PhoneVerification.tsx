import { gql, useMutation } from '@apollo/client';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect, useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field';

import { AuthToken, MutationCreateUserArgs } from '../../../../generated/graphql';

interface Props {
  navigation: any;
  route: any;
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

const CREATE_USER = gql`
  mutation createUser($phoneNumber: String!) {
    createUser(phoneNumber: $phoneNumber) {
      token
    }
  }
`;

export const PhoneVerification = ({ route, navigation }: Props) => {
  const [phoneNumber] = useState<string>(route.params.phoneNumber);
  const [verification, setVerification] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(true);

  const ref = useBlurOnFulfill({ value: verification, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value: verification,
    setValue: setVerification,
  });

  const [createUser] = useMutation<{ createUser: AuthToken }, MutationCreateUserArgs>(CREATE_USER);

  const handleOnContinue = async () => {
    const num = phoneNumber.replace(/[- )(]/g, '');
    const { data } = await createUser({ variables: { phoneNumber: num } });
    if (!data) {
      // TODO: handle error when user tries to sign up
      return;
    }
    const token = data.createUser.token;
    await SecureStore.setItemAsync('token', token);
    navigation.navigate('EmailRegistration');
  };

  useEffect(() => {
    if (verification.length < 6) {
      return;
    }
    setDisabled(false);
  }, [verification.length]);

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
      <Button title='Continue' onPress={handleOnContinue} disabled={disabled} />
    </SafeAreaView>
  );
};
