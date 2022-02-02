import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flex: 0.33,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 0.66,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'segoesc',
    fontSize: 48,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  subtitle: {
    fontFamily: 'nexa-bold',
    fontSize: 14,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  options: {
    paddingBottom: 8,
  },
  termsText: {
    maxWidth: 250,
    fontSize: 10,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
