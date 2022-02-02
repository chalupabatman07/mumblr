import React, { useEffect, useState } from 'react';

import { User } from '../../generated/graphql';
import { NavigationProps } from '../../routes/types';
import { formatPhoneNumber } from '../../utils';
import { SignUpNumber, SignUpVerification } from './steps';


const steps = [SignUpNumber, SignUpVerification];

export const SignUpFlow = ({ navigation }: NavigationProps) => {
  const [step, setStep] = useState<any>();
  const [flow, setFlow] = useState<number>(0);
  const [user, setUser] = useState<User | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  useEffect(() => {
    // We will determine where the user is at in the signup flow here
    setStep(steps[flow]);
  }, [flow]);

  const handlePhoneNumberChange = (phoneNum: string): void => {
    const formattedNumber = formatPhoneNumber(phoneNum);
    setPhoneNumber(formattedNumber);
  };

  const progressSignUp = (): void => {
    // setStep(step + 1);
  };

  return <>{step({ navigation, user, handlePhoneNumberChange, phoneNumber, progressSignUp })}</>;
};
