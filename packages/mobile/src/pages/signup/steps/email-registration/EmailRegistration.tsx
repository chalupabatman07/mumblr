import { gql, useMutation } from '@apollo/client';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';

import { MutationUpdateUserArgs, User } from '../../../../generated/graphql';
import { MainRoutes, MainStackParamList } from '../../../../routes';
import { validateEmail } from '../../../../utils';

const UPDATE_USER = gql`
  mutation updateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
      email
      phoneNumber
      verified
      name
      birthday
      gender
      sexualOrientation
      showPreference
      school
    }
  }
`;

type Props = NativeStackScreenProps<MainStackParamList, MainRoutes.EmailRegistration>;

export const EmailRegistration = ({ navigation }: Props) => {
  const [email, setEmail] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(true);

  const [updateUser] = useMutation<{ updateUser: User }, MutationUpdateUserArgs>(UPDATE_USER);

  const handleEmailChange = (value: string): void => {
    setEmail(value);
    if (validateEmail(value)) {
      setDisabled(false);
    }
  };

  const handleUpdateEmail = async (): Promise<void> => {
    const input = { email };
    const { errors } = await updateUser({ variables: { input } });
    if (!errors) {
      navigation.navigate(MainRoutes.NameRegistration);
    }
  };

  return (
    <View>
      <Text>What's your email?</Text>
      <Text>We can verify your email so you don't lose access to your account.</Text>
      <TextInput
        value={email}
        onChangeText={(value: string) => handleEmailChange(value)}
        autoFocus={true}
        placeholder='Enter email'
      />
      <Button title='Continue' disabled={disabled} onPress={handleUpdateEmail} />
    </View>
  );
};
