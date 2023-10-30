import { setAlertPopup } from '@/store/alertSlice';
import { selectAuthState } from '@/store/authSlice';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';

const option9 = () => {
  const auth = useSelector(selectAuthState);
  const dispatch = useDispatch();
  return (
    <Box>
      <div>{JSON.stringify(auth.loginDetails)}</div>
      <Button
        variant="contained"
        color="success"
        onClick={() => {
          dispatch(
            setAlertPopup({
              message: 'Hello world!',
              type: 'success',
              duration: 3000,
            })
          );
        }}
      >
        success
      </Button>
      <Button
        variant="contained"
        color="error"
        onClick={() => {
          dispatch(
            setAlertPopup({
              message: 'Hello world!',
              type: 'error',
              duration: 3000,
            })
          );
        }}
      >
        error
      </Button>
      <Button
        variant="contained"
        color="warning"
        onClick={() => {
          dispatch(
            setAlertPopup({
              message: 'warning!',
              type: 'warning',
              duration: 3000,
            })
          );
        }}
      >
        warning
      </Button>
    </Box>
  );
};

export default option9;

// export const getServerSideProps = wrapper.getServerSideProps(store => async () => {
//   const userDetails = {
//     contactNumber: '918123859520',
//     email: 'abhxxxxxxi@gmail.com',
//     fullName: 'Abhilash',
//     id: 1,
//   };

//   store.dispatch(setLoginDetails([1, 2, 3]));

//   const isLoggedIn = false;
//   store.dispatch(setIsLoggedIn('mj'));
//   const state = store.getState();
//   console.log(state);
//   return {
//     props: {
//       authState: state,
//     },
//   };
// });
