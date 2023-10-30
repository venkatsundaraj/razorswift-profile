import ProfileLayout from '@/layouts/ProfileLayout';
import Navbar from '@/navigationComponents/Navbar';
import ProfileBackground from '@/pageComponents/Profile/Common/ProfileBackground';
import RightBar from '@/pageComponents/Profile/RightBar';
import { DataProvider } from '@/reUsableComponents/DataContext/DataContext';
import { Container } from '@mui/material';

const ProfileRightLayout = ({ children, edit }) => {
  return (
    <DataProvider>
      <Container maxWidth="xl" disableGutters>
        <Navbar />
        <ProfileLayout
          rightComponent={
            <RightBar>
              <ProfileBackground edit={edit} />
              <Container>{children}</Container>
            </RightBar>
          }
        />
      </Container>
    </DataProvider>
  );
};

export default ProfileRightLayout;
