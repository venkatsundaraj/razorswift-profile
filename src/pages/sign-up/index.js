import Layout from '@/components_fbl/NavigationComponents/Layout';
import BannerSection from '@/components_fbl/pageBasedComponents/Signup/BannerSection';
import { Box } from '@mui/material';

const page = ({}) => {
  return (
    <Layout>
      <Box component="main">
        <BannerSection />
      </Box>
    </Layout>
  );
};

export default page;
