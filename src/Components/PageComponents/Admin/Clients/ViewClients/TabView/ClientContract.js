import ProfileCard from '@/cardComponents/ProfileCard';
import { ClientView } from '@/pageComponents/Admin/Clients/ViewClients';
import { formatDate } from '@/utils/CommonFunctions/DateRelatedFunction';
import {
  Container,
  Divider,
  Grid,
  Link as MuiLink,
  Stack,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import NextLink from 'next/link';
import { useContext } from 'react';

const NormalListText = styled(Typography)(({ theme }) => ({
  textTransform: 'none',
  color: '#1D1D1D',
  fontWeight: '700',
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

const ClientContract = () => {
  const { clientData } = useContext(ClientView);
  const contracts = clientData?.clientContracts;

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
          <CardSectionHeader>Contracts</CardSectionHeader>

          {contracts &&
            contracts.length > 0 &&
            contracts.map((contract, index) => (
              <ProfileCard key={contract.id}>
                <NormalListText>Contract {index + 1}</NormalListText>
                <Stack
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  spacing={1.5}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={6} sm={4} md={3}>
                      <Values
                        title="Start Date"
                        name={formatDate(contract?.startDate) || '-'}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4} md={3}>
                      <Values
                        title="End Date"
                        name={formatDate(contract?.endDate) || '-'}
                      />
                    </Grid>
                    {/* <Grid item xs={6} sm={4} md={3}>
                      <Values title='status' name={contract?.status || '-'} />
                    </Grid> */}
                    <Grid item xs={6} sm={4} md={3}>
                      <Values
                        title="Date of Invoice"
                        name={formatDate(contract?.dateOfInvoice) || '-'}
                      />
                    </Grid>
                    <Grid item xs={6} sm={4} md={3}>
                      <Values
                        title="Contract Document"
                        name={contract?.contractDocument?.name ? '' : '-'}
                      />
                      <SubTitle>
                        <MuiLink
                          component={NextLink}
                          prefetch={false}
                          href={decodeURIComponent(
                            contract?.contractDocument?.url || ''
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {contract?.contractDocument?.name}
                        </MuiLink>
                      </SubTitle>
                    </Grid>
                  </Grid>
                </Stack>
              </ProfileCard>
            ))}
        </ProfileCard>
      </Stack>
    </Container>
  );
};
export default ClientContract;

const Values = ({ title, name }) => {
  return (
    <Stack spacing={2}>
      <Title>{title}</Title>
      <SubTitle>{name}</SubTitle>
    </Stack>
  );
};
