import { Questionsectdata } from '@/constants/Articles/articlesdata';
import { Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import React from 'react';
const Questionsect = () => {
  const firstsec = {
    offscreen: {
      opacity: 0,
      rotate: 0,
      y: -100,
    },
    onscreen: {
      opacity: [0.5, 0.6, 0.7, 0.8, 0.9, 1],
      rotate: [0, 20, -20, 20, 0],
      y: 0,
      transition: {
        type: 'spring',
        duration: 2,
        ease: 'easeInOut',
        damping: 9.8,
        stiffness: 100,
      },
    },
  };
  return (
    <Box sx={{ paddingTop: '100px' }}>
      <motion.div transition={{ staggerChildren: 1.9 }}>
        <motion.div
          variants={firstsec}
          initial={'offscreen'}
          whileInView={'onscreen'}
          viewport={{ once: true }}
        >
          <Container>
            <Typography
              sx={{ fontSize: '24px', fontWeight: '600', color: 'black' }}
            >
              It’s important to make sure your resume is well-written and easy
              to read. Here are some tips on how to write a great resume:
            </Typography>
            {Questionsectdata.map((item, index) => (
              <>
                <Box
                  sx={{
                    padding: {
                      xs: '50px 0px 0px 0px',
                      md: '50px 100px 0px 100px',
                    },
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
                padding: { xs: '', md: '20px 100px 0px 100px' },
              }}
            >
              <Box sx={{ fontSize: '20px', fontWeight: '600', color: 'black' }}>
                Conclusion Paragraph -
              </Box>{' '}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </Typography>
          </Container>
        </motion.div>
      </motion.div>
    </Box>
  );
};

export default Questionsect;
