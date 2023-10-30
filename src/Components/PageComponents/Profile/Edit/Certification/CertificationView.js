import useReadMore from '@/customHooks/useReadMore';
import { formatDate } from '@/utils/CommonFunctions/DateRelatedFunction';
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

const Title = styled(Typography)(({ theme, weight, color, lineHeight }) => ({
  color: color || '#1D1D1D',
  fontWeight: weight || '700',
  fontSize: '16px',
  wordBreak: 'break-word', // Add word break property
  lineHeight: lineHeight || '19.2px',
  textAlign: 'inherit',
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
  [theme.breakpoints.down('sm')]: {
    fontWeight: weight || '500',
    fontSize: '12px',
    lineHeight: lineHeight || '14.4px',
  },
}));

const certificationInfo = [
  {
    title: 'work',
    startDate: '2023-03-08T05:10:22.327+00:00',
    endDate: '2023-03-08T05:10:22.327+00:00',
    candidateId: 193,
    id: 2,
  },
];

const CertificationView = ({
  certificationInfo,
  setCertificationEdit,
  setCertificationInfoEdit,
  sectionRef,
  yourFunctionToExecuteAfterStateUpdate,
}) => {
  const {
    displayCount,
    handleReadMoreClick,
    handleReadLessClick,
    displayData,
    showMoreButton,
    showReadLessButton,
  } = useReadMore(certificationInfo);

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
        {certificationInfo &&
          displayData.map((certification, index) => (
            <TimelineItem key={index}>
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
                  <Stack direction="row">
                    <Title>
                      {certification?.title ? certification.title : '-'}
                    </Title>
                    <IconButton
                      color="primary"
                      disableRipple
                      size="small"
                      aria-label="back"
                      sx={{ p: 0 }}
                      onClick={() => {
                        setCertificationEdit('3');
                        setCertificationInfoEdit(certification);
                        yourFunctionToExecuteAfterStateUpdate();
                      }}
                    >
                      <EditIcon fontSize="12px" />
                    </IconButton>
                  </Stack>
                  <Stack>
                    <SubTitle>
                      {certification?.authority ? certification.authority : '-'}
                    </SubTitle>
                  </Stack>

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
                        {formatDate(certification.startDate, 'month') || '-'}
                      </SubTitle>
                      <SubTitle weight="600">
                        {formatDate(certification.endDate, 'month') || '-'}
                      </SubTitle>
                    </Stack>
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

export default CertificationView;
