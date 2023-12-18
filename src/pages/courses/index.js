import Layout from '@/src/components_fbl/NavigationComponents/Layout';
import ToastProvider from '@/src/components_fbl/Provider/ToastProvider';
import BannerSection from '@/src/components_fbl/pageBasedComponents/courses/BannerSection';
import CourseList from '@/src/components_fbl/pageBasedComponents/courses/CourseList';
import EdTechScroller from '@/src/components_fbl/pageBasedComponents/courses/EdTechScroller';
import { bannerData } from '@/src/constants/Courses/coursesPageData';
import { Box } from '@mui/material';

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
