import MainCard from '@/cardComponents/MainCard';
import ProfileCard from '@/cardComponents/ProfileCard';
import SkillPlatformList from '@/pageComponents/Masters/SkillPlatForm/SkillPlatformList';
import SubmissionButton from '@/pageComponents/Profile/Common/Components/SubmissionButton';
import { LoadingContext } from '@/reUsableComponents/LoadingComponents/LoadingContext';
import { SkillApi } from '@/swagger_api/api/SkillApi';
import { Grid, Stack, Typography } from '@mui/material';
import config from 'config';
import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';

const Skill_View = () => {
  const router = useRouter();
  const { guId } = router.query;
  const [data, setData] = useState({});
  const [show, setShow] = useState(true);
  const skillApi = useMemo(() => new SkillApi(), []);
  const { setLoading } = useContext(LoadingContext);

  const getDetailsByGuid = useCallback(
    async g => {
      setLoading(true);
      try {
        const response = await skillApi.apiSkillGetByGuidGuidGet(g);
        console.log('get', response);
        if (response?.body?.result) {
          setData(response.body.result);
        } else {
          setShow(false);
          router.replace(`${config.masterRoutes.skill}`);
        }
      } catch (error) {
        // Handle any errors that might occur during the API call
        console.error('Error fetching data:', error);
      } finally {
        // Set loading to false in the finally block to ensure it is always executed
        setLoading(false);
      }
    },
    [router, skillApi, setLoading]
  );

  useEffect(() => {
    if (guId) {
      getDetailsByGuid(guId);
    }
  }, [guId, getDetailsByGuid]);

  return (
    <MainCard sx={{ minHeight: '100vh' }} title="View Skill">
      <Stack direction="column" spacing={2}>
        {show && (
          <ProfileCard>
            <Grid container spacing={1}>
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
                  Type
                </Typography>

                <Typography
                  variant="subtitle1"
                  align="left"
                  sx={{ fontSize: '15px' }}
                >
                  {data?.type}
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
                  onClick={() => router.push(`${config.masterRoutes.skill}`)}
                >
                  Back
                </SubmissionButton>
              }
              <SubmissionButton
                onClick={() =>
                  router.push({
                    pathname: `${config.masterRoutes.skill}/AddEdit`,
                    query: { guId: data?.uniqueGuid },
                  })
                }
              >
                Edit
              </SubmissionButton>
            </Stack>
          </ProfileCard>
        )}

        <SkillPlatformList />
      </Stack>
    </MainCard>
  );
};
export default Skill_View;
