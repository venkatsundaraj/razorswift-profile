import blogscarddata from '@/constants/Blogs/blogscarddata';
import { Container, Grid, Link, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { motion } from 'framer-motion';
import Image from 'next/image';
const BlogCard = () => {
  const banimg = {
    width: '100%',
    height: 'auto',
  };

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
  return (
    <Box sx={{ paddingBottom: '64px' }} style={{ width: '100%' }}>
      <Container>
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
                    }}
                  >
                    <Image alt="bannerImage" style={banimg} src={item.img} />
                    <Stack sx={{ padding: '10px' }}>
                      <Typography
                        sx={{
                          fontSize: '24px',
                          paddingBottom: '20px',
                          height: '95px',
                        }}
                      >
                        <Link
                          sx={{
                            textDecoration: 'none',
                            color: 'black',
                            '&:hover': {
                              textDecoration: 'underline',
                            },
                          }}
                          href=""
                        >
                          {item.title}
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
                          style={{ textDecoration: 'none', color: 'black' }}
                          href=""
                        >
                          {item.article}
                        </Link>
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default BlogCard;
