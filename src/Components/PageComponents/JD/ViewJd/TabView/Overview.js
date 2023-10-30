import ProfileCard from '@/cardComponents/ProfileCard';
import { JdSlugContext } from '@/reUsableComponents/DataContext/JdSlugContext';
import { Stack } from '@mui/material';
import { useContext } from 'react';

import ViewEditor from '@/reUsableComponents/RichTextEditor/ViewEditor';
import { Container, Divider } from '@mui/material';

import {
  getExperienceRange,
  getSalaryRange,
} from '@/utils/CommonFunctions/FormvalueChangingFunctions';
import { mapAndJoinCities } from '@/utils/CommonFunctions/MapperFunctions';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
const SubTitle = styled(Typography)(({ theme, weight, color, lineHeight }) => ({
  color: color || '#1D1D1D',
  fontWeight: weight || '500',
  fontSize: '16px',
  lineHeight: lineHeight || '19px',
  textAlign: 'inherit',
  wordWrap: 'break-word',
  [theme.breakpoints.down('sm')]: {
    fontWeight: weight || '500',
    fontSize: '12px',
    lineHeight: lineHeight || '14.4px',
  },
}));

const Title = styled(Typography)(({ theme, weight, color, lineHeight }) => ({
  color: color || '#434343',
  fontWeight: weight || '500',
  fontSize: '13px',
  lineHeight: lineHeight || '18px',
  textAlign: 'inherit',
  wordWrap: 'break-word',
  [theme.breakpoints.down('sm')]: {
    fontWeight: weight || '500',
    fontSize: '11px',
    lineHeight: lineHeight || '14.4px',
  },
}));
const CardSectionHeader = styled(Typography)(({ theme }) => ({
  color: '#1D1D1D',
  fontWeight: '700',
  fontSize: '18px',
  lineHeight: '15.4px',
  textAlign: 'inherit',
  padding: '0px 0px 20px 0px',
  [theme.breakpoints.down('sm')]: {
    fontWeight: '700',
    fontSize: '14px',
    lineHeight: '12.23px',
  },
}));
const Overview = () => {
  const context = useContext(JdSlugContext);
  return (
    <Container maxWidth="xl">
      <Stack
        direction="column"
        justifyContent="space-evenly"
        spacing={2}
        divider={<Divider orientation="horizontal" flexItem />}
      >
        <ProfileCard
          styleProps={{
            minHeight: '50px',
            width: '100%',
          }}
        >
          <CardSectionHeader>Details</CardSectionHeader>
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={1.5}
          >
            <Grid container spacing={2}>
              <Grid item xs={6} sm={4} md={3}>
                <Values
                  title="Department"
                  name={context?.data?.department || '-'}
                />
              </Grid>
              <Grid item xs={6} sm={4} md={3}>
                <Values
                  title="No. of Openings"
                  name={context?.data?.noOfOpenings || '-'}
                />
              </Grid>
              <Grid item xs={6} sm={4} md={3}>
                <Values
                  title="Industry Preference"
                  name={context?.data?.industryPreference || '-'}
                />
              </Grid>
              {/* <Grid item xs={6} sm={4} md={3}>
             <Values title='Keywords' name={context?.data?.keywords || '-'} />
             </Grid> */}
              <Grid item xs={6} sm={4} md={3}>
                <Values
                  title="Job Function"
                  name={context?.data?.jobFunction || '-'}
                />
              </Grid>
              <Grid item xs={6} sm={4} md={3}>
                <Values
                  title="Job Location"
                  name={mapAndJoinCities(context?.data?.jobLocation) || '-'}
                />
              </Grid>
              <Grid item xs={6} sm={4} md={3}>
                <Values
                  title="Qualification"
                  name={context?.data?.degreeName || '-'}
                />
              </Grid>
              <Grid item xs={6} sm={4} md={3}>
                <Values
                  title="Experience Range "
                  name={getExperienceRange(context?.data)}
                  // name={`${context?.data?.minimumExperienceInYears || '-'}-${
                  //   context?.data?.maximumExperienceInYears || '-'
                  // } yrs`}
                />
              </Grid>
              <Grid item xs={6} sm={4} md={3}>
                <Values
                  title="Salary Range"
                  name={getSalaryRange(context?.data)}
                  // name={`${context?.data?.minimumSalary || '-'}-${
                  //   context?.data?.maximumSalary || '-'
                  // } Inr`}
                />
              </Grid>
            </Grid>
          </Stack>
        </ProfileCard>
        <ViewEditor
          title={'Company Profile'}
          text={context?.data?.client?.companyProfile}
        />
        <ViewEditor title={'Description'} text={context?.data?.description} />
        <ViewEditor
          title={'Roles & Responsibilities'}
          text={context?.data?.responsibilities}
        />
        <ViewEditor title={'Requirements'} text={context?.data?.requirements} />
      </Stack>
    </Container>
  );
};

export default Overview;
const Values = ({ title, name }) => {
  return (
    <Stack spacing={2}>
      <Title>{title}</Title>
      <SubTitle>{name}</SubTitle>
    </Stack>
  );
};
