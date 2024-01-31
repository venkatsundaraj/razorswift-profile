import aspirantPageImagePaths from '@/constants/ImagePaths/Aspirants/aspirantPageImagePaths';
import coursesPageImagePaths from '@/constants/ImagePaths/Courses/coursesPageImagePaths';

export const bannerData = {
  mainHeaderOne: 'Upskill with',
  mainHeaderTwo: 'Razorswift Courses',
  bannerImage: coursesPageImagePaths.bannerImage,
};

export const edTechData = {
  description: `Explore RazorSwift's extensive course catalogue aimed at empowering you with updated skills and continued relevance. Enjoy a variety of options at subsidized rates, adding a fun and enriching dimension to your learning journey!`,
  edTechCopy: 'Trusted Edtech platforms Partnering with us',
  techLogos: [
    { id: 1, logo: coursesPageImagePaths.google },
    { id: 2, logo: coursesPageImagePaths.google },
    { id: 3, logo: coursesPageImagePaths.google },
    { id: 4, logo: coursesPageImagePaths.google },
  ],
  qrImage: coursesPageImagePaths.qrImage,
};

export const coursePageDataString = {
  list: ['<p>Hell world</p>', '<a href="www.google.com">Google</a>'],
};

export const individualCoursePageImage = {
  banner: coursesPageImagePaths.image1,
};

export const TickerBoxData = {
  tickerArrow: aspirantPageImagePaths.tickerSection.arrow,
  slidingValue: [
    {
      id: 1,
      title: 'Choose from over 35 Technical courses that are nearly Free',
      link: '/courses',
    },
    {
      id: 2,
      title:
        'Join 5000+ RazorSwift users and get the Verified Profile Advantage',
      link: '/signup',
    },
    {
      id: 3,
      title: 'Create a standout easy to share RazorSwift Profile',
      link: '/signup',
    },
    {
      id: 4,
      title: 'Learn more about RazorSwift Pathways - coming soon',
      link: '/aspirants/#pathways',
    },
    {
      id: 5,
      title: "Don't have a RazorSwift profile yet? Sign up now",
      link: '/signup',
    },
  ],
};
