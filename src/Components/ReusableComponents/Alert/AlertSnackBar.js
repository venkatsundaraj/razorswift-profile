import { clearAlertPopup } from '@/store/alertSlice';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AlertSnackbar = () => {
  const dispatch = useDispatch();
  const {
    message,
    type,
    duration = 3000,
    showSnackbar,
  } = useSelector(state => state.alertpopup);
  const router = useRouter();
  // useEffect(() => {
  //   const handleRouteChange = () => {
  //     dispatch(clearAlertPopup());
  //   };

  //   router.events.on('routeChangeStart', handleRouteChange);

  //   return () => {
  //     router.events.off('routeChangeStart', handleRouteChange);
  //   };
  // }, [dispatch, router]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(clearAlertPopup());
  };

  const autoHideDuration = message?.length > 55 ? 3 * duration : duration;

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      open={showSnackbar}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
      message={message}
      severity={type}
    >
      <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertSnackbar;
