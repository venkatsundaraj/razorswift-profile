import PrimaryFillButton from '@/components_fbl/buttonComponents/PrimaryFillButton';
import CustomImage from '@/components_fbl/globalComponents/CustomImage/CustomImage';
import ExtraParagraphHeading from '@/components_fbl/headingComponents/ExtraParagraphHeading';
import SecondaryHeading from '@/components_fbl/headingComponents/SecondaryHeading';
import SubtitleHeading from '@/components_fbl/headingComponents/SubtitleHeading';
import { Box, Container, Grid, Paper, Stack, Typography } from '@mui/material';
import Image from 'next/image';

function CareerDropDownBody({ dropDownBodyData, ...props }) {
  return (
    <Box
      {...props}
      sx={{
        width: '100%',
        borderRadius: 6,
        backgroundColor: `${dropDownBodyData.backgroundColor}`,
        py: 2,
      }}
    >
      <Container
        sx={{
          padding: theme => theme.spacing(5, 0, 0, 0),
          borderRadius: 8,
          padding: '0',
        }}
      >
        <Grid
          sx={{
            padding: theme => ({
              xs: theme.spacing(0, 2),
              sm: theme.spacing(0, 0),
            }),
          }}
          container
          spacing={2}
          alignItems="center"
        >
          <Grid item xs={12} md={6}>
            <Stack direction="column" alignItems="start" gap={2}>
              <CustomImage
                src={dropDownBodyData.trophyImage}
                alt={dropDownBodyData.title}
                width={{ xs: '70%', md: '90%' }}
                aspectRatio="6/2"
                style={{
                  objectFit: 'unset',
                }}
              />

              <SecondaryHeading sx={{ color: 'primaryPalette.primaryBlack' }}>
                {dropDownBodyData.title}
              </SecondaryHeading>
              <Typography
                variant="h3"
                sx={{
                  color: 'primaryPalette.primaryBlack',
                  fontSize: 'clamp(34px,5vw,56px)',
                  color: 'primaryPalette.primaryBlack',
                  fontWeight: '600',
                }}
              >
                {dropDownBodyData.highLightedTitle}
              </Typography>
              <SubtitleHeading
                sx={{
                  color: 'primaryPalette.primaryBlack',
                }}
              >
                {dropDownBodyData.description}
              </SubtitleHeading>
              {dropDownBodyData.buttonData && (
                <PrimaryFillButton
                  varient="contained"
                  href={dropDownBodyData.buttonData?.link}
                  sx={{
                    backgroundColor:
                      dropDownBodyData.buttonData?.backgroundColor,
                    color: dropDownBodyData.buttonData?.color,
                    transition: 'all 300ms ease',
                    marginTop: '20px',
                    '&:hover': {
                      backgroundColor:
                        dropDownBodyData.buttonData?.backgroundColor,
                      color: dropDownBodyData.buttonData?.color,
                      transform: 'translateY(-3px)',
                      boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1)',
                    },
                  }}
                >
                  {dropDownBodyData.buttonData?.title}
                </PrimaryFillButton>
              )}

              <Grid item lg={4} xl={3}></Grid>
            </Stack>
          </Grid>
          <Grid item xs={12} md={1}></Grid>
          <Grid item xs={12} md={5}>
            <Stack>
              <CustomImage
                alt={dropDownBodyData.title}
                src={dropDownBodyData.image}
                width="100%"
                aspectRatio="1/1"
                style={{
                  objectFit: 'cover',
                  borderRadius: '24px',
                }}
              />
            </Stack>
          </Grid>
        </Grid>
        <Grid
          container
          px={2}
          py={5}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item xs={12} md={3}>
            <ExtraParagraphHeading
              style={{ fontWeight: 500 }}
              sx={{
                flexBasis: 'clamp(40px,15vw,250px)',
                color: 'primaryPalette.black',
                mb: { xs: 2, md: 0 },
              }}
            >
              What to expect ?
            </ExtraParagraphHeading>
          </Grid>
          <Grid
            item
            xs={12}
            md={9}
            sx={{
              position: 'relative',
              '&::before': {
                content: `""`,
                position: 'absolute',
                width: '2px',
                left: '-80px',
                top: '50%',
                transform: 'translate(0,-50%)',
                height: { sm: '0%', lg: '50%' },
                backgroundColor: 'violetPalette.dark',
              },
            }}
          >
            <Grid container spacing={2}>
              {dropDownBodyData.whatToExpect.map(item => (
                <Grid
                  item
                  xs={12}
                  md={6}
                  key={item.id}
                  sx={{
                    transitionDuration: '0.3s',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      transitionTimingFunction: 'ease',
                      transitionDelay: '0s',
                      transitionProperty: 'all',
                      transitionBehavior: 'normal',
                    },
                  }}
                >
                  <Paper
                    sx={{
                      borderRadius: 2,
                      display: 'flex',
                      minHeight: '100%',
                      alignItems: 'center',
                      padding: 2,
                      gap: 2,
                      justifyContent: { xs: 'start', md: 'center' },
                    }}
                  >
                    <Image
                      alt={item.title}
                      src={item.image}
                      style={{ width: 'clamp(60px, 6vw, 80px)' }}
                    />

                    <Stack
                      flexDirection="column"
                      alignItems="start"
                      justifyContent="center"
                      gap="8px"
                    >
                      <ExtraParagraphHeading
                        sx={{
                          fontWeight: '600',
                          color: 'primaryPalette.black',
                        }}
                      >
                        {item.title}
                      </ExtraParagraphHeading>
                      <SubtitleHeading sx={{ color: 'primaryPalette.black' }}>
                        {item.description}
                      </SubtitleHeading>
                    </Stack>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default CareerDropDownBody;
