import Layout from '@/components_fbl/NavigationComponents/Layout';
import Dynamic from '@/components_fbl/pageBasedComponents/aboutus/Dynamic';
import ForBussiness from '@/components_fbl/pageBasedComponents/aboutus/ForBussiness';
import HeroSec from '@/components_fbl/pageBasedComponents/aboutus/HeroSec';
import MeettheTeam from '@/components_fbl/pageBasedComponents/aboutus/MeettheTeam';
import RazorSwiftForBusinesses from '@/components_fbl/pageBasedComponents/aboutus/RazorSwiftForBusinesses';
import JoinUsBox from '@/components_fbl/pageBasedComponents/ContactUs/JoinUsBox';
import { joinUsData } from '@/constants/ContactUs/contactUsPageData';
import Aboutusimagepathway from '@/constants/ImagePaths/Aboutus/Aboutusimagepathway';
import { Box } from '@mui/material';

export const bannerData = {
  mainHeaderOne: 'CONNECTING TALENT.',
  mainHeaderTwo: 'BUILDING BRIDGES',
  bannerImage: Aboutusimagepathway.newbanner,
};
const About = () => {
  return (
    <Layout>
      <Box sx={{ overflowX: 'hidden' }} component="main">
        {/* <BannerSection bannerData={bannerData} /> */}
        <HeroSec />
        <Dynamic />
        <RazorSwiftForBusinesses />
        <ForBussiness />
        <MeettheTeam />
        {/* <OurCommitment /> */}
        <JoinUsBox sx={{ mb: 4 }} joinUsData={joinUsData} />
      </Box>
    </Layout>
  );
};

export default About;
// CONNECTING TALENT.
// BUILDING BRIDGES
