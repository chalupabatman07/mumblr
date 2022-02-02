import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { MainRoutes, MainStackParamList } from '.';

export type MainNavigationProps<RouteName extends keyof MainStackParamList = MainRoutes> = NativeStackNavigationProp<
  MainStackParamList,
  RouteName
>;

export type MainNavigationRouteProps<RouteName extends keyof MainStackParamList = MainRoutes> = RouteProp<
  MainStackParamList,
  RouteName
>;
