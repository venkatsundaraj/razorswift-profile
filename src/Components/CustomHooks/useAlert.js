// useAlert.js

import { setAlertPopup } from '@/store/alertSlice';
import { useDispatch } from 'react-redux';

const useAlert = () => {
  const dispatch = useDispatch();

  const showAlert = (message, type, duration = 3000) => {
    dispatch(setAlertPopup({ message, type, duration: duration }));
  };

  return showAlert;
};

export default useAlert;
