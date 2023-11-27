import { herosec } from '@/constants/Articles/articlesdata';
import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

const HeroSection = () => {
  console.log(herosec[0]);
  return (
    <Box
      sx={{ marginTop: '100px', backgroundColor: '#F0F0F0', padding: '50px 0' }}
    >
      <Container>
        <Grid alignItems="center" container spacing={1}>
          <Grid item xs={12} md={6}>
            <Typography
              sx={{
                fontSize: '16px',
                color: 'black',
                paddingBottom: '30px',
                fontWeight: '400',
              }}
            >
              {herosec[0].name}
            </Typography>
            <Typography
              sx={{
                fontSize: '40px',
                color: 'black',
                paddingBottom: '30px',
                fontWeight: '600',
              }}
            >
              {herosec[0].description}{' '}
            </Typography>
            <Typography
              sx={{
                fontSize: '20px',
                color: 'black',
                paddingBottom: '30px',
                fontWeight: '500',
              }}
            >
              {herosec[0].descriptiontwo}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack justifyContent="center" alignItems="center">
              <Image
                style={{
                  width: 'clamp(360px,28vw,600px)',
                  height: 'auto',
                }}
                alt="bannerImage"
                src={herosec[0].img}
              />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;
