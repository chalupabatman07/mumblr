export enum MainRoutes {
  // Lander
  Lander = 'Lander', // Lander page if the user is not registered

  // Auth Stack
  SignUpNumber = 'SignUpNumber', // new user entry point
  SignUpVerification = 'SignUpVerification',
  SignUpDetails = 'SignUpDetails',

  // App Stack
  Home = 'Home', // The first "real" page of the app, now a set of tabs
}

export type MainStackParamList = {
  // Lander
  [MainRoutes.Lander]: undefined;

  // Auth Stack
  [MainRoutes.SignUpNumber]: undefined;
  [MainRoutes.SignUpVerification]: { phoneNumber: string };
  [MainRoutes.SignUpDetails]: undefined;

  // App Stack
  [MainRoutes.Home]: undefined;
};
