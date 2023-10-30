/**
 * Color intention that you want to used in your theme
 * @param {JsonObject} theme Theme customization object
 */

export default function themePalette(theme) {
  return {
    mode: theme?.customization?.navType,
    common: {
      black: theme.colors?.darkPaper,
    },
    // primary: {
    //   light: theme.colors?.primaryLight,
    //   main: theme.colors?.primaryMain,
    //   dark: theme.colors?.primaryDark,
    //   200: theme.colors?.primary200,
    //   800: theme.colors?.primary800,
    // },
    secondary: {
      light: theme.colors?.secondaryLight,
      main: theme.colors?.secondaryMain,
      dark: theme.colors?.secondaryDark,
      200: theme.colors?.secondary200,
      800: theme.colors?.secondary800,
    },
    error: {
      light: theme.colors?.errorLight,
      main: theme.colors?.errorMain,
      dark: theme.colors?.errorDark,
    },
    orange: {
      light: theme.colors?.orangeLight,
      main: theme.colors?.orangeMain,
      dark: theme.colors?.orangeDark,
    },
    warning: {
      light: theme.colors?.warningLight,
      main: theme.colors?.warningMain,
      dark: theme.colors?.warningDark,
    },
    success: {
      light: theme.colors?.successLight,
      200: theme.colors?.success200,
      main: theme.colors?.successMain,
      dark: theme.colors?.successDark,
    },
    grey: {
      50: theme.colors?.grey50,
      100: theme.colors?.grey100,
      500: theme.darkTextSecondary,
      600: theme.heading,
      700: theme.darkTextPrimary,
      900: theme.textDark,
    },
    dark: {
      light: theme.colors?.darkTextPrimary,
      main: theme.colors?.darkLevel1,
      dark: theme.colors?.darkLevel2,
      800: theme.colors?.darkBackground,
      900: theme.colors?.darkPaper,
    },
    text: {
      primary: theme.darkTextPrimary,
      secondary: theme.darkTextSecondary,
      dark: theme.textDark,
      hint: theme.colors?.grey100,
    },
    background: {
      paper: theme.paper,
      default: theme.backgroundDefault,
    },
    primary: {
      light: theme.colors?.primaryLight,
      main: '#A62973',
      mainone: '#672376',
      secbg: '#FCD3D1',
      thirdsec: '#EE5064',
      purp: '#672376',
      pinkcol: '#DAB0E3',
      dropdown: '#DCBDE3',
      accord: '#E5BED5',
      drophire: '#DCA9C7',
      droppart: '#F3C3C9',
      pinktwo: '#EBC8DD',
      redpink: '#FFCCC9',
      redpinktwo: '#FFE3E3',
      redpinkthree: '#EDD8F2',
      paragrey: '#545454',
      headaboutus: '#380943',
      litepink: '#F2B8FF',
      lite: '#ffffff7a',
      footer: '#3B0647',
      future: '#EFBEBE',
    },
    pinkPalette: {
      extraDark: '#7A1450',
      dark: '#A62973',
      light: '#EE5064',
      superLight: '#FCD3D1',
      extraSuperLight: '#eabad640',
      navLight: '#EFD8E6',
    },
    primaryPalette: {
      white: '#FFFFFF',
      black: '#3A3A3A',
      primaryBlack: '#212121',
      grey: '#707070',
    },
    violetPalette: {
      dark: '#672376',
      light: '#EDD8F2',
      superLight: '#EDD8F2',
    },
  };
}
