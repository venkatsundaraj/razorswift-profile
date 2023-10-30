import HeroHeader from '@/headingComponents/HeroHeader';
import SubTitle from '@/headingComponents/SubTitle';
import { CommonImage } from '@/imageComponents/CommonImages';
import {
  Box,
  Container,
  Grid,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import { ourTeamDetails } from 'src/data/app.data';
import { marginTopBottom } from 'src/utils/commonStyles';

const Team = () => {
  const theme = useTheme();

  const CustomContainer = styled(Container)(({ theme }) => ({
    // minHeight: '651px',
    backgroundColor: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    gap: 20,
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    },
  }));

  const NameText = styled(Typography)(({ theme }) => ({
    textTransform: 'none',
    color: '#1D1D1D',
    fontSize: '24px',
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: '40.5px',
    width: '100%',

    [theme.breakpoints.down('sm')]: {
      fontSize: '20px',
      fontWeight: '600',
      lineHeight: '32.4px',
    },
  }));
  const DesignationText = styled(Typography)(({ theme }) => ({
    width: '100%',
    textTransform: 'none',
    color: '#434343',
    fontSize: '18px',
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: '26.65px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '16px',
      lineHeight: '21.01px',
    },
  }));

  return (
    <CustomContainer maxWidth="lg" sx={{ ...marginTopBottom }}>
      <Container maxWidth="md">
        <HeroHeader sx={{ textAlign: 'center' }}>Our Team</HeroHeader>

        <SubTitle
          sx={{
            flex: 1,
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',

            [theme.breakpoints.down('md')]: {
              paddingTop: 2,
              paddingBottom: 2,
            },
          }}
        >
          We are a machine learning based dynamic ‘digital marketplace’ that
          provides the aspirant talent pool to stay continually competitive
          relative
        </SubTitle>
      </Container>

      <Grid
        container
        // spacing={{ xs: 2, md: 3 }}
        // columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {ourTeamDetails.map((values, index) => (
          <Grid item xs={12} sm={4} md={3} key={index}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <Box
                sx={theme => ({
                  flex: '1',
                  minHeight: '264px',
                  minWidth: '229px',
                  [theme.breakpoints.down('sm')]: { height: '330px' },
                })}
              >
                <CommonImage
                  src={values.image}
                  alt="heroImg"
                  style={{
                    width: '100%',
                    height: '100%',

                    // marginBottom: '2rem',
                  }}
                />
              </Box>
              <NameText>{values.name}</NameText>
              <DesignationText>{values.designation}</DesignationText>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* <TransparentButton
        backgroundColor="#fff"
        color="purple"
        buttonText="Know more"
        heroBtn={false}
        sx={{ padding: 0 }}
        // icon={<PlayArrowIcon />}
      /> */}
    </CustomContainer>
  );
};

export default Team;
