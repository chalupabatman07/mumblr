import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  phoneInfoContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  phoneInputRow: {
    flexDirection: 'row',
  },
  countryBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    marginRight: 15,
    width: 65,
    alignItems: 'flex-end',
  },
  countryInputText: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'nexa',
    fontWeight: 'bold',
  },
  phoneInput: {
    fontFamily: 'nexa',
    fontWeight: 'bold',
    fontSize: 18,
    width: 150,
    borderBottomWidth: 0.5,
    paddingLeft: 0,
    paddingBottom: 1,
    paddingRight: 0,
  },
  textRateText: {
    fontSize: 12,
  },
  nextBtn: {
    width: 30,
    height: 30,
    borderRadius: 100,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
