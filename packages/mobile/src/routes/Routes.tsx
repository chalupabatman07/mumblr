export enum MainRoutes {
  // Lander
  Lander = 'Lander', // Lander page if the user is not registered

  // Registration Stack
  PhoneRegistration = 'PhoneRegistration',
  PhoneVerification = 'PhoneVerification',
  EmailRegistration = 'EmailRegistration',
  NameRegistration = 'NameRegistration',
  BirthdayRegistration = 'BirthdayRegistration',
  GenderRegistration = 'GenderRegistration',
  SexualOrientationRegistration = 'SexualOrientationRegistration',
  ShowPreferenceRegistration = 'ShowPreferenceRegistration',
  SchoolRegistration = 'SchoolRegistration',
  PassionsRegistration = 'PassionsRegistration',
  ProfileAnswersRegistration = 'ProfileAnswersRegistration',

  // App Stack
  Home = 'Home', // The first "real" page of the app, now a set of tabs
}

export type MainStackParamList = {
  // Lander
  [MainRoutes.Lander]: undefined;

  // Registration Stack
  [MainRoutes.PhoneRegistration]: undefined;
  [MainRoutes.PhoneVerification]: { phoneNumber: string };
  [MainRoutes.EmailRegistration]: undefined;
  [MainRoutes.NameRegistration]: undefined;
  [MainRoutes.BirthdayRegistration]: undefined;
  [MainRoutes.GenderRegistration]: undefined;
  [MainRoutes.SexualOrientationRegistration]: undefined;
  [MainRoutes.ShowPreferenceRegistration]: undefined;
  [MainRoutes.SchoolRegistration]: undefined;
  [MainRoutes.PassionsRegistration]: undefined;
  [MainRoutes.ProfileAnswersRegistration]: undefined;

  // App Stack
  [MainRoutes.Home]: undefined;
};
