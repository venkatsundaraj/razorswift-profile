import Layout from '@/src/components_fbl/NavigationComponents/Layout';
import BlogCardCopy from '@/src/components_fbl/pageBasedComponents/blogs/BlogCardCopy';
import HeroSectionCopy from '@/src/components_fbl/pageBasedComponents/blogs/HeroSectionCopy';
import { ctaData } from '@/src/constants/Blogs/ctaBlogs';
import { Box } from '@mui/material';

const courses = [
  { id: '1', name: 'aspirants' },
  { id: '2', name: 'business' },
  { id: '3', name: 'partners' },
];

function index({ slug }) {
  // console.log(slug, allBlogs);
  const filteredData = ctaData.find(item => item.id === slug);

  if (!filteredData) null;
  return (
    <Layout>
      <Box component="main">
        <HeroSectionCopy filteredData={filteredData} />
        <BlogCardCopy filteredData={filteredData} />
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
