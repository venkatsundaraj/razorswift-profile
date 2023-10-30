import { SkillApi } from '@/swagger_api/*';
import { callApi } from '@/utils/apirequest';
import { encryptData } from '@/utils/encryption';
import Button from '@mui/material/Button';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

const Encryption_exp = () => {
  const [skills, setSkills] = useState([]);
  const skillApi = useMemo(() => new SkillApi(), []);
  const dispatch = useDispatch();

  const sM = process.env.NEXT_PUBLIC_SECRET_MESSAGE;
  const key = process.env.NEXT_PUBLIC_ENCRYPT_KEY_SINGLE;

  const k = encryptData(key, sM);
  console.log('encrt', k);
  console.log(process.env.NEXT_PUBLIC_ENCRYPT_KEY_SINGLE);
  const skillGet = useCallback(async () => {
    try {
      const response = await skillApi.apiSkillGet({});
      console.log(response.body.result);
      if (response.body.result) {
        setSkills(response.body.result);
      }
    } catch (error) {
      // Handle any errors that might occur during the API call
      console.error('Error fetching data:', error);
    }
  }, [skillApi]);

  const getEnrolledPathwayDetails = useCallback(async () => {
    try {
      const response = await callApi('TestURL', {});

      console.log(response, 'TestURL');
      if (response.status === 200) {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getEnrolledPathwayDetails();
  }, [getEnrolledPathwayDetails]);

  const handleButton = () => {
    // dispatch(
    //   setAlertPopup({
    //     message:
    //       'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis,',
    //     type: 'error',
    //     duration: 3000,
    //   })
    // );
    getEnrolledPathwayDetails();
  };

  const memoizedSkillGet = useCallback(() => skillGet(), [skillGet]);

  useEffect(() => {
    memoizedSkillGet();
  }, [memoizedSkillGet]);
  return (
    <>
      <div>Encryption_exp</div>
      <div>{k}</div>
      <Button color="primary" variant="contained" onClick={handleButton}>
        Button
      </Button>
      <div>{JSON.stringify(skills)}</div>
      <Button variant="text" color="primary" onClick={handleButton}>
        Button
      </Button>
    </>
  );
};

export default Encryption_exp;

// apiClient.js
// Replace with your API base URL

// Function to make API requests with custom headers
async function makeApiRequest(apiFunction) {
  try {
    // Call the specified API function with the provided headers
    return apiFunction();
  } catch (error) {
    // Handle any errors that occurred during the API call
    console.error('API request error:', error);
    throw error;
  }
}
