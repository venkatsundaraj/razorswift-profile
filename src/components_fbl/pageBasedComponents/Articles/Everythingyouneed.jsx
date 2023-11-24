import { everything } from '@/constants/Articles/articlesdata';
import { Box, Container, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';

const Everythingyouneed = () => {
  return (
    <Box sx={{ paddingTop: '100px' }}>
      <Container>
        <Typography
          sx={{
            fontSize: '36px',
            color: '#672476',
            fontWeight: '500',
            marginBottom: '50px',
          }}
        >
          Everything you need!
        </Typography>
        <Grid
          sx={{ marginBottom: '50px' }}
          alignItems="center"
          justifyContent="space-between"
          container
          spacing={5}
        >
          {everything.map((item, i) => (
            <Grid key={i} item xs={12} md={4}>
              <Box
                sx={{
                  backgroundColor: item.color,
                  padding: '20px',
                  borderRadius: '20px',
                  height: 'clamp',
                }}
              >
                <Box sx={{ paddingBottom: '15px' }}>
                  <Image alt="bannerImage" src={item.img} />
                </Box>
                <Typography
                  sx={{
                    fontSize: '24px',
                    fontWeight: '600',
                    color: 'black',
                    paddingBottom: '15px',
                  }}
                >
                  {item.name}
                </Typography>
                <Typography sx={{ fontSize: '20px', color: 'black' }}>
                  {item.description}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Everythingyouneed;
