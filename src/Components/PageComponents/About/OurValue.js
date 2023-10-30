import IMAGES from '@/imageComponents/ImagePaths';
import {
  Box,
  Container,
  Grid,
  Stack,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import { marginTopBottom } from 'src/utils/commonStyles';
import { CommonImage } from '../../ImageComponents/CommonImages';

const arrayDetails = [
  {
    id: 1,
    value: '70%',
    text: 'Improvement in new hire retention',
  },
  {
    id: 2,
    value: '70%',
    text: 'Reduction and  removing human bias',
  },
  {
    id: 3,
    value: '70%',
    text: 'Improvement in best candidate matches',
  },
  {
    id: 4,
    value: '67%',
    text: 'Faster onboarding process',
  },
];
const arrayOfTeam = [
  {
    id: 1,
    name: 'Aravind Sridharan',
    designation: 'Co-Founder and CEO',
    details: [
      {
        id: 1,
        description:
          'Aravind is an accomplished professional with over 25 years of leadership experience in the technology and executive search.',
      },
      {
        id: 2,
        description: `Over the years, he has worked extensively in both domestic and international 
          markets. He has lent his executive search and leadership advisory skills to 
          several reputed global technology firms and start-ups. He has insightful 
          cognizance of the technology sector and holds a profound appreciation for 
          digital technologies and their influence in today’s business landscape. He has a 
          Bachelor’s degree in Physics and a Masters degree in Sales, Marketing and 
          Entrepreneurship.`,
      },
    ],
    image: IMAGES?.T_A_Arvindh,
    orderLeft: { sm: 1, xs: 2 },
    orderRight: { sm: 2, xs: 1 },
  },
  {
    id: 2,
    name: 'Sandhya Reddy',
    designation: 'Co-Founder & CMO',
    details: [
      {
        id: 1,
        description: `Sandhya Reddy is a PCC-accredited executive and leadership coach with 
          certifications from International coach academy. She has also secured a Hogan 
          Assessment Certification.`,
      },
      {
        id: 2,
        description: `Sandhya is a management graduate with 25 years of industry experience in 
          leading marketing initiatives in organizations across industries like telecom, 
          FMCG, BPO and IT. She has experience in digital strategy design and 
          execution. He has a Bachelor’s degree in Computer Science and a Masters 
          degree in Business Administration.`,
      },
    ],
    image: IMAGES?.T_A_Sandya,
    orderLeft: { sm: 2, xs: 2 },
    orderRight: { sm: 1, xs: 1 },
  },
  {
    id: 3,
    name: 'Parag Bhagwat',
    designation: 'CO-Founder & CTO',
    details: [
      {
        id: 1,
        description: `Parag Bhagwat is an accomplished technology professional with over 25 years of experience in scaling operations.`,
      },
      {
        id: 2,
        description: `He has led technology initiatives in reputed global tech companies both in India and abroad, and has built technology platforms from scratch, taking them from 0 to 1. Parag is a 2x entrepreneur, having co-founded Yayshop and Teamkaro, with a successful exit`,
      },
    ],
    image: IMAGES?.T_A_Parga,
    orderLeft: { sm: 1, xs: 2 },
    orderRight: { sm: 2, xs: 1 },
  },
  {
    id: 4,
    name: 'Priyanka Sakuru',
    designation: 'Co-Founder & COO',
    details: [
      {
        id: 1,
        description: `Priyanka is a seasoned professional with over 13 years of experience in the 
          talent management sector and use of technology in solving problems in the 
          human capital space. In her work, she holds a true appreciation for the role that 
          leaders play in transformation and progress. In addition to deep and varied 
          experience as a leadership advisor and executive search consultant, she has also 
          worked with leading companies in the technology space landscape and 
          capitalises on her wide network of professionals across functions and industries.`,
      },
    ],
    image: IMAGES?.T_A_Priyanka,
    orderLeft: { sm: 2, xs: 2 },
    orderRight: { sm: 1, xs: 1 },
  },
];
const HeroHeader = styled(Typography)(({ theme }) => ({
  color: '#1D1D1D',
  fontSize: '32px',
  fontWeight: '700',
  lineHeight: '41.8px',
  textAlign: 'center',
  padding: '0px 0px 20px 0px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '18px',
    lineHeight: '28px',
  },
}));
const HeroSubTitle = styled(Typography)(({ theme }) => ({
  color: '#6A6A6A',
  fontSize: '20px',
  fontWeight: '500',
  lineHeight: '38px',
  textAlign: 'center',
  padding: '0px 0px 20px 0px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '14px',
    lineHeight: '26.6px',
  },
}));

const Name = styled(Typography)(({ theme }) => ({
  color: '#1D1D1D',
  fontSize: '28px',
  lineHeight: '41.8px',
  fontWeight: '600',
  textAlign: 'inherit',
  // padding: '0px 0px 20px 0px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '22px',
    lineHeight: '47.8px',
    textAlign: 'center',
  },
}));
const Designation = styled(Typography)(({ theme }) => ({
  color: '#1D1D1D',
  fontSize: '22px',
  fontWeight: '500',
  lineHeight: '41.8px',
  textAlign: 'inherit',
  // padding: '0px 0px 20px 0px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '16px',
    lineHeight: '26px',
    textAlign: 'center',
  },
}));
const Description = styled(Typography)(({ theme }) => ({
  color: '#6A6A6A',
  fontSize: '20px',
  fontWeight: '500',
  lineHeight: '38px',
  textAlign: 'inherit',
  // padding: '0px 0px 20px 0px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '14px',
    lineHeight: '26.6px',
    textAlign: 'center',
  },
}));
const OurValue = () => {
  const theme = useTheme();

  const CustomContainer = styled(Container)(({ theme }) => ({
    minHeight: '500px',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    flex: 1,
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  }));

  const ShadowTextSubTitle = styled(Typography)(({ theme }) => ({
    fontSize: '15px',
    color: '#1D1D1D',
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: '24.3px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
      lineHeight: '19.4px',
    },
  }));
  const ShadowTextTitle = styled(Typography)(({ theme }) => ({
    fontSize: '45px',
    lineHeight: '53.5px',
    color: '#ED5063',
    fontWeight: '800',
    textAlign: 'center',
    [theme.breakpoints.down('sm')]: {
      fontSize: '36px',
      lineHeight: '42.4px',
    },
    textShadow: '5px 2px rgba(237, 80, 99, 0.28)',
  }));

  return (
    <CustomContainer
      maxWidth="lg"
      sx={{
        ...marginTopBottom,
        [theme.breakpoints.down('sm')]: {
          marginTop: 4,
        },
      }}
    >
      <Stack sx={{ maxWidth: 'md' }} spacing={{ xs: 1, sm: 1, md: 1 }}>
        <HeroHeader
          sx={{
            padding: 0,
            width: '100%',
          }}
        >
          Our value
        </HeroHeader>
        <HeroSubTitle>
          We are a machine learning based dynamic ‘digital marketplace’ that
          provides the aspirant talent pool to stay continually competitive
          relative to the hiring landscape in India. We do this by harnessing
          our comprehensive knowledge partner ecosystem, which provides for
          comprehensive mentorship, learning and career progression advisory.
        </HeroSubTitle>
        <HeroSubTitle>
          We use a unique ‘affinity algorithm’ which provides for
          identification, assessment and enablement modules resulting in
          significant process efficiency in curation and hiring, whilst saving
          significant time and cost for businesses and aspirants.
        </HeroSubTitle>
      </Stack>
      <Container
        maxWidth="md"
        sx={{
          background:
            'linear-gradient(180deg, rgba(251, 132, 125, 0.1) 0%, rgba(251, 132, 125, 0) 100%);',
          minHeight: '237px',
          justifyContent: 'center',
          display: 'flex',

          borderRadius: 2,
          ...marginTopBottom,
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={{ xs: 0, sm: 1, md: 2 }}
        >
          {arrayDetails.map((values, index) => (
            <Grid
              sx={{
                textAlign: 'center',
                alignSelf: 'center',
              }}
              item
              xs={6}
              sm={3}
              key={values.id}
            >
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={1}
                sx={{
                  width: '100%',
                }}
              >
                <ShadowTextTitle sx={{ maxWidth: '143px' }}>
                  {values.value}
                </ShadowTextTitle>
                <ShadowTextSubTitle sx={{ maxWidth: '143px' }}>
                  {values.text}
                </ShadowTextSubTitle>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Stack direction="column" spacing={{ md: 1 }} sx={{ minWidth: 'lg' }}>
        <HeroHeader
          sx={{
            padding: 0,
            width: '100%',
          }}
        >
          Meet our team
        </HeroHeader>

        {arrayOfTeam?.map((values, index) => (
          <SplitScreen
            key={values.id}
            right={<RightHandComponent image={values.image} />}
            left={<LeftHandComponent ComponentValues={values} />}
            orderLeft={values.orderLeft}
            orderRight={values.orderRight}
          />
        ))}
      </Stack>
    </CustomContainer>
  );
};

export default OurValue;

const SplitScreen = ({ left: Left, right: Right, orderLeft, orderRight }) => {
  return (
    <Grid
      container
      spacing={{ xs: 2, sm: 2, md: 5 }}
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item sm={6} xs={12} order={orderLeft}>
        {Left}
      </Grid>
      <Grid item sm={6} xs={12} order={orderRight}>
        {Right}
      </Grid>
    </Grid>
  );
};

const RightHandComponent = props => {
  const theme = useTheme();
  return (
    // <CommonImage
    //   src={props.image}
    //   alt="heroImg"
    //   style={{
    //     height: '100%',
    //     width: '100%',
    //     maxHeight: '527.15px',
    //     maxWidth: '498.91px',
    //     [theme.breakpoints.down('sm')]: {
    //       maxHeight: '303.91px',
    //       maxWidth: '320.3px',
    //     },
    //   }}
    // />
    <Stack
      sx={{
        alignSelf: 'center',
        backgroundColor: '#D9D9D9',
        borderRadius: '20px',
        height: '527px',
        width: '100%',
        maxHeight: '527.15px',
        maxWidth: '498.91px',
        [theme.breakpoints.down('sm')]: {
          maxHeight: '303.91px',
          borderRadius: '13px',
          // maxWidth: '320.3px',
        },
      }}
    >
      <CommonImage
        src={props.image}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '20px',
        }}
      />
    </Stack>
  );
};

const LeftHandComponent = props => {
  const { ComponentValues } = props;

  return (
    <Stack direction="column">
      <Box>
        <Name>{ComponentValues.name}</Name>
        <Designation>{ComponentValues.designation}</Designation>
      </Box>
      {ComponentValues.details.map((values, index) => (
        <Description key={values.id}>{values.description}</Description>
      ))}
    </Stack>
  );
};
