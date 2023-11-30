import Layout from '@/src/components_fbl/NavigationComponents/Layout';
import IndividualBlog from '@/src/components_fbl/pageBasedComponents/blogs/IndividualBlog';
import { Box } from '@mui/system';
function index({ blogId }) {
  console.log(blogId);
  return (
    <Layout>
      <Box component="main">
        <IndividualBlog />
      </Box>
    </Layout>
  );
}
export default index;
export async function getServerSideProps(context) {
  const { params } = context;
  return {
    props: {
      blogId: params.id,
    },
  };
}
