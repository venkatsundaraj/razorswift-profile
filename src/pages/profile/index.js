import useSummary from '@/customHooks/CutsomApiHooks/useSummary';
import ProfileLayout from '@/layouts/ProfileLayout';
import Navbar from '@/navigationComponents/Navbar';
import ProfileBackground from '@/pageComponents/Profile/Common/ProfileBackground';
import ProfileInfo from '@/pageComponents/Profile/Common/ProfileInfo';
import RightBar from '@/pageComponents/Profile/RightBar';
import TabView from '@/pageComponents/Profile/View/TabView';
import { DataProvider } from '@/reUsableComponents/DataContext/DataContext';
import withAuth from '@/src/AuthWrapper/AuthWrapper';
import { modeType, roleOfViewer, typeOfViewer } from '@/utils/enum';
import { Container, Stack } from '@mui/material';
import { useMemo } from 'react';

const Profile = () => {
  const summaryProps = useMemo(
    () => ({
      type: typeOfViewer['aspirant'],
      role: roleOfViewer['candidate'],
      mode: modeType['view'],
    }),
    []
  );
  const summary = useSummary(summaryProps);
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
                  <ProfileInfo />
                  {/* <Expertise /> */}
                  <TabView />
                </Stack>
              </Container>
            </RightBar>
          }
        />
      </Container>
    </DataProvider>
  );
};

export default withAuth(Profile, 'user');
