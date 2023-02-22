import { PixelRatio, Dimensions } from 'react-native';

const pixelRatio = PixelRatio.get();
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const NormalizeText = size => {
    if (pixelRatio >= 2 && pixelRatio < 3) {
        // iphone 5s and older Androids
        if (deviceWidth < 360) {
            return size * 0.8;
        }
        // iphone 5
        if (deviceHeight < 667) {
            return size * 0.9;
            // iphone 6-6s
        }
        if (deviceHeight >= 667 && deviceHeight <= 735) {
            return size * 0.95;
        }
        // older phablets
        return size;
    }
    if (pixelRatio >= 3 && pixelRatio < 3.5) {
        // catch Android font Scaling on small machines
        // where pixel ratio / font scale ratio => 3:3
        if (deviceWidth <= 360) {
            return size * 0.9;
        }
        // Catch other weird android width sizings
        if (deviceHeight < 667) {
            return size * 0.95;
            // catch in-between size Androids and scale font up
            // a tad but not too much
        }
        if (deviceHeight >= 667 && deviceHeight <= 735) {
            return size * 0.975;
        }
        // catch larger devices
        // ie iphone 6s plus / 7 plus / mi note 等等
        return size * 1.02;
    }
    if (pixelRatio >= 3.5) {
        // catch Android font Scaling on small machines
        // where pixel ratio / font scale ratio => 3:3
        if (deviceWidth <= 360) {
            return size * 0.95;
            // Catch other smaller android height sizings
        }
        if (deviceHeight < 667) {
            return size * 0.975;
            // catch in-between size Androids and scale font up
            // a tad but not too much
        }
        if (deviceHeight >= 667 && deviceHeight <= 735) {
            return size * 0.95;
        }
        // catch larger phablet devices
        return size * 1.05;
    }
    return size;
};

export { NormalizeText };
