//import CardSectionHeader from '@/headingComponents/ProfileText/CardSectionHeader';
import { JdSlugContext } from '@/reUsableComponents/DataContext/JdSlugContext';
import { Container, Divider, Stack } from '@mui/material';

import InfoCard from '@/cardComponents/InfoCard';
import useReadMore from '@/customHooks/useReadMore';

import ProfileCard from '@/cardComponents/ProfileCard';
import { convertYearsToYearsAndMonthsBrackets } from '@/utils/CommonFunctions/DateRelatedFunction';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import { Box, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { useContext, useEffect, useState } from 'react';

import Grid from '@mui/material/Grid';
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

const NormalListText = styled(Typography)(({ theme }) => ({
  textTransform: 'none',
  color: '#1D1D1D',
  fontWeight: '500',
  fontSize: '13px',
  lineHeight: '21px',
  [theme.breakpoints.down('sm')]: {
    fontWeight: '500',
    fontSize: '12px',
    lineHeight: '17px',
  },
}));

const SubTitle = styled(Typography)(({ theme, weight, color, lineHeight }) => ({
  color: color || '#1D1D1D',
  fontWeight: weight || '500',
  fontSize: '16px',
  lineHeight: lineHeight || '19px',
  textAlign: 'inherit',
  [theme.breakpoints.down('sm')]: {
    fontWeight: weight || '500',
    fontSize: '12px',
    lineHeight: lineHeight || '14.4px',
  },
}));

const Title = styled(Typography)(({ theme, weight, color, lineHeight }) => ({
  color: color || '#434343',
  fontWeight: weight || '500',
  fontSize: '13px',
  lineHeight: lineHeight || '18px',
  textAlign: 'inherit',
  [theme.breakpoints.down('sm')]: {
    fontWeight: weight || '500',
    fontSize: '11px',
    lineHeight: lineHeight || '14.4px',
  },
}));
const CardSectionHeader = styled(Typography)(({ theme }) => ({
  color: '#1D1D1D',
  fontWeight: '700',
  fontSize: '18px',
  lineHeight: '15.4px',
  textAlign: 'inherit',
  padding: '0px 0px 20px 0px',
  [theme.breakpoints.down('sm')]: {
    fontWeight: '700',
    fontSize: '14px',
    lineHeight: '12.23px',
  },
}));

const Skills = () => {
  const context = useContext(JdSlugContext);
  return (
    <Container maxWidth="xl">
      <Stack direction="column" spacing={2}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} sm={12}>
            <ProfileCard
              styleProps={{
                ...{ commonStyle },
              }}
            >
              <Stack direction="column" justifyContent="space-evenly">
                <CardSectionHeader>Skills</CardSectionHeader>
                <TechnicalSkills />
              </Stack>
            </ProfileCard>
          </Grid>
          <Grid item xs={12} sm={6}>
            <ProfileCard
              styleProps={{
                ...{ commonStyle },
              }}
            >
              <CardSectionHeader>Soft Skills</CardSectionHeader>
              <SoftSkills />
            </ProfileCard>
          </Grid>
          <Grid item xs={12} sm={6}>
            <ProfileCard
              styleProps={{
                ...{ commonStyle },
              }}
            >
              <CardSectionHeader>Other Soft Skills</CardSectionHeader>
              <Traits />
            </ProfileCard>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
};
export default Skills;

const SoftSkills = () => {
  const { data, setData } = useContext(JdSlugContext);

  const softSkill = data?.jdSoftSkills;
  const {
    displayCount,
    handleReadMoreClick,
    handleReadLessClick,
    displayData,
    showMoreButton,
    showReadLessButton,
  } = useReadMore(softSkill || []);

  if (!softSkill || softSkill.length === 0) {
    return <NoItemCard Message={'No Soft Skill present'} />;
  }

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
                {softSkill.name}
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

const Traits = () => {
  const { data, setData } = useContext(JdSlugContext);

  const traits = data?.jdTraits;

  const {
    displayCount,
    handleReadMoreClick,
    handleReadLessClick,
    displayData,
    showMoreButton,
    showReadLessButton,
  } = useReadMore(traits || []);

  if (!traits || traits.length === 0) {
    return <NoItemCard Message={'No Other Soft Skill present'} />;
  }

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

const TechnicalSkills = () => {
  const { data, setData } = useContext(JdSlugContext);

  const technicalSkillList = data?.jdSkills;
  const {
    displayCount,
    handleReadMoreClick,
    handleReadLessClick,
    displayData,
    showMoreButton,
    showReadLessButton,
  } = useReadMore(technicalSkillList || []);

  if (!technicalSkillList || technicalSkillList.length === 0) {
    return <NoItemCard Message={'No Technical Skill present'} />;
  }

  return (
    <Stack
      direction="column"
      divider={<Divider orientation="horizontal" flexItem />}
      spacing={2}
    >
      {technicalSkillList &&
        displayData.map((skill, index) => (
          <Stack key={index} spacing={1}>
            <SkillMainName>{skill.name}</SkillMainName>

            <Stack spacing={0.5}>
              {skill.jdSkillPlatforms &&
                skill.jdSkillPlatforms.map(platform => (
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
                            {platform?.name}
                            {`${convertYearsToYearsAndMonthsBrackets(
                              platform.experienceInMonths
                            )}`}
                          </SkillSubName>
                          {platform?.isSelfVerified && (
                            <VerifiedOutlinedIcon color="primary" />
                          )}
                        </>
                      }
                    />
                    <Stack
                      justifyContent={'flex-end'}
                      direction="row"
                      spacing={2}
                    >
                      <SkillTypeBadge
                        weight={platform?.skillType}
                        level={platform?.skillType}
                      />
                      <ExperienceBadge
                        weight={platform?.weight}
                        level={platform?.skillLevel}
                      />
                    </Stack>
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
        minWidth: '100px',
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
const SkillTypeBadge = ({ level }) => {
  const [properties, setProperties] = useState({});

  useEffect(() => {
    if (level === 1) {
      setProperties({
        backgroundColor: 'rgba(255, 153, 0, 0.78);',
        text: 'Must have',
      });
    } else if (level === 2) {
      setProperties({ backgroundColor: '#4238D1', text: 'Good to have' });
    } else if (level === 3) {
      setProperties({ backgroundColor: '#1DB653', text: 'Expert' });
    }
  }, []);
  return (
    <Stack
      sx={{
        width: '100%',
        minWidth: '100px',
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
