import Layout from '@/src/components_fbl/NavigationComponents/Layout';
import BlogCardCopy from '@/src/components_fbl/pageBasedComponents/blogs/BlogCardCopy';
import HeroSectionCopy from '@/src/components_fbl/pageBasedComponents/blogs/HeroSectionCopy';
import { ctaData } from '@/src/constants/Blogs/ctaBlogs';
import { Box } from '@mui/material';

function index({ data }) {
  console.log(data);
  const filteredData = ctaData.find(item => item.id === 'aspirants');

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
export async function getServerSideProps(context) {
  const { params } = context;

  return {
    props: {
      id: params.slug.toString(),
    },
  };
}

//  const courses = [
//    { id: '1', name: 'aspirants' },
//    { id: '2', name: 'business' },
//    { id: '3', name: 'partners' },
//  ];

// const index = function ({ slug }) {
//   console.log(slug);
//   return <h1>Hello world</h1>;
// };
// export default index;

// export async function getStaticProps(context) {
//   const { params } = context;

//   console.log(params, context);

//   return {
//     props: {
//       slug: params.slug,
//     },
//   };
// }
// export async function getStaticPaths() {

//   const paths = courses.map(item => ({ params: { slug: item.id } }));
//   console.log(paths);
//   return {
//     paths,
//     fallback: false,
//   };
// }
