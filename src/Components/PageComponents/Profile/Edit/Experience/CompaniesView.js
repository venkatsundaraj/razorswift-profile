import {
  convertMonthsToYearsAndMonths,
  formatDate,
} from '@/utils/CommonFunctions/DateRelatedFunction';
import EditIcon from '@mui/icons-material/Edit';
import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import { timelineOppositeContentClasses } from '@mui/lab/TimelineOppositeContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import { Box, Button, IconButton, Stack, styled } from '@mui/material';
import Typography from '@mui/material/Typography';

import useReadMore from '@/customHooks/useReadMore';
import { useCallback, useEffect } from 'react';

const Title = styled(Typography)(({ theme, weight, color, lineHeight }) => ({
  color: color || '#1D1D1D',
  fontWeight: weight || '700',
  fontSize: '16px',
  lineHeight: lineHeight || '19.2px',
  textAlign: 'inherit',
  wordBreak: 'break-word',
  [theme.breakpoints.down('sm')]: {
    fontWeight: weight || '700',
    fontSize: '14px',
    lineHeight: lineHeight || '32.6px',
  },
}));

const SubTitle = styled(Typography)(({ theme, weight, color, lineHeight }) => ({
  color: color || '#1D1D1D',
  fontWeight: weight || '500',
  fontSize: '14px',
  lineHeight: lineHeight || '16.8px',
  textAlign: 'inherit',
  wordBreak: 'break-word',
  [theme.breakpoints.down('sm')]: {
    fontWeight: weight || '500',
    fontSize: '12px',
    lineHeight: lineHeight || '14.4px',
  },
}));

const CompaniesView = ({
  companyInfo,
  setCompanyEdit,
  setCompanyInfoEdit,
  companyEdit,
  sectionRef,
}) => {
  const {
    displayCount,
    handleReadMoreClick,
    handleReadLessClick,
    displayData,
    showMoreButton,
    showReadLessButton,
  } = useReadMore(companyInfo);

  const yourFunctionToExecuteAfterStateUpdate = useCallback(() => {
    // Your code here
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  }, [sectionRef]);
  useEffect(() => {
    if (companyEdit === '3') {
      yourFunctionToExecuteAfterStateUpdate();
    }
  }, [companyEdit, yourFunctionToExecuteAfterStateUpdate]);

  return (
    <Stack>
      <Timeline
        sx={{
          [`& .${timelineOppositeContentClasses.root}`]: {
            flex: 0.0,
          },
          '& .MuiTimelineItem-missingOppositeContent:before': {
            content: 'none',
          },
        }}
      >
        {companyInfo &&
          displayData.map((experience, index) => (
            <TimelineItem key={index}>
              <TimelineSeparator>
                <TimelineDot
                  color={experience.isCurrentEmployer ? 'primary' : 'grey'}
                  sx={{
                    background:
                      'linear-gradient(180deg, #F1231A 0%, #FE8B86 100%);',
                  }}
                />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent>
                <Stack spacing={1}>
                  <Stack direction="row">
                    <Title>{experience.jobTitle?.name}</Title>
                    <IconButton
                      color="primary"
                      disableRipple
                      size="small"
                      aria-label="back"
                      sx={{ p: 0 }}
                      onClick={() => {
                        setCompanyEdit('3');
                        setCompanyInfoEdit(experience);
                        if (companyEdit === '3') {
                          yourFunctionToExecuteAfterStateUpdate();
                        }
                      }}
                    >
                      <EditIcon fontSize="12px" />
                    </IconButton>
                  </Stack>

                  <SubTitle color="rgba(29, 29, 29, 0.6)" weight="500">
                    {experience.company?.name}
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
                        {formatDate(experience.startDate, 'month') || `-`}
                      </SubTitle>
                      <SubTitle weight="600">
                        {experience.isCurrentEmployer
                          ? 'Current'
                          : formatDate(experience.endDate, 'month') || `-`}
                      </SubTitle>
                    </Stack>
                    <SubTitle color="#6A6A6A">
                      {convertMonthsToYearsAndMonths(
                        experience.experienceInMonths
                      )}
                    </SubTitle>
                  </Stack>
                </Stack>
              </TimelineContent>
            </TimelineItem>
          ))}
        {showMoreButton && <Button onClick={handleReadMoreClick}>More</Button>}
        {showReadLessButton && (
          <Button onClick={handleReadLessClick}>Read Less</Button>
        )}
      </Timeline>
    </Stack>
  );
};

export default CompaniesView;
