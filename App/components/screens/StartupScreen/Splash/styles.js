import {StyleSheet} from 'react-native';
import {
  Fonts,
  scale,
  Colors,
  NormalizeText,
  Spacing,
  verticalScale,
} from '../../../../styles';

export default StyleSheet.create({
  flex1: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.BACKGROUND_COLOR,
  },
  logoContainer: {
    marginVertical: Spacing.y24,
    marginHorizontal: Spacing.x24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoImage: {
    width: scale(120),
    height: scale(46),
  },
  logoText: {
    textAlign: 'center',
    fontFamily: Fonts.bold,
    fontSize: NormalizeText(15),
    color: Colors.TEXT.TINT_COLOR,
  },
  description: {
    fontFamily: Fonts.medium,
    fontSize: NormalizeText(11),
    textAlign: 'center',
    color: Colors.TEXT.TINT_COLOR,
  },
  viewPager: {
    alignSelf: 'center',
    marginTop: Spacing.y24,
    height: scale(228),
    width: scale(374),
    borderRadius: scale(12),
  },
  imageView: {
    height: scale(228),
    width: scale(374),
    borderRadius: scale(12),
  },
  image: {
    flex: 1,
  },
  learnMoreButton: {
    marginTop: Spacing.y36,
    paddingVertical: Spacing.y6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  learnMoreText: {
    fontFamily: Fonts.medium,
    fontSize: NormalizeText(13),
    color: Colors.TEXT.TINT_COLOR,
  },
  actionContainer: {
    flex: 1,
    marginHorizontal: scale(60),
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: Spacing.y24,
  },
  buttonContainer: {
    marginTop: Spacing.y20,
  },
  courseButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: scale(80),
    marginTop: Spacing.y60,
   // backgroundColor: Colors.JOBS.BG_BLUE_COLOR,
    borderRadius: 15,
  },
  courseButtonIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: scale(55),
    width: scale(75),
    borderRightWidth: 1,
    borderRightColor: Colors.BACKGROUND_COLOR,
  },
  arrow: {
    marginRight: Spacing.x24,
    width: 9.3,
    height: 16.6,
  },
  courseBody: {
    flex: 1,
    marginTop: Spacing.y10,
    marginHorizontal: Spacing.x20,
  },
  courseButtonTextLabel: {
    flex: 1,
    fontFamily: Fonts.regular,
    fontSize: NormalizeText(17),
    color: Colors.TEXT.SECONDARY_COLOR,
    marginLeft: Spacing.x10,
    textAlign: 'center',
  },
  courseButtonLinerLayout: {
    alignItems: 'center',
    height: scale(80),
    marginTop: Spacing.y60,
    borderRadius: 15,
  }
});
