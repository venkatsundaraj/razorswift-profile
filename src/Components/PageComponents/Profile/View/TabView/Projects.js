import InfoCard from '@/cardComponents/InfoCard';
import ProfileCard from '@/cardComponents/ProfileCard';
import AcademicProjectsView from '@/pageComponents/Profile/Edit/ProjectDetails/AcademicProjectsView';
import CompanyProjectView from '@/pageComponents/Profile/Edit/ProjectDetails/CompanyProjectView';
import ReviewProjectsView from '@/pageComponents/Profile/Edit/ProjectDetails/ReviewProjectsView';
import { DataContext } from '@/reUsableComponents/DataContext/DataContext';
import { SlugContext } from '@/reUsableComponents/DataContext/SlugContext';
import FormHeaderComponents from '@/reUsableComponents/HeaderComponents/FormHeaderComponents';
import { CandidateProjectsApi } from '@/swagger_api/*';
import { handleErrors } from '@/utils/CommonFunctions/ErrorFunctions';
import { Divider, Stack } from '@mui/material';
import { useContext, useEffect, useState } from 'react';

const Projects = () => {
  const context1 = useContext(SlugContext);
  const context2 = useContext(DataContext);

  const candidateId = context2 ? context2?.data?.id : context1.data?.id;
  const candidateProjectsApi = new CandidateProjectsApi();
  const [companyProjectInfo, setCompanyProjectInfo] = useState([]);
  const [academicProjectInfo, setAcademicProjectInfo] = useState([]);
  const [reviewProjectInfo, setReviewProjectInfo] = useState([]);

  const projectMessage = context2
    ? context2?.messages?.view.projects
    : context1?.messages?.public_view?.projects;
  const reviewProjectMessage = context2
    ? context2?.messages?.view.review_projects
    : context1?.messages?.public_view?.review_projects;

  useEffect(() => {
    getData();
    console.log(candidateId);
  }, []);
  async function getData() {
    getReviewProject();
    getCompanyProject();
    getAcademicProject();
  }

  async function getReviewProject() {
    const opts = {
      candidateId: candidateId,
    };
    console.log(opts);
    await candidateProjectsApi
      .apiCandidateProjectsGetAllProjectsToBeReviewedGet(opts)
      .then(async response => {
        console.log('hi', response.body);
        if (response.body.message === 'Records Fetched Successfully.') {
          console.log('hi');
          setReviewProjectInfo(response?.body?.result);
        } else if (response.body.message === 'No Records Found.') {
          setReviewProjectInfo([]);
        }
      })
      .catch(handleErrors);
  }
  async function getCompanyProject() {
    const opts = {
      candidateId: candidateId,
    };
    console.log(opts);
    await candidateProjectsApi
      .apiCandidateProjectsGetAllCompanyProjectsGet(opts)
      .then(async response => {
        console.log('hi', response.body);
        if (response.body.message === 'Records Fetched Successfully.') {
          console.log('hi');
          setCompanyProjectInfo(response?.body?.result);
        } else if (response.body.message === 'No Records Found.') {
          setCompanyProjectInfo([]);
        }
      })
      .catch(handleErrors);
  }
  async function getAcademicProject() {
    const opts = {
      candidateId: candidateId,
    };
    console.log(opts);
    await candidateProjectsApi
      .apiCandidateProjectsGetAllAcademicProjectsGet(opts)
      .then(async response => {
        console.log('hi', response.body);
        if (response.body.message === 'Records Fetched Successfully.') {
          console.log('hi');

          setAcademicProjectInfo(response?.body?.result);
        } else if (response.body.message === 'No Records Found.') {
          setAcademicProjectInfo([]);
        }
      })
      .catch(handleErrors);
  }

  return (
    <ProfileCard
      styleProps={{
        backgroundImage:
          'linear-gradient(180deg, rgba(215, 231, 255, 0.18) -11.04%, rgba(255, 255, 255, 0) 147.96%);',
      }}
    >
      <Stack
        direction="column"
        justifyContent="space-evenly"
        sx={{
          maxWidth: '700px',
          overflowX: 'auto',
          '&::-webkit-scrollbar': {
            height: '4px',
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
        {companyProjectInfo.length <= 0 &&
          academicProjectInfo.length <= 0 &&
          reviewProjectInfo.length <= 0 && <InfoCard text={projectMessage} />}

        {companyProjectInfo.length > 0 && (
          <>
            <FormHeaderComponents
              underLine
              title="Company Projects"
              isButtonNotRequired={true}
              workingFunction={() => setReadOnly(false)}
            />
            <CompanyProjectView projectInfo={companyProjectInfo} noEdit />
          </>
        )}

        {academicProjectInfo.length > 0 && (
          <>
            <Divider sx={{ my: 1 }} />
            <FormHeaderComponents
              underLine
              title="Academic Projects"
              isButtonNotRequired={true}
              workingFunction={() => setReadOnly(false)}
            />
            <AcademicProjectsView projectInfo={academicProjectInfo} noEdit />
          </>
        )}
        {reviewProjectInfo.length > 0 && (
          <InfoCard text={reviewProjectMessage} />
        )}
        <Divider sx={{ my: 1 }} />
        {reviewProjectInfo.length > 0 && (
          <>
            <FormHeaderComponents
              underLine
              title="Review Projects"
              isButtonNotRequired={true}
              workingFunction={() => setReadOnly(false)}
            />
            <ReviewProjectsView projectInfo={reviewProjectInfo} noEdit />
          </>
        )}
      </Stack>
    </ProfileCard>
  );
};

export default Projects;
