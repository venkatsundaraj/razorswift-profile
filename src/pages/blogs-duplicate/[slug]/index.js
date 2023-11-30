'use client';

import Layout from '@/src/components_fbl/NavigationComponents/Layout';
import BlogCard from '@/src/components_fbl/pageBasedComponents/blogs/BlogCard';
import HeroSection from '@/src/components_fbl/pageBasedComponents/blogs/HeroSection';
import { ctaData } from '@/src/constants/Blogs/ctaBlogs';
import { Box } from '@mui/system';
function index({ id }) {
  const filteredData = ctaData.find(item => item.id === id);
  console.log(filteredData);
  if (!filteredData) null;
  return (
    <Layout>
      <Box component="main">
        <HeroSection filteredData={filteredData} />
        <BlogCard filteredData={filteredData} />
      </Box>
    </Layout>
  );
}
export default index;
export async function getServerSideProps(context) {
  const { params } = context;
  console.log(params.slug);
  return {
    props: {
      id: params.slug.toString(),
    },
  };
}
