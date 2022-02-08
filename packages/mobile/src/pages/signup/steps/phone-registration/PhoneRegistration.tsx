import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Pressable, Text, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';

import { MainRoutes, MainStackParamList } from '../../../../routes';
import { formatPhoneNumber } from '../../../../utils';
import { styles } from './styles';

type Props = NativeStackScreenProps<MainStackParamList, MainRoutes.PhoneRegistration>;

export const PhoneRegistration = ({ navigation }: Props) => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [signUpDisabled, setSignUpDisabled] = useState<boolean>(true);

  const handlePhoneNumberChange = (phoneNum: string) => {
    const formattedNumber = formatPhoneNumber(phoneNum);
    setPhoneNumber(formattedNumber);

    if (phoneNumber.length === 13) {
      setSignUpDisabled(false);
    }
  };

  const handleChangeCountry = (): void => {
    // TODO: Load the country selection page and allow user to select a country
  };

  const handleBack = (): void => {
    navigation.navigate(MainRoutes.Lander);
  };

  const handleRegisterByPhone = async (): Promise<void> => {
    navigation.navigate(MainRoutes.PhoneVerification, { phoneNumber });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Icon name='arrow-left' onPress={handleBack} />
      <Text>What's your number?</Text>
      <View style={styles.phoneInfoContainer}>
        <View style={styles.phoneInputRow}>
          <Pressable style={styles.countryBtn} onPress={() => handleChangeCountry()}>
            <Text style={styles.countryInputText}>US +1</Text>
          </Pressable>
          <TextInput
            style={styles.phoneInput}
            textContentType='telephoneNumber'
            keyboardType='phone-pad'
            onChangeText={(text: string) => handlePhoneNumberChange(text)}
            maxLength={14}
            value={phoneNumber}
            placeholder='Phone number'
          />
        </View>
        <View>
          <Text style={styles.textRateText}>Mumblr will send you a text with a verifcation code.</Text>
          <Text style={styles.textRateText}>Message and data rates may apply.</Text>
        </View>
        <Pressable style={styles.nextBtn} onPress={() => handleRegisterByPhone()} disabled={signUpDisabled}>
          <Icon name='angle-right' size={15} />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};
