import Layout from '@/src/components_fbl/NavigationComponents/Layout';
import BannerSection from '@/src/components_fbl/pageBasedComponents/courses/BannerSection';
import CourseList from '@/src/components_fbl/pageBasedComponents/courses/CourseList';
import EdTechScroller from '@/src/components_fbl/pageBasedComponents/courses/EdTechScroller';
import ToastProvider from '@/src/components_fbl/Provider/ToastProvider';
import coursesPageImagePaths from '@/src/constants/ImagePaths/Courses/coursesPageImagePaths';
import { Box } from '@mui/material';

export const bannerData = {
  mainHeaderOne: 'Upskill with',
  mainHeaderTwo: 'Razorswift Courses',
  bannerImage: coursesPageImagePaths.bannerImage,
};

const page = () => {
  return (
    <Layout>
      <Box component="main">
        <ToastProvider>
          <BannerSection bannerData={bannerData} />
          <EdTechScroller />
          <CourseList />
        </ToastProvider>
      </Box>
    </Layout>
  );
};

export default page;
