import InfoCard from '@/cardComponents/InfoCard';
import useUserSummary from '@/customHooks/CutsomApiHooks/useuserSummary';
import ProfileRightLayout from '@/layouts/ProfileRightLayout';
import ProfileInfo from '@/pageComponents/Profile/Common/ProfileInfo';
import AcademicProjectsView from '@/pageComponents/Profile/Edit/ProjectDetails/AcademicProjectsView';
import CompanyProjectView from '@/pageComponents/Profile/Edit/ProjectDetails/CompanyProjectView';
import ProjectForm from '@/pageComponents/Profile/Edit/ProjectDetails/ProjectForm';
import ReviewProjectsView from '@/pageComponents/Profile/Edit/ProjectDetails/ReviewProjectsView';
import {
  DataContext,
  DataProvider,
} from '@/reUsableComponents/DataContext/DataContext';
import { SlugContext } from '@/reUsableComponents/DataContext/SlugContext';
import FormHeaderComponents from '@/reUsableComponents/HeaderComponents/FormHeaderComponents';
import withAuth from '@/src/AuthWrapper/AuthWrapper';
import { CandidateProjectsApi } from '@/swagger_api/*';
import { handleErrors } from '@/utils/CommonFunctions/ErrorFunctions';
import { Stack, Typography, styled } from '@mui/material';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';

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

const ProjectDetailsChild = () => {
  const { userDetails, candidateId, routers, summary } = useUserSummary();
  console.log(useUserSummary(), 'hhhh');
  const [companyInfo, setCompanyInfo] = useState([]);
  const [companyInfoEdit, setCompanyInfoEdit] = useState({});
  const [companyEdit, setCompanyEdit] = useState('1');
  const [companyProjectInfo, setCompanyProjectInfo] = useState([]);
  const [academicProjectInfo, setAcademicProjectInfo] = useState([]);
  const [reviewProjectInfo, setReviewProjectInfo] = useState([]);
  const [projectEdit, setProjectEdit] = useState('1');
  const [projectInfoEdit, setProjectInfoEdit] = useState({});

  const sectionRef = useRef(null);

  const context1 = useContext(SlugContext);
  const context2 = useContext(DataContext);
  console.log(context2, 'edit');
  const projectMessage = context2
    ? context2?.messages?.edit.projects
    : context1?.messages?.edit.projects;
  const reviewProjectMessage = context2
    ? context2?.messages?.edit.review_projects
    : context1?.messages?.edit.review_projects;
  // const projectMessage = context2 ? context2?.messages?.view.projects : context1?.messages?.public_view?.projects;
  // const reviewProjectMessage = context2
  //   ? context2?.messages?.view.review_projects
  //   : context1?.messages?.public_view?.review_projects;

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
    if (projectEdit === '3') {
      yourFunctionToExecuteAfterStateUpdate();
    }
  }, [projectEdit, yourFunctionToExecuteAfterStateUpdate]);

  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    getReviewProject();
    getCompanyProject();
    getAcademicProject();
  }

  async function getReviewProject() {
    const candidateProjectsApi = new CandidateProjectsApi();
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
    const candidateProjectsApi = new CandidateProjectsApi();
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
    const candidateProjectsApi = new CandidateProjectsApi();
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
    <ProfileRightLayout edit>
      <Stack spacing={3}>
        <ProfileInfo edit />

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
            <CompanyProjectView
              projectInfo={companyProjectInfo}
              setProjectInfo={setCompanyProjectInfo}
              projectInfoEdit={projectInfoEdit}
              setProjectEdit={setProjectEdit}
              setProjectInfoEdit={setProjectInfoEdit}
              sectionRef={sectionRef}
              yourFunctionToExecuteAfterStateUpdate={
                yourFunctionToExecuteAfterStateUpdate
              }
            />
          </>
        )}

        {academicProjectInfo.length > 0 && (
          <>
            <FormHeaderComponents
              underLine
              title="Academic Projects"
              isButtonNotRequired={true}
              workingFunction={() => setReadOnly(false)}
            />
            <AcademicProjectsView
              projectInfo={academicProjectInfo}
              setProjectInfo={setAcademicProjectInfo}
              projectInfoEdit={projectInfoEdit}
              setProjectEdit={setProjectEdit}
              setProjectInfoEdit={setProjectInfoEdit}
              sectionRef={sectionRef}
              yourFunctionToExecuteAfterStateUpdate={
                yourFunctionToExecuteAfterStateUpdate
              }
            />
          </>
        )}

        {reviewProjectInfo.length > 0 && (
          <>
            <InfoCard text={reviewProjectMessage} />

            <FormHeaderComponents
              underLine
              title="Review Projects"
              isButtonNotRequired={true}
              workingFunction={() => setReadOnly(false)}
            />

            <ReviewProjectsView
              projectInfo={reviewProjectInfo}
              setProjectInfo={setReviewProjectInfo}
              projectInfoEdit={projectInfoEdit}
              setProjectEdit={setProjectEdit}
              setProjectInfoEdit={setProjectInfoEdit}
              sectionRef={sectionRef}
              yourFunctionToExecuteAfterStateUpdate={
                yourFunctionToExecuteAfterStateUpdate
              }
            />
          </>
        )}

        <ProjectForm
          getData={getData}
          projectInfo={reviewProjectInfo}
          setProjectInfo={setReviewProjectInfo}
          projectInfoEdit={projectInfoEdit}
          setProjectInfoEdit={setProjectInfoEdit}
          projectEdit={projectEdit}
          setProjectEdit={setProjectEdit}
          sectionRef={sectionRef}
        />
      </Stack>
    </ProfileRightLayout>
  );
};

const ProjectDetails = () => {
  return (
    <DataProvider>
      <ProjectDetailsChild />
    </DataProvider>
  );
};

export default withAuth(ProjectDetails, 'user');
