import Layout from '@/components_fbl/NavigationComponents/Layout';
import BannerSection from '@/components_fbl/pageBasedComponents/Signup/BannerSection';
import ToastProvider from '@/src/components_fbl/Provider/ToastProvider';
import { Box } from '@mui/material';

const page = ({}) => {
  return (
    <Layout>
      <Box component="main">
        <ToastProvider>
          <BannerSection />
        </ToastProvider>
      </Box>
    </Layout>
  );
};

export default page;
