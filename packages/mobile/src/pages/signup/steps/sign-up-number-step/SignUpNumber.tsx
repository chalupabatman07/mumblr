import React, { useState } from 'react';
import { KeyboardAvoidingView, Pressable, Text, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/Fontisto';

import { MainRoutes } from '../../../../routes';
import { MainNavigationProp } from '../../../../routes/types';
import { formatPhoneNumber } from '../../../../utils';
import { styles } from '../../styles';

interface Props {
  navigation: MainNavigationProp<MainRoutes.SignUpFlow>;
}

export const SignUpNumber = ({ navigation }: Props) => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const handlePhoneNumberChange = (phoneNum: string) => {
    const formattedNumber = formatPhoneNumber(phoneNum);
    setPhoneNumber(formattedNumber);
  };

  const handleProgress = (): void => {
    // const blah = phoneNumber.replaceAll('\\D', '');
  };

  const handleChangeCountry = (): void => {
    // TODO: Load the country selection page and allow user to select a country
  };

  const handleBack = (): void => {
    navigation.navigate(MainRoutes.Lander);
  };

  const handleRegisterByPhone = (): void => {
    // We do server stuff here
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <Icon name='arrow-left' onPress={handleBack} />
      <Text>What's your number?</Text>
      <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row' }}>
          <Pressable
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              borderBottomWidth: 0.5,
              marginRight: 15,
              width: 65,
              alignItems: 'flex-end',
            }}
            onPress={() => handleChangeCountry()}
          >
            <Text style={{ color: 'black', fontSize: 18, fontFamily: 'next', fontWeight: 'bold' }}>US +1</Text>
          </Pressable>
          <TextInput
            style={{
              fontFamily: 'nexa',
              fontWeight: 'bold',
              fontSize: 18,
              width: 150,
              borderBottomWidth: 0.5,
              paddingLeft: 0,
              paddingBottom: 1,
              paddingRight: 0,
            }}
            textContentType='telephoneNumber'
            keyboardType='phone-pad'
            onChangeText={(text: string) => handlePhoneNumberChange(text)}
            maxLength={14}
            value={phoneNumber}
            placeholder='Phone number'
          />
        </View>
        <View>
          <Text style={{ fontSize: 12 }}>Mumblr will send you a text with a verifcation code.</Text>
          <Text style={{ fontSize: 12 }}>Message and data rates may apply.</Text>
        </View>
        <Pressable
          style={{
            width: 30,
            height: 30,
            borderRadius: 100,
            backgroundColor: 'blue',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={handleRegisterByPhone}
        >
          <Icon name='angle-right' size={15} />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};
