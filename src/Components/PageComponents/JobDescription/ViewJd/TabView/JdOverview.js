import ProfileCard from '@/cardComponents/ProfileCard';

import { MyJdViewer } from '@/pageComponents/JobDescription/ViewJd';
import ViewEditor from '@/reUsableComponents/RichTextEditor/ViewEditor';
import { Container, Divider, Stack } from '@mui/material';
import { useContext } from 'react';

import {
  getExperienceRange,
  getSalaryRange,
} from '@/utils/CommonFunctions/FormvalueChangingFunctions';
import { mapAndJoinCities } from '@/utils/CommonFunctions/MapperFunctions';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

const NormalListText = styled(Typography)(({ theme }) => ({
  textTransform: 'none',
  color: '#1D1D1D',
  fontWeight: '500',
  fontSize: '13px',
  lineHeight: '21px',
  [theme.breakpoints.down('sm')]: {
    fontWeight: '500',
    fontSize: '12px',
    lineHeight: '17px',
  },
}));

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

const JdOverview = () => {
  const { jdData } = useContext(MyJdViewer);

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
                <Values title="Department" name={jdData?.department || '-'} />
              </Grid>
              <Grid item xs={6} sm={4} md={3}>
                <Values
                  title="No. of Openings"
                  name={jdData?.noOfOpenings || '-'}
                />
              </Grid>
              <Grid item xs={6} sm={4} md={3}>
                <Values
                  title="Industry Preference"
                  name={jdData?.industryPreference || '-'}
                />
              </Grid>
              {/* <Grid item xs={6} sm={4} md={3}>
                <Values title='Keywords' name={jdData?.keywords || '-'} />
              </Grid> */}
              <Grid item xs={6} sm={4} md={3}>
                <Values
                  title="Job Function"
                  name={jdData?.jobFunction || '-'}
                />
              </Grid>
              <Grid item xs={6} sm={4} md={3}>
                <Values
                  title="Job Location"
                  name={mapAndJoinCities(jdData?.jobLocation) || '-'}
                />
              </Grid>
              <Grid item xs={6} sm={4} md={3}>
                <Values
                  title="Qualification"
                  name={jdData?.degreeName || '-'}
                />
              </Grid>
              <Grid item xs={6} sm={4} md={3}>
                <Values
                  title="Experience Range "
                  name={getExperienceRange(jdData)}
                  // name={`${jdData?.minimumExperienceInYears || '-'}-${
                  //   jdData?.maximumExperienceInYears || '-'
                  // } yrs`}
                />
              </Grid>
              <Grid item xs={6} sm={4} md={3}>
                <Values
                  title="Salary Range"
                  name={getSalaryRange(jdData)}
                  // name={`${jdData?.minimumSalary || '-'}-${
                  //   jdData?.maximumSalary || '-'
                  // } Inr`}
                />
              </Grid>
            </Grid>
          </Stack>
        </ProfileCard>
        <ViewEditor
          title={'Company Profile'}
          text={jdData?.client?.companyProfile}
        />
        <ViewEditor title={'Description'} text={jdData?.description} />
        <ViewEditor
          title={'Roles & Responsibilities'}
          text={jdData?.responsibilities}
        />
        <ViewEditor title={'Requirements'} text={jdData?.requirements} />
      </Stack>
    </Container>
  );
};
export default JdOverview;

const Values = ({ title, name }) => {
  return (
    <Stack spacing={2}>
      <Title>{title}</Title>
      <SubTitle>{name}</SubTitle>
    </Stack>
  );
};
