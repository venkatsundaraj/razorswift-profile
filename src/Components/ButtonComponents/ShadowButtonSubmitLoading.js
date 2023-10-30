import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
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

export default ShadowButtonSubmitLoading;
