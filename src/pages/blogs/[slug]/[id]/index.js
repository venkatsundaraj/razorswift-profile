import Layout from '@/src/components_fbl/NavigationComponents/Layout';
import DiscoverSection from '@/src/components_fbl/pageBasedComponents/Aspirants/DiscoverSection';
import BlogBody from '@/src/components_fbl/pageBasedComponents/blogs/BlogBody';
import BlogTitleComponent from '@/src/components_fbl/pageBasedComponents/blogs/BlogTitleComponent';
import IndividualBlogBanner from '@/src/components_fbl/pageBasedComponents/blogs/IndividualBlogBanner';
import { Box } from '@mui/material';
import { allBlogs } from 'contentlayer/generated';
import Head from 'next/head';
import { useState } from 'react';

function index({ data }) {
  const [blog, setBlog] = useState(data);

  return (
    <Layout>
      <Head>
        <title>{blog.title}</title>
        <meta name="description" content={blog.description} />
      </Head>
      <Box component="main">
        <IndividualBlogBanner blog={blog} />
        <BlogBody blog={blog} />
        <BlogTitleComponent insideIndividualBlog={true} />
        <DiscoverSection cta={blog.parent} emptyButton={true} />
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
