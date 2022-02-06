import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';

import { MutationUpdateUserArgs, User } from '../../../../generated/graphql';
import { validateEmail } from '../../../../utils';

const UPDATE_USER = gql`
  mutation updateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
      email
      phoneNumber
      verified
      registration {
        id
        verifiedPhoneNumber
        verifiedEmail
        completedEmailEntry
        completedNameEntry
        completedBirthdayEntry
        completedGenderEntry
        completedOrSkippedSexualOrientationEntry
        completedShowMeEntry
        completedOrSkippedSchoolEntry
        completedOrSkippedPassionsEntry
        completedProfileAnswersEntry
      }
    }
  }
`;

export const EmailRegistration = ({ navigation }: any) => {
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
      navigation.navigate('NameRegistration');
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
