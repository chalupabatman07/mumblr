import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Video from 'react-native-video';

import MumblrLander from '../../../assets/video/mumblr_lander.mp4';

const { height } = Dimensions.get('window');

export const BackgroundVideo = () => (
  <Video source={MumblrLander} style={[StyleSheet.absoluteFill, { height }]} resizeMode={'cover'} repeat />
);
