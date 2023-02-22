import { StyleSheet } from 'react-native';
import {
  Fonts,
  scale,
  Colors,
  NormalizeText,
  Spacing,
  verticalScale
} from '../../../../styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND_COLOR,
    padding: 20,
    justifyContent: 'center',
  },
  titleText: {
    textAlign: 'center',
    fontFamily: Fonts.medium,
    fontSize: NormalizeText(18),
    color: Colors.TEXT.PRIMARY_COLOR,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    borderColor: 'red',
    borderWidth: 5,
    borderRadius: 15,
    height: 45,
    width: 200,
  },
  courseTitleText: {
    fontFamily: Fonts.medium,
    fontSize: NormalizeText(14),
    color: Colors.TEXT.DARK_GRAY_COLOR,
    marginLeft: Spacing.x30,
    marginRight: Spacing.x30,
    textAlign: 'center',
    paddingBottom: Spacing.y12,
    marginBottom: 40,
  },
});
