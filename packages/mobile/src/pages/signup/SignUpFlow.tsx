import React, { useState } from 'react';

import { MainRoutes } from '../../routes';
import { MainNavigationProp } from '../../routes/types';
import { SignUpNumber } from './steps';

interface Props {
  navigation: MainNavigationProp<MainRoutes.SignUpFlow>;
}

export const SignUpFlow = ({ navigation }: Props) => {
  const [step, setStep] = useState<number>(0);

  const steps = [SignUpNumber];

  const createAccountByPhoneNumber = () => {};

  return <>{steps[step]({ navigation })}</>;
};
