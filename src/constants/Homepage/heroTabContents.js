import homePageImagePaths from '../ImagePaths/Homepage/homePageImagePaths';

export const tabContent = [
  { id: 1, text: 'Business' },
  { id: 2, text: 'Aspirants' },
  { id: 3, text: 'Partners' },
];
export const mainColors = ['#FFD1CE', '#F0D2F8', '#FFDBF3'];
export const pseudoColors = ['#F4B7B4', '#E2B1EF', '#FFC7E9'];
export const tabPanel = [
  {
    id: 1,
    for: 'For Business',
    title: 'GET JOB READY TALENT',
    description:
      'Our customised pathways pave the way for you to hire job ready talent from Day 1, swiftly.',
    demoButton: { title: 'Ask for Demo', link: '/contact-us' },
    exploreButton: { title: 'Explore Pathways', link: '/business' },
    image: homePageImagePaths.tabBusiness,
  },
  {
    id: 2,
    for: 'For Aspirants',
    title: 'CURATE YOUR CAREER',
    description:
      'Bridge the gap between education and employment with our various curated resources.',
    demoButton: { title: 'Build Your Profile', link: '/profile' },
    exploreButton: { title: 'Explore Pathways', link: '/aspirants' },
    image: homePageImagePaths.tabAspirants,
  },
  {
    id: 3,
    for: 'For Partners',
    title: 'SHARE THE LANDSCAPE',
    description:
      'Collaborate and standardise to be part of shaping the talent partner landscape.',
    demoButton: { title: 'Ask for Demo', link: '/contact-us' },
    exploreButton: { title: 'Explore Pathways', link: '/partners' },
    image: homePageImagePaths.tabPartners,
  },
];

export const heroSectionData = {
  heading: {
    primary: 'EMPOWERING TALENT.',
    primaryColor: '#A62973',
    secondary: 'EMPOWERING TALENT.',
    secondaryColor: '#EE5064',
  },
  description: 'A dynamic ecosystem where talent and opportunities converge',
  profileButton: { title: 'Build Your Profile', link: '/profile' },
  demoButton: { title: 'Get a Demo', link: '/contact-us' },
  bannerImage: homePageImagePaths.revisedBannerImage,
};
