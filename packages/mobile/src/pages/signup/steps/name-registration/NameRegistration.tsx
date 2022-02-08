import { gql, useMutation } from '@apollo/client';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';

import { MutationUpdateUserArgs, User } from '../../../../generated/graphql';
import { MainRoutes, MainStackParamList } from '../../../../routes';

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

type Props = NativeStackScreenProps<MainStackParamList, MainRoutes.NameRegistration>;

export const NameRegistration = ({ navigation }: Props) => {
  const [name, setName] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(true);

  const [updateUser] = useMutation<{ updateUser: User }, MutationUpdateUserArgs>(UPDATE_USER);

  const handleNameChange = (value: string): void => {
    if (value.length >= 1) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
    setName(value);
  };

  const handleUpdateName = async (): Promise<void> => {
    const input = { name };
    const { errors } = await updateUser({ variables: { input } });
    if (!errors) {
      navigation.navigate(MainRoutes.BirthdayRegistration);
    }
  };

  return (
    <View>
      <Text>My name is</Text>
      <TextInput
        value={name}
        onChangeText={(value: string) => handleNameChange(value)}
        autoFocus={true}
        placeholder='First Name'
      />
      <Button title='Continue' disabled={disabled} onPress={handleUpdateName} />
    </View>
  );
};
