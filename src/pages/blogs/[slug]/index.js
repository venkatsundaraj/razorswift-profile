import Layout from '@/src/components_fbl/NavigationComponents/Layout';
import BlogCardCopy from '@/src/components_fbl/pageBasedComponents/blogs/BlogCardCopy';
import BlogTitleComponent from '@/src/components_fbl/pageBasedComponents/blogs/BlogTitleComponent';
import HeroSectionCopy from '@/src/components_fbl/pageBasedComponents/blogs/HeroSectionCopy';
import { compareDates } from '@/src/utils/helpers/compareDate';
import { Box } from '@mui/material';
import { allBlogs } from 'contentlayer/generated';
import Head from 'next/head';

const courses = [
  { id: '1', name: 'aspirants' },
  { id: '2', name: 'business' },
  { id: '3', name: 'partners' },
];

function index({ slug }) {
  const filteredBlogData = allBlogs
    .filter(item => item.parent === slug)
    .sort(compareDates);

  if (!filteredBlogData) null;
  return (
    <Layout>
      <Head>
        <title>{filteredBlogData[0].headText}</title>
        <meta name="description" content={filteredBlogData[0].parent} />
      </Head>
      <Box component="main">
        <HeroSectionCopy filteredBlogData={filteredBlogData.slice(0, 3)} />
        <BlogTitleComponent />
        <BlogCardCopy
          filteredBlogData={filteredBlogData}
          style={{ paddingTop: '0' }}
        />
      </Box>
    </Layout>
  );
}
export default index;

// export async function getServerSideProps(context) {
//   const { params } = context;

//   return {
//     props: {
//       id: params.slug.toString(),
//     },
//   };

// }

export async function getStaticProps(context) {
  const { params } = context;

  return {
    props: {
      slug: params.slug,
    },
  };
}
export async function getStaticPaths() {
  const paths = courses.map(item => ({ params: { slug: item.name } }));

  return {
    paths,
    fallback: false,
  };
}
