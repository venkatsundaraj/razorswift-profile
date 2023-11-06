import TickerComponent from '@/components_fbl/TickerComponent/TickerComponent';
import herosec from '@/constants/Aboutus/herosec';
import { TickerBoxData } from '@/constants/Aspirants/aspirantPageData';
import Aboutusimagepathway from '@/constants/ImagePaths/Aboutus/Aboutusimagepathway';
import { bebasNeue } from '@/utils/themes/typography';
import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';
const HeroSec = () => {
  return (
    <Box>
      <Box
        sx={{
          height: 'calc(100vh - 65px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
      >
        <Box>
          <Grid justifyContent="center" container>
            <Grid item lg={2} xl={2}></Grid>
            <Grid
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
              item
              lg={8}
              xl={8}
            >
              <Box sx={{ textAlign: 'center' }}>
                <Typography
                  variant="h1"
                  sx={{
                    color: '#FB847D',
                    fontSize: 'clamp(50px, 6.2vw, 103px)',
                    fontWeight: '500',
                    lineHeight: '1.0',
                    fontFamily: bebasNeue.style.fontFamily,
                  }}
                >
                  {herosec[0].title}
                </Typography>
                <Typography
                  variant="h1"
                  sx={{
                    color: '#672376',
                    fontSize: 'clamp(50px, 6.2vw, 121px)',
                    fontWeight: '500',
                    lineHeight: '1.0',
                    fontFamily: bebasNeue.style.fontFamily,
                  }}
                >
                  {herosec[0].description}
                </Typography>
              </Box>
            </Grid>
            <Grid item lg={2} xl={2}></Grid>
          </Grid>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: { xs: '150px', md: '-50px' },
          }}
        >
          <Image
            style={{
              zIndex: '-1',
              width: 'clamp(320px, 77vw, 1200px)',
              height: 'auto',
            }}
            alt="lookingtoimg"
            src={Aboutusimagepathway.newbanner}
          />
        </Box>
      </Box>
      <TickerComponent
        variant="div"
        data={TickerBoxData}
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      />
    </Box>
  );
};

export default HeroSec;
