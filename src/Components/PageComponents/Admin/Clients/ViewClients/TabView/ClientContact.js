import ProfileCard from '@/cardComponents/ProfileCard';
import { ClientView } from '@/pageComponents/Admin/Clients/ViewClients';
import { formatContactNumber } from '@/utils/CommonFunctions/Functions';
import { Container, Divider, Grid, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useContext } from 'react';

const NormalListText = styled(Typography)(({ theme }) => ({
  textTransform: 'none',
  color: '#1D1D1D',
  fontWeight: '700',
  fontSize: '15px',
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

const ClientContact = () => {
  const { clientData } = useContext(ClientView);
  const contacts = clientData?.contacts;

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
          <CardSectionHeader>Contacts</CardSectionHeader>

          {contacts &&
            contacts.length > 0 &&
            contacts.map((contact, index) => (
              <ProfileCard key={contact.id}>
                <NormalListText>Contact {index + 1}</NormalListText>
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={1.5}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={6} sm={4} md={3}>
                      <Values
                        title="First Name"
                        name={contact?.firstName || '-'}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4} md={3}>
                      <Values
                        title="Middle Name"
                        name={contact?.middleName || '-'}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4} md={3}>
                      <Values
                        title="Last Name"
                        name={contact?.lastName || '-'}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4} md={3}>
                      <Values
                        title="Contact Number"
                        name={
                          formatContactNumber(contact?.contactNumber) || '-'
                        }
                      />
                    </Grid>
                    <Grid item xs={6} sm={4} md={3}>
                      <Values title="Email" name={contact?.email || '-'} />
                    </Grid>
                    <Grid item xs={6} sm={4} md={3}>
                      <Values
                        title="Designation"
                        name={contact?.designation || '-'}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4} md={3}>
                      <Values
                        title="Department"
                        name={contact?.department || '-'}
                      />
                    </Grid>
                    {/* <Grid item xs={6} sm={4} md={3}>
                      <Values title='Note' name={contact?.note || '-'} />
                    </Grid>
                    <Grid item xs={6} sm={4} md={3}>
                      <Values title='Source type' name={contact?.sourceType || '-'} />
                    </Grid> */}
                  </Grid>
                </Stack>
              </ProfileCard>
            ))}
        </ProfileCard>
      </Stack>
    </Container>
  );
};
export default ClientContact;

const Values = ({ title, name }) => {
  return (
    <Stack spacing={2}>
      <Title>{title}</Title>
      <SubTitle>{name}</SubTitle>
    </Stack>
  );
};
