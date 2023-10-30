import ShadowButtonSubmit from '@/buttonComponents/ShadowButtonSubmit';
import TitleBackButton from '@/buttonComponents/TitleBackButton';
import SectionHeader from '@/headingComponents/ProfileText/SectionHeader';
import RejectCandidateJobOpeningPopup from '@/src/Components/Popup/RejectCandidateJobOpeningPopup';
import { setAlertPopup } from '@/store/alertSlice';
import { JdAndTaggedCandidateApi, JobDescriptionApi } from '@/swagger_api/*';
import { showConfirmationDialog } from '@/utils/CommonFunctions/SwalFunctions';
import { localStorageUtil } from '@/utils/CommonFunctions/localStorageUtil';
import { ClientAcceptedStatus } from '@/utils/enum';
import { useTheme } from '@emotion/react';
import { Container, Stack, Typography, styled } from '@mui/material';
import { useRouter } from 'next/router';
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';
import TabViewJo from './TabViewJo';

const ButtonText = styled(Typography)(({ theme }) => ({
  textTransform: 'none',
  fontSize: '16px',
  fontWeight: '600',
  textAlign: 'center',
  lineHeight: '19.2px',
  [theme.breakpoints.down('md')]: {
    fontSize: '14px',
    lineHeight: '16.8px',
  },
}));

export const MyJoViewer = createContext({});

const ViewJo = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const theme = useTheme();
  const [accepted, setAccepted] = useState(false);
  const [jdData, setJdData] = useState(null);
  const [jdAndTaggedCandidateData, setJdAndTaggedCandidateData] =
    useState(null);
  const userDetails = localStorageUtil.getItem('userDetails');

  const jobDescriptionApi = useMemo(() => new JobDescriptionApi(), []);
  const jdAndTaggedCandidateApi = useMemo(
    () => new JdAndTaggedCandidateApi(),
    []
  );
  const [isRejectPopupOpen, setIsRejectPopupOpen] = useState(false);

  const fetchJobDescription = useCallback(
    async guid => {
      try {
        const response =
          await jobDescriptionApi.apiJobDescriptionGetByGuidGuidGet(guid);
        if (response.body.message === 'Record Fetched Successfully.') {
          return response.body.result;
        }
      } catch (error) {
        console.log(error);
      }
      return null;
    },
    [jobDescriptionApi]
  );
  const fetchJdAndTaggedCandidate = useCallback(
    async id => {
      try {
        const response =
          await jdAndTaggedCandidateApi.apiJdAndTaggedCandidateIdGet(id);
        if (response.body.message === 'Record Fetched Successfully.') {
          return response.body.result;
        }
      } catch (error) {
        console.log(error);
      }
      return null;
    },
    [jdAndTaggedCandidateApi]
  );

  const EditData = useCallback(async () => {
    const result = await fetchJobDescription(router.query.guId);
    const result2 = await fetchJdAndTaggedCandidate(router.query.id);
    console.log('result', result);
    if (result) setJdData(result);
    if (result2) setJdAndTaggedCandidateData(result2);
  }, [fetchJobDescription, router, fetchJdAndTaggedCandidate]);

  useEffect(() => {
    if (router.query.id) EditData();
  }, [router.query.id, jdAndTaggedCandidateApi, EditData]);

  const Accept = async () => {
    const opts = { isSelfResponded: true };
    console.log(
      router.query.id,
      jdAndTaggedCandidateData?.jobDescription?.clientId,
      opts
    );
    const confirmDelete = async () => {
      try {
        const response =
          await jdAndTaggedCandidateApi.apiJdAndTaggedCandidateUpdateCandidateAcceptedStatusIdClientIdPost(
            router.query.id,
            jdAndTaggedCandidateData?.jobDescription?.clientId,
            opts
          );
        if (response.body.result) {
          EditData();
          dispatch(
            setAlertPopup({
              message: 'Job opening accepted successfully',
              type: 'success',
              duration: 3000,
            })
          );
          // router.push({
          //   pathname: `/jobopenings`,
          // });
        } else {
          dispatch(
            setAlertPopup({
              message: response.body.message,
              type: 'error',
              duration: 3000,
            })
          );
        }
      } catch (error) {
        dispatch(
          setAlertPopup({
            message: 'Something went wrong Please try again!',
            type: 'error',
            duration: 3000,
          })
        );
      }
    };

    const revertDelete = () => {
      dispatch(
        setAlertPopup({
          message: 'You have reverted the action',
          type: 'info',
          duration: 3000,
        })
      );
    };

    showConfirmationDialog(
      'Are you sure?',
      'You want to accept this job opening!',
      confirmDelete,
      revertDelete
    );
  };
  const Reject = async () => {
    setIsRejectPopupOpen(true);
  };
  const rejectReason = async value => {
    console.log(jdData);
    const opts = {
      isSelfResponded: true,
      // clientId: jdData?.clientId, //not taking
      remarks: value,
    };
    console.log(opts);

    try {
      const response =
        await jdAndTaggedCandidateApi.apiJdAndTaggedCandidateUpdateCandidateRejectedStatusIdPost(
          router.query.id,
          opts
        );
      if (response.body.result) {
        EditData();

        dispatch(
          setAlertPopup({
            message: 'Job opening rejected successfully',

            type: 'success',
            duration: 3000,
          })
        );
        router.push({
          pathname: `/jobopenings`,
        });
        setIsRejectPopupOpen(false);
      } else {
        dispatch(
          setAlertPopup({
            message: response.body.message,
            type: 'error',
            duration: 3000,
          })
        );
      }
    } catch (error) {
      dispatch(
        setAlertPopup({
          message: 'Something went wrong Please try Again !',
          type: 'error',
          duration: 3000,
        })
      );
    }
  };

  return (
    <MyJoViewer.Provider
      value={{
        jdData,
        setJdData,
      }}
    >
      <TitleBackButton
        title={jdAndTaggedCandidateData?.jobDescription?.client?.name}
        onClick={() => router.back()}
      />
      <Container maxWidth="lg" disableGutters>
        <SectionHeader>
          {jdAndTaggedCandidateData?.jobDescription?.title}
        </SectionHeader>
        {(jdAndTaggedCandidateData?.status ===
          ClientAcceptedStatus['YetToRespond'] ||
          jdAndTaggedCandidateData?.status === null) && (
          <Stack
            direction="row"
            spacing={2}
            sx={{ width: '100%', mb: 3 }}
            alignItems="flex-end"
            justifyContent={'flex-end'}
          >
            <ShadowButtonSubmit
              height="50px"
              width="150px"
              minwidth="250px"
              maxwidth="250px"
              backgroundcolor={theme.palette.primary.main}
              type="button"
              onClick={() => Accept()}
            >
              <ButtonText color="#fff">Accept</ButtonText>
            </ShadowButtonSubmit>
            <ShadowButtonSubmit
              height="50px"
              width="150px"
              minwidth="250px"
              maxwidth="350px"
              backgroundcolor={theme.palette.primary.main}
              type="button"
              onClick={() => Reject()}
            >
              <ButtonText color="#fff">Reject</ButtonText>
            </ShadowButtonSubmit>
          </Stack>
        )}

        <RejectCandidateJobOpeningPopup
          title="Reason for rejecting Job Opening"
          isDialogOpened={isRejectPopupOpen}
          handleCloseDialog={() => setIsRejectPopupOpen(false)}
          rejectReason={rejectReason}
        />
        <Container>
          <TabViewJo
            accepted={
              jdAndTaggedCandidateData?.status !==
                ClientAcceptedStatus['YetToRespond'] &&
              jdAndTaggedCandidateData?.status !== null
            }
          />
        </Container>
      </Container>
    </MyJoViewer.Provider>
  );
};

export default ViewJo;
