import TickerComponent from '@/components_fbl/TickerComponent/TickerComponent';
import herosec from '@/constants/Aboutus/herosec';
import { TickerBoxData } from '@/constants/Aspirants/aspirantPageData';
import Aboutusimagepathway from '@/constants/ImagePaths/Aboutus/Aboutusimagepathway';
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
          <Grid container>
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
              <Box>
                <Typography
                  variant="h1"
                  sx={{
                    color: '#FB847D',
                    fontSize: '103px',
                    fontWeight: '500',
                    lineHeight: '1.0',
                  }}
                >
                  {herosec[0].title}
                </Typography>
                <Typography
                  variant="h1"
                  sx={{
                    color: '#672376',
                    fontSize: '121px',
                    fontWeight: '500',
                    lineHeight: '1.0',
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
            marginTop: '-50px',
          }}
        >
          <Image
            style={{ zIndex: '-1' }}
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
