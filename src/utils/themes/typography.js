/**
 * Typography used in theme
 * @param {JsonObject} theme theme customization object
 *
 *
 */
import { Bebas_Neue, Urbanist } from 'next/font/google';

export const urbanist = Urbanist({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

const bebasNeue = Bebas_Neue({
  weight: ['400'],
  subsets: ['latin'],
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

export default function themeTypography(theme) {
  return {
    fontFamily: theme?.customization?.fontFamily,
    status: {
      fontWeight: 'bold',
      color: theme.heading,
      fontSize: '0.875rem',
    },
    label: {
      fontWeight: 'bold',
      color: theme.heading,
      fontSize: '0.75rem',
    },
    customlabel: {
      fontWeight: 'bold',
      color: theme.heading,
      fontSize: '0.80rem',
    },

    h6: {
      fontWeight: 500,
      color: theme.heading,
      fontFamily: bebasNeue.style.fontFamily,
      fontSize: '0.75rem',
    },
    h5: {
      fontSize: '0.875rem',
      color: theme.heading,
      fontFamily: bebasNeue.style.fontFamily,
      fontWeight: 500,
    },
    h4: {
      fontSize: '1rem',
      color: theme.heading,
      fontFamily: bebasNeue.style.fontFamily,
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.25rem',
      fontFamily: urbanist.style.fontFamily,
      color: theme.heading,
      fontWeight: 600,
    },
    h2: {
      fontSize: '1.5rem',
      fontFamily: bebasNeue.style.fontFamily,
      color: theme.heading,
      fontWeight: 700,
    },
    h1: {
      fontSize: '2.125rem',
      fontFamily: bebasNeue.style.fontFamily,
      color: theme.heading,
      fontWeight: 700,
    },
    subtitle1: {
      fontSize: '0.875rem',
      fontWeight: 500,
      color: theme.textDark,
    },
    subtitle2: {
      fontSize: '0.75rem',
      fontWeight: 400,
      color: theme.darkText,
    },
    caption: {
      fontSize: '0.75rem',
      color: theme.darkTextSecondary,
      fontWeight: 400,
    },
    body1: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: '1.334em',
    },
    body2: {
      letterSpacing: '0em',
      fontWeight: 400,
      lineHeight: '1.5em',
      color: theme.darkTextPrimary,
    },
    button: {
      textTransform: 'capitalize',
    },
    customInput: {
      marginTop: 1,
      marginBottom: 1,
      '& > label': {
        top: 23,
        left: 0,
        color: theme.grey500,
        '&[data-shrink="false"]': {
          top: 5,
        },
      },
      '& > div > input': {
        padding: '30.5px 14px 11.5px !important',
      },
      '& legend': {
        display: 'none',
      },
      '& fieldset': {
        top: 0,
      },
    },
    mainContent: {
      backgroundColor: theme.background,
      width: '100%',
      minHeight: 'calc(100vh - 88px)',
      flexGrow: 1,
      padding: '20px',
      marginTop: '88px',
      marginRight: '20px',
      borderRadius: `${theme?.customization?.borderRadius}px`,
    },
    menuCaption: {
      fontSize: '0.875rem',
      fontWeight: 500,
      color: theme.heading,
      padding: '6px',
      textTransform: 'capitalize',
      marginTop: '10px',
    },
    subMenuCaption: {
      fontSize: '0.6875rem',
      fontWeight: 500,
      color: theme.darkTextSecondary,
      textTransform: 'capitalize',
    },
    commonAvatar: {
      cursor: 'pointer',
      borderRadius: '8px',
    },
    smallAvatar: {
      width: '22px',
      height: '22px',
      fontSize: '1rem',
    },
    mediumAvatar: {
      width: '34px',
      height: '34px',
      fontSize: '1.2rem',
    },
    largeAvatar: {
      width: '44px',
      height: '44px',
      fontSize: '1.5rem',
    },
  };
}
