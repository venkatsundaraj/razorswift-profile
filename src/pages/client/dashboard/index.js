import SubTitle from '@/headingComponents/SubTitle';
import ClientLayout from '@/layouts/NavLayout/ClientLayout';
import CustomNoRowsOverlay from '@/reUsableComponents/DataGridComponets/CustomNoRowsOverlay';
import withAuth from '@/src/AuthWrapper/AuthWrapper';
import { ClientDashboardApi } from '@/swagger_api/api/CityApi';
import { localStorageUtil } from '@/utils/CommonFunctions/localStorageUtil';
import { CustomDataGridMasters } from '@/view/Datagrid';
import { Box, Grid, Stack, Typography, styled } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useCallback, useEffect, useMemo, useState } from 'react';

const TitleKey = styled(Typography)(({ theme }) => ({
  color: '#6A6A6A',
  fontSize: '14px',
  fontWeight: '500',
  lineHeight: '16.8px',
  textAlign: 'inherit',
  [theme.breakpoints.down('sm')]: {},
}));

const SubTitleKey = styled(Typography)(({ theme }) => ({
  color: '#1D1D1D',
  fontSize: '28px',
  fontWeight: '600',
  lineHeight: '38px',
  textAlign: 'inherit',
  [theme.breakpoints.down('sm')]: {},
}));

const JdName = styled(Typography)(({ theme }) => ({
  color: '#1D1D1D',
  fontSize: '16px',
  fontWeight: '600',
  lineHeight: '19.2px',
  textAlign: 'inherit',
  [theme.breakpoints.down('sm')]: {},
}));

const JdCode = styled(Typography)(({ theme }) => ({
  color: '#909090',
  fontSize: '14px',
  fontWeight: '500',
  lineHeight: '16.8px',
  textAlign: 'inherit',
  [theme.breakpoints.down('sm')]: {},
}));

const Dashboard = () => {
  const [jdList, setJdList] = useState([]);
  const [dashboardAnalytics, setDashboardAnalytics] = useState({});
  const clientDetails = localStorageUtil.getItem('clientDetails');
  console.log(clientDetails?.contact?.clientId);

  const columns = useMemo(
    () => [
      {
        field: 'id',
        headerName: <HeaderName title="Jobs" />,
        minWidth: 400,
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        align: 'left',
        renderCell: params => (
          <Stack>
            <JdName>{params?.row?.jdName}</JdName>
            <JdCode>{params?.row?.jdCode}</JdCode>
          </Stack>
        ),
        sortable: false,
        filterable: false,
      },
      {
        field: 'noOfCandidates',
        // headerName: ' Applied',
        headerName: <HeaderName title="Applied" />,
        minWidth: 10,
        flex: 1,
        headerClassName: 'super-app-theme--Applied',
        headerAlign: 'center',
        align: 'center',
        renderCell: params => (
          <Typography>{params?.row?.noOfCandidates}</Typography>
        ),
      },
      {
        field: 'assessedCandidates',

        headerName: <HeaderName title="Shortlist" />,
        minWidth: 100,
        flex: 1,
        headerClassName: 'super-app-theme--Shortlist',
        headerAlign: 'center',
        align: 'center',
        renderCell: params => (
          <Typography>{params?.row?.assessedCandidates}</Typography>
        ),
      },
      {
        field: 'scheduledInterview',
        headerName: <HeaderName title="Interview" />,
        minWidth: 100,
        flex: 1,
        headerClassName: 'super-app-theme--InterView',
        headerAlign: 'center',
        align: 'center',
        renderCell: params => (
          <Typography>{params?.row?.scheduledInterview}</Typography>
        ),
      },
      {
        field: 'offered',
        headerName: <HeaderName title="Offered" />,
        minWidth: 100,
        flex: 1,
        headerClassName: 'super-app-theme--Offered',
        headerAlign: 'center',
        align: 'center',
        renderCell: params => <Typography>{params?.row?.offered}</Typography>,
      },
      {
        field: 'hired',
        headerName: <HeaderName title="Hired" />,
        minWidth: 100,
        flex: 1,
        headerClassName: 'super-app-theme--Hired',
        headerAlign: 'center',
        align: 'center',
        renderCell: params => <Typography>{params?.row?.hired}</Typography>,
      },
    ],
    []
  );

  const clientDashboardApi = useMemo(() => new ClientDashboardApi(), []);

  const hiringPipeLineGet = useCallback(async () => {
    try {
      const response =
        await clientDashboardApi.apiClientDashboardGetClientDashBoadrdHiringPipelineClientIdGet(
          clientDetails?.contact?.clientId
        );
      if (response?.body?.result && response?.body?.result?.length > 0) {
        const trim =
          response?.body?.result?.map((res, index) => ({
            id: index + 1,
            ...res,
          })) || [];
        setJdList(trim);
      }
    } catch (err) {
      console.log(err);
      setJdList([]);
    }
  }, [clientDetails?.contact?.clientId, clientDashboardApi]);

  const dashboardAnalyticsGet = useCallback(async () => {
    try {
      const response =
        await clientDashboardApi.apiClientDashboardGetClientDashboardAnalyticsClientIdGet(
          clientDetails?.contact?.clientId
        );
      if (response?.body?.result) {
        setDashboardAnalytics(response?.body?.result);
      } else {
        setDashboardAnalytics({});
      }
    } catch (err) {
      console.log(err);
      setDashboardAnalytics({});
    }
  }, [clientDetails?.contact?.clientId, clientDashboardApi]);

  useEffect(() => {
    hiringPipeLineGet();
    dashboardAnalyticsGet();
  }, [hiringPipeLineGet, dashboardAnalyticsGet]);

  return (
    <ClientLayout>
      <Box
        sx={{
          minHeight: '1vh',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <>
          <SubTitle color={'#1D1D1D'} fontWeight={'700'} padding={'0px'}>
            Dashboard Overview
          </SubTitle>
          <Box>
            <Grid container gap={5}>
              <Grid item xs={12} md={2.5}>
                <StatBox
                  title={'Jobs'}
                  subtitle={dashboardAnalytics?.jobOpenings || 0}
                />
              </Grid>
              <Grid item xs={12} md={2.5}>
                <StatBox
                  title={'No. of Candidates'}
                  subtitle={dashboardAnalytics?.noOfCandidates || 0}
                />
              </Grid>
              <Grid item xs={12} md={2.5}>
                <StatBox
                  title={'Assessed Candidates'}
                  subtitle={dashboardAnalytics?.assessedCandidates || 0}
                />
              </Grid>
              <Grid item xs={12} md={2.5}>
                <StatBox
                  title={'Scheduled Interview'}
                  subtitle={dashboardAnalytics?.scheduledInterview || 0}
                />
              </Grid>
            </Grid>
          </Box>
        </>
        <>
          <SubTitle color={'#1D1D1D'} fontWeight={'700'} padding={'0px'}>
            Hiring Pipeline
          </SubTitle>
          <CustomDataGridMasters
            componentsProps={{
              NoRowsOverlay: () => (
                <CustomNoRowsOverlay title="There are no data to display" />
              ),
            }}
            data={{
              columns: columns,
              initialState: {
                columns: {
                  columnVisibilityModel: {
                    id: true,
                  },
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                },
              },
              rows: jdList,
            }}
            loading={false}
          />
        </>
      </Box>
    </ClientLayout>
  );
};

const StatBox = ({ title, subtitle }) => {
  return (
    <Card sx={{ maxWidth: 300, minHeight: 150 }}>
      <CardContent>
        <Stack spacing={4}>
          <TitleKey sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {title}
          </TitleKey>
          <SubTitleKey variant="h5" component="div">
            {subtitle}
          </SubTitleKey>
        </Stack>
      </CardContent>
    </Card>
  );
};

const HeaderName = ({ title }) => {
  return <Typography variant="h4">{title}</Typography>;
};

export default withAuth(Dashboard, 'client');
