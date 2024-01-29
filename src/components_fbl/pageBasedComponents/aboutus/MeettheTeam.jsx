import meettheteam from '@/constants/Aboutus/meettheteam';
import meettheteamlink from '@/constants/Aboutus/meettheteamlink';
import teamperson from '@/constants/Aboutus/teamperson';
import Aboutusimagepathway from '@/constants/ImagePaths/Aboutus/Aboutusimagepathway';
import { Box, Container, Grid, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
const MeettheTeam = () => {
  const router = useRouter();
  const { slug } = router.query;
  console.log(slug);

  const secstyle = {
    textDecoration: 'none',
    overflow: 'hidden',
  };
  const popup = useRef();
  const pagecontainer = useRef();
  const scrollPosition = useRef(0);
  const popUpContentRef = useRef();
  const leftclickRef = useRef();

  function handleLinkClose(e) {
    if (
      popUpContentRef.current &&
      !popUpContentRef.current.contains(e.target)
    ) {
      document.body.style.overflow = 'scroll';
      popup.current.classList.remove('display');
      window.scrollTo(0, scrollPosition.current);
    }
  }
  console.log(meettheteamlink);
  function handleClosebutton() {
    document.body.style.overflow = 'scroll';
    popup.current.classList.remove('display');
    window.scrollTo(0, scrollPosition.current);
  }
  const [content, setContent] = useState(teamperson[0]);
  const handleLinkClick = id => {
    const matchingItem = teamperson.find(
      item => item.id.toString() === id.toString()
    );

    setContent(matchingItem);

    scrollPosition.current = window.scrollY;
    document.body.style.overflow = 'hidden';
    popup.current.classList.add('display');
  };

  const firstsec = {
    offscreen: {
      opacity: 0,
      rotate: 0,
      y: 100,
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

  const secondsec = {
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
    <Container
      sx={{ overflowX: 'hidden', marginTop: '100px' }}
      ref={pagecontainer}
      className="topcontainer"
      id="topcontainer"
    >
      <motion.div transition={{ staggerChildren: 1.9 }}>
        <motion.div
          variants={firstsec}
          initial={'offscreen'}
          whileInView={'onscreen'}
          viewport={{ once: true }}
        >
          <Typography
            sx={{ textAlign: 'center', fontSize: '44px', fontWeight: 'bold' }}
          >
            Meet the team
          </Typography>
        </motion.div>
      </motion.div>
      <Grid
        sx={{ marginTop: '50px' }}
        container
        justifyContent="center"
        alignItems="center"
      >
        {meettheteam.map((item, i) => (
          <Grid
            sx={{
              marginBottom: '40px',
              borderLeft:
                item.id % 2 == 0 ? { xs: 'none', md: '1px solid #707070' } : '',
            }}
            item
            xs={12}
            md={6}
            key={i}
          >
            <Stack alignItems="center" justifyContent="center">
              <motion.div transition={{ staggerChildren: 1.9 }}>
                <motion.div
                  variants={secondsec}
                  initial={'offscreen'}
                  whileInView={'onscreen'}
                  viewport={{ once: true }}
                >
                  <Link
                    ref={leftclickRef}
                    href={`/aboutus/${item.slug}`}
                    style={secstyle}
                    onClick={e => {
                      console.log(e);
                      if (e.ctrlKey) {
                        // If Ctrl (or Cmd) key is held, open the link in a new tab
                        return;
                      }
                      e.preventDefault();
                      handleLinkClick(item.id);
                    }}
                  >
                    <Stack
                      flexDirection="column"
                      gap={1}
                      // className="gradient-overlay"
                      sx={{
                        width: 'fit-content',
                        position: 'relative',
                        '&:before': {
                          content: "''",
                          position: 'absolute',
                          inset: '0',
                          background:
                            'linear-gradient(to top, black, transparent 50%)',
                        },
                        '&:hover:before': {
                          background:
                            'linear-gradient(to top, #a62973, transparent 50%)',
                        },
                        '&:hover > div': {
                          textDecoration: 'underline white', // Underline text on hover
                        },
                      }}
                    >
                      <Stack sx={{}}>
                        <Image
                          style={{
                            width: 'clamp(350px, 35vw, 500px)',
                            height: 'auto',
                            alignSelf: 'center',
                            borderBottom: '1px solid #707070',
                            aspectRatio: '1/1',
                            objectFit: 'cover',
                          }}
                          src={item.img}
                        />
                      </Stack>
                      <Box
                        sx={{
                          // margin: {
                          //   xs: '-120px 0px 0',
                          //   sm: '-120px 150px 0',
                          //   md: '-120px 45px 0',
                          // },
                          position: 'absolute',
                          bottom: '20px',
                          left: '20px',
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: { xs: '30px', md: '36px' },
                            fontWeight: '600',
                            color: 'white',
                            cursor: 'pointer',
                          }}
                        >
                          {item.name}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: '24px',
                            color: 'white',
                            cursor: 'pointer',
                          }}
                        >
                          {item.designation}
                        </Typography>
                      </Box>
                    </Stack>
                  </Link>
                </motion.div>
              </motion.div>
            </Stack>
          </Grid>
        ))}
      </Grid>
      <Box
        onClick={handleLinkClose}
        ref={popup}
        className="poppage  poppage--fullpage--end "
      >
        <Box ref={popUpContentRef} className="midpage">
          <Box className="finalpage">
            <Container sx={{ paddingTop: '30px' }}>
              <Grid
                sx={{
                  width: '100%',
                  flexDirection: { xs: 'column-reverse', md: 'row' },
                }}
                container
                alignItems="center"
              >
                <Grid
                  sx={{ marginTop: { xs: '-25px', md: '' } }}
                  item
                  xs={12}
                  lg={2}
                ></Grid>

                <Grid justifyContent="center" item xs={12} lg={8}>
                  <motion.div transition={{ staggerChildren: 1.9 }}>
                    <motion.div
                      variants={secondsec}
                      initial={'offscreen'}
                      whileInView={'onscreen'}
                      viewport={{ once: true }}
                    >
                      <Box
                        sx={{
                          marginTop: { xs: '30px', md: '' },
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: '44px',
                            textAlign: 'center',
                            fontWeight: '600',
                          }}
                        >
                          {content.person[0].title}
                        </Typography>
                        <Typography
                          sx={{ fontSize: '36px', textAlign: 'center' }}
                        >
                          {content.person[0].designation}
                        </Typography>
                        <Link
                          href={`${content.person[0].link}`}
                          style={secstyle}
                        >
                          <Image
                            alt="closesvg"
                            style={{
                              cursor: 'pointer',
                              height: 'auto',
                              width: '40px',
                            }}
                            src={Aboutusimagepathway.linkedin}
                          />
                        </Link>
                      </Box>
                    </motion.div>
                  </motion.div>
                </Grid>

                <Grid
                  sx={{
                    display: 'flex',
                    justifyContent: { xs: 'end', md: 'end' },
                    width: '100%',
                  }}
                  item
                  xs={12}
                  lg={2}
                >
                  <Stack>
                    <Image
                      alt="closesvg"
                      onClick={handleClosebutton}
                      style={{
                        cursor: 'pointer',
                        height: 'auto',
                        width: '50px',
                      }}
                      src={Aboutusimagepathway.close}
                    />
                  </Stack>
                </Grid>
              </Grid>

              <Grid
                sx={{
                  padding: '20px 0 20px 0',
                  borderTop: '1px solid #707070',
                  borderBottom: '1px solid #707070',
                  marginTop: '60px',
                }}
                container
                justifyContent="center"
                alignItems="center"
              >
                <Grid
                  sx={{ borderRight: '1px solid #707070' }}
                  item
                  xs={12}
                  lg={6}
                >
                  <Stack
                    flexDirection="row"
                    justifyContent="center"
                    sx={{ width: '100%' }}
                  >
                    <Image
                      alt="teamdemo"
                      style={{
                        height: 'auto',
                        width: '500px',
                        aspectRatio: '1/1',
                        objectFit: 'cover',
                      }}
                      src={content.person[0].img}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Stack
                    sx={{
                      paddingLeft: { xs: '', md: '25px' },
                      marginTop: { xs: '40px', md: '' },
                    }}
                  >
                    {/* <Typography sx={{ fontSize: '24px' }}>
                      {content.person[0].content}
                    </Typography> */}
                    <Typography sx={{ fontSize: '20px' }}>
                      {content.person[0].description}
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default MeettheTeam;
