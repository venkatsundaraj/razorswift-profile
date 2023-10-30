import MainCard from '@/cardComponents/MainCard';
import DashboardLayout from '@/layouts/DashboardLayout';
import { CityApi } from '@/swagger_api/api/CityApi';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import Grid from '@mui/material/Grid';
import config from 'config';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
export default function view() {
  const router = useRouter();
  const [data, setData] = useState({});
  const [show, setShow] = useState(true);
  useEffect(() => {
    async function viewData(g) {
      const k = new CityApi();
      await k
        .apiCityGetByGuidGuidGet(g)
        .then(async response => {
          console.log('get', response);
          setData(response?.body?.result);
          if (response.body.message === 'No Record Found.') {
            setShow(false);
            Swal.fire({
              icon: 'info',
              title: '',
              text: 'No Record Found!',
            }).then(() => {
              router.replace(`${config.masterRoutes.city}`);
            });
          }
        })
        .catch(function (error) {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log('Error', error.message);
          }
          console.log(error.config);
        });
    }
    if (router.query.guId) viewData(router.query.guId);
  }, [router.query.guId]);

  return (
    <>
      <DashboardLayout />
      <MainCard title=" View City">
        {show && (
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography
                variant="h1"
                mt={2}
                align="left"
                sx={{ fontSize: '15px' }}
              >
                Name
              </Typography>

              <Typography
                variant="subtitle1"
                align="left"
                sx={{ fontSize: '15px' }}
              >
                {data?.name}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="h1"
                mt={2}
                align="left"
                sx={{ fontSize: '15px' }}
              >
                Code
              </Typography>
              <Typography
                variant="subtitle1"
                align="left"
                sx={{ fontSize: '15px' }}
              >
                {data?.code}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="h1"
                mt={2}
                align="left"
                sx={{ fontSize: '15px' }}
              >
                Std Code
              </Typography>

              <Typography
                variant="subtitle1"
                align="left"
                sx={{ fontSize: '15px' }}
              >
                {data?.stdCode}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="h1"
                mt={2}
                align="left"
                sx={{ fontSize: '15px' }}
              >
                Pin Code
              </Typography>

              <Typography
                variant="subtitle1"
                align="left"
                sx={{ fontSize: '15px' }}
              >
                {data?.pinCode}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="h1"
                mt={2}
                align="left"
                sx={{ fontSize: '15px' }}
              >
                State Name
              </Typography>

              <Typography
                variant="subtitle1"
                align="left"
                sx={{ fontSize: '15px' }}
              >
                {data?.state?.name}
              </Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography
                variant="h1"
                mt={2}
                align="left"
                sx={{ fontSize: '15px' }}
              >
                Country Name
              </Typography>

              <Typography
                variant="subtitle1"
                align="left"
                sx={{ fontSize: '15px' }}
              >
                {data?.state?.country?.name}
              </Typography>
            </Grid>
          </Grid>
        )}
        {show && (
          <DialogActions>
            <Button
              variant="outline"
              onClick={() => router.push(`${config.masterRoutes.city}`)}
            >
              Back
            </Button>
            <Link
              href={{
                pathname: `${config.masterRoutes.city}/AddEdit`,
                query: { guId: data?.uniqueGuid },
              }}
              legacyBehavior
            >
              <Button variant="contained">Edit</Button>
            </Link>
          </DialogActions>
        )}
      </MainCard>
    </>
  );
}
