import footerdata from '@/constants/Homepage/footerdata';
import homePageImagePaths from '@/constants/ImagePaths/Homepage/homePageImagePaths';
import { Link, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/image';
const footer = () => {
  const footerimg = {
    width: '80%',
  };
  const d = new Date();
  let year = d.getFullYear();
  return (
    <Box
      sx={{
        backgroundColor: 'primary.footer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        pt: '40px',
        pb: '40px',
        pl: { xs: '15px', lg: '15%' },
        pr: { xs: '15px', lg: '15%' },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="body1"
          sx={{
            color: 'common.white',
            fontWeight: '600',
            textAlign: 'center',
            lineHeight: '1.5',
            fontSize: {
              xs: '25px',
              md: 'clamp(40px,3.1vw,64px)',
              lg: '48px',
            },
          }}
        >
          {footerdata[0].accord[0].title}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'common.white',
            fontWeight: '600',
            textAlign: 'center',
            lineHeight: '1',
            mb: '30px',
            fontSize: {
              xs: '25px',
              md: 'clamp(40px,3.1vw,64px)',
              lg: '48px',
            },
          }}
        >
          {footerdata[0].accord[0].titleone}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: 'common.white',
            mb: '30px',
            fontSize: { xs: '17px', lg: '20px' },
            textAlign: 'center',
          }}
        >
          {footerdata[0].accord[0].description}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column-reverse', md: 'row', lg: 'row' },
          alignItems: { xs: 'center', lg: 'flex-start' },
          gap: { xs: '50px', lg: '100px' },
          mb: '30px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box>
            <Link href="/">
              <Image alt="razorswift" src={homePageImagePaths.footerlogo} />
            </Link>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDireaction: 'row',
              justifyContent: 'space-between',
              gap: '15px',
            }}
          >
            <Link
              href="https://twitter.com/wearerazorswift"
              sx={{ cursor: 'pointer' }}
            >
              <Image
                alt="razorswift"
                style={footerimg}
                src={homePageImagePaths.twitt}
              />
            </Link>
            <Link sx={{ cursor: 'pointer' }}>
              <Image
                alt="razorswift"
                style={footerimg}
                src={homePageImagePaths.fb}
              />
            </Link>
            <Link
              href="https://www.linkedin.com/company/razorswift"
              sx={{ cursor: 'pointer' }}
            >
              <Image
                alt="razorswift"
                style={footerimg}
                src={homePageImagePaths.linkedin}
              />
            </Link>
            <Link
              href="https://www.instagram.com/wearerazorswift/"
              sx={{ cursor: 'pointer' }}
            >
              <Image
                alt="razorswift"
                style={footerimg}
                src={homePageImagePaths.insta}
              />
            </Link>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: { xs: '50px', lg: '100px' },
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', mt: '3%' }}>
            {footerdata[1].accord.map((item, index) => (
              <Link
                href={item.href}
                key={index}
                variant="body1"
                underline="none"
                sx={{
                  cursor: 'pointer',
                  fontWeight: index == 0 ? '600' : '',
                  lineHeight: 2,
                  fontSize: { xs: '16px', xl: '24px' },
                  color: 'white',
                }}
              >
                {item.title}
              </Link>
            ))}
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', mt: '3%' }}>
            {footerdata[2].accord.map((item, index) => (
              <Link
                href={item.href}
                key={index}
                variant="body1"
                underline="none"
                sx={{
                  cursor: 'pointer',
                  fontWeight: '500',
                  lineHeight: 2,
                  fontSize: { xs: '16px', xl: '24px' },
                  color: 'white',
                }}
              >
                {item.title}
              </Link>
            ))}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: { xs: '0', md: '160px', lg: '160px' },
          borderTop: '1px solid',
          borderColor: 'common.white',
          width: '100%',
          pt: '3%',
        }}
      >
        <Link
          variant="body1"
          sx={{
            color: 'common.white',
            fontSize: { xs: '16px', xl: '24px' },
            textDecoration: 'none',
            cursor: 'pointer',
          }}
        >
          {year} Razorswift. All rights reserved.
        </Link>
        <Box sx={{ display: 'flex', gap: '50px' }}>
          <Link
            variant="body1"
            sx={{
              color: 'common.white',
              fontSize: { xs: '16px', xl: '24px' },
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            Terms of Services
          </Link>
          <Link
            variant="body1"
            sx={{
              color: 'common.white',
              fontSize: { xs: '16px', xl: '24px' },
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            Privacy Policy
          </Link>
        </Box>
      </Box>
    </Box>
  );
};
export default footer;
