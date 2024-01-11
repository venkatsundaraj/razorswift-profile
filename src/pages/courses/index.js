import Layout from '@/src/components_fbl/NavigationComponents/Layout';
import ToastProvider from '@/src/components_fbl/Provider/ToastProvider';
import BannerSection from '@/src/components_fbl/pageBasedComponents/courses/BannerSection';
import CourseList from '@/src/components_fbl/pageBasedComponents/courses/CourseList';
import coursesPageImagePaths from '@/src/constants/ImagePaths/Courses/coursesPageImagePaths';
import { Box } from '@mui/material';
import Head from 'next/head';

export const bannerData = {
  mainHeaderOne: 'Upskill with',
  mainHeaderTwo: 'Razorswift Courses',
  bannerImage: coursesPageImagePaths.bannerImage,
};

const page = () => {
  return (
    <Layout>
      <Head>
        <title>Courses | Razorswift</title>
        <meta
          name="description"
          content="A dynamic ecosystem where talent and opportunities converge"
        />
      </Head>
      <Box component="main">
        <ToastProvider>
          <BannerSection bannerData={bannerData} />
          {/* <EdTechScroller /> */}
          <CourseList />
        </ToastProvider>
      </Box>
    </Layout>
  );
};

export default page;
