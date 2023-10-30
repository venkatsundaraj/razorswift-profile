import FormCard from '@/cardComponents/FormCard';
import InfoCard from '@/cardComponents/InfoCard';
import useUserSummary from '@/customHooks/CutsomApiHooks/useuserSummary';
import ProfileRightLayout from '@/layouts/ProfileRightLayout';
import ProfileInfo from '@/pageComponents/Profile/Common/ProfileInfo';
import EducationForm from '@/pageComponents/Profile/Edit/Education/EducationForm';
import EducationView from '@/pageComponents/Profile/Edit/Education/EducationView';
import {
  DataContext,
  DataProvider,
} from '@/reUsableComponents/DataContext/DataContext';
import { SlugContext } from '@/reUsableComponents/DataContext/SlugContext';
import FormHeaderComponents from '@/reUsableComponents/HeaderComponents/FormHeaderComponents';
import withAuth from '@/src/AuthWrapper/AuthWrapper';
import { CandidateQualificationApi } from '@/swagger_api/api/CandidateProfileApi';
import { Stack } from '@mui/material';
import { useContext, useEffect, useRef, useState } from 'react';

const EducationChild = () => {
  const { userDetails, candidateId, routers, summary } = useUserSummary();
  const [educationInfo, setEducationInfo] = useState([]);
  const [educationInfoEdit, setEducationInfoEdit] = useState({});
  const [educationEdit, setEducationEdit] = useState('1');
  const [data, setData] = useState({});

  const sectionRef = useRef(null);

  const context1 = useContext(SlugContext);
  const context2 = useContext(DataContext);
  console.log(context2, 'edit');

  const Message = context2
    ? context2?.messages?.edit.education
    : context1?.messages?.edit?.education;

  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    const candidateQualificationApi = new CandidateQualificationApi();
    await candidateQualificationApi
      .apiCandidateQualificationGetAllQualificationByCandidateIdcandidateIdGet(
        candidateId
      )
      .then(async response => {
        if (response.body.message === 'Records Fetched Successfully.') {
          // Swal.fire({
          //   icon: 'success',
          //   title: '',
          //   text: 'Record Fetched Successfully.',
          // });
          setEducationInfo(response?.body?.result);
        } else if (response.body.message === 'No Records Found.') {
          setEducationInfo([]);
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
        {/* <CardSectionHeader>Education</CardSectionHeader> */}

        <FormHeaderComponents
          title="Education"
          isButtonNotRequired={true}
          workingFunction={() => setReadOnly(false)}
        />

        {educationInfo.length <= 0 && <InfoCard text={Message} />}

        {educationInfo.length > 0 && (
          <FormCard>
            <EducationView
              educationInfo={educationInfo}
              setEducationInfo={setEducationInfo}
              educationInfoEdit={educationInfoEdit}
              setEducationInfoEdit={setEducationInfoEdit}
              educationEdit={educationEdit}
              setEducationEdit={setEducationEdit}
              sectionRef={sectionRef}
            />
          </FormCard>
        )}

        <EducationForm
          getData={getData}
          edit={educationEdit}
          educationInfo={educationInfo}
          setEducationInfo={setEducationInfo}
          educationInfoEdit={educationInfoEdit}
          setEducationInfoEdit={setEducationInfoEdit}
          educationEdit={educationEdit}
          setEducationEdit={setEducationEdit}
          sectionRef={sectionRef}
        />
      </Stack>
    </ProfileRightLayout>
  );
};

const Education = () => {
  return (
    <DataProvider>
      <EducationChild />
    </DataProvider>
  );
};

export default withAuth(Education, 'user');
