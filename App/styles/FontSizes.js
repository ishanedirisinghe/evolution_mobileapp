import { NormalizeText } from './NormalizeText';

const FontSize = {
    h1: NormalizeText(40), // Display
    h2: NormalizeText(25), // Heading
    h3: NormalizeText(24), // subheading
    h4: NormalizeText(20), // title
    h5: NormalizeText(18), // sub title
    caption: NormalizeText(16), // caption
    body: NormalizeText(14),
    bodySmall: NormalizeText(12),
    label: NormalizeText(12),
    smallLabel: NormalizeText(10),
    Button: NormalizeText(16)
};

export { FontSize };
