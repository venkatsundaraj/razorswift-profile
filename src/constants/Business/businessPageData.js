import aspirantPageImagePaths from '../ImagePaths/Aspirants/aspirantPageImagePaths'
import businessPageImagePaths from '../ImagePaths/Business/businessPageImagePaths'

export const heroSectionData = {
  heading: {
    primary: 'Empowering Talent.',
    secondary: 'Enabling Growth.',
    primaryColor: '#A62973',
    secondaryColor: '#A62973',
  },
  description: 'A dynamic ecosystem where talent and opportunities converge',
  buttonContent: 'Ask for Demo',
  bannerImage: businessPageImagePaths.heroSection.banner,
}

export const businessDropDownBodyData = {
  id: 1,
  title: 'Experience Swift',
  highLightedTitle: 'Hiring.',
  backgroundColor: '#DCA9C7',
  buttonData: {
    title: 'Ask for Demo',
    backgroundColor: '#FFFFFF',
    color: '#A62973',
    link: '/contact-us',
  },
  trophyImage: businessPageImagePaths.dropDownSection.clock,
  description:
    'AI driven automation for Large scale hiring with efficient cost and time',
  image: businessPageImagePaths.dropDownSection.business,
  whatToExpect: [
    {
      id: 1,
      image: businessPageImagePaths.dropDownSectionOne.forStudents.icon1,
      title: 'Job ready talent on Day 1',
      description:
        'Manage skill gap and talent shortage with customized pathways.',
    },
    {
      id: 2,
      image: businessPageImagePaths.dropDownSectionOne.forStudents.icon2,
      title: 'Unified talent ecosystem',
      description: 'Seamless collaboration with talent partners with pathways.',
    },
    {
      id: 3,
      image: businessPageImagePaths.dropDownSectionOne.forStudents.icon3,
      title: 'Standardized profiles',
      description:
        'Standardized assessments and AI enriched profiles with defined pathways',
    },
    {
      id: 4,
      image: businessPageImagePaths.dropDownSectionOne.forStudents.icon4,
      title: 'Be a Marquee employer',
      description:
        'Enhanced exposure and increased recognition among aspirants with corporate pathways',
    },
  ],
}

export const whyRazorswiftSection = {
  title: 'WHY RAZORSWIFT',
  description:
    "We are an innovative digital marketplace that leverages AI and a comprehensive knowledge partner ecosystem to empower aspiring individuals and streamline talent acquisition for businesses in India. Through our unique 'Pathways' approach, we offer tailored journeys for individuals to excel within the evolving hiring landscape, while also providing businesses with structured processes for aligning competencies and efficient curation. Our pioneering 'affinity algorithm' enhances identification, assessment, and enablement, leading to substantial time and cost savings. Our commitment extends beyond hiring, fostering continuous engagement and redefining talent progression for sustained success.",

  button: { title: 'Explore', link: '/' },
  cardsRight: [
    {
      id: 1,
      percentage: '93%',
      bgColor: '#EBC8DD',
      description:
        'Of millennials find skill development crucial for their career',
    },
    {
      id: 2,
      percentage: '53%',
      bgColor: '#FFE3E3',
      description: 'Disappointed by lack of training when starting new job',
    },
  ],

  cardsLeft: [
    {
      id: 1,
      percentage: '79%',
      bgColor: '#FFCCC9',
      description: 'Millennials see mentoring as crucial for success',
    },
    {
      id: 2,
      percentage: '87%',
      bgColor: '#EDD8F2',
      description:
        'Millennials with mentors felt empowered and had greater confidence at work',
    },
  ],
}

export const readyToStartData = {
  title: 'READY TO GET STARTED?',
  description: 'Hire at scale with the click of a button',
  mainImage: businessPageImagePaths.readyToGetStarted.mainImage,
  buttonText: 'Get a Demo',
}

export const quickTalentDiscoveryData = {
  mainTitle: 'Razorswift PATHWAYS - QUICK TALENT DISCOVERY',
  mainDescription:
    'Pathways allow you to standardize assessments and training, to gain access to a large pool of verified profiles that match your unique requirement.',
  pathways: [
    {
      id: 1,
      title: 'Company crafted pathways',
      description:
        'Tailor make your pathway to get interested aspirants to self curate their competencies to align with your skill requirements and cultural fit.',
      backgroundColor: '#FFE1E1',
      image: businessPageImagePaths.pathwayIcons.icon1,
      mainImage: businessPageImagePaths.dropDownSection.mainImage1,
    },
    {
      id: 2,
      title: 'ROI driven efficiency',
      description:
        'Leverage AI and data insights along with third party integrations for unparalleled cost and time efficiency.',
      backgroundColor: '#E5BED5',
      image: businessPageImagePaths.pathwayIcons.icon2,
      mainImage: businessPageImagePaths.dropDownSection.mainImage2,
    },
    {
      id: 3,
      title: 'Seamless eco-sysem integration',
      description:
        'Connect with tools and platforms of choice and Custom create an integrated solution on RazorSwift.',
      backgroundColor: '#DCBDE3',
      image: businessPageImagePaths.pathwayIcons.icon3,
      mainImage: businessPageImagePaths.dropDownSection.mainImage3,
    },
    {
      id: 4,
      title: 'Actionable data insights',
      description:
        'Gain a wealth of data on aspirants leading to informed decisions to re-configure the pathway as needed.',
      backgroundColor: '#FCC9CF',
      image: businessPageImagePaths.pathwayIcons.icon4,
      mainImage: businessPageImagePaths.dropDownSection.mainImage4,
    },
  ],
}
