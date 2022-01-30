import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

interface Props {
  text: string;
  handlePress: () => void;
  type?: 'primary' | 'secondary' | 'transparent';
  height?: 'normal' | 'thin';
}

const backgroundStyles = StyleSheet.create({
  btn: {
    width: 250,
    alignItems: 'center',
    borderRadius: 50,
  },
  primary: {
    backgroundColor: '#8e44ad',
  },
  secondary: {
    backgroundColor: '#bdc3c7',
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  normal: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  thin: {
    paddingTop: 2,
    paddingBottom: 2,
  },
});

const textStyles = StyleSheet.create({
  text: {
    fontFamily: 'nexa',
    fontSize: 14,
  },
  primary: {
    color: '#FFFFFF',
  },
  secondary: {
    color: '#000000',
  },
  transparent: {
    color: '#FFFFFF',
  },
});

export const LanderButton = ({ text, handlePress, type = 'primary', height = 'normal' }: Props) => (
  <Pressable
    style={[backgroundStyles.btn, backgroundStyles[type], backgroundStyles[height]]}
    onPress={() => handlePress()}
  >
    <Text style={[textStyles.text, textStyles[type]]}>{text}</Text>
  </Pressable>
);
