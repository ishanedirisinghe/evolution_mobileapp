import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

// Guideline sizes are based on iPhone XS Max
const guidelineBaseWidth = 414; // 414;
const guidelineBaseHeight = 896; // 896;

const scale = size => {
    return (width / guidelineBaseWidth) * size;
};

const horizontalScale = size => (width / guidelineBaseWidth) * size;
const verticalScale = size => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
    size + (scale(size) - size) * factor;

export { scale, horizontalScale, verticalScale, moderateScale };
