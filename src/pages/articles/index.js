// import Layout from '@/components_fbl/NavigationComponents/Layout';
// import Everythingyouneed from '@/src/components_fbl/pageBasedComponents/Articles/Everythingyouneed';
// import HeroSection from '@/src/components_fbl/pageBasedComponents/Articles/HeroSection';
// import Questionsect from '@/src/components_fbl/pageBasedComponents/Articles/Questionsect';
// import { Box } from '@mui/material';

// const Articles = () => {
//   return (
//     <Layout>
//       <Box sx={{ overflowX: 'hidden' }} component="main">
//         <HeroSection />
//         <Questionsect />
//         <Everythingyouneed />
//       </Box>
//     </Layout>
//   );
// };

// export default Articles;

import { useRouter } from 'next/navigation';

function index() {
  const router = useRouter();
  router.push(
    '/articles/partner-with-us-to-create-a-robust-talent-marketplace'
  );
  return <div></div>;
}

export default index;
