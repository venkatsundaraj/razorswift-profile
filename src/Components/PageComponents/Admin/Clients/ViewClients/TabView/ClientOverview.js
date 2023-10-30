import ProfileCard from '@/cardComponents/ProfileCard';
import { ClientView } from '@/pageComponents/Admin/Clients/ViewClients';
import ViewEditor from '@/reUsableComponents/RichTextEditor/ViewEditor';
import { formatDate } from '@/utils/CommonFunctions/DateRelatedFunction';
import { Container, Divider, Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useContext } from 'react';

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

const ClientOverview = () => {
  const { clientData } = useContext(ClientView);
  const clientAddress = clientData?.clientAddresses[0];
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
                <Values title="Name" name={clientData?.name || '-'} />
              </Grid>
              <Grid item xs={6} sm={4} md={3}>
                <Values
                  title="Gst Number"
                  name={clientData?.gstNumber || '-'}
                />
              </Grid>
              <Grid item xs={6} sm={4} md={3}>
                <Values title="Code" name={clientData?.code || '-'} />
              </Grid>
              <Grid item xs={6} sm={4} md={3}>
                <Values title="Website" name={clientData?.webSite || '-'} />
              </Grid>
              <Grid item xs={6} sm={4} md={3}>
                <Values
                  title="Company Size"
                  name={clientData?.companySize || '-'}
                />
              </Grid>
              <Grid item xs={6} sm={4} md={3}>
                <Values
                  title="Date of Onboarding"
                  name={formatDate(clientData?.dateOfOnBoarding) || '-'}
                />
              </Grid>
              <Grid item xs={6} sm={4} md={3}>
                <Values
                  title="Type of Service"
                  name={clientData?.typeOfService || '-'}
                />
              </Grid>

              <Grid item xs={6} sm={4} md={3}>
                <Values
                  title="Business Vertical"
                  name={clientData?.businessVertical?.name || '-'}
                />
              </Grid>
            </Grid>
          </Stack>
        </ProfileCard>
        <ViewEditor
          title="Company Profile"
          text={clientData?.companyProfile || '-'}
        />
        <ProfileCard
          styleProps={{
            minHeight: '50px',
            width: '100%',
          }}
        >
          <CardSectionHeader>Client Address </CardSectionHeader>
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={1.5}
          >
            <Grid container spacing={2}>
              <Grid item xs={6} sm={4} md={3}>
                <Values
                  title="Address Type"
                  name={
                    clientAddress?.addressType === 1
                      ? 'Primary'
                      : clientAddress?.addressType === 2
                      ? 'Secondary'
                      : '-'
                  }
                />
              </Grid>
              <Grid item xs={6} sm={4} md={3}>
                <Values
                  title="Street"
                  name={clientAddress?.address?.street || '-'}
                />
              </Grid>
              {/* <Grid item xs={6} sm={4} md={3}>
                <Values title='City' name={clientAddress?.address?.cityName || '-'} />
              </Grid> */}
              <Grid item xs={6} sm={4} md={3}>
                <Values
                  title="Pin Code"
                  name={clientAddress?.address?.zipCode || '-'}
                />
              </Grid>
              <Grid item xs={6} sm={4} md={3}>
                <Values
                  title="Country"
                  name={clientAddress?.address?.country?.name || '-'}
                />
              </Grid>
              <Grid item xs={6} sm={4} md={3}>
                <Values
                  title="State"
                  name={clientAddress?.address?.state?.name || '-'}
                />
              </Grid>
              <Grid item xs={6} sm={4} md={3}>
                <Values
                  title="City"
                  name={clientAddress?.address?.city?.name || '-'}
                />
              </Grid>
            </Grid>
          </Stack>
        </ProfileCard>
      </Stack>
    </Container>
  );
};
export default ClientOverview;

const Values = ({ title, name }) => {
  return (
    <Stack spacing={2}>
      <Title>{title}</Title>
      <SubTitle>{name}</SubTitle>
    </Stack>
  );
};
