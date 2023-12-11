import Layout from '@/src/components_fbl/NavigationComponents/Layout';
import BlogBody from '@/src/components_fbl/pageBasedComponents/blogs/BlogBody';
import IndividualBlogBanner from '@/src/components_fbl/pageBasedComponents/blogs/IndividualBlogBanner';
import { Box } from '@mui/material';
import { allBlogs } from 'contentlayer/generated';
import { useState } from 'react';

function index({ data }) {
  const [blog, setBlog] = useState(data);
  return (
    <Layout>
      <Box component="main">
        <IndividualBlogBanner blog={blog} />
        <BlogBody blog={blog} />
      </Box>
    </Layout>
  );
}
export default index;

export async function getStaticProps({ params }) {
  const filteredBlog = allBlogs.find(item => item.slugAsParams === params.id);
  return {
    props: {
      data: filteredBlog,
    },
  };
}

export async function getStaticPaths() {
  const ids = allBlogs.map(item => ({
    params: { slug: item.parent, id: item.slugAsParams },
  }));

  return { paths: ids, fallback: false };
}
