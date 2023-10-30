import FormCard from '@/cardComponents/FormCard';
import InfoCard from '@/cardComponents/InfoCard';
import useUserSummary from '@/customHooks/CutsomApiHooks/useuserSummary';
import ProfileRightLayout from '@/layouts/ProfileRightLayout';
import ProfileInfo from '@/pageComponents/Profile/Common/ProfileInfo';
import CertificationForm from '@/pageComponents/Profile/Edit/Certification/CertificationForm';
import CertificationView from '@/pageComponents/Profile/Edit/Certification/CertificationView';
import {
  DataContext,
  DataProvider,
} from '@/reUsableComponents/DataContext/DataContext';
import { SlugContext } from '@/reUsableComponents/DataContext/SlugContext';
import FormHeaderComponents from '@/reUsableComponents/HeaderComponents/FormHeaderComponents';
import withAuth from '@/src/AuthWrapper/AuthWrapper';
import { CandidateCertificateApi } from '@/swagger_api/api/CandidateCertificateApi';
import { Stack } from '@mui/material';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';

const CertificationChild = () => {
  const { userDetails, candidateId, routers, summary } = useUserSummary();

  const [certificationInfo, setCertificationInfo] = useState([]);
  const [certificationInfoEdit, setCertificationInfoEdit] = useState({});
  const [certificationEdit, setCertificationEdit] = useState('1');

  const sectionRef = useRef(null);
  const context1 = useContext(SlugContext);
  const context2 = useContext(DataContext);
  console.log(context2, 'edit');
  const certificateMessage = context2
    ? context2?.messages?.edit.certifications
    : context1?.messages?.edit?.certifications;

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
    if (certificationEdit === '3') {
      yourFunctionToExecuteAfterStateUpdate();
    }
  }, [certificationEdit, yourFunctionToExecuteAfterStateUpdate]);

  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    const candidateCertificateApi = new CandidateCertificateApi();
    await candidateCertificateApi
      .apiCandidateCertificateGetAllCertificatesBycandidateIdGet(candidateId)
      .then(async response => {
        if (response.body.message === 'Records Fetched Successfully.') {
          setCertificationInfo(response?.body?.result);
        } else if (response.body.message === 'No Records Found.') {
          setCertificationInfo([]);
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
        {/* <CardSectionHeader>Certification</CardSectionHeader> */}
        <FormHeaderComponents
          title="Certifications"
          isButtonNotRequired={true}
          workingFunction={() => setReadOnly(false)}
        />
        {certificationInfo.length <= 0 && (
          <InfoCard text={certificateMessage} />
        )}
        {certificationInfo.length > 0 && (
          <FormCard>
            <CertificationView
              certificationInfo={certificationInfo}
              setCertificationInfo={setCertificationInfo}
              certificationInfoEdit={certificationInfoEdit}
              setCertificationInfoEdit={setCertificationInfoEdit}
              certificationEdit={certificationEdit}
              setCertificationEdit={setCertificationEdit}
              sectionRef={sectionRef}
              yourFunctionToExecuteAfterStateUpdate={
                yourFunctionToExecuteAfterStateUpdate
              }
            />
          </FormCard>
        )}

        <CertificationForm
          getData={getData}
          edit={certificationEdit}
          certificationInfo={certificationInfo}
          setCertificationInfo={setCertificationInfo}
          certificationInfoEdit={certificationInfoEdit}
          setCertificationInfoEdit={setCertificationInfoEdit}
          certificationEdit={certificationEdit}
          setCertificationEdit={setCertificationEdit}
          sectionRef={sectionRef}
        />
      </Stack>
    </ProfileRightLayout>
  );
};

const Certification = () => {
  return (
    <DataProvider>
      <CertificationChild />
    </DataProvider>
  );
};

export default withAuth(Certification, 'user');
