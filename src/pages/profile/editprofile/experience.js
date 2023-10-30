import FormCard from '@/cardComponents/FormCard';
import InfoCard from '@/cardComponents/InfoCard';
import useUserSummary from '@/customHooks/CutsomApiHooks/useuserSummary';
import ProfileRightLayout from '@/layouts/ProfileRightLayout';
import ProfileInfo from '@/pageComponents/Profile/Common/ProfileInfo';
import Companies from '@/pageComponents/Profile/Edit/Experience/Companies';
import CompaniesView from '@/pageComponents/Profile/Edit/Experience/CompaniesView';
import {
  DataContext,
  DataProvider,
} from '@/reUsableComponents/DataContext/DataContext';
import { SlugContext } from '@/reUsableComponents/DataContext/SlugContext';
import FormHeaderComponents from '@/reUsableComponents/HeaderComponents/FormHeaderComponents';
import withAuth from '@/src/AuthWrapper/AuthWrapper';
import { CandidateEmployerApi, CandidateProjectsApi } from '@/swagger_api/*';
import { Stack } from '@mui/material';
import { useContext, useEffect, useRef, useState } from 'react';

const ExperienceChild = () => {
  const { userDetails, candidateId, routers, summary } = useUserSummary();
  const [companyInfo, setCompanyInfo] = useState([]);
  const [companyInfoEdit, setCompanyInfoEdit] = useState({});
  const [companyEdit, setCompanyEdit] = useState('1');
  const [projectInfo, setProjectInfo] = useState([]);
  const [projectEdit, setProjectEdit] = useState('1');
  const [projectInfoEdit, setProjectInfoEdit] = useState({});
  const [reviewProjectInfo, setReviewProjectInfo] = useState([]);
  const [reviewProjectEdit, setReviewProjectEdit] = useState('1');
  const [reviewProjectInfoEdit, setReviewProjectInfoEdit] = useState({});
  const sectionRef = useRef(null);
  const context1 = useContext(SlugContext);
  const context2 = useContext(DataContext);
  console.log(context2, 'edit');
  const Message = context2
    ? context2?.messages?.edit.experience
    : context1?.messages?.edit?.experience;

  useEffect(() => {
    getData();
    // getProjectData();
    // getProjectDataReview();
  }, []);
  async function getData() {
    const candidateEmployerApi = new CandidateEmployerApi();
    await candidateEmployerApi
      .apiCandidateEmployerGetAllEmployerByCandidateIdcandidateIdGet(
        candidateId
      )
      .then(async response => {
        if (response.body.message === 'Records Fetched Successfully.') {
          // Swal.fire({
          //   icon: 'success',
          //   title: '',
          //   text: 'Record Fetched Successfully.',
          // });

          setCompanyInfo(response?.body?.result);
        } else if (response.body.message === 'No Records Found.') {
          setCompanyInfo([]);
          // Swal.fire({
          //   icon: 'info',
          //   title: '',
          //   text: 'No Records Found !',
          // });
        }
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  }

  async function getProjectData() {
    const candidateProjectsApi = new CandidateProjectsApi();
    const opts = {
      candidateId: candidateId,
    };
    await candidateProjectsApi
      .apiCandidateProjectsGetAllCompanyProjectsGet(opts)
      .then(async response => {
        if (response.body.message === 'Records Fetched Successfully.') {
          // Swal.fire({
          //   icon: 'success',
          //   title: '',
          //   text: 'Record Fetched Successfully.',
          // });
          console.log('response?.body?.result', response?.body?.result);
          setProjectInfo(response?.body?.result);
        } else if (response.body.message === 'No Records Found.') {
          setProjectInfo([]);
          // Swal.fire({
          //   icon: 'info',
          //   title: '',
          //   text: 'No Records Found !',
          // });
        }
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  }
  async function getProjectDataReview() {
    const candidateProjectsApi = new CandidateProjectsApi();
    const opts = {
      candidateId: candidateId,
    };
    await candidateProjectsApi
      .apiCandidateProjectsGetAllCompanyProjectsGet(opts)
      .then(async response => {
        if (response.body.message === 'Records Fetched Successfully.') {
          // Swal.fire({
          //   icon: 'success',
          //   title: '',
          //   text: 'Record Fetched Successfully.',
          // });

          setReviewProjectInfo(response?.body?.result);
        } else if (response.body.message === 'No Records Found.') {
          setReviewProjectInfo([]);
          // Swal.fire({
          //   icon: 'info',
          //   title: '',
          //   text: 'No Records Found !',
          // });
        }
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  }

  return (
    <ProfileRightLayout edit>
      <Stack spacing={3}>
        <ProfileInfo edit />

        <FormHeaderComponents
          title="Company"
          isButtonNotRequired={true}
          workingFunction={() => setReadOnly(false)}
        />

        {companyInfo.length <= 0 && <InfoCard text={Message} />}
        {companyInfo.length > 0 && (
          <FormCard>
            <CompaniesView
              companyInfo={companyInfo}
              setCompanyInfo={setCompanyInfo}
              companyInfoEdit={companyInfoEdit}
              setCompanyInfoEdit={setCompanyInfoEdit}
              companyEdit={companyEdit}
              setCompanyEdit={setCompanyEdit}
              sectionRef={sectionRef}
            />
          </FormCard>
        )}

        <Companies
          getData={getData}
          edit={companyEdit}
          companyInfo={companyInfo}
          setCompanyInfo={setCompanyInfo}
          companyInfoEdit={companyInfoEdit}
          setCompanyInfoEdit={setCompanyInfoEdit}
          companyEdit={companyEdit}
          setCompanyEdit={setCompanyEdit}
          sectionRef={sectionRef}
        />
        {/* <FormHeaderComponents title='Projects' isButtonNotRequired={true} workingFunction={() => setReadOnly(false)} />

        {projectInfo.length >= 1 && true && (
          <FormCard>
            <CompaniesProjectView
              getData={getProjectData}
              projectInfo={projectInfo}
              setProjectInfo={setProjectInfo}
              projectInfoEdit={projectInfoEdit}
              setProjectInfoEdit={setProjectInfoEdit}
              projectEdit={projectEdit}
              setProjectEdit={setProjectEdit}
            />
          </FormCard>
        )}
        <CompanyProjects
          getData={getProjectData}
          projectInfo={projectInfo}
          setProjectInfo={setProjectInfo}
          projectInfoEdit={projectInfoEdit}
          setProjectInfoEdit={setProjectInfoEdit}
          projectEdit={projectEdit}
          setProjectEdit={setProjectEdit}
        /> */}
      </Stack>
    </ProfileRightLayout>
  );
};

const Experience = () => {
  return (
    <DataProvider>
      <ExperienceChild />
    </DataProvider>
  );
};

export default withAuth(Experience, 'user');
