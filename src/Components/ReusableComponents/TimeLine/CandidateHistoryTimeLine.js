import { formatDate } from '@/utils/CommonFunctions/DateRelatedFunction';
import { resultStatusEnum, sourceSequenceEnum } from '@/utils/enum';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import { timelineOppositeContentClasses } from '@mui/lab/TimelineOppositeContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import {
  Box,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
} from '@mui/material';
import { useMemo } from 'react';

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

const CandidateHistoryTimeLine = ({ data, type = 'NotCandidate' }) => {
  console.log(data);

  return (
    <Timeline
      sx={{
        [`& .${timelineOppositeContentClasses.root}`]: {
          flex: 0.0,
        },
        '& .MuiTimelineItem-missingOppositeContent:before': { content: 'none' },
      }}
    >
      {data &&
        data.sourcingSequence &&
        data.sourcingSequence.map(sourcingSequence => (
          <TimelineItem key={sourcingSequence.id}>
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
                <Stack direction="row" spacing={2} alignItems={'center'}>
                  <Title>{sourcingSequence.name}</Title>
                  {(sourcingSequence.status === resultStatusEnum['Passed'] ||
                    sourcingSequence.status ===
                      resultStatusEnum['Rejected']) && (
                    <>
                      {sourcingSequence.sequenceNumber ===
                        sourceSequenceEnum['Offer roll out'] && (
                        <>
                          <InterViewResultStatus
                            dataProps={dataProps}
                            value={sourcingSequence.status}
                            text={
                              sourcingSequence.status ===
                              resultStatusEnum['Passed']
                                ? 'Offer rolled out'
                                : 'Rejected'
                            }
                          />
                        </>
                      )}
                      {sourcingSequence.sequenceNumber ===
                        sourceSequenceEnum['Accept offer'] && (
                        <>
                          <InterViewResultStatus
                            dataProps={dataProps}
                            value={sourcingSequence.status}
                            text={
                              sourcingSequence.status ===
                              resultStatusEnum['Passed']
                                ? 'Offer accepted'
                                : 'Rejected'
                            }
                          />
                        </>
                      )}
                      {sourcingSequence.sequenceNumber ===
                        sourceSequenceEnum['Accept joining'] && (
                        <>
                          <InterViewResultStatus
                            dataProps={dataProps}
                            value={sourcingSequence.status}
                            text={
                              sourcingSequence.status ===
                              resultStatusEnum['Passed']
                                ? 'Joined'
                                : 'Rejected'
                            }
                          />
                        </>
                      )}
                      {sourcingSequence.sequenceNumber ===
                        sourceSequenceEnum['Schedule Assessment'] && (
                        <>
                          {sourcingSequence.status ===
                            resultStatusEnum['YetToBeSchedule'] ||
                          sourcingSequence.status ===
                            resultStatusEnum['Rejected'] ? (
                            <InterViewResultStatus
                              dataProps={resultProps}
                              value={sourcingSequence.status}
                              text={
                                sourcingSequence.status ===
                                resultStatusEnum['YetToBeSchedule']
                                  ? 'Yet to be schedule'
                                  : sourcingSequence.status ===
                                    resultStatusEnum['Rejected']
                                  ? 'Failed'
                                  : null
                              }
                            />
                          ) : (
                            <>
                              {sourcingSequence.status ===
                              resultStatusEnum['Passed'] ? (
                                <CandidateStatus
                                  dataProps={scheduleProps}
                                  value={sourcingSequence.status}
                                  text={
                                    sourcingSequence.status ===
                                    resultStatusEnum['Passed']
                                      ? 'Scheduled'
                                      : null
                                  }
                                />
                              ) : null}
                            </>
                          )}
                        </>
                      )}
                      {sourcingSequence.sequenceNumber ===
                        sourceSequenceEnum['Update Assessment Result'] && (
                        <>
                          {sourcingSequence.status ===
                            resultStatusEnum['YetToBeSchedule'] ||
                          sourcingSequence.status ===
                            resultStatusEnum['Rejected'] ? (
                            <InterViewResultStatus
                              dataProps={resultProps}
                              value={sourcingSequence.status}
                              text={
                                sourcingSequence.status ===
                                resultStatusEnum['YetToBeSchedule']
                                  ? 'Awaiting for result'
                                  : 'Failed'
                              }
                            />
                          ) : (
                            <InterViewResultStatus
                              dataProps={resultProps}
                              value={sourcingSequence.status}
                              text={
                                sourcingSequence.status ===
                                resultStatusEnum['Passed']
                                  ? 'Passed'
                                  : null
                              }
                            />
                          )}
                        </>
                      )}
                      {sourcingSequence.sequenceNumber ===
                        sourceSequenceEnum['Schedule Interview'] && (
                        <Stack direction="column">
                          {sourcingSequence?.details?.name}
                          <InterViewResultStatus
                            dataProps={dataProps}
                            value={sourcingSequence?.status}
                            text={
                              sourcingSequence.status ===
                              resultStatusEnum['Passed']
                                ? 'Interview Scheduled'
                                : sourcingSequence.status ===
                                  resultStatusEnum['Rejected']
                                ? 'Failed'
                                : null
                            }
                          />
                        </Stack>
                      )}
                      {sourcingSequence.sequenceNumber ===
                        sourceSequenceEnum['Update Interview Result'] && (
                        <Stack direction="column">
                          <InterViewResultStatus
                            dataProps={dataProps}
                            value={sourcingSequence?.status}
                          />
                        </Stack>
                      )}
                    </>
                  )}
                  {sourcingSequence.status ===
                    resultStatusEnum['YetToBeSchedule'] && (
                    <>
                      {(sourcingSequence.sequenceNumber ===
                        sourceSequenceEnum['Offer roll out'] ||
                        sourcingSequence.sequenceNumber ===
                          sourceSequenceEnum['Accept offer'] ||
                        sourcingSequence.sequenceNumber ===
                          sourceSequenceEnum['Accept joining'] ||
                        sourcingSequence.sequenceNumber ===
                          sourceSequenceEnum['Schedule Assessment'] ||
                        sourcingSequence.sequenceNumber ===
                          sourceSequenceEnum['Update Assessment Result'] ||
                        sourcingSequence.sequenceNumber ===
                          sourceSequenceEnum['Schedule Interview'] ||
                        sourcingSequence.sequenceNumber ===
                          sourceSequenceEnum['Update Interview Result']) && (
                        <>
                          <InterViewResultStatus
                            dataProps={dataProps}
                            value={sourcingSequence.status}
                            text={
                              sourcingSequence.status ===
                              resultStatusEnum['YetToBeSchedule']
                                ? 'Yet To be updated'
                                : null
                            }
                          />
                        </>
                      )}
                    </>
                  )}
                </Stack>

                {type !== 'NotCandidate' && (
                  <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="flex-start"
                  >
                    {sourcingSequence.sequenceNumber ===
                      sourceSequenceEnum['Schedule Assessment'] && (
                      <>
                        {sourcingSequence.status ===
                          resultStatusEnum['YetToBeSchedule'] ||
                        sourcingSequence.status ===
                          resultStatusEnum['Rejected'] ? null : (
                          <>
                            {sourcingSequence.status ===
                            resultStatusEnum['Passed'] ? (
                              <Stack direction="column">
                                {/* <CandidateStatus
                                  dataProps={scheduleProps}
                                  value={sourcingSequence.status}
                                  text={sourcingSequence.status === resultStatusEnum['Passed'] ? 'Scheduled' : null}
                                /> */}
                                <Stack direction="column">
                                  <Typography variant="body1" color="initial">
                                    Title:{' '}
                                    {
                                      sourcingSequence?.assessmentDetails
                                        ?.assessmentTitle
                                    }
                                  </Typography>
                                  <Typography variant="body1" color="initial">
                                    Link Sent on:{' '}
                                    {formatDate(
                                      sourcingSequence?.assessmentDetails
                                        ?.sentDateTime,
                                      'datetime'
                                    )}
                                  </Typography>
                                </Stack>
                              </Stack>
                            ) : null}
                          </>
                        )}
                      </>
                    )}
                    {sourcingSequence.sequenceNumber ===
                      sourceSequenceEnum['Update Assessment Result'] && (
                      <>
                        {sourcingSequence.status ===
                          resultStatusEnum['YetToBeSchedule'] ||
                        sourcingSequence.status ===
                          resultStatusEnum['Rejected'] ? null : (
                          <>
                            {(() => {
                              if (
                                sourcingSequence?.status ===
                                  resultStatusEnum['Passed'] &&
                                sourcingSequence?.assessmentResult
                                  ?.reportJson &&
                                Object.keys(
                                  sourcingSequence.assessmentResult.reportJson
                                ).length !== 0
                              ) {
                                const report = JSON.parse(
                                  sourcingSequence.assessmentResult.reportJson
                                );

                                return (
                                  <Box>
                                    <Stack direction="row">
                                      <Typography
                                        variant="body1"
                                        color="initial"
                                      >
                                        Test completed on:
                                      </Typography>
                                      <Typography
                                        variant="body1"
                                        color="initial"
                                      >
                                        {report.completed_date &&
                                          formatDate(
                                            report.completed_date,
                                            'datetime'
                                          )}
                                      </Typography>
                                    </Stack>
                                    <Typography
                                      variant="body1"
                                      color="initial"
                                    ></Typography>
                                    <TableContainer component={Paper}>
                                      <Table>
                                        <TableHead>
                                          <TableRow>
                                            <TableCell>Skill</TableCell>
                                            <TableCell>Percentage</TableCell>
                                          </TableRow>
                                        </TableHead>
                                        <TableBody>
                                          {report.sections &&
                                            Object.entries(report.sections).map(
                                              ([key, value]) => (
                                                <TableRow key={key}>
                                                  <TableCell>{key}</TableCell>
                                                  <TableCell>{value}</TableCell>
                                                </TableRow>
                                              )
                                            )}
                                        </TableBody>
                                      </Table>
                                    </TableContainer>
                                    <Stack direction="row" mt={2}>
                                      <Typography
                                        variant="body1"
                                        color="initial"
                                      >
                                        Overall Percentage:
                                      </Typography>
                                      <Typography
                                        variant="body1"
                                        color="initial"
                                      >
                                        {report.overall_percentage}%
                                      </Typography>
                                    </Stack>
                                  </Box>
                                );
                              } else {
                                return (
                                  <Typography variant="body1" color="initial">
                                    Test yet to be taken
                                  </Typography>
                                );
                              }
                            })()}
                          </>
                        )}
                      </>
                    )}
                    {sourcingSequence.sequenceNumber ===
                      sourceSequenceEnum['Schedule Interview'] && (
                      <Stack direction="column">
                        {/* <InterViewResultStatus dataProps={dataProps} value={sourcingSequence?.details?.status} /> */}

                        {(sourcingSequence?.details?.status ===
                          resultStatusEnum['Passed'] ||
                          sourcingSequence?.details?.status ===
                            resultStatusEnum['Rejected'] ||
                          sourcingSequence?.details?.status ===
                            resultStatusEnum['YetToBeSchedule']) && (
                          <>
                            {sourcingSequence?.details
                              ?.jdClientInterviewRounds &&
                            sourcingSequence?.details?.jdClientInterviewRounds
                              ?.length > 0 ? (
                              <>
                                <Box
                                  sx={{
                                    width: '100%',
                                    maxHeight: '400px',
                                    overflowY: 'auto',
                                    '&::-webkit-scrollbar': {
                                      width: 5,
                                    },
                                    '&::-webkit-scrollbar-track': {
                                      background: '#f1f1f1',
                                    },
                                    '&::-webkit-scrollbar-thumb': {
                                      background: '#888',
                                    },
                                    '&::-webkit-scrollbar-thumb:hover': {
                                      background: '#555',
                                    },
                                  }}
                                >
                                  <TableContainer component={Paper}>
                                    <Table>
                                      <TableHead>
                                        <TableRow>
                                          <TableCell>Sl no</TableCell>
                                          <TableCell>Round Name</TableCell>
                                          <TableCell>
                                            Date of completion
                                          </TableCell>
                                          <TableCell>Remarks</TableCell>
                                          <TableCell>Status</TableCell>
                                        </TableRow>
                                      </TableHead>
                                      <TableBody>
                                        {sourcingSequence?.details
                                          ?.jdClientInterviewRounds &&
                                          sourcingSequence?.details?.jdClientInterviewRounds.map(
                                            (values, index) => (
                                              <TableRow key={index}>
                                                <TableCell>
                                                  {index + 1}
                                                </TableCell>
                                                <TableCell>
                                                  {values.roundName}
                                                </TableCell>
                                                <TableCell>
                                                  {formatDate(
                                                    values.date,
                                                    'datetime'
                                                  )}
                                                </TableCell>
                                                <TableCell>
                                                  {values.remarks}
                                                </TableCell>
                                                <TableCell>
                                                  {values.status === 0 && (
                                                    <Stack
                                                      alignSelf="flex-end"
                                                      direction="row"
                                                      spacing={2}
                                                    >
                                                      <CandidateStatus
                                                        dataProps={
                                                          scheduleProps
                                                        }
                                                        value={values.status}
                                                      />
                                                    </Stack>
                                                  )}
                                                  {values.status === 1 && (
                                                    <DoneIcon
                                                      sx={{ color: '#057602' }}
                                                    />
                                                  )}
                                                  {values.status === 2 && (
                                                    <CloseIcon
                                                      sx={{ color: '#ff0000' }}
                                                    />
                                                  )}
                                                </TableCell>
                                              </TableRow>
                                            )
                                          )}
                                      </TableBody>
                                    </Table>
                                  </TableContainer>
                                </Box>
                              </>
                            ) : (
                              <Typography variant="body1" color="initial">
                                No Interview Rounds scheduled
                              </Typography>
                            )}
                          </>
                        )}
                      </Stack>
                    )}
                    {sourcingSequence.sequenceNumber ===
                      sourceSequenceEnum['Update Interview Result'] && (
                      <Stack direction="column">
                        {/* <InterViewResultStatus dataProps={dataProps} value={sourcingSequence?.details?.status} /> */}

                        {(sourcingSequence?.details?.status ===
                          resultStatusEnum['Passed'] ||
                          sourcingSequence?.details?.status ===
                            resultStatusEnum['Rejected'] ||
                          sourcingSequence?.details?.status ===
                            resultStatusEnum['YetToBeSchedule']) && (
                          <>
                            {sourcingSequence?.details
                              ?.jdClientInterviewRounds &&
                            sourcingSequence?.details?.jdClientInterviewRounds
                              ?.length > 0 ? (
                              <>
                                <Box
                                  sx={{
                                    width: '100%',
                                    maxHeight: '400px',
                                    overflowY: 'auto',
                                    '&::-webkit-scrollbar': {
                                      width: 5,
                                    },
                                    '&::-webkit-scrollbar-track': {
                                      background: '#f1f1f1',
                                    },
                                    '&::-webkit-scrollbar-thumb': {
                                      background: '#888',
                                    },
                                    '&::-webkit-scrollbar-thumb:hover': {
                                      background: '#555',
                                    },
                                  }}
                                >
                                  <TableContainer component={Paper}>
                                    <Table>
                                      <TableHead>
                                        <TableRow>
                                          <TableCell>Sl no</TableCell>
                                          <TableCell>Round Name</TableCell>
                                          <TableCell>
                                            Date of completion
                                          </TableCell>
                                          <TableCell>Remarks</TableCell>
                                          <TableCell>Status</TableCell>
                                        </TableRow>
                                      </TableHead>
                                      <TableBody>
                                        {sourcingSequence?.details
                                          ?.jdClientInterviewRounds &&
                                          sourcingSequence?.details?.jdClientInterviewRounds.map(
                                            (values, index) => (
                                              <TableRow key={index}>
                                                <TableCell>
                                                  {index + 1}
                                                </TableCell>
                                                <TableCell>
                                                  {values.roundName}
                                                </TableCell>
                                                <TableCell>
                                                  {formatDate(
                                                    values.date,
                                                    'datetime'
                                                  )}
                                                </TableCell>
                                                <TableCell>
                                                  {values.remarks}
                                                </TableCell>
                                                <TableCell>
                                                  {values.status === 0 && (
                                                    <Stack
                                                      alignSelf="flex-end"
                                                      direction="row"
                                                      spacing={2}
                                                    >
                                                      <CandidateStatus
                                                        dataProps={
                                                          scheduleProps
                                                        }
                                                        value={values.status}
                                                      />
                                                    </Stack>
                                                  )}
                                                  {values.status === 1 && (
                                                    <DoneIcon
                                                      sx={{ color: '#057602' }}
                                                    />
                                                  )}
                                                  {values.status === 2 && (
                                                    <CloseIcon
                                                      sx={{ color: '#ff0000' }}
                                                    />
                                                  )}
                                                </TableCell>
                                              </TableRow>
                                            )
                                          )}
                                      </TableBody>
                                    </Table>
                                  </TableContainer>
                                </Box>
                              </>
                            ) : (
                              <Typography variant="body1" color="initial">
                                No Interview Rounds scheduled
                              </Typography>
                            )}
                          </>
                        )}
                      </Stack>
                    )}
                  </Stack>
                )}
              </Stack>
            </TimelineContent>
          </TimelineItem>
        ))}
    </Timeline>
  );
};
export default CandidateHistoryTimeLine;

const CandidateStatus = ({ value, text }) => {
  const properties = useMemo(() => {
    const dataProps = {
      1: {
        textColor: '#FF9800',
        backgroundColor: '#FFF3E0',
        text: text || 'Schedule Assessment',
      },
      2: {
        textColor: '#9C27B0',
        backgroundColor: '#F3E5F5',
        text: text || 'Update Assessment Result',
      },
      3: {
        textColor: '#00BCD4',
        backgroundColor: 'rgba(0, 188, 212, 0.2)',
        text: text || 'Schedule Interview',
      },
      4: {
        textColor: '#E91E63',
        backgroundColor: '#F8BBD0',
        text: text || 'Update Interview Result',
      },
      5: {
        textColor: '#4CAF50',
        backgroundColor: '#E8F5E9',
        text: text || 'Offer roll out',
      },
      6: {
        textColor: '#3F51B5',
        backgroundColor: '#E8EAF6',
        text: text || 'Accept offer',
      },
      7: {
        textColor: '#FF5722',
        backgroundColor: '#FFCCBC',
        text: text || 'Accept joining',
      },
    };

    return dataProps
      ? dataProps[value]
      : { textColor: '#1D1550', backgroundColor: '#E1DCFF', text: 'Ready' };
  }, [value]);

  return (
    <Typography
      align="center"
      sx={{
        color: properties?.textColor,
        minWidth: 100,
        backgroundColor: properties?.backgroundColor,
        border: `1px solid ${properties?.textColor} `,
        pl: '12px',
        pr: '12px',
        pt: '2px',
        pb: '2px',
        fontWeight: 500,
      }}
      variant="h6"
    >
      {text || properties?.text}
    </Typography>
  );
};

const InterViewResultStatus = ({ value, text }) => {
  const properties = useMemo(() => {
    const dataProps = {
      1: {
        textColor: '#006244',
        backgroundColor: '#CDFFF0',
        text: text || 'Passed',
      },
      2: {
        textColor: '#FF0000',
        backgroundColor: '#FFDCDC',
        text: text || 'Failed',
      },
      3: {
        textColor: '#ED5702',
        backgroundColor: 'rgba(237, 87, 2, 0.2)',
        text: text || 'In progress',
      },
      0: {
        textColor: '#1D1550',
        backgroundColor: '#E1DCFF',
        text: text || 'Yet to Scheduled',
      },
    };

    return dataProps[value];
  }, [value, text]);

  return (
    <Typography
      align="center"
      sx={{
        color: properties?.textColor,
        minWidth: 100,
        backgroundColor: properties?.backgroundColor,
        border: `1px solid ${properties?.textColor} `,
        pl: '12px',
        pr: '12px',
        pt: '2px',
        pb: '2px',
        fontWeight: 500,
      }}
      variant="h6"
    >
      {text || properties?.text}
    </Typography>
  );
};

const dataProps = {
  1: { textColor: '#006244', backgroundColor: '#CDFFF0', text: 'Passed' },
  2: { textColor: '#FF0000', backgroundColor: '#FFDCDC', text: 'Failed' },
  3: {
    textColor: '#ED5702',
    backgroundColor: 'rgba(237, 87, 2, 0.2)',
    text: 'In progress',
  },
  0: {
    textColor: '#1D1550',
    backgroundColor: '#E1DCFF',
    text: 'Yet to attend',
  },
  4: { textColor: '#6C4407', backgroundColor: '#F2E1C8', text: 'Processing' },
  ready: { textColor: '#1D1550', backgroundColor: '#E1DCFF', text: 'Ready' },
  delivered: {
    textColor: '#153A03',
    backgroundColor: '#D6F2C8',
    text: 'Delivered',
  },
};
const scheduleProps = {
  1: { textColor: '#006244', backgroundColor: '#CDFFF0', text: 'Schedule' },
  2: { textColor: '#FF0000', backgroundColor: '#FFDCDC', text: 'Reject' },
};

const resultProps = {
  1: { textColor: '#006244', backgroundColor: '#CDFFF0', text: 'Passed' },
  2: { textColor: '#FF0000', backgroundColor: '#FFDCDC', text: 'Failed' },
  3: {
    textColor: '#ED5702',
    backgroundColor: 'rgba(237, 87, 2, 0.2)',
    text: 'In progress',
  },
  0: {
    textColor: '#1D1550',
    backgroundColor: '#E1DCFF',
    text: 'Yet to attend',
  },
  4: { textColor: '#6C4407', backgroundColor: '#F2E1C8', text: 'Processing' },
  ready: { textColor: '#1D1550', backgroundColor: '#E1DCFF', text: 'Ready' },
  delivered: {
    textColor: '#153A03',
    backgroundColor: '#D6F2C8',
    text: 'Delivered',
  },
};
