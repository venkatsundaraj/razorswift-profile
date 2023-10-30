import DropDownWrapper from '@/components_fbl/dropDownComponents/DropDownWrapper';
import ParagraphHeading from '@/components_fbl/headingComponents/ParagraphHeading';
import futuredsection from '@/constants/Blogs/futuredsection';
import blog from '@/constants/ImagePaths/blog/blog';
import { Container, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { motion } from 'framer-motion';
import Image from 'next/image';
const Futuredsection = () => {
  const banimg = {
    width: 'clamp(300px, 36.2vw, 530px)',
    height: 'auto',
  };

  const firstsec = {
    offscreen: {
      opacity: 0,
      rotate: 0,
      y: 30,
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
    <DropDownWrapper style={{ width: '100%' }}>
      <motion.div transition={{ staggerChildren: 1.9 }}>
        <motion.div
          variants={firstsec}
          initial={'offscreen'}
          whileInView={'onscreen'}
          viewport={{ once: true }}
        >
          <Container>
            <Box
              sx={{
                backgroundColor: '#EFBEBE',
                padding: '40px 30px',
                borderRadius: '20px',
              }}
            >
              <Grid alignItems="center" container spacing={1}>
                <Grid item xs={12} md={6}>
                  <Typography
                    sx={{
                      fontSize: '24px',
                      fontWeight: '600',
                      color: '#A62973',
                    }}
                  >
                    {futuredsection[0].title}
                  </Typography>
                  <Box sx={{ margin: '20px 0' }}>
                    <Typography
                      sx={{
                        fontSize: '36px',
                        fontWeight: '600',
                        paddingBottom: '10px',
                      }}
                    >
                      {futuredsection[0].titleone}
                    </Typography>
                    <ParagraphHeading
                      sx={{
                        padding: '10px 0',
                        borderTop: '1px solid #A62973',
                      }}
                    >
                      {futuredsection[0].para}
                    </ParagraphHeading>

                    <Typography
                      sx={{
                        fontSize: '20px',
                        fontWeight: '600',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                      }}
                    >
                      {futuredsection[0].readmore}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <ParagraphHeading>
                      {futuredsection[0].date}
                    </ParagraphHeading>
                    <ParagraphHeading>
                      {futuredsection[0].author}
                    </ParagraphHeading>
                  </Box>
                </Grid>
                <Grid item md={1}></Grid>
                <Grid item xs={12} md={5}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: { xs: 'center', lg: 'center', xl: 'end' },
                    }}
                  >
                    <Image
                      alt="bannerImage"
                      style={banimg}
                      src={blog.blogplace}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </motion.div>
      </motion.div>
    </DropDownWrapper>
  );
};

export default Futuredsection;
