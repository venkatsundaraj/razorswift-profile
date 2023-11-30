import { Container, Grid, Link, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { motion } from 'framer-motion';
import Image from 'next/image';
const BlogCard = ({ filteredData }) => {
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
              {filteredData.blogs.map((item, index) => (
                <Grid sx={{ position: 'relative' }} item xs={12} sm={6} md={4}>
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
                    <Image alt="bannerImage" style={banimg} src={item.image} />
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
                          href={`/blogs/${filteredData.id}/${item.id}`}
                        >
                          {item.individualBlogTitle}
                        </Link>
                      </Typography>
                      <Stack flexDirection="row" justifyContent="space-between">
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
                            href={`/blogs/${filteredData.id}/${item.id}`}
                          >
                            Short Read
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
  );
};

export default BlogCard;
