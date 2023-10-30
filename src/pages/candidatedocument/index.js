import LeftLayout from '@/layouts/LeftLayout';
import LoggedInNavBar from '@/navigationComponents/LoggedInNavBar';
import SetProfileForm from '@/pageComponents/SetProfile/SetProfileForm';
import withAuth from '@/src/AuthWrapper/AuthWrapper';
import { localStorageUtil } from '@/utils/CommonFunctions/localStorageUtil';
import { Container } from '@mui/material';
import { useEffect, useState } from 'react';

const CandidateDocument = () => {
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
        title={` Hey ${data ? data : 'user'} , Let’s build your profile`}
        leftComponent={<SetProfileForm />}
      />
    </Container>
  );
};

export default withAuth(CandidateDocument, 'user');
