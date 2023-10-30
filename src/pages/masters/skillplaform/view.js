import MainCard from '@/cardComponents/MainCard';
import ProfileCard from '@/cardComponents/ProfileCard';
import SubmissionButton from '@/pageComponents/Profile/Common/Components/SubmissionButton';
import { LoadingContext } from '@/reUsableComponents/LoadingComponents/LoadingContext';
import { SkillPlatformApi } from '@/swagger_api/api/SkillAliasApi';
import { Grid, Stack, Typography } from '@mui/material';
import config from 'config';
import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';

export default function View() {
  const router = useRouter();
  const { guId, skillId } = router.query;
  const [data, setData] = useState({});
  const [show, setShow] = useState(true);
  const skillPlatformApi = useMemo(() => new SkillPlatformApi(), []);
  const { setLoading } = useContext(LoadingContext);
  const getDetailsByGuid = useCallback(
    async g => {
      setLoading(true);
      try {
        const response =
          await skillPlatformApi.apiSkillPlatformGetByGuidGuidGet(g);
        console.log('get', response);
        if (response?.body?.result) {
          setData(response.body.result);
        } else {
          setShow(false);
          router.replace(`${config.masterRoutes.skillalias}`);
        }
      } catch (error) {
        // Handle any errors that might occur during the API call
        console.error('Error fetching data:', error);
      } finally {
        // Set loading to false in the finally block to ensure it is always executed
        setLoading(false);
      }
    },
    [router, skillPlatformApi, setLoading]
  );

  useEffect(() => {
    if (guId) {
      getDetailsByGuid(guId);
    }
  }, [guId, getDetailsByGuid]);

  return (
    <MainCard sx={{ minHeight: '100vh' }} title="View Skill Platform">
      {show && (
        <ProfileCard>
          <Grid container spacing={2}>
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
                Skill Name
              </Typography>

              <Typography
                variant="subtitle1"
                align="left"
                sx={{ fontSize: '15px' }}
              >
                {data?.skill?.name}
              </Typography>
            </Grid>
          </Grid>

          <Stack
            justifyContent={'flex-end'}
            alignItems={'flex-end'}
            direction="row"
            spacing={2}
          >
            {
              <SubmissionButton
                type="button"
                onClick={() => {
                  if (skillId) {
                    router.replace({
                      pathname: `${config.masterRoutes.skill}/view`,
                      query: { guId: skillId },
                    });
                  } else router.replace(`${config.masterRoutes.skillalias}`);
                }}
              >
                Back
              </SubmissionButton>
            }
            <SubmissionButton
              onClick={() => {
                router.push({
                  pathname: `${config.masterRoutes.skillalias}/AddEdit`,
                  query: skillId
                    ? { guId: data.uniqueGuid, skillId: skillId }
                    : { guId: data.uniqueGuid },
                });
              }}
            >
              Edit
            </SubmissionButton>
          </Stack>
        </ProfileCard>
      )}
    </MainCard>
  );
}
