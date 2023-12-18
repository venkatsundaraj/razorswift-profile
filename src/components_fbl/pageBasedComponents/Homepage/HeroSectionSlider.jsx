import {
  mainColors,
  pseudoColors,
  tabContent,
  tabPanel,
} from '@/src/constants/Homepage/heroTabContents';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Container, Grid, Stack, Tab } from '@mui/material';
import { useEffect, useState } from 'react';
import PrimaryFillButton from '../../buttonComponents/PrimaryFillButton';
import CustomImage from '../../globalComponents/CustomImage/CustomImage';
import ExtraParagraphHeading from '../../headingComponents/ExtraParagraphHeading';
import PrimaryHeading from '../../headingComponents/PrimaryHeading';
import SubtitleHeading from '../../headingComponents/SubtitleHeading';

const LODING_STATE_VALUE = 4000;

const HeroSectionSlider = ({}) => {
  const [value, setValue] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue(prev => (prev === 3 ? 1 : ++prev));
    }, LODING_STATE_VALUE);

    return () => {
      clearInterval(interval);
    };
  }, [value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <TabContext value={value} sx={{ height: '100%' }}>
      <Box sx={{ height: '100%' }}>
        <Container>
          <TabList
            onChange={handleChange}
            sx={{
              '.mui-style-1ucwjwy-MuiTabs-indicator': {
                display: 'none',
              },
            }}
          >
            {tabContent.map((item, index) => (
              <Tab
                label={`${item.text}`}
                disableRipple
                value={item.id}
                sx={{
                  overflow: 'hidden',
                  position: 'relative',
                  fontSize: '24px',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  color: item.id === value ? 'white' : mainColors[index],
                  '&.Mui-selected': {
                    color: '#A62973',
                  },

                  '&::before': {
                    content: "''",
                    backgroundColor:
                      item.id === value ? pseudoColors[index] : 'white',
                    position: 'absolute',
                    zIndex: '-1',
                    width: '100%',
                    height: '100%',
                    opacity: item.id === value ? '1' : '0',
                    left: '0',
                    top: '0',
                    transform:
                      item.id === value
                        ? 'translateX(0%)'
                        : 'translateX(-100%)',
                    transition: `transform 4000ms linear`,
                  },
                }}
              />
            ))}
          </TabList>
        </Container>
        {tabPanel.map((item, index) => (
          <TabPanel
            key={index}
            value={item.id}
            sx={{
              backgroundColor: mainColors[index],
              width: '100%',
              height: '100%',
            }}
          >
            <Container
              sx={{ height: '100%', display: 'flex', alignItems: 'center' }}
            >
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} sm={6}>
                  <Stack
                    spacing={2}
                    flexDirection={'column'}
                    alignItems="start"
                    justifyContent={'center'}
                  >
                    <ExtraParagraphHeading sx={{ color: 'pinkPalette.dark' }}>
                      {item.for}
                    </ExtraParagraphHeading>
                    <PrimaryHeading sx={{ color: 'violetPalette.dark' }}>
                      {item.title}
                    </PrimaryHeading>
                    <SubtitleHeading sx={{ color: 'pinkPalette.dark' }}>
                      {item.description}
                    </SubtitleHeading>
                    <Stack flexDirection={'row'} gap={2}>
                      <PrimaryFillButton
                        varient="contained"
                        href={item.demoButton.link}
                        sx={{
                          width: 'max-content',
                          marginTop: '18px',
                          backgroundColor: theme =>
                            theme.palette.violetPalette.dark,
                          color: theme => theme.palette.primaryPalette.white,
                          transition: 'all 300ms ease',
                          '&:hover': {
                            backgroundColor: theme =>
                              theme.palette.pinkPalette.dark,
                            transform: 'translateY(-3px)',
                            boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1)',
                          },
                        }}
                      >
                        {item.demoButton.title}
                      </PrimaryFillButton>
                      <PrimaryFillButton
                        varient="outlined"
                        href={item.exploreButton.link}
                        sx={{
                          width: 'max-content',
                          marginTop: '18px',
                          backgroundColor: 'transparent',
                          color: 'violetPalette.main',
                          transition: 'all 300ms ease',
                          border: '1px solid #672476',
                          '&:hover': {
                            backgroundColor: 'transparent',
                            transform: 'translateY(-3px)',
                            boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1)',
                          },
                        }}
                      >
                        Explore Pathways
                      </PrimaryFillButton>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Stack
                    justifyContent={'center'}
                    alignItems={'center'}
                    sx={{ padding: 2 }}
                  >
                    <CustomImage
                      src={item.image}
                      alt={item.title}
                      width="400px"
                      aspectRatio="457/504"
                    />
                  </Stack>
                </Grid>
              </Grid>
            </Container>
          </TabPanel>
        ))}
      </Box>
    </TabContext>
  );
};

export default HeroSectionSlider;
