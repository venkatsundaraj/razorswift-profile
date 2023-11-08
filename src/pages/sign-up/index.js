import Layout from '@/components_fbl/NavigationComponents/Layout';
import ToastProvider from '@/src/components_fbl/Provider/ToastProvider';
import BannerSection from '@/src/components_fbl/pageBasedComponents/Signup/BannerSection';
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
