import InfoCard from '@/cardComponents/InfoCard';
import ProfileCard from '@/cardComponents/ProfileCard';
import useReadMore from '@/customHooks/useReadMore';
import { LoadingContext } from '@/reUsableComponents/LoadingComponents/LoadingContext';
import PathWayPopOver from '@/reUsableComponents/PopOvers/PathWayPopOver';
import PathwayStatus from '@/reUsableComponents/Status/PathwayStatus';
import { EnrollContext } from '@/src/pages/pathway/enroll';
import { ExploreContext } from '@/src/pages/pathway/explore';
import { setAlertPopup } from '@/store/alertSlice';
import { showConfirmationDialog } from '@/utils/CommonFunctions/SwalFunctions';
import { useTheme } from '@emotion/react';
import {
  Box,
  Button,
  Link as MuiLink,
  Stack,
  Typography,
  styled,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useDispatch } from 'react-redux';

const commonStyle = {
  height: '100px',
  width: '100%',
  backgroundColor: 'white',
};
const SkillTitleName = styled(Typography)(({ theme }) => ({
  color: '#1D1D1D',
  fontWeight: '600',
  fontSize: '17px',
  lineHeight: '23.33px',
  width: '100%',
  wordBreak: 'break-word',

  [theme.breakpoints.down('md')]: {
    fontSize: '14px',
    lineHeight: '18.66px',
  },
}));

const SkillMainName = styled(Typography)(({ theme }) => ({
  color: '#1D1D1D',
  fontWeight: '600',
  fontSize: '15px',
  lineHeight: '23.33px',
  width: '100%',
  overflow: 'hidden',
  // textOverflow: 'ellipsis',
  wordBreak: 'break-word',

  [theme.breakpoints.down('md')]: {
    fontSize: '12px',
    lineHeight: '18.66px',
  },
}));

const SkillSubName = styled(Typography)(({ theme }) => ({
  color: '#1D1D1D',
  fontWeight: '600',
  fontSize: '13px',
  lineHeight: '20.33px',
  width: '100%',
  // maxWidth: '200px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  [theme.breakpoints.down('md')]: {
    fontSize: '10px',
    lineHeight: '16.66px',
  },
}));

const OuterLayout2 = ({ explore }) => {
  const { loading, setLoading } = useContext(LoadingContext);
  const dispatch = useDispatch();
  const EnrollContextData = useContext(EnrollContext);
  const router = useRouter();

  const ExploreContextData = useContext(ExploreContext);
  console.log('ExploreContextData', ExploreContextData);

  let data =
    EnrollContextData?.pathwayDetails?.pathway_details ||
    ExploreContextData?.pathwayDetails?.pathway_details;

  if (!Array.isArray(data)) {
    data = [];
  }

  const {
    displayCount,
    handleReadMoreClick,
    handleReadLessClick,
    displayData,
    showMoreButton,
    showReadLessButton,
  } = useReadMore(data);

  if (!data || data.length === 0) {
    return <NoItemCard Message={'No Enrolled Data'} />;
  }

  const handleEnroll = value => {
    console.log('enroll', value);
    const confirmAction = async () => {
      setLoading(true);
      try {
        dispatch(
          setAlertPopup({
            message: 'You have enrolled to this Pathway Successfully',
            type: 'success',
            duration: 3000,
          })
        );
      } catch (error) {
        dispatch(
          setAlertPopup({
            message: 'Something went wrong Please try again!',
            type: 'error',
            duration: 3000,
          })
        );
      } finally {
        setLoading(false);
      }
    };

    const revertAction = () => {
      dispatch(
        setAlertPopup({
          message: 'You have reverted the Enroll action',
          type: 'info',
          duration: 3000,
        })
      );
    };

    showConfirmationDialog(
      'Are you sure?',
      'You want to enroll to this Jobs!',
      confirmAction,
      revertAction
    );
  };

  const handlePathwayExecution = value => {
    console.log('value', value);
    router.push({
      pathname: '/pathway/enroll/pathway_execution/',
      query: {
        // guId: value.id,
        id: value.id,
      },
    });
  };
  return (
    <Stack direction="column" spacing={2}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {data.map(value => (
          <>
            <Grid item xs={12} sm={6}>
              <ProfileCard
                styleProps={{
                  ...{ commonStyle },
                }}
              >
                <Stack spacing={2}>
                  <HeadingDisplay title="Title" value={value.job_title} />
                  <HeadingDisplay title="Name" value={value.name} />
                  {value?.jd_slug && (
                    <HeadingDisplay
                      title="Slug"
                      value={value.jd_slug}
                      type="link"
                      label="View Jobs Info"
                    />
                  )}

                  <SoftSkills values={value} explore={explore} />
                  {!explore && (
                    <Stack alignItems={'center'} sx={{ marginTop: 2 }}>
                      <Button
                        sx={{ maxWidth: 300 }}
                        variant="contained"
                        onClick={() => handlePathwayExecution(value)}
                      >
                        Pathway Execution
                      </Button>
                    </Stack>
                  )}
                  {explore && (
                    <Stack alignItems={'center'} sx={{ marginTop: 2 }}>
                      <Button
                        sx={{ maxWidth: 100 }}
                        variant="contained"
                        onClick={() => handleEnroll(value)}
                      >
                        Enroll
                      </Button>
                    </Stack>
                  )}
                </Stack>
              </ProfileCard>
            </Grid>
          </>
        ))}
      </Grid>
      {showMoreButton && <Button onClick={handleReadMoreClick}>More</Button>}
      {showReadLessButton && (
        <Button onClick={handleReadLessClick}>Read Less</Button>
      )}
    </Stack>
  );
};

export default OuterLayout2;

const SoftSkills = ({ values, explore }) => {
  const data = values?.steps_data || [];
  const theme = useTheme(); // Use the theme to access breakpoints

  const muiIconName = 'favorite'; // Replace 'favorite' with the desired Material-UI icon name
  const iconSize = 24;
  const iconColor = 'red';

  const {
    displayCount,
    handleReadMoreClick,
    handleReadLessClick,
    displayData,
    showMoreButton,
    showReadLessButton,
  } = useReadMore(data);

  if (!data || data.length === 0) {
    return (
      <NoItemCard Message={`No ${explore ? 'Explored' : 'Enrolled'} Data`} />
    );
  }
  let isUpdateEnabled = false;
  return (
    <Stack
      direction="column"
      // divider={<Divider orientation="horizontal" flexItem />}
      spacing={1}
    >
      {displayData.map((value, index) => {
        const isFirstItemWithStatusZero =
          value?.status === 0 && !isUpdateEnabled;
        isUpdateEnabled = isUpdateEnabled || isFirstItemWithStatusZero;

        return (
          <Stack
            key={value.id}
            sx={{
              '--tw-bg-opacity': 1,
              // backgroundColor: 'rgba(238, 242, 255, var(--tw-bg-opacity))',
              p: 1,
              // borderColor: 'rgba(165, 180, 252, var(--tw-border-opacity))',
              // borderWidth: 1,
              border: '1px solid',
              borderRadius: 2,
            }}
          >
            <Grid
              container
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Grid item xs={12} sm={12}>
                {/* This ensures it takes full width on mobile */}
                <Stack
                  direction={'column'} // Use row layout for larger screens, column for mobile
                  justifyContent={'space-between'}
                >
                  <Stack
                    direction={'row'}
                    alignItems={'center'}
                    justifyContent={'flex-start'}
                  >
                    <SkillMainName
                      key={value.id}
                      variant="body1"
                      color="initial"
                      sx={{
                        position: 'relative',
                        paddingLeft: '19px',

                        '&::before': {
                          content: `"${index + 1}."`,
                          position: 'relative',
                          left: 0,
                          top: '0',
                        },
                      }}
                    >
                      {value?.step_data?.short_text}
                    </SkillMainName>
                    <PathWayPopOver
                      info={value?.step_data?.info}
                      value={value}
                      type="html"
                    />
                  </Stack>
                  {!explore && (
                    <Box
                      display="flex"
                      justifyContent="flex-end"
                      alignItems="center"
                      width="100%"
                    >
                      <Stack maxWidth={200} alignItems={'center'}>
                        <PathwayStatus
                          value={value?.step_state}
                          text={value?.step_state_label}
                        />
                      </Stack>
                    </Box>
                  )}
                </Stack>
              </Grid>
            </Grid>
          </Stack>
        );
      })}
      {showMoreButton && <Button onClick={handleReadMoreClick}>More</Button>}
      {showReadLessButton && (
        <Button onClick={handleReadLessClick}>Read Less</Button>
      )}
    </Stack>
  );
};

const NoItemCard = ({ Message }) => {
  return (
    <Stack
      alignItems={'center'}
      justifyContent={'center'}
      sx={{ minHeight: 100 }}
    >
      <InfoCard text={Message} />
    </Stack>
  );
};
const SkillBadge = ({ SkillSubName }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: '5px',
      }}
    >
      <Box
        sx={{
          height: 5,
          width: 5,
          borderRadius: '100%',
          bgcolor: 'red',
        }}
      />
      {SkillSubName}
    </Box>
  );
};

const HeadingDisplay = ({ title, value, type, label }) => (
  <Stack spacing={2}>
    <Stack direction="column">
      <SkillTitleName>
        {title}:
        {type != 'link' && (
          <span style={{ fontWeight: 'normal' }}>{value}</span>
        )}
        {type === 'link' && (
          <MuiLink
            component={NextLink}
            underline="none"
            prefetch={false}
            href={decodeURIComponent(value || '')}
            target="_blank"
            rel="noopener noreferrer"
          >
            {label}
          </MuiLink>
        )}
      </SkillTitleName>
    </Stack>
  </Stack>
);
