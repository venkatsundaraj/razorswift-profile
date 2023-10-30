import ProfileLayout from '@/layouts/ProfileLayout';
import Navbar from '@/navigationComponents/Navbar';
import ViewJo from '@/pageComponents/JobOpening/ViewJo';

import ProfileBackground from '@/pageComponents/Profile/Common/ProfileBackground';
import RightBar from '@/pageComponents/Profile/RightBar';

import { DataProvider } from '@/reUsableComponents/DataContext/DataContext';
import withAuth from '@/src/AuthWrapper/AuthWrapper';
import { selectAuthState } from '@/store/authSlice';
import { Container, Stack } from '@mui/material';
import { useSelector } from 'react-redux';

const JobOpeningsView = () => {
  const auth = useSelector(selectAuthState);

  return (
    <DataProvider>
      <Container maxWidth="xl" disableGutters>
        <Navbar />
        <ProfileLayout
          viewBar={true}
          rightComponent={
            <RightBar>
              <ProfileBackground />
              <Container>
                <Stack spacing={3}>
                  {/* <ProfileInfo /> */}
                  <ViewJo />
                </Stack>
              </Container>
            </RightBar>
          }
        />
      </Container>
    </DataProvider>
  );
};

export default withAuth(JobOpeningsView, 'user');
