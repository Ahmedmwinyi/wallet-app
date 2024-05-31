import { Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export const COLORS = {

    //BASE COLOR
    primary: "#E8751A",
    secondary: "#0C0C0C",
    gradient: "#FFAF45",

    blue: "#007BFF",
    lightBlue: "#378CE7",

    red: "#E72929",
    lightRed: "#D6589F",

    purple: "#912BBC",
    lightPurple: "#D895DA",

    black: "#000000",
    white: "#FFFFFF",

    lightGray: "#EEEEEE",
    gray: "#DDDDDD",
    darkGray: "#31363F",

    teal: "#008DDA",
    lightTeal: "#97E7E1",

    yellow: "#FFC700",
    lightYellow: "#F5DD61",

    brown: "#481E14",
    darkBrown: "#3E3232",

    green: "#87A922",
    greenLight: "#90D26D",
    darkGreen: "#12372A",

    success: "#14A44D",
    warning: "#E4A11B",
    info: "#54B4D3",
    danger: "#DC4C64",
    dark: "#332D2D",
    light: "#FBFBFB",
    primary1: "#3B71CA",
    secondary1: "#9FA6B2",

    transparent: "transparent"

}

export const SIZE = {

    //GLOBAL SIZE
    base: 8,
    font: 14,
    padding: 10,
    padding2: 12,
    radius: 30,

    //font size
    largeTitle: 50,
    h1: 30,
    h2: 22,
    h3: 20,
    h4: 18,
    body1: 30,
    body2: 20,
    body3: 16,
    body4: 14,
    body5: 12,

    //app dimension
    width,
    height

}

export const FONTS = {
    largeTitle: { fontSize: SIZE.largeTitle, lineHeight: 36 },
    h1: { fontSize: SIZE.h1, lineHeight: 36 },
    h2: { fontSize: SIZE.h2, lineHeight: 30 },
    h3: { fontSize: SIZE.h3, lineHeight: 22 },
    h4: { fontSize: SIZE.h4, lineHeight: 22 },
    body1: { fontSize: SIZE.body1, lineHeight: 36 },
    body2: { fontSize: SIZE.body2, lineHeight: 30 },
    body3: { fontSize: SIZE.body3, lineHeight: 22 },
    body4: { fontSize: SIZE.body4, lineHeight: 22 },
    body5: { fontSize: SIZE.body5, lineHeight: 22 },
}

const AppTheme = { COLORS, FONTS, SIZE };

export default AppTheme;