import React from 'react';
import { Linking, StyleSheet, Text } from 'react-native';

interface Props {
  children: string;
  url: string;
}

const styles = StyleSheet.create({
  text: {
    color: '#FFFFFF',
    textDecorationLine: 'underline',
    fontFamily: 'nexa-extra-bold',
    fontSize: 10,
  },
});

export const TextLink = ({ children, url }: Props) => {
  const handlePress = (): void => {
    // TODO: Replace this with mumblr website
    Linking.openURL('https://github.com/chalupabatman07/mumblr');
  };

  return (
    <Text onPress={() => handlePress()} style={styles.text}>
      {children}
    </Text>
  );
};
