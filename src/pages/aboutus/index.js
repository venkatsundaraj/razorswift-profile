import Layout from '@/components_fbl/NavigationComponents/Layout';
import Dynamic from '@/components_fbl/pageBasedComponents/aboutus/Dynamic';
import ForBussiness from '@/components_fbl/pageBasedComponents/aboutus/ForBussiness';
import HeroSec from '@/components_fbl/pageBasedComponents/aboutus/HeroSec';
import MeettheTeam from '@/components_fbl/pageBasedComponents/aboutus/MeettheTeam';
import RazorSwiftForBusinesses from '@/components_fbl/pageBasedComponents/aboutus/RazorSwiftForBusinesses';
import JoinUsBox from '@/components_fbl/pageBasedComponents/ContactUs/JoinUsBox';
import { joinUsData } from '@/constants/ContactUs/contactUsPageData';
import { Box } from '@mui/material';
import Head from 'next/head';

const About = () => {
  return (
    <Layout>
      <Head>
        <title>About Us | Razorswift</title>
        <meta
          name="description"
          content="A dynamic ecosystem where talent and opportunities converge"
        />
      </Head>
      <Box sx={{ overflowX: 'hidden' }} component="main">
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
