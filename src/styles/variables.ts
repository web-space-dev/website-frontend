import { Darker_Grotesque } from "next/font/google";

export const colors = {
  white: "#F8F8F8",
  black: "#1D1D1D",
  blackLight: "#00000019",
  accent: "#39979C",
  accentLight: "#39979C33",
  bgLight: "#FFFFFF33",
} as const;
/**
 * Keys for the global color variable
 */
export type WebSpaceColorKey = keyof typeof colors;

/**
 * This type allows for color properties to be evaluated against global Color values.
 * These values can be accessed by importing "colors" from 'src/styles/variables'
 *
 * eg. `colors.brandYellow == '#FFC52B'`
 *
 *
 * There is also `WebSpaceColorKey` for evaluating the keys of the color map
 */
export type WebSpaceColorVal = (typeof colors)[WebSpaceColorKey];

export const darkerGrotesque = Darker_Grotesque({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

/**
 * This type allows for font properties to be evaluated against global Color values.
 * These values can be accessed by importing "font" from 'src/styles/variables'
 *
 * eg. `colors.sansSerif == 'Darker Grotesque'`
 *
 *
 * There is also `WebSpaceFontKey` for evaluating the keys of the font map
 */
// export type WebSpaceFontVal = (typeof fonts)[WebSpaceFontKey];

export const breakpoints = {
  sm: 500,
  md: 900,
  lg: 1600,
} as const;

/**
 * Keys for the global breakpoints variable
 */
export type WebSpaceBreakPointKey = keyof typeof breakpoints;

/**
 * This type allows for color properties to be evaluated against global BreakPoint values.
 *
 *
 * There is also `BreakPointKey` for evaluating the keys of the breakpoint map
 */
export type WebSpaceBreakPointVal = (typeof breakpoints)[WebSpaceBreakPointKey];

export const widths = {
  md: 720,
  lg: 960,
  xl: 1140,
};

export const baseFontSize = 22;

export const dimensions = {
  fontSize: {
    regular: 22,
    large: 24,
  },
  headingSizes: {
    h1: 64,
    h2: 66,
    h3: 36,
    h4: 30,
    h5: 20,
    small: 60,
    medium: 110,
    large: 240,
    extraLarge: 344,
  },
  headingSizesMobile: {
    h1: 40,
    h2: 40,
    h3: 24,
    h4: 20,
    h5: 20,
    medium: 36,
    large: 70,
    extraLarge: 103,
  },
  lineHeight: {
    regular: 1.45,
    heading: 1.2,
  },
  gridContainerPadding: 20,
  gridContainerMobileTabletPadding: 25,
};

export const heights = {
  header: 60,
};
