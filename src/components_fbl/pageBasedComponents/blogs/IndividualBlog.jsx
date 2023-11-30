import { Questionsectdata } from '@/constants/Articles/articlesdata';
import blogscarddata from '@/constants/Blogs/blogscarddata';
import CustomImage from '@/src/components_fbl/globalComponents/CustomImage/CustomImage';
import Layout from '@/src/components_fbl/NavigationComponents/Layout';
import { insideblogban } from '@/src/constants/Blogs/herosection';
import { bebasNeue, urbanist } from '@/utils/themes/typography';
import { Box, Container, Grid, Link, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

const IndividualBlog = () => {
  const firstsec = {
    offscreen: {
      opacity: 0,
      rotate: 0,
      y: 50,
    },
    onscreen: {
      opacity: [0.5, 0.6, 0.7, 0.8, 0.9, 1],
      rotate: [0, 20, -20, 20, 0],
      y: 0,
      transition: {
        type: 'spring',
        duration: 5,
        ease: 'easeInOut',
        damping: 9.8,
        stiffness: 100,
      },
    },
  };
  const banimg = {
    width: '100%',
    height: 'auto',
  };
  return (
    <Layout>
      <Box>
        <Box
          sx={{
            height: '100vh',
            backgroundColor: '#A62973',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'end',
            marginTop: '72px',
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: '30px', md: '42px', lg: '62px', xl: '72px' },
              color: 'white',
              textAlign: 'center',
              textTransform: 'uppercase',
              fontFamily: bebasNeue.style.fontFamily,
              paddingTop: '100px',
            }}
          >
            Tips to write a great resume
          </Typography>
          <Stack justifyContent="center" alignItems="center">
            <Typography
              sx={{
                fontSize: '20px',
                color: 'white',
                textAlign: 'center',
                maxWidth: '880px',
                fontFamily: urbanist.style.fontFamily,
                padding: '0 20px',
              }}
            >
              Writing a great resume is essential for landing your dream job. A
              resume is a summary of your career, showcasing the jobs you’ve
              held and currently hold, the responsibilities you’ve taken on, the
              skills you’ve developed, and the qualities you bring to the table
              as an employee.
            </Typography>
          </Stack>
          {/* <Container>
            <Stack>
              <Typography>Published</Typography>
            </Stack>
          </Container> */}
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{ transform: 'translateY(100px)' }}
          >
            <CustomImage
              style={{
                borderRadius: '28px',
                boxShadow: '0px 0px 0px 9px #fff',
              }}
              src={insideblogban[0].img}
              width="clamp(300px,70vw,1600px)"
              aspectRatio="1400/567"
            />
          </Stack>
        </Box>
        <Box sx={{ paddingTop: { xs: '200px', md: '100px', md: '150px' } }}>
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
                  <Stack>
                    <Image style={banimg} src={item.img} />
                  </Stack>
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
              tempor incididunt ut labore et dolore magna aliqua.. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </Typography>
          </Container>
        </Box>

        <Box
          sx={{
            padding: '64px 0',
            marginTop: {
              xs: '20px',
              sm: '50px',
              md: '0px',
              lg: '60px',
              xl: '0',
            },
          }}
          style={{ width: '100%' }}
        >
          <Container>
            <Typography
              sx={{
                paddingBottom: '20px',
                fontSize: '36px',
                color: '#672476',
                display: 'flex',
                gap: '10px',
              }}
            >
              All{' '}
              <Typography
                sx={{
                  paddingBottom: '20px',
                  fontSize: '36px',
                  color: '#672476',
                  fontWeight: '600',
                }}
              >
                Blogs
              </Typography>
            </Typography>
            <motion.div transition={{ staggerChildren: 1.9 }}>
              <motion.div
                variants={firstsec}
                initial={'offscreen'}
                whileInView={'onscreen'}
                viewport={{ once: true }}
              >
                <Grid container spacing={5}>
                  {blogscarddata.map((item, index) => (
                    <Grid sx={{}} item xs={12} sm={6} md={4}>
                      <Stack
                        sx={{
                          backgroundColor: '#ffccc963',
                          paddingTop: '40px',
                          borderRadius: '20px',
                          height: '100%',
                          border: '2px solid transparent',
                          '&:hover': {
                            textDecoration: 'underline',
                            border: '2px solid #3B0647',
                            boxShadow: '0px 2px 5px 3px rgba(0,0,0,0.16)',
                          },
                        }}
                      >
                        <Image
                          alt="bannerImage"
                          style={banimg}
                          src={item.img}
                        />
                        <Stack sx={{ padding: '10px' }}>
                          <Typography
                            sx={{
                              fontSize: '18px',
                              paddingBottom: '20px',
                              height: '95px',
                            }}
                          >
                            <Link
                              sx={{
                                textDecoration: 'none',
                                color: 'black',

                                fontWeight: '500',
                              }}
                              href=""
                            >
                              {item.title}
                            </Link>
                          </Typography>
                          <Stack
                            flexDirection="row"
                            justifyContent="space-between"
                          >
                            <Typography
                              sx={{
                                fontSize: '16px',
                                '&:hover': {
                                  textDecoration: 'underline',
                                },
                              }}
                            >
                              <Link
                                style={{
                                  textDecoration: 'none',
                                  color: 'black',
                                }}
                                href=""
                              >
                                {item.article}
                              </Link>
                            </Typography>
                            <Typography
                              sx={{
                                fontSize: '16px',
                                '&:hover': {
                                  textDecoration: 'underline',
                                },
                              }}
                            >
                              <Link
                                style={{
                                  textDecoration: 'none',
                                  color: 'black',
                                }}
                                href=""
                              >
                                {item.date}
                              </Link>
                            </Typography>
                          </Stack>
                        </Stack>
                      </Stack>
                    </Grid>
                  ))}
                </Grid>
              </motion.div>
            </motion.div>
          </Container>
        </Box>
      </Box>
    </Layout>
  );
};

export default IndividualBlog;
