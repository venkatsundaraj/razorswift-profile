import Button from '@mui/material/Button';
// import { alpha, styled } from '@mui/material/styles';

import { alpha, styled } from '@mui/system';

const ShadowButtonSubmit = styled(Button)(
  ({
    theme,
    backgroundcolor,
    height,
    width,
    maxwidth,
    minwidth,
    styleProps,
  }) => ({
    '&.Mui-disabled': {
      backgroundColor: 'gray',
      color: 'gray',
      // Add any other custom styles for disabled state
    },
    height: height || '66px',
    width: width || '207px',
    minWidth: minwidth || '207px',
    maxWidth: maxwidth || 'initial',
    boxShadow: `7px 10px 1px 2px ${alpha(backgroundcolor, 0.1)}`,
    [theme.breakpoints.down('sm')]: {
      height: height || '50px',
      width: width || '163px',
    },
    '&:hover': {
      backgroundColor: backgroundcolor,
      boxShadow: `7px 10px 1px 2px ${alpha(backgroundcolor, 0.2)}`,
    },
    backgroundColor: backgroundcolor,
    ...styleProps,
  })
);

export default ShadowButtonSubmit;
