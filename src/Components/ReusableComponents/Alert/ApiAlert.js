import { clearAlertPopup } from '@/store/alertSlice';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ApiAlert = () => {
  const [open, setOpen] = useState(false);
  const { message, type, duration } = useSelector(state => state.alertpopup);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(message);
    if (message) {
      setOpen(true);
      if (duration) {
        setTimeout(() => {
          dispatch(clearAlertPopup());
        }, duration);
      }
    }
  }, [message, duration, dispatch]);

  const handleClose = () => {
    setOpen(false);
    dispatch(clearAlertPopup());
  };

  return (
    <Snackbar open={open} autoHideDuration={duration} onClose={handleClose}>
      <Alert severity={type} onClose={handleClose}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ApiAlert;
