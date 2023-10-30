import ComingSoon from '@/components_fbl/pageBasedComponents/courses/ComingSoon';
import Layout from '@/src/components_fbl/NavigationComponents/Layout';
import { Box } from '@mui/material';
const page = () => {
  return (
    <Layout>
      <Box>
        <ComingSoon />
      </Box>
    </Layout>
  );
};

export default page;
