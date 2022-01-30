import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  header: {
    flex: 0.33,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 0.66,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 25,
  },
  title: {
    fontFamily: 'segoesc',
    fontSize: 48,
  },
  subtitle: {
    fontFamily: 'nexa-bold',
    fontSize: 14,
    paddingBottom: '-5px',
  },
  createAccountBtn: {
    backgroundColor: 'yellow',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 8,
  },
  option: {
    marginBottom: 5,
  },
});
