import { Questionsectdata } from '@/constants/Articles/articlesdata';
import { Box, Container, Typography } from '@mui/material';
import React from 'react';

const Questionsect = () => {
  return (
    <Box sx={{ paddingTop: '100px' }}>
      <Container>
        <Typography
          sx={{ fontSize: '24px', fontWeight: '600', color: 'black' }}
        >
          It’s important to make sure your resume is well-written and easy to
          read. Here are some tips on how to write a great resume:
        </Typography>
        {Questionsectdata.map((item, index) => (
          <>
            <Box
              sx={{
                padding: { xs: '50px 0px 0px 0px', md: '50px 100px 0px 100px' },
              }}
            >
              <Typography
                sx={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: 'black',
                  paddingBottom: '10px',
                }}
              >
                {item.name}
              </Typography>
              <Typography sx={{ fontSize: '20px', color: 'black' }}>
                {item.description}
              </Typography>
            </Box>
          </>
        ))}
        <Typography
          sx={{
            fontSize: '20px',
            padding: '20px 100px 0px 100px',
          }}
        >
          <Box sx={{ fontSize: '20px', fontWeight: '600', color: 'black' }}>
            Conclusion Paragraph -
          </Box>{' '}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.. Lorem
          ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.. Lorem ipsum dolor
          sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua.
        </Typography>
      </Container>
    </Box>
  );
};

export default Questionsect;
