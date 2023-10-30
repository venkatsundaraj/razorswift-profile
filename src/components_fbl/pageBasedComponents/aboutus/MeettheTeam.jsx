import meettheteam from '@/constants/Aboutus/meettheteam';
import teamperson from '@/constants/Aboutus/teamperson';
import Aboutusimagepathway from '@/constants/ImagePaths/Aboutus/Aboutusimagepathway';
import { Box, Container, Grid, Typography } from '@mui/material';
import { Stack } from '@mui/system';
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
  return (
    <Container
      sx={{ overflowX: 'hidden', marginTop: '100px' }}
      ref={pagecontainer}
      className="topcontainer"
      id="topcontainer"
    >
      <Typography
        sx={{ textAlign: 'center', fontSize: '44px', fontWeight: 'bold' }}
      >
        Meet the team
      </Typography>

      <Grid
        sx={{ width: '100%', marginTop: '50px' }}
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
              <Stack flexDirection="column" gap={1} sx={{ width: '100%' }}>
                <Image
                  alt="personimage"
                  style={{
                    width: '500px',
                    height: 'auto',
                    alignSelf: 'center',
                    paddingBottom: '20px',
                    borderBottom: '1px solid #707070',
                    aspectRatio: '1/1',
                    objectFit: 'cover',
                  }}
                  src={item.img}
                />

                <Box
                  sx={{
                    margin: {
                      xs: '-120px 0px 0',
                      sm: '-120px 150px 0',
                      md: '-120px 45px 0',
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '36px',
                      fontWeight: '600',
                      color: 'white',
                      cursor: 'pointer',
                    }}
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    sx={{ fontSize: '24px', color: 'white', cursor: 'pointer' }}
                  >
                    {item.designation}
                  </Typography>
                </Box>
              </Stack>
            </Link>
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
              <Grid sx={{ width: '100%' }} container alignItems="center">
                <Grid item xs={12} lg={2}>
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
                </Grid>
                <Grid justifyContent="center" item xs={12} lg={8}>
                  <Typography
                    sx={{
                      fontSize: '44px',
                      textAlign: 'center',
                      fontWeight: '600',
                    }}
                  >
                    {content.person[0].title}
                  </Typography>
                  <Typography sx={{ fontSize: '36px', textAlign: 'center' }}>
                    {content.person[0].designation}
                  </Typography>
                </Grid>
                <Grid item xs={12} lg={2}></Grid>
              </Grid>

              <Grid
                sx={{
                  padding: '20px 0 20px 0',
                  borderTop: '1px solid #707070',
                  borderBottom: '1px solid #707070',
                  marginTop: '80px',
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
                  <Stack sx={{ paddingLeft: '25px' }}>
                    <Typography sx={{ fontSize: '24px' }}>
                      {content.person[0].content}
                    </Typography>
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
