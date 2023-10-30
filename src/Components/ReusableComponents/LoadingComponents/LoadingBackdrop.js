import { Backdrop, CircularProgress } from '@mui/material';
import { useContext } from 'react';
import { LoadingContext } from './LoadingContext';

const LoadingBackdrop = () => {
  const { loading } = useContext(LoadingContext);

  return (
    <Backdrop sx={{ zIndex: 20000 }} open={loading}>
      <CircularProgress sx={{ color: '#ffffff' }} />
    </Backdrop>
  );
};

export default LoadingBackdrop;
