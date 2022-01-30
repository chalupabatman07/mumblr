export enum MainRoutes {
  // Auth Stack
  Lander = 'Lander', // Lander page if the user is not registered
  SignUp = 'SignUp', // new user entry point

  // App Stack
  Home = 'Home', // The first "real" page of the app, now a set of tabs
}

export type MainStackParamList = {
  // Auth Stack
  [MainRoutes.Lander]: undefined;
  [MainRoutes.SignUp]: undefined;

  // App Stack
  [MainRoutes.Home]: undefined;
};
