import IMAGES from '@/imageComponents/ImagePaths';
import NavbarLogoLink from '@/reUsableComponents/NavbarLogoLink';
import ScrollButton from '@/reUsableComponents/ScrollButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import {
  Box,
  Container,
  Grid,
  Link,
  Stack,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import NextLink from 'next/link';

const HeaderLink = [
  { id: '1', path: '/', name: 'Home' },
  { id: '2', path: '/about', name: 'About Us' },
  { id: '3', path: '/contact', name: 'Contact Us' },
];
const IconLinks = [
  {
    id: '1',
    ImagePath: IMAGES.Twitter,
    name: 'twitter',
    path: 'https://twitter.com/WeAreRazorSwift',
    Icon: TwitterIcon,
  },
  {
    id: '2',
    ImagePath: IMAGES.Messenger,
    name: 'two',
    path: 'https://www.facebook.com/RazorSwift',
    Icon: FacebookIcon,
  },
  {
    id: '3',
    ImagePath: IMAGES.Too,
    name: 'messenger',
    path: 'https://www.linkedin.com/company/razorswift',
    Icon: LinkedInIcon,
  },
];

const Footer = () => {
  const theme = useTheme();
  const CustomBox = styled(Box)(({ theme }) => ({
    maxWidth: '321.13px',
    [theme.breakpoints.down('sm')]: {
      textAlign: 'center',
      maxWidth: '277.64px',
    },
  }));
  const CustomContainer = styled(Container)(({ theme }) => ({
    backgroundColor: '#10172B',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    gap: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      // textAlign: 'center',
      gap: theme.spacing(1.5),
    },
  }));

  const IconBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',

    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
      gap: '1rem',
    },
  }));

  const PageLink = styled(Link)(({ theme }) => ({
    textDecoration: 'none',
    textTransform: 'none',
    color: '#fff',
    fontSize: '18px',
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: '32.58px',
    [theme.breakpoints.down('md')]: {
      fontSize: '14px',
      lineHeight: '25.34px',
    },
  }));
  const Address = styled(Typography)(({ theme }) => ({
    textTransform: 'none',
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '18px',
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: '28.96px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
      lineHeight: '21.72px',
    },
  }));
  const CopyRight = styled(Link)(({ theme }) => ({
    textDecoration: 'none',
    textTransform: 'none',
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: '12px',
    fontWeight: '600',
    textAlign: 'none',
    lineHeight: '26px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '10px',
      lineHeight: '26px',
      color: 'rgba(255, 255, 255, 0.6)',
    },
  }));
  const Policy = styled(Typography)(({ theme }) => ({
    textTransform: 'none',
    color: '#ffffff',
    fontSize: '14px',
    fontWeight: '500',
    textAlign: 'none',
    lineHeight: '26px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '10px',
      color: 'rgba(255, 255, 255, 0.6)',
      lineHeight: '26px',
    },
  }));

  return (
    <Container
      maxWidth="xl"
      sx={{
        backgroundColor: '#10172B',
        minHeight: '347.08px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        [theme.breakpoints.down('sm')]: {
          minHeight: '258.52px',
        },
      }}
    >
      <CustomContainer
        disableGutters={useMediaQuery(theme.breakpoints.only('xs'))}
      >
        <Box sx={{ marginY: 2 }}>
          <NavbarLogoLink
            src={IMAGES?.LOGO_WHITE}
            alt="logo"
            height="31.5px"
            width=""
            url={'/'}
          />
          {/* <CommonImage
            src={IMAGES?.LOGO_WHITE}
            alt="logo"
            height="31.5px"
            width=""
          /> */}
        </Box>
        <CustomBox>
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={{ xs: 3, sm: 3, md: 6 }}
          >
            {HeaderLink.map((values, index) => (
              <PageLink key={values.id} component={NextLink} href={values.path}>
                {values.name}
              </PageLink>
            ))}
          </Stack>
        </CustomBox>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Address
            sx={{
              textAlign: 'initial',
              maxWidth: '427px',
              [theme.breakpoints.down('sm')]: {
                // textAlign: 'center',
                maxWidth: '234.64px',
              },
            }}
          >
            A new age marketplace for career progression and talent acquisition.
          </Address>
          <IconBox sx={{ display: { xs: 'flex', sm: 'flex', md: 'none' } }}>
            {IconLinks.map((values, index) => {
              const Icon = values.Icon;
              return (
                <Link target="_blank" href={values.path} key={values.id}>
                  <Icon
                    sx={{ color: '#ffffff' }}
                    height="14.5px"
                    width="14.5px"
                  />
                </Link>
              );
            })}
          </IconBox>
          <Box>
            <ScrollButton />
          </Box>
        </Stack>
        <Box
          sx={{
            background:
              'linear-gradient(90deg, rgba(203, 203, 203, 0.064) 0%, rgba(203, 203, 203, 0.696) 46.96%, rgba(203, 203, 203, 0.064) 100%);',
            height: 2,
          }}
        />

        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item xs={6} md={6}>
            <CopyRight>2022 Razorswift. All rights reserved.</CopyRight>
          </Grid>

          <Grid item xs={6} md={6}>
            <Stack
              direction="row"
              justifyContent="space-evenly"
              alignItems="center"
              spacing={{ xs: 1, sm: 2, md: 4 }}
            >
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={3}
              >
                <CopyRight
                  target="_blank"
                  component={NextLink}
                  href={'/privacypolicy'}
                >
                  Privacy Policy
                </CopyRight>
                <CopyRight
                  target="_blank"
                  component={NextLink}
                  href={'/termsofservices'}
                >
                  Terms of Services
                </CopyRight>
              </Stack>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}
                sx={{ display: { xs: 'none', sm: 'none', md: 'flex' } }}
              >
                {/* {IconLinks.map((values, index) => (
                  
                  <CommonImage
                    key={values.id}
                    src={values.ImagePath}
                    alt={values.name}
                    style={{ cursor: 'pointer', height: '20px', width: '20px' }}
                  />
                ))} */}
                {IconLinks.map((values, index) => {
                  const Icon = values.Icon;
                  return (
                    <Link target="_blank" href={values.path} key={values.id}>
                      <Icon
                        sx={{ color: '#ffffff' }}
                        height="14.5px"
                        width="14.5px"
                      />
                    </Link>
                  );
                })}
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </CustomContainer>
    </Container>
  );
};

export default Footer;
