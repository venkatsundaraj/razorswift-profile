import ProfileCard from '@/cardComponents/ProfileCard';
import CardSectionHeader from '@/headingComponents/ProfileText/CardSectionHeader';
import { DataContext } from '@/reUsableComponents/DataContext/DataContext';
import { SlugContext } from '@/reUsableComponents/DataContext/SlugContext';
import { formatUrl } from '@/utils/CommonFunctions/Functions';
import {
  Box,
  Button,
  Divider,
  Link as MuiLink,
  Stack,
  styled,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import NextLink from 'next/link';
import { useContext, useState } from 'react';

const commonStyle = {
  height: '100px',
  width: '100%',
  backgroundColor: 'white',
};

const SkillMainName = styled(Typography)(({ theme }) => ({
  color: '#1D1D1D',
  fontWeight: '600',
  fontSize: '15px',
  lineHeight: '23.33px',
  width: '100%',

  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',

  [theme.breakpoints.down('md')]: {
    fontSize: '12px',
    lineHeight: '18.66px',
  },
}));

const SkillSubName = styled(Typography)(({ theme }) => ({
  color: '#1D1D1D',
  fontWeight: '600',
  fontSize: '13px',
  lineHeight: '20.33px',
  width: '100%',
  // maxWidth: '200px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  [theme.breakpoints.down('md')]: {
    fontSize: '10px',
    lineHeight: '16.66px',
  },
}));

const Websites = () => {
  return (
    <Grid item xs={12} sm={12}>
      <ProfileCard
        styleProps={{
          ...{ commonStyle },
        }}
      >
        <CardSectionHeader>Websites</CardSectionHeader>
        <Website />
      </ProfileCard>
    </Grid>
  );
};

export default Websites;

const Website = () => {
  const context1 = useContext(SlugContext);
  const context2 = useContext(DataContext);

  console.log('first', context1, 'second', context2);
  const websites = context2
    ? context2?.data?.websites
    : context1.data?.websites;
  const [displayCount, setDisplayCount] = useState(5);
  const handleReadMoreClick = () => {
    if (displayCount + 5 >= websites.length) {
      setDisplayCount(websites.length);
    } else {
      setDisplayCount(displayCount + 5);
    }
  };

  console.log(websites);
  return (
    <Stack
      direction="column"
      divider={<Divider orientation="horizontal" flexItem />}
      spacing={1}
    >
      {websites &&
        websites.slice(0, displayCount).map(website => (
          <Stack
            key={website.id}
            direction="row"
            justifyContent={'space-between'}
            spacing={1}
          >
            <SkillBadge
              SkillSubName={
                <SkillMainName key={website.id} variant="body1" color="initial">
                  <MuiLink
                    sx={{
                      maxWidth: '500px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      textDecoration: 'none',
                      display: 'inline-block',
                      verticalAlign: 'middle',
                    }}
                    style={{ textDecoration: 'none' }}
                    component={NextLink}
                    prefetch={false}
                    href={formatUrl(website.url) || ''}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {website.url}
                  </MuiLink>
                </SkillMainName>
              }
            />
          </Stack>
        ))}
      {websites && displayCount < websites.length && (
        <Button onClick={handleReadMoreClick}>More</Button>
      )}

      {websites && displayCount > 5 && (
        <Button onClick={() => setDisplayCount(5)}>Read Less</Button>
      )}
    </Stack>
  );
};

const SkillBadge = ({ SkillSubName }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: '5px',
      }}
    >
      <Box
        sx={{
          height: 5,
          width: 5,
          borderRadius: '100%',
          bgcolor: 'red',
        }}
      />
      {SkillSubName}
    </Box>
  );
};
