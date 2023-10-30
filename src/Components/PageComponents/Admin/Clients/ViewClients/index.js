import TabView from '@/pageComponents/Admin/Clients/ViewClients/TabView';
import { ClientApi } from '@/swagger_api/*';
import { useTheme } from '@emotion/react';
import { Container, Typography, styled } from '@mui/material';
import { useRouter } from 'next/router';
import { createContext, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

const ButtonText = styled(Typography)(({ theme }) => ({
  textTransform: 'none',
  fontSize: '16px',
  fontWeight: '600',
  textAlign: 'center',
  lineHeight: '19.2px',
  [theme.breakpoints.down('md')]: {
    fontSize: '14px',
    lineHeight: '16.8px',
  },
}));

export const ClientView = createContext({});

const ViewClients = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const theme = useTheme();

  const [clientData, setClientData] = useState(null);

  const clientApi = useMemo(() => new ClientApi(), []);

  useEffect(() => {
    console.log('ViewClients');
    async function EditData(g) {
      await clientApi
        .apiClientGetByGuidGuidGet(g)
        .then(async response => {
          console.log(response?.body?.result);
          if (response.body.message === 'Record Fetched Successfully.') {
            setClientData(response?.body?.result);
          } else {
            setClientData(null);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    if (router.query.guId) EditData(router.query.guId);
  }, [router.query.guId, clientApi]);

  return (
    <ClientView.Provider
      value={{
        clientData,
        setClientData,
      }}
    >
      <Container maxWidth="xl" disableGutters>
        {/* <SectionHeader>{clientData?.title}</SectionHeader>
       
        <Stack direction='column' spacing={2} alignItems={'flex-end'}>
          <ShadowButtonSubmit
            height='50px'
            width='250px'
            minwidth='250px'
            maxwidth='250px'
            backgroundcolor={theme.palette.primary.main}
            type='button'
            onClick={() => console.log('Accept')}>
            <ButtonText color='#fff'>Accept</ButtonText>
          </ShadowButtonSubmit>
          <ShadowButtonSubmit
            height='50px'
            width='250px'
            minwidth='250px'
            maxwidth='350px'
            backgroundcolor={theme.palette.primary.main}
            type='button'
            onClick={() => console.log('Reject')}>
            <ButtonText color='#fff'>Reject</ButtonText>
          </ShadowButtonSubmit>
          <ShadowButtonSubmit
            height='50px'
            width='250px'
            minwidth='250px'
            maxwidth='350px'
            backgroundcolor={theme.palette.primary.main}
            type='button'
            onClick={() => {
              router.push({
                pathname: `/admin/clients/view/matchingprofile`,
                query: { guId: router.query.guId },
              });
            }}>
            <ButtonText color='#fff'>Show matching profile</ButtonText>
          </ShadowButtonSubmit>
        </Stack> */}
        <Container maxWidth="xl">
          <TabView />
        </Container>
      </Container>
    </ClientView.Provider>
  );
};

export default ViewClients;
