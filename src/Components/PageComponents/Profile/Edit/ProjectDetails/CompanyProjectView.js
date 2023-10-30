import useReadMore from '@/customHooks/useReadMore';
import ViewEditor from '@/reUsableComponents/RichTextEditor/ViewEditor';
import SkillCard from '@/reUsableComponents/ViewCards/SkillCard';
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
  wordBreak: 'break-word',
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
  wordBreak: 'break-word',
  lineHeight: lineHeight || '16.8px',
  textAlign: 'inherit',
  [theme.breakpoints.down('sm')]: {
    fontWeight: weight || '500',
    fontSize: '12px',
    lineHeight: lineHeight || '14.4px',
  },
}));

const CompanyProjectView = ({
  projectInfo,
  setProjectEdit,
  setProjectInfoEdit,
  noEdit,
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
  } = useReadMore(projectInfo);
  return (
    <Stack>
      {projectInfo &&
        displayData.map((company, index) => (
          <Stack spacing={1} key={company?.companyId}>
            <Title sx={{ mt: 1 }}>{company?.company?.name}</Title>
            <Stack>
              <Title weight="500">Projects</Title>
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
                {company?.projects &&
                  company?.projects
                    .slice(0, displayCount)
                    .map((project, index) => (
                      <TimelineItem key={index}>
                        <TimelineSeparator>
                          <TimelineDot
                            color={project?.title ? 'primary' : 'grey'}
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
                              <Title>{project?.title}</Title>
                              {!noEdit && (
                                <IconButton
                                  color="primary"
                                  disableRipple
                                  size="small"
                                  aria-label="back"
                                  sx={{ p: 0 }}
                                  onClick={() => {
                                    setProjectEdit('3');
                                    let companyProjectInfo = { ...project };
                                    companyProjectInfo = {
                                      ...companyProjectInfo,
                                      employerName: company?.company?.name,
                                    };
                                    setProjectInfoEdit(companyProjectInfo);
                                    yourFunctionToExecuteAfterStateUpdate();
                                  }}
                                >
                                  <EditIcon fontSize="12px" />
                                </IconButton>
                              )}
                            </Stack>

                            <SubTitle
                              color="rgba(29, 29, 29, 0.6)"
                              weight="500"
                            >
                              {project?.company?.name}
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
                                  {formatDate(project.startDate, 'month') ||
                                    `-`}
                                </SubTitle>
                                <SubTitle weight="600">
                                  {formatDate(project.endDate, 'month') || `-`}
                                </SubTitle>
                              </Stack>
                            </Stack>
                            <ViewEditor
                              title="Description"
                              text={project?.description}
                            />
                            <SkillCard skills={project?.projectSkills} />
                            <ViewEditor
                              title="Roles & Responsibility"
                              text={project?.responsibility}
                            />
                          </Stack>
                        </TimelineContent>
                      </TimelineItem>
                    ))}
                {showMoreButton && (
                  <Button onClick={handleReadMoreClick}>More</Button>
                )}
                {showReadLessButton && (
                  <Button onClick={handleReadLessClick}>Read Less</Button>
                )}
              </Timeline>
            </Stack>
          </Stack>
        ))}
    </Stack>
  );
};

export default CompanyProjectView;
