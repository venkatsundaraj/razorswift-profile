import ProfileLayout from '@/layouts/ProfileLayout';
import Navbar from '@/navigationComponents/Navbar';
import ProfileBackground from '@/pageComponents/Profile/Common/ProfileBackground';
import ProfileInfo from '@/pageComponents/Profile/Common/ProfileInfo';
import RightBar from '@/pageComponents/Profile/RightBar';
import Expertise from '@/pageComponents/Profile/View/Expertise';
import TabView from '@/pageComponents/Profile/View/TabView';
import { SlugProvider } from '@/reUsableComponents/DataContext/SlugContext';
import { Container, Stack } from '@mui/material';

const Profile = () => {
  return (
    <SlugProvider>
      <Container maxWidth="xl" disableGutters>
        <Navbar />
        <ProfileLayout
          sidebar={true}
          viewBar={true}
          rightComponent={
            <RightBar>
              <ProfileBackground />
              <Container>
                <Stack spacing={3}>
                  <ProfileInfo publicView />
                  <Expertise />
                  <TabView />
                </Stack>
              </Container>
            </RightBar>
          }
        />
      </Container>
    </SlugProvider>
  );
};

export default Profile;
