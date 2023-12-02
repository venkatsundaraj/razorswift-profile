import BlogCard from '@/components_fbl/pageBasedComponents/blogs/BlogCard';
import HeroSection from '@/components_fbl/pageBasedComponents/blogs/HeroSection';
import Layout from '@/src/components_fbl/NavigationComponents/Layout';
import { Box } from '@mui/system';
const Blogs = () => {
  return (
    <Layout>
      <Box component="main" class="Topcontainer">
        <HeroSection />
        {/* <Futuredsection /> */}
        <BlogCard />
      </Box>
    </Layout>
  );
};

export default Blogs;
