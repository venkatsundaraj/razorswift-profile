import { DataContext } from '@/reUsableComponents/DataContext/DataContext';
import { SlugContext } from '@/reUsableComponents/DataContext/SlugContext';
import {
  convertMonthsToYearsAndMonths,
  formatDate,
} from '@/utils/CommonFunctions/DateRelatedFunction';
import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineOppositeContent, {
  timelineOppositeContentClasses,
} from '@mui/lab/TimelineOppositeContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import { Box, Stack, styled } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useContext } from 'react';
const SubTitle = styled(Typography)(({ theme, weight, color, lineHeight }) => ({
  color: color || '#1D1D1D',
  fontWeight: weight || '500',
  fontSize: '14px',
  lineHeight: lineHeight || '16.8px',
  textAlign: 'inherit',
  [theme.breakpoints.down('sm')]: {
    fontWeight: weight || '500',
    fontSize: '12px',
    lineHeight: lineHeight || '14.4px',
  },
}));

const Title = styled(Typography)(({ theme, weight, color, lineHeight }) => ({
  color: color || '#1D1D1D',
  fontWeight: weight || '700',
  fontSize: '16px',
  lineHeight: lineHeight || '19.2px',
  textAlign: 'inherit',
  [theme.breakpoints.down('sm')]: {
    fontWeight: weight || '700',
    fontSize: '14px',
    lineHeight: lineHeight || '32.6px',
  },
}));

const ProjectTitle = styled(Typography)(
  ({ theme, weight, color, lineHeight }) => ({
    color: color || '#1D1D1D',
    fontWeight: weight || '600',
    fontSize: '13px',
    lineHeight: lineHeight || '15.6px',
    textAlign: 'inherit',
    [theme.breakpoints.down('sm')]: {
      fontWeight: weight || '500',
      fontSize: '12px',
      lineHeight: lineHeight || '14.4px',
    },
  })
);
const ProjectDescription = styled(Typography)(
  ({ theme, weight, color, lineHeight }) => ({
    color: color || '#434343',
    fontWeight: weight || '500',
    fontSize: '12px',
    lineHeight: lineHeight || '21px',
    textAlign: 'inherit',
    [theme.breakpoints.down('sm')]: {
      fontWeight: weight || '500',
      fontSize: '11px',
      lineHeight: lineHeight || '14.4px',
    },
  })
);

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
          bgcolor: '#434343',
        }}
      />
      {SkillSubName}
    </Box>
  );
};

const VerticalTimeLineEducation = () => {
  const context1 = useContext(SlugContext);
  const context2 = useContext(DataContext);

  const qualificationTimeLine = context2
    ? context2?.data?.qualificationTimeLine
    : context1.data?.qualificationTimeLine;

  return (
    <Stack>
      <Timeline
        sx={{
          [`& .${timelineOppositeContentClasses.root}`]: {
            flex: 0.2,
          },

          // '& .MuiTimelineItem-missingOppositeContent:before': { content: 'none' },
        }}
      >
        {qualificationTimeLine &&
          qualificationTimeLine.map(education => (
            <TimelineItem key={education.id}>
              <TimelineOppositeContent
                style={{ flex: 0.4 }}
              ></TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot
                  sx={{
                    background:
                      'linear-gradient(180deg, #F1231A 0%, #FE8B86 100%);',
                  }}
                />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Stack spacing={1}>
                  <Title>{education.name}</Title>
                  <SubTitle color="rgba(29, 29, 29, 0.6)" weight="500">
                    {education.degree},{education.fieldOfStudy}
                  </SubTitle>
                  <Stack direction="row" spacing={2}>
                    <Stack
                      direction="row"
                      spacing={1}
                      justifyContent={'center'}
                      alignItems="center"
                      divider={
                        <Box
                          sx={{
                            height: 5,
                            width: 5,
                            borderRadius: '100%',
                            bgcolor: 'red',
                          }}
                        />
                      }
                    >
                      <SubTitle weight="600">
                        {formatDate(education.startDate, 'month') || '-'}
                      </SubTitle>
                      <SubTitle weight="600">
                        {education.isStillPerceiving
                          ? 'Pursuing '
                          : formatDate(education.endDate, 'month') || '-'}
                      </SubTitle>
                    </Stack>
                    <SubTitle color="#6A6A6A">
                      {convertMonthsToYearsAndMonths(
                        education.expierenceInMonths
                      )}
                    </SubTitle>
                  </Stack>

                  <Stack spacing={1}>
                    {/* {education.projects.map(project => (
                    <Stack key={project.id} spacing={0.5}>
                      <ProjectTitle>{project.title}</ProjectTitle>
                      <SkillBadge
                        noWrap
                        SkillSubName={<ProjectDescription>{project.description}</ProjectDescription>}
                      />
                    </Stack>
                  ))} */}
                  </Stack>
                </Stack>
              </TimelineContent>
            </TimelineItem>
          ))}
      </Timeline>
    </Stack>
  );
};
export default VerticalTimeLineEducation;
