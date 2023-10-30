import InfoCard from '@/cardComponents/InfoCard';
import ProfileCard from '@/cardComponents/ProfileCard';
import useReadMore from '@/customHooks/useReadMore';
import CardSectionHeader from '@/headingComponents/ProfileText/CardSectionHeader';
import About from '@/pageComponents/Profile/View/About';
import TimeLine from '@/pageComponents/Profile/View/TimeLine';
import Websites from '@/pageComponents/Profile/View/Websites';
import { DataContext } from '@/reUsableComponents/DataContext/DataContext';
import { SlugContext } from '@/reUsableComponents/DataContext/SlugContext';
import { convertMonthsToYearsAndMonthsBrackets } from '@/utils/CommonFunctions/DateRelatedFunction';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import { Box, Button, Divider, Stack, Typography, styled } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useContext, useEffect, useState } from 'react';

const commonStyle = {
  height: '100px',
  width: '100%',
  backgroundColor: 'white',
};

const SkillMainName = styled(Typography)(({ theme }) => ({
  color: '#1D1D1D',
  fontWeight: '600',
  fontSize: '15px',
  lineHeight: '23.33px',
  width: '100%',

  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
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

const OverView = () => {
  const context1 = useContext(SlugContext);
  const context2 = useContext(DataContext);
  const technicalSkillList = context2
    ? context2?.data?.technicalSkill
    : context1.data?.technicalSkill;
  console.log(technicalSkillList, 'technicalSkillList');
  const verifiedObjects = filterVerifiedObjects(technicalSkillList || []);

  return (
    <Stack direction="column" spacing={2}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {verifiedObjects && verifiedObjects.length > 0 && (
          <Grid item xs={12} sm={12}>
            <ProfileCard
              styleProps={{
                ...{ commonStyle },
              }}
            >
              <Stack direction="column" justifyContent="space-evenly">
                <CardSectionHeader>Verified Skills</CardSectionHeader>
                <VerifiedSkills
                  verifiedObjects={verifiedObjects}
                  context1={context1}
                  context2={context2}
                />
              </Stack>
            </ProfileCard>
          </Grid>
        )}
        <Grid item xs={12} sm={12}>
          <ProfileCard
            styleProps={{
              ...{ commonStyle },
            }}
          >
            <Stack direction="column" justifyContent="space-evenly">
              <CardSectionHeader>Skills</CardSectionHeader>
              <TechnicalSkills context1={context1} context2={context2} />
            </Stack>
          </ProfileCard>
        </Grid>
        <Grid item xs={12} sm={6}>
          <ProfileCard
            styleProps={{
              ...{ commonStyle },
            }}
          >
            <CardSectionHeader>Soft skills</CardSectionHeader>
            <SoftSkills context1={context1} context2={context2} />
          </ProfileCard>
        </Grid>
        <Grid item xs={12} sm={6}>
          <ProfileCard
            styleProps={{
              ...{ commonStyle },
            }}
          >
            <CardSectionHeader>Traits</CardSectionHeader>
            <Traits context1={context1} context2={context2} />
          </ProfileCard>
        </Grid>
      </Grid>
      <TimeLine />
      <About />
      <Websites />
    </Stack>
  );
};

export default OverView;

const SoftSkills = ({ context1, context2 }) => {
  const softSkill = context2
    ? context2?.data?.softSkill
    : context1.data?.softSkill;
  // const softSkill = null;

  const Message = context2
    ? context2?.messages?.view.softskills
    : context1?.messages?.public_view?.softskills;

  if (!softSkill || softSkill.length === 0) {
    return <NoItemCard Message={Message} />;
  }

  const {
    displayCount,
    handleReadMoreClick,
    handleReadLessClick,
    displayData,
    showMoreButton,
    showReadLessButton,
  } = useReadMore(softSkill);

  return (
    <Stack
      direction="column"
      divider={<Divider orientation="horizontal" flexItem />}
      spacing={1}
    >
      {displayData.map(softSkill => (
        <Stack
          key={softSkill.id}
          direction="row"
          justifyContent={'space-between'}
          spacing={1}
        >
          <SkillBadge
            SkillSubName={
              <SkillMainName key={softSkill.id} variant="body1" color="initial">
                {softSkill.skillName}
              </SkillMainName>
            }
          />
        </Stack>
      ))}
      {showMoreButton && <Button onClick={handleReadMoreClick}>More</Button>}
      {showReadLessButton && (
        <Button onClick={handleReadLessClick}>Read Less</Button>
      )}
    </Stack>
  );
};

const Traits = ({ context1, context2 }) => {
  const traits = context2 ? context2?.data?.traits : context1.data?.traits;
  // const traits = null;

  const Message = context2
    ? context2?.messages?.view.traits
    : context1?.messages?.public_view?.traits;

  if (!traits || traits.length === 0) {
    return <NoItemCard Message={Message} />;
  }

  const {
    displayCount,
    handleReadMoreClick,
    handleReadLessClick,
    displayData,
    showMoreButton,
    showReadLessButton,
  } = useReadMore(traits);

  return (
    <Stack
      direction="column"
      divider={<Divider orientation="horizontal" flexItem />}
      spacing={1}
    >
      {traits &&
        displayData.map(traits => (
          <Stack
            key={traits.id}
            direction="row"
            justifyContent={'space-between'}
            spacing={1}
          >
            <SkillBadge
              SkillSubName={
                <SkillMainName key={traits.id} variant="body1" color="initial">
                  {traits.name}
                </SkillMainName>
              }
            />
          </Stack>
        ))}
      {showMoreButton && <Button onClick={handleReadMoreClick}>More</Button>}
      {showReadLessButton && (
        <Button onClick={handleReadLessClick}>Read Less</Button>
      )}
    </Stack>
  );
};

const VerifiedSkills = ({ context1, context2, verifiedObjects }) => {
  const {
    displayCount,
    handleReadMoreClick,
    handleReadLessClick,
    displayData,
    showMoreButton,
    showReadLessButton,
  } = useReadMore(verifiedObjects);

  // const technicalSkillList = null;
  const Message = context2
    ? context2?.messages?.view.tech_skills
    : context1?.messages?.public_view?.tech_skills;

  if (!verifiedObjects || verifiedObjects.length === 0) {
    return <NoItemCard Message={Message} />;
  }

  return (
    <Stack direction="column" spacing={2}>
      {verifiedObjects &&
        displayData.map((platform, index) => (
          <Stack key={index} spacing={1}>
            <Stack
              key={platform?.id}
              direction="row"
              alignItems={'center'}
              justifyContent="space-between"
              spacing={0.5}
            >
              <SkillBadge
                noWrap
                SkillSubName={
                  <>
                    <SkillMainName>
                      {platform?.skillPlatformName}
                      {`${convertMonthsToYearsAndMonthsBrackets(
                        platform.experienceInMonths
                      )}`}
                    </SkillMainName>
                    {platform?.isSelfVerified && (
                      <VerifiedOutlinedIcon color="primary" />
                    )}
                  </>
                }
              />
              <ExperienceBadge
                weight={platform?.weight}
                level={platform?.level}
              />
            </Stack>
          </Stack>
        ))}

      {showMoreButton && <Button onClick={handleReadMoreClick}>More</Button>}
      {showReadLessButton && (
        <Button onClick={handleReadLessClick}>Read Less</Button>
      )}
    </Stack>
  );
};

const TechnicalSkills = ({ context1, context2 }) => {
  const technicalSkillList = context2
    ? context2?.data?.technicalSkill
    : context1.data?.technicalSkill;

  // const technicalSkillList = null;
  const Message = context2
    ? context2?.messages?.view.tech_skills
    : context1?.messages?.public_view?.tech_skills;

  if (!technicalSkillList || technicalSkillList.length === 0) {
    return <NoItemCard Message={Message} />;
  }

  const {
    displayCount,
    handleReadMoreClick,
    handleReadLessClick,
    displayData,
    showMoreButton,
    showReadLessButton,
  } = useReadMore(technicalSkillList);

  return (
    <Stack
      direction="column"
      divider={<Divider orientation="horizontal" flexItem />}
      spacing={2}
    >
      {technicalSkillList &&
        displayData.map((skill, index) => (
          <Stack key={index} spacing={1}>
            <SkillMainName>{skill.skillName}</SkillMainName>
            <Stack spacing={0.5}>
              {skill.technicalSkillPlatform &&
                skill.technicalSkillPlatform.map(platform => (
                  <Stack
                    key={platform?.id}
                    direction="row"
                    alignItems={'center'}
                    justifyContent="space-between"
                    spacing={1}
                  >
                    <SkillBadge
                      noWrap
                      SkillSubName={
                        <>
                          <SkillSubName>
                            {platform?.skillPlatformName}
                            {`${convertMonthsToYearsAndMonthsBrackets(
                              platform.experienceInMonths
                            )}`}
                          </SkillSubName>
                          {platform?.isSelfVerified && (
                            <VerifiedOutlinedIcon color="primary" />
                          )}
                        </>
                      }
                    />
                    <ExperienceBadge
                      weight={platform?.weight}
                      level={platform?.level}
                    />
                  </Stack>
                ))}
            </Stack>
          </Stack>
        ))}

      {showMoreButton && <Button onClick={handleReadMoreClick}>More</Button>}
      {showReadLessButton && (
        <Button onClick={handleReadLessClick}>Read Less</Button>
      )}
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

const ExperienceBadge = ({ weight, level }) => {
  const [properties, setProperties] = useState({});

  useEffect(() => {
    if (level === 1) {
      setProperties({
        backgroundColor: 'rgba(255, 153, 0, 0.78);',
        text: 'Beginner',
      });
    } else if (level === 2) {
      setProperties({ backgroundColor: '#4238D1', text: 'Intermediate' });
    } else if (level === 3) {
      setProperties({ backgroundColor: '#1DB653', text: 'Expert' });
    }
  }, []);
  return (
    <Stack
      sx={{
        width: '100%',
        maxWidth: '100px',
        textAlign: 'center',
        borderRadius: '4px',
        p: 0.5,
        backgroundColor: properties?.backgroundColor,
      }}
      direction="row"
      // alignItems={'space-between'}
      justifyContent={'center'}
      spacing={0.5}
    >
      <SkillSubName
        sx={{ maxWidth: '90px', textAlign: 'center', color: 'white' }}
      >
        {properties?.text}
      </SkillSubName>
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

function filterVerifiedObjects(objArray) {
  const flattenedArray = objArray.flatMap(obj => {
    const techSkillPlatforms = obj.technicalSkillPlatform || [];
    return [{ ...obj, technicalSkillPlatform: null }, ...techSkillPlatforms];
  });
  return flattenedArray.filter(obj => obj.isSelfVerified === true);
}
