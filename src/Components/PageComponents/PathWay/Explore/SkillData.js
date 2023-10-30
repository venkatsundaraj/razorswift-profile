import InfoCard from '@/cardComponents/InfoCard';
import ProfileCard from '@/cardComponents/ProfileCard';
import useReadMore from '@/customHooks/useReadMore';
import CustomIcon from '@/reUsableComponents/Icons/CustomIcon';
import PathWayPopOver from '@/reUsableComponents/PopOvers/PathWayPopOver';
import { ExploreContext } from '@/src/pages/pathway/explore';
import { Box, Button, Divider, Stack, Typography, styled } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useContext } from 'react';

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

const SkillData = () => {
  const ExploreContextData = useContext(ExploreContext);
  const data = ExploreContextData?.skillData?.pathways || [];
  console.log(ExploreContextData?.skillData);
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
  return (
    <Stack direction="column" spacing={2}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {data.map((value, index) => (
          <>
            <Grid item xs={12} sm={12}>
              <ProfileCard
                styleProps={{
                  ...{ commonStyle },
                }}
              >
                <Stack spacing={2}>
                  <SkillTitleName sx={{ fontWeight: '900' }}>
                    {value?.data?.skillName}
                  </SkillTitleName>
                  <SoftSkills values={value} />

                  <Stack alignItems={'center'} sx={{ marginTop: 2 }}>
                    <Button sx={{ maxWidth: 100 }} variant="contained">
                      Enroll
                    </Button>
                  </Stack>
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

export default SkillData;

const SoftSkills = ({ values }) => {
  const data = values?.sequencedata?.data || [];
  console.log(values, 'calesyssysy');
  const urlIconSrc =
    'https://rslogs1.s3.ap-south-1.amazonaws.com/iconmonstr-education-1.svg';
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
    return <NoItemCard Message={'No Enrolled Data'} />;
  }

  return (
    <Stack
      direction="column"
      divider={<Divider orientation="horizontal" flexItem />}
      spacing={1.5}
    >
      {displayData.map((value, index) => {
        return (
          <Stack
            key={value.id}
            sx={{
              '--tw-bg-opacity': 0.3,
              // backgroundColor: 'rgba(238, 242, 255, var(--tw-bg-opacity))',
              p: 1,
              border: '1px solid',
              borderRadius: 2,
            }}
          >
            <Stack direction="row" justifyContent={'space-between'} spacing={1}>
              <Stack
                direction="row"
                justifyContent={'flex-start'}
                spacing={0.5}
              >
                <SkillMainName
                  sx={{ width: 'inherit', wordBreak: 'inherit' }}
                >{`${index + 1}.`}</SkillMainName>

                <Stack direction={'column'}>
                  <SkillMainName key={value.id} variant="body1" color="initial">
                    {value?.name}
                  </SkillMainName>
                  <Stack direction="row" alignItems={'center'}>
                    <SkillSubName sx={{ fontWeight: '500' }}>
                      {value.info_brief}
                      <PathWayPopOver
                        info={value.info_detailed}
                        value={value}
                      />
                    </SkillSubName>
                  </Stack>
                  {value.type === 1 && (
                    <SkillBadge
                      noWrap
                      SkillSubName={
                        <>
                          <SkillSubName>
                            {value.data.skillname}
                            {` - ${value.data.result}%`}
                          </SkillSubName>
                        </>
                      }
                    />
                  )}
                </Stack>
              </Stack>
              {console.log(value)}
              <CustomIcon
                src={value?.icon_url}
                size={iconSize}
                color={iconColor}
              />
            </Stack>
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
