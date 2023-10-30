import MainCard from '@/cardComponents/MainCard';
import { ParserApi } from '@/swagger_api/api/ParserApi';
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
      const k = new ParserApi();
      await k
        .apiParserGetByGuidGuidGet(g)
        .then(async response => {
          setData(response?.body?.result);
          if (response.body.message === 'No Record Found.') {
            setShow(false);
            Swal.fire({
              icon: 'info',
              title: '',
              text: 'No Record Found!',
            }).then(() => {
              router.replace(`${config.masterRoutes.parser}`);
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
  useEffect(() => {
    console.log('router query changes', router.query);
  }, [router.query]);
  return (
    <>
      <MainCard title=" View Parser">
        {show && (
          <Grid container spacing={3}>
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
                User Name
              </Typography>

              <Typography
                variant="subtitle1"
                align="left"
                sx={{ fontSize: '15px' }}
              >
                {data?.userName}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="h1"
                mt={2}
                align="left"
                sx={{ fontSize: '15px' }}
              >
                User Key
              </Typography>

              <Typography
                variant="subtitle1"
                align="left"
                sx={{ fontSize: '15px' }}
              >
                {data?.userKey}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="h1"
                mt={2}
                align="left"
                sx={{ fontSize: '15px' }}
              >
                Version
              </Typography>

              <Typography
                variant="subtitle1"
                align="left"
                sx={{ fontSize: '15px' }}
              >
                {data?.version}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="h1"
                mt={2}
                align="left"
                sx={{ fontSize: '15px' }}
              >
                Password
              </Typography>

              <Typography
                variant="subtitle1"
                align="left"
                sx={{ fontSize: '15px' }}
              >
                {data?.password}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="h1"
                mt={2}
                align="left"
                sx={{ fontSize: '15px' }}
              >
                Data Model
              </Typography>

              <Typography
                variant="subtitle1"
                align="left"
                sx={{ fontSize: '15px' }}
              >
                {data?.dataModel}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="h1"
                mt={2}
                align="left"
                sx={{ fontSize: '15px' }}
              >
                Parser Type
              </Typography>

              <Typography
                variant="subtitle1"
                align="left"
                sx={{ fontSize: '15px' }}
              >
                {data?.parserType}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="h1"
                mt={2}
                align="left"
                sx={{ fontSize: '15px' }}
              >
                Service Url
              </Typography>

              <Typography
                variant="subtitle1"
                align="left"
                sx={{ fontSize: '15px' }}
              >
                {data?.serviceUrl}serviceUrl
              </Typography>
            </Grid>
          </Grid>
        )}
        {show && (
          <DialogActions>
            <Button
              variant="outline"
              onClick={() => router.push(`${config.masterRoutes.parser}`)}
            >
              Back
            </Button>
            <Link
              href={{
                pathname: `${config.masterRoutes.parser}/AddEdit`,
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
