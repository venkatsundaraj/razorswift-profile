import useUserSummary from '@/customHooks/CutsomApiHooks/useuserSummary';
import ProfileRightLayout from '@/layouts/ProfileRightLayout';
import ProfileInfo from '@/pageComponents/Profile/Common/ProfileInfo';
import AboutMe from '@/pageComponents/Profile/Edit/PersonalInfo/AboutMe';
import ActivitiesHobbies from '@/pageComponents/Profile/Edit/PersonalInfo/ActivitiesHobbies';
import ContactInfo from '@/pageComponents/Profile/Edit/PersonalInfo/ContactInfo';
import PersonalInfoSection from '@/pageComponents/Profile/Edit/PersonalInfo/PersonalInfoSection';
import WebsiteSocialMediaProfile from '@/pageComponents/Profile/Edit/PersonalInfo/WebsiteSocialMediaProfile/index.js';
import { DataProvider } from '@/reUsableComponents/DataContext/DataContext';
import withAuth from '@/src/AuthWrapper/AuthWrapper';
import { Stack } from '@mui/material';

const EditProfile = () => {
  const { userDetails, candidateId, routers, summary } = useUserSummary();
  return (
    <DataProvider>
      <ProfileRightLayout edit>
        <Stack spacing={3}>
          <ProfileInfo edit />
          <PersonalInfoSection />
          <AboutMe />
          <ActivitiesHobbies />
          <ContactInfo />
          <WebsiteSocialMediaProfile />
        </Stack>
      </ProfileRightLayout>
    </DataProvider>
  );
};

export default withAuth(EditProfile, 'user');
