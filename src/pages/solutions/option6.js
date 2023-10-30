import { selectAuthState } from '@/store/authSlice';
import { CandidateProfileApi } from '@/swagger_api/api/CandidateProfileApi';
import { localStorageUtil } from '@/utils/CommonFunctions/localStorageUtil';
import { Box } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
const option6 = ({ authState }) => {
  const userDetails = localStorageUtil.getItem('userDetails');
  const auth = useSelector(selectAuthState);
  const dispatch = useDispatch();

  async function GetData() {
    console.log(auth);
    try {
      const guid = userDetails.candidate.uniqueGuid;
      const candidateProfileApi = new CandidateProfileApi();
      const response =
        await candidateProfileApi.apiCandidateProfileGetByGuidGuidGet(guid);
      if (response.body.message === 'Record Fetched Successfully.') {
        // dispatch(setProfileDetails([1, 2, 3]));
      } else if (response.body.message) {
        Swal.fire({
          icon: 'info',
          title: '',
          text: response.body.message,
        });
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
    }
  }

  useEffect(() => {
    GetData();
    console.log(authState);
  }, []);

  return <Box sx={{ width: 'sm' }}>value getting{JSON.stringify(auth)}</Box>;
};

export default option6;

// export const getServerSideProps = wrapper.getServerSideProps(store => async () => {
//   console.log('srer side props');
//   store.dispatch(setLoginDetails([1, 2, 3]));
//   store.dispatch(setIsLoggedIn('mj'));
// });

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
