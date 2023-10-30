import { useTheme } from '@emotion/react';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
// import { alpha, styled } from '@mui/material/styles';
import { alpha, styled } from '@mui/system';
import { useState } from 'react';

const ShadowButtonSubmit = styled(Button)(
  ({
    theme,
    backgroundcolor,
    height,
    width,
    maxwidth,
    minwidth,
    styleProps,
    loading,
  }) => ({
    height: height || '66px',
    width: width || '207px',
    maxWidth: maxwidth || 'initial',
    boxShadow: `7px 10px 1px 2px ${alpha(backgroundcolor, 0.1)}`,
    backgroundColor: backgroundcolor,
    color: '#fff', // Set the text color to white
    ...styleProps,

    [theme.breakpoints.down('sm')]: {
      height: height || '50px',
      width: width || '163px',
    },

    '&:hover': {
      backgroundColor: backgroundcolor,
      boxShadow: `7px 10px 1px 2px ${alpha(backgroundcolor, 0.2)}`,
    },

    // Conditional styles for loading state
    '& .MuiButton-label': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: loading ? backgroundcolor : '#fff', // Set the text color to the background color while loading
    },
    '& .MuiCircularProgress-root': {
      color: loading ? backgroundcolor : theme.palette.text.primary, // Set the loading symbol color to the background color while loading
      marginRight: theme.spacing(1),
    },
    backgroundColor: loading ? '#ccc' : backgroundcolor,
    color: loading ? 'red' : backgroundcolor, // Set the background color to gray while loading
  })
);

const ShadowButtonSubmitLoading = ({
  loadingSymbol,
  loadingText,
  ...props
}) => {
  return (
    <ShadowButtonSubmit {...props} disabled={props.disabled || props.loading}>
      {props.loading && (
        <>
          <CircularProgress size={20} />
          {loadingText}
        </>
      )}
      {!props.loading && <span>{props.children}</span>}
    </ShadowButtonSubmit>
  );
};

const option5 = () => {
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  return (
    <ShadowButtonSubmitLoading
      backgroundcolor={theme.palette.primary.main}
      height="50px"
      width="100%"
      minwidth="250px"
      maxwidth="250px"
      loading={loading}
      loadingText={
        <Typography sx={{ color: theme.palette.primary.main }}>
          Submitting
        </Typography>
      }
      onClick={() => {
        setLoading(!loading);
      }}
    >
      <Typography sx={{ color: 'white' }}>Submit</Typography>
    </ShadowButtonSubmitLoading>
  );
};

export default option5;

function option8() {
  return (
    <ShadowButtonSubmitLoading
      backgroundcolor={theme.palette.primary.main}
      height="50px"
      width="100%"
      minwidth="300px"
      type="submit"
      loading={loading}
      loadingText={
        <ButtonText color={theme.palette.primary.main}>Submitting</ButtonText>
      }
      onClick={handleSubmit}
    >
      <ButtonText color="#fff">Login</ButtonText>
    </ShadowButtonSubmitLoading>
  );
}
