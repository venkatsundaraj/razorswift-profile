import ShadowButtonSubmit from '@/buttonComponents/ShadowButtonSubmit';
import SectionHeader from '@/headingComponents/ProfileText/SectionHeader';
import TabView from '@/pageComponents/JobDescription/ViewJd/TabView';
import { ButtonText } from '@/reUsableComponents/FormComponets';
import JdStatus from '@/reUsableComponents/Status/JdStatus';
import SwitchButton from '@/reUsableComponents/SwitchButton';
import RejectCandidateJobOpeningPopup from '@/src/Components/Popup/RejectCandidateJobOpeningPopup';
import RejectPopup from '@/src/Components/Popup/RejectPopup';
import { UrlPaths } from '@/src/data/UrlPaths';
import { setAlertPopup } from '@/store/alertSlice';
import { JobDescriptionApi } from '@/swagger_api/*';
import { showConfirmationDialog } from '@/utils/CommonFunctions/SwalFunctions';
import { AcceptanceType, AcceptedStatus } from '@/utils/enum';
import { useTheme } from '@emotion/react';
import { Container, Grid, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useDispatch } from 'react-redux';

export const MyJdViewer = createContext({});

const ViewJd = ({ role }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const UrlBase =
    role === 'Admin' ? `${UrlPaths.adminJd}` : `${UrlPaths.clientJd}`;
  const acceptance =
    role === 'Admin'
      ? AcceptanceType['Acceptance']
      : AcceptanceType['AcceptanceByClient'];
  const [isRejectPopupOpen, setIsRejectPopupOpen] = useState(false);
  const [isDeactivatePopupOpen, setDeactivatePopupOpen] = useState(false);
  const [jdData, setJdData] = useState(null);
  const [checked, setChecked] = useState(false);
  const jobDescriptionApi = useMemo(() => new JobDescriptionApi(), []);
  const fetchJobDescription = useCallback(async () => {
    try {
      const response =
        await jobDescriptionApi.apiJobDescriptionGetByGuidGuidGet(
          router.query.guId
        );
      const result = response.body.result;
      if (result) {
        console.log('result', result);
        setJdData(result);
        setChecked(result.isHold);
      }
    } catch (error) {
      console.log(error);
    }
  }, [router.query.guId, jobDescriptionApi]);

  useEffect(() => {
    if (router.query.guId) fetchJobDescription();
  }, [router.query.guId, jobDescriptionApi, fetchJobDescription]);

  const Accept = async () => {
    const body = {
      id: jdData?.id,
      acceptance: acceptance,
      status: AcceptedStatus['Accepted'],
    };
    const opts = {
      body: body,
    };
    console.log('body', body);
    await handleAction(
      opts,
      'Accept',
      'You want to accept the Jobs',
      'Jobs accepted Successfully'
    );
  };
  const Reject = async () => {
    setIsRejectPopupOpen(true);
  };
  const rejectReason = async value => {
    const body = {
      id: jdData?.id,
      acceptance: acceptance,
      status: AcceptedStatus['Rejected'],
      remarks: value,
    };
    const opts = {
      body: body,
    };
    console.log(opts);

    try {
      const response =
        await jobDescriptionApi.apiJobDescriptionUpdateJdStatusPost(opts);
      if (response.body.result) {
        fetchJobDescription();
        dispatch(
          setAlertPopup({
            message: 'Jobs rejected successfully',
            type: 'success',
            duration: 3000,
          })
        );
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
      console.log(error);
      dispatch(
        setAlertPopup({
          message: 'Something went wrong Please try Again !',
          type: 'error',
          duration: 3000,
        })
      );
    }
  };

  const Hold = async event => {
    const status = event.target.checked;
    const confirmDelete = async () => {
      try {
        const response =
          await jobDescriptionApi.apiJobDescriptionUpdateJdHoldStatusJobDescriptionIdStatusPost(
            jdData?.id,
            status
          );

        if (response.body.result) {
          fetchJobDescription();
          setChecked(status);
          dispatch(
            setAlertPopup({
              message: `Jobs ${status ? 'held' : 'unheld'} successfully.`,
              type: 'success',
              duration: 3000,
            })
          );
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
          message: `You have reverted the ${
            status ? 'hold' : 'un hold'
          } action`,
          type: 'info',
          duration: 3000,
        })
      );
    };

    showConfirmationDialog(
      'Are you sure?',
      `You want to ${status ? 'hold' : 'un hold'} the Jobs!`,
      confirmDelete,
      revertDelete
    );
  };

  const Complete = async () => {
    const body = {
      id: jdData?.id,
      acceptance: acceptance,
      status: AcceptedStatus['Closed'],
    };
    const opts = {
      body: body,
    };
    console.log('body', body);
    await handleAction(
      opts,
      'Close',
      'You want to close the Jobs!',
      'Jobs closed Successfully'
    );
  };
  const Deactivate = async () => {
    const body = {
      id: jdData?.id,
      acceptance: acceptance,
      status: AcceptedStatus['Deactivate'],
    };
    const opts = {
      body: body,
    };
    await handleAction(
      opts,
      'Deactivate',
      'You want to deactivate the Jobs!',
      'Jobs deactivated Successfully'
    );
  };
  const CreateRounds = async () => {
    router.push({
      pathname: `${UrlBase}view/interviewrounds`,
      query: { guId: router.query.guId },
    });
  };

  const handleAction = async (opts, action, message, statusMessage) => {
    const confirmDelete = async () => {
      try {
        const response =
          await jobDescriptionApi.apiJobDescriptionUpdateJdStatusPost(opts);
        if (response.body.result) {
          fetchJobDescription();
          dispatch(
            setAlertPopup({
              message: statusMessage,
              type: 'success',
              duration: 3000,
            })
          );
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
          message: `You have reverted the ${action} action`,
          type: 'info',
          duration: 3000,
        })
      );
    };

    showConfirmationDialog(
      'Are you sure?',
      message,
      confirmDelete,
      revertDelete
    );
  };
  return (
    <MyJdViewer.Provider
      value={{
        jdData,
        setJdData,
        role,
      }}
    >
      <Container maxWidth="xl" disableGutters>
        <Stack justifyContent={'flex-end'} direction={'row'}>
          <JdStatus
            value={jdData?.isHold ? 7 : jdData?.status || 'default'}
            borderRadius={'3px'}
          />
        </Stack>
        <Grid container justifyContent={'space-between'} alignItems={'center'}>
          <Grid item xs={12} sm={6}>
            <SectionHeader>{jdData?.title}</SectionHeader>
            <SectionHeader weight="400">{jdData?.client?.name}</SectionHeader>
            <Stack direction={'row'}>
              <SectionHeader weight="700">Source:</SectionHeader>
              <SectionHeader weight="400">
                {jdData?.acceptance === AcceptanceType['Acceptance']
                  ? 'Admin'
                  : 'Client'}
              </SectionHeader>
            </Stack>
          </Grid>
          {(jdData?.status === AcceptedStatus['Accepted'] ||
            jdData?.status === AcceptedStatus['Inprogress']) && (
            <Grid item xs={12} sm={6}>
              <SwitchButton
                checked={checked}
                workingFunctions={Hold}
                Right="Hold"
                Left="Unhold"
              />
            </Grid>
          )}
        </Grid>

        {(jdData?.status === AcceptedStatus['Open'] ||
          jdData?.status === null) &&
          (role === 'Admin'
            ? jdData?.acceptance === AcceptanceType['Acceptance']
            : jdData?.acceptance === AcceptanceType['AcceptanceByClient']) && (
            <Stack
              direction="row"
              spacing={2}
              sx={{ width: '100%', mb: 3 }}
              alignItems="flex-end"
              justifyContent="flex-end"
            >
              <CommonShadowButtonSubmit onClick={Accept} label="Accept" />
              <CommonShadowButtonSubmit onClick={Reject} label="Reject" />
            </Stack>
          )}

        {/* {(jdData?.status === AcceptedStatus['Open'] ||
          jdData?.status === null) && (
          <Stack
            direction="row"
            spacing={2}
            sx={{ width: '100%', mb: 3 }}
            alignItems="flex-end"
            justifyContent="flex-end"
          >
            <CommonShadowButtonSubmit onClick={Accept} label="Accept" />
            <CommonShadowButtonSubmit onClick={Reject} label="Reject" />
          </Stack>
        )} */}

        {jdData?.status !== AcceptedStatus['Rejected'] &&
          jdData?.status !== AcceptedStatus['Open'] &&
          jdData?.status !== null && (
            <Stack
              direction="row"
              spacing={2}
              sx={{ width: '100%', mb: 3 }}
              alignItems="flex-end"
              justifyContent={'flex-end'}
            >
              {/* {role === 'Admin' && (
                <CommonShadowButtonSubmit
                  disabled={[1, 3, 5, 6].includes(jdData.status) || jdData?.isHold}
                  onClick={() => {
                    router.push({
                      pathname: `${UrlBase}view/matchingprofile`,
                      query: { guId: router.query.guId },
                    });
                  }}
                  label={'Manual Matching profiles'}
                />
              )}
              {role === 'Admin' && (
                <CommonShadowButtonSubmit
                  disabled={[1, 3, 5, 6].includes(jdData.status) || jdData?.isHold}
                  onClick={() => {
                    router.push({
                      pathname: `${UrlBase}view/automatchingprofile`,
                      query: { guId: router.query.guId },
                    });
                  }}
                  label={'Auto Matching profiles'}
                />
              )} */}

              {
                <CommonShadowButtonSubmit
                  disabled={
                    [1, 3, 5, 6].includes(jdData?.status) || jdData?.isHold
                  }
                  onClick={() => {
                    router.push({
                      pathname: `${UrlBase}view/matchingprofile`,
                      query: { guId: router.query.guId },
                    });
                  }}
                  label={'Manual Matching Profiles'}
                />
              }
              {
                <CommonShadowButtonSubmit
                  disabled={
                    [1, 3, 5, 6].includes(jdData?.status) || jdData?.isHold
                  }
                  onClick={() => {
                    router.push({
                      pathname: `${UrlBase}view/tagjdassessment`,
                      query: { guId: router.query.guId },
                    });
                  }}
                  label={'Tag Jobs Assessment'}
                />
              }
              {
                <CommonShadowButtonSubmit
                  disabled={
                    [1, 3, 5, 6].includes(jdData?.status) || jdData?.isHold
                  }
                  onClick={() => {
                    router.push({
                      pathname: `${UrlBase}view/automatchingprofile`,
                      query: { guId: router.query.guId },
                    });
                  }}
                  label={'Auto Matching Profiles'}
                />
              }

              <CommonShadowButtonSubmit
                disabled={
                  [1, 3, 5, 6].includes(jdData?.status) || jdData?.isHold
                }
                onClick={() => CreateRounds()}
                label={'Interview Rounds'}
              />
              <CommonShadowButtonSubmit
                disabled={
                  [1, 3, 5, 6].includes(jdData?.status) || jdData?.isHold
                }
                onClick={() => setDeactivatePopupOpen(true)}
                label={'Deactivate'}
              />

              <CommonShadowButtonSubmit
                disabled={
                  [1, 3, 5, 6].includes(jdData?.status) || jdData?.isHold
                }
                onClick={() => Complete()}
                label={'Close'}
              />
            </Stack>
          )}

        <RejectCandidateJobOpeningPopup
          title="Reason for Rejecting Jd"
          placeholder="Enter reason for rejection"
          isDialogOpened={isRejectPopupOpen}
          handleCloseDialog={() => setIsRejectPopupOpen(false)}
          rejectReason={rejectReason}
        />
        <RejectPopup
          title="Reason for Deactivating"
          placeholder="Enter reason for Deactivating"
          isDialogOpened={isDeactivatePopupOpen}
          handleCloseDialog={() => setDeactivatePopupOpen(false)}
          rejectReason={Deactivate}
        />
        <Container>
          <TabView />
        </Container>
      </Container>
    </MyJdViewer.Provider>
  );
};

export default ViewJd;

const CommonShadowButtonSubmit = ({ label, onClick, ...props }) => {
  const theme = useTheme();
  return (
    <ShadowButtonSubmit
      height="50px"
      width="150px"
      minwidth="150px"
      maxwidth="250px"
      backgroundcolor={theme.palette.primary.main}
      type="button"
      disableRipple // Disable ripple effect on button click
      // Disable button interaction
      onClick={onClick}
      {...props}
    >
      <ButtonText color="#fff">{label}</ButtonText>
    </ShadowButtonSubmit>
  );
};
