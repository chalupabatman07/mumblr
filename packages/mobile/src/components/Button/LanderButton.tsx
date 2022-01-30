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
    backgroundColor: '#2c3e50',
  },
  secondary: {
    backgroundColor: '#9b59b6',
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
    color: 'white',
    fontFamily: 'nexa',
    fontSize: 14,
  },
});

export const LanderButton = ({ text, handlePress, type = 'primary', height = 'normal' }: Props) => {
  return (
    <Pressable
      style={[backgroundStyles.btn, backgroundStyles[type], backgroundStyles[height]]}
      onPress={() => handlePress()}
    >
      <Text style={textStyles.text}>{text}</Text>
    </Pressable>
  );
};
