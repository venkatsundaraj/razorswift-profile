import useUserSummary from '@/customHooks/CutsomApiHooks/useuserSummary';
import ProfileRightLayout from '@/layouts/ProfileRightLayout';
import ProfileInfo from '@/pageComponents/Profile/Common/ProfileInfo';
import SoftSkillsForm from '@/pageComponents/Profile/Edit/Skills/SoftSkillsForm';
import TechnicalSkillsForm from '@/pageComponents/Profile/Edit/Skills/TechnicalSkillsForm';
import { DataProvider } from '@/reUsableComponents/DataContext/DataContext';
import withAuth from '@/src/AuthWrapper/AuthWrapper';
import { CandidateSkillApi } from '@/swagger_api/api/CandidateProfileApi';
import { Stack } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

const Skills = () => {
  const { userDetails, candidateId, routers, summary } = useUserSummary();
  const [technicalInfo, setTechnicalInfo] = useState([]);
  const [technicalInfoEdit, setTechnicalInfoEdit] = useState({});
  const [technicalEdit, setTechnicalEdit] = useState('1');
  const [data, setData] = useState({});
  const sectionRef = useRef(null);

  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    const candidateSkillApi = new CandidateSkillApi();
    const opts = {
      skillType: 1,
    };
    await candidateSkillApi
      .apiCandidateSkillGetAllFilterByCandidateIdCandidateIdGet(
        candidateId,
        opts
      )
      .then(async response => {
        if (response.body.message === 'Records Fetched Successfully.') {
          setTechnicalInfo(response?.body?.result);
        } else if (response.body.message === 'No Records Found.') {
          setTechnicalInfo([]);
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
    <DataProvider>
      <ProfileRightLayout edit>
        <Stack spacing={3}>
          <ProfileInfo edit />
          <TechnicalSkillsForm
            getData={getData}
            setTechnicalInfo={setTechnicalInfo}
            technicalInfo={technicalInfo}
            technicalEdit={technicalEdit}
            setTechnicalEdit={setTechnicalEdit}
            sectionRef={sectionRef}
          />
          <SoftSkillsForm />
          {/* <ExpertiseForm /> */}
        </Stack>
      </ProfileRightLayout>
    </DataProvider>
  );
};

export default withAuth(Skills, 'user');
