import Layout from '@/src/components_fbl/NavigationComponents/Layout';
import BannerSection from '@/src/components_fbl/pageBasedComponents/Signup/BannerSection';
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
