import BannerSection from '@/components_fbl/pageBasedComponents/ContactUs/BannerSection';
import JoinUsBox from '@/components_fbl/pageBasedComponents/ContactUs/JoinUsBox';
import { joinUsData } from '@/constants/ContactUs/contactUsPageData';
import Layout from '@/src/components_fbl/NavigationComponents/Layout';
import ToastProvider from '@/src/components_fbl/Provider/ToastProvider';
import { Box } from '@mui/material';

function ContactUs() {
  return (
    <Layout>
      <Box component="main">
        <ToastProvider>
          <BannerSection />
          <JoinUsBox joinUsData={joinUsData} />
        </ToastProvider>
      </Box>
    </Layout>
  );
}

export default ContactUs;
