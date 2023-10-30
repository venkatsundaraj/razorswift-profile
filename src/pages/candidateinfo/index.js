import LeftLayout from '@/layouts/LeftLayout';
import LoggedInNavBar from '@/navigationComponents/LoggedInNavBar';
import SetProfileForm2 from '@/pageComponents/SetProfile/SetProfileForm2';
import withAuth from '@/src/AuthWrapper/AuthWrapper';
import { localStorageUtil } from '@/utils/CommonFunctions/localStorageUtil';
import { Container } from '@mui/material';
import { useEffect, useState } from 'react';

const CandidateInfo = () => {
  const userDetails = localStorageUtil.getItem('userDetails');
  const [data, setData] = useState('');

  useEffect(() => {
    setData(userDetails?.candidate?.fullName);
  }, [userDetails]);

  return (
    <Container maxWidth="xl" disableGutters>
      <LoggedInNavBar
        text={`${data ? data?.slice(0, 2) : ''}`}
        linkText="Sign up"
      />
      <LeftLayout
        backButtonRequired
        title="Review or enter your personal details"
        leftComponent={<SetProfileForm2 />}
      />
    </Container>
  );
};

export default withAuth(CandidateInfo, 'user');
