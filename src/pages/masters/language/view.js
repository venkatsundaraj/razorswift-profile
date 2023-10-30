import MainCard from '@/cardComponents/MainCard';
import { LanguageApi } from '@/swagger_api/api/LanguageApi';
import { Button, DialogActions, Grid, Typography } from '@mui/material';
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
      const k = new LanguageApi();
      await k
        .apiLanguageGetByGuidGuidGet(g)
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
              router.replace(`${config.masterRoutes.language}`);
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
      <MainCard title=" View Language">
        {show && (
          <Grid container spacing={1}>
            <Grid item xs={6}>
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
            <Grid item xs={6}>
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
          </Grid>
        )}
        {show && (
          <DialogActions>
            <Button
              variant="outline"
              onClick={() => router.push(`${config.masterRoutes.language}`)}
            >
              Back
            </Button>
            <Link
              href={{
                pathname: `${config.masterRoutes.language}/AddEdit`,
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
