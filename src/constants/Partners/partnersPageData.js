import aspirantPageImagePaths from '@/constants/ImagePaths/Aspirants/aspirantPageImagePaths';
import businessPageImagePaths from '@/constants/ImagePaths/Business/businessPageImagePaths';
import partnersPageImagePaths from '@/constants/ImagePaths/Partners/partnersPageImagePaths';

export const heroSectionData = {
  heading: {
    primary: 'Aggregating human',
    secondary: 'Talent Landscape',
    primaryColor: '#A62973',
    secondaryColor: '#FB847D',
  },
  description: 'A dynamic ecosystem where talent and opportunities converge',
  buttonContent: 'Partner with us',
  buttonUrl: '/contact-us?from=partner',
  bannerImage: partnersPageImagePaths.heroSection.banner,

  secondaryButton: {
    text: 'Learn More',
    href: '/articles/partner-with-us-to-create-a-robust-talent-marketplace/',
  },
};

export const partnersDropDownBodyData = {
  id: 1,
  title: 'Aggregating the Talent',
  highLightedTitle: 'Partner landscape.',
  backgroundColor: '#F3C3C9',
  buttonData: {
    title: 'Partner with Us',
    backgroundColor: '#FFFFFF',
    color: '#EE5064',
    link: '/contact-us?from=partner',
  },
  trophyImage: businessPageImagePaths.dropDownSection.clock,
  description:
    'AI driven automation for Large scale hiring with efficient cost and time',
  image: partnersPageImagePaths.dropDownSection.mainImage,
  whatToExpect: [
    {
      id: 1,
      image: partnersPageImagePaths.dropDownSection.icon1,
      title: 'Collaborate For Standardization',
      description:
        'L&D Partners, assessment partners and recruiters collaboration.',
    },
    {
      id: 2,
      image: partnersPageImagePaths.dropDownSection.icon2,
      title: 'Plug Into Skill, Domain And Corporate Pathways',
      description:
        'Seamless collaboration and streamlined process within pathways.',
    },
    {
      id: 3,
      image: partnersPageImagePaths.dropDownSection.icon3,
      title: 'Reduce Cost To Market',
      description:
        'Enhanced exposure and brand recognition among aspirants through AI based recommendations',
    },
    {
      id: 4,
      image: partnersPageImagePaths.dropDownSection.icon4,
      title: 'Grow Exponentially With Our Ever Growing User Base',
      description: 'AI based recommendation of your services to aspirants',
    },
  ],
};

export const readyToStartData = {
  title: 'WHY PARTNER WITH US?',
  description: 'Collaborate with us and redefine the talent landscape',
  mainImage: partnersPageImagePaths.getStartedSection.questionTag,
  buttonText: 'Learn More',
  buttonUrl: '/articles/partner-with-us-to-create-a-robust-talent-marketplace/',
  longDescription: `Razorswift Innovations' commitment to innovation and strategic partnerships creates a harmonious ecosystem where businesses and candidates can thrive. By integrating with key players in the talent marketplace, we ensure that the hiring process is efficient, credible, and beneficial for all involved.
  `,
};

export const TickerBoxData = {
  tickerArrow: aspirantPageImagePaths.tickerSection.arrow,
  slidingValue: [
    {
      id: 1,
      title: 'Schedule a meeting with us to know more',
      link: '/contact-us',
    },
    {
      id: 2,
      title: 'Unlock opportunities with RazorSwift',
      link: '/partners',
    },
    {
      id: 3,
      title: 'Plug into skill, domain and corporate pathways',
      link: '/contact-us',
    },
  ],
};
