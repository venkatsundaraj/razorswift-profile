import TextfieldWrapper from '@/formComponents/FormsUI/Textfield';
import { otherPropsRequired } from '@/reUsableComponents/FormComponents';
import CommonRejectPopup from '@/src/Components/Popup/CommonRejectPopup';
import { setAlertPopup } from '@/store/alertSlice';
import {
  JdClientInterviewApi,
  JdClientInterviewRoundsApi,
  JdInterviewRoundApi,
  JdInterviewRoundsPanelApi,
} from '@/swagger_api/*';
import { formatDate } from '@/utils/CommonFunctions/DateRelatedFunction';
import { useTheme } from '@emotion/react';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';

import { InterviewStatus } from '@/utils/enum';
import {
  Box,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Form, Formik } from 'formik';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { BootstrapDialog, BootstrapDialogTitle } from './PoupComponents';
function areAllStatusNotZero(roundsData) {
  console.log('areAllStatusNotZero', roundsData.jdClientInterviewRounds);
  return roundsData.jdClientInterviewRounds.every(round => round.status === 0);
}

const InterViewResultUpdatePopup = ({
  isDialogOpened,
  handleCloseDialog,
  popUpInfo,
  k,
  dataUpdatingFunction,
}) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [assessmentNames, setAssessmentNames] = useState([]);
  console.log('sks', popUpInfo, k);
  const resultValues = popUpInfo?.resultValues;
  const jdInterviewRoundsPanelApi = useMemo(
    () => new JdInterviewRoundsPanelApi(),
    []
  );
  const jdClientInterviewApi = useMemo(() => new JdClientInterviewApi(), []);
  const jdInterviewRoundApi = useMemo(() => new JdInterviewRoundApi(), []);
  const jdClientInterviewRoundsApi = useMemo(
    () => new JdClientInterviewRoundsApi(),
    []
  );
  const [popupConfig, setPopupConfig] = useState({
    isOpen: false,

    // ... any other default props
  });
  const [roundsData, setRoundsData] = useState({});
  console.log('popUpInfo', popUpInfo);

  const handleClose = (event, reason) => {
    if (reason && reason === 'backdropClick') return;

    handleCloseDialog();
  };

  const clientInterviewPanel = useCallback(
    async info => {
      try {
        const response =
          await jdClientInterviewApi.apiJdClientInterviewGetUpdatedInterviewDetailsByIdJobDescriptionIdCandidateIdGet(
            info.jobDescriptionId,
            info.candidateId
          );
        console.log(
          'apiJdClientInterviewGetJdClientInteviewByIdJobDescriptionIdCandidateIdGet',
          response
        );
        if (response?.body?.result && response?.body?.result.length > 0) {
          return response?.body?.result;
        }
      } catch (error) {
        console.log(error);
      }
      return null;
    },
    [jdClientInterviewApi]
  );

  const EditData = useCallback(async () => {
    if (popUpInfo?.id) {
      const result = await clientInterviewPanel(popUpInfo);

      if (result) {
        setRoundsData(result[0]);
        console.log('result', result);
      }
    }
  }, [clientInterviewPanel, popUpInfo]);
  useEffect(() => {
    if (popUpInfo) EditData();
  }, [popUpInfo, EditData]);

  const passRound = async (post, remarks) => {
    console.log(post);
    const opts = {
      remarks: remarks,
    };
    console.log(opts);

    try {
      const response =
        await jdClientInterviewRoundsApi.apiJdClientInterviewRoundsUpdateInterviewPassStatusRoundIdPost(
          post.id,
          opts
        );
      if (response.body.result) {
        dataUpdatingFunction();
        dispatch(
          setAlertPopup({
            message: 'Interview status updated successfully',
            type: 'success',
            duration: 3000,
          })
        );
        console.log(response.body.message);
        EditData();
      } else {
        EditData();
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
  const failInterview = async (post, remarks) => {
    console.log(post);
    console.log(roundsData?.jdAndCandidateStatusId);
    const opts = {
      remarks: remarks,
      interviewStatus: InterviewStatus['Fail'],
    };
    console.log(post, opts);
    try {
      const response =
        await jdClientInterviewRoundsApi.apiJdClientInterviewRoundsUpdateInterviewFailedStatusRoundIdCandidateStatusIdPost(
          post.id,
          popUpInfo.id,
          opts
        );
      if (response.body.result) {
        dataUpdatingFunction();
        dispatch(
          setAlertPopup({
            message: 'Interview status updated successfully',
            type: 'success',
            duration: 3000,
          })
        );
        console.log(response.body.message);
        EditData();
      } else {
        EditData();
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
  const completeRound = async post => {
    console.log(post);
    console.log(roundsData?.id, 'id', roundsData?.jdAndCandidateStatusId);
    console.log(popUpInfo?.id, 'candiadtestatusid');
    //id interview id
    //candidate ststus id
    try {
      const response =
        await jdClientInterviewApi.apiJdClientInterviewUpdateInterviewClearedStatusIdCandidateStatusIdPost(
          roundsData?.id,
          popUpInfo?.id
        );
      if (response.body.result) {
        dispatch(
          setAlertPopup({
            message: response.body.message,
            type: 'success',
            duration: 3000,
          })
        );
        dataUpdatingFunction();
        EditData();
        handleCloseDialog();
        console.log(response.body.message);
      } else {
        EditData();
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
  const RejectRound = async post => {
    console.log('completeRound', completeRound);
    console.log(post, 'post');
    console.log(roundsData?.id, 'id', roundsData?.jdAndCandidateStatusId);
    console.log(popUpInfo?.id, 'candiadtestatusid');
    const opts = {
      remarks: post.reason,
    };
    try {
      const response =
        await jdClientInterviewApi.apiJdClientInterviewUpdateInterviewRejectedStatusIdCandidateStatusIdPost(
          roundsData?.id,
          popUpInfo?.id,
          opts
        );
      if (response.body.result) {
        dispatch(
          setAlertPopup({
            message: response.body.message,
            type: 'success',
            duration: 3000,
          })
        );
        dataUpdatingFunction();
        EditData();
        handleCloseDialog();
        console.log(response.body.message);
      } else {
        EditData();
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
  const handleSubmit = (values, remarks, action) => {
    console.log(values, remarks, action);
    if (action === 'pass') {
      passRound(values, remarks);
    } else if (action === 'fail') {
      failInterview(values, remarks);
    }
  };

  return (
    <BootstrapDialog
      disableAutoFocus
      disableRestoreFocus
      disableEnforceFocus
      onClose={(event, reason) => {
        if (reason !== 'backdropClick') {
          handleClose(event, reason);
        }
      }}
      aria-labelledby="leave-popup"
      open={isDialogOpened}
      fullWidth
      maxWidth="md"
      PaperProps={{
        style: {
          borderRadius: 0,
        },
      }}
    >
      <BootstrapDialogTitle
        id="leave-popup"
        sx={{ p: '13px 17px', color: 'black' }}
        onClose={() => {
          handleClose();
        }}
      >
        <Typography
          variant="menutitle"
          align="center"
          sx={{ fontSize: '16px', textAlign: 'center', color: 'black' }}
        >
          Update Interview Round Result
        </Typography>
      </BootstrapDialogTitle>

      {roundsData?.jdClientInterviewRounds &&
      roundsData?.jdClientInterviewRounds?.length > 0 ? (
        <>
          <DialogContent
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
            <Typography variant="body1" color="initial"></Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Sl no</TableCell>
                    <TableCell>Round Name</TableCell>
                    <TableCell>Date of completion</TableCell>
                    <TableCell>Remarks</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {console.log(
                    roundsData?.jdClientInterviewRounds,
                    ' roundsData?.jdClientInterviewRounds'
                  )}
                  {roundsData?.jdClientInterviewRounds &&
                    roundsData?.jdClientInterviewRounds.map((values, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{values.roundName}</TableCell>
                        <TableCell>
                          {formatDate(values.date, 'datetime')}
                        </TableCell>
                        <TableCell>{values.remarks}</TableCell>
                        <RemarksCell
                          values={values}
                          handleSubmit={handleSubmit}
                          failInterview={failInterview}
                        />
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
          <DialogActions
            sx={{
              justifyContent: 'center',
            }}
          >
            <Stack alignSelf="flex-end" direction="row" spacing={2}>
              <Button
                sx={{
                  backgroundColor: '#057602',
                  color: 'white',

                  borderRadius: 10,
                  pl: 3,
                  pr: 3,
                  '&:hover': {
                    backgroundColor: '#057602',
                  },
                }}
                disabled={roundsData?.jdClientInterviewRounds.some(
                  interview => interview.status === 2
                )}
                variant="contained"
                onClick={() => completeRound(popUpInfo)}
              >
                Shortlisted
              </Button>
              <Button
                sx={{
                  backgroundColor: '#ff0000',
                  color: 'white',

                  borderRadius: 10,
                  pl: 3,
                  pr: 3,
                  '&:hover': {
                    backgroundColor: '#ff0000',
                  },
                }}
                // disabled={areAllStatusNotZero(roundsData)} when any one rounds status is update disable it
                disabled={roundsData?.jdClientInterviewRounds.some(
                  interview => interview.status === 2
                )}
                variant="contained"
                onClick={
                  () => setPopupConfig({ ...popUpInfo, isOpen: true })
                  // completeRound(popUpInfo, InterviewStatus['Fail'])
                }
              >
                Reject
              </Button>
            </Stack>
          </DialogActions>
          <CommonRejectPopup
            title="Reason for rejecting a candidate"
            placeholder="Enter reason for rejecting"
            isDialogOpened={popupConfig.isOpen}
            handleCloseDialog={() => setPopupConfig({ isOpen: false })}
            rejectReason={RejectRound}
            popupConfig={popupConfig}
          />
        </>
      ) : (
        <Typography variant="body1" color="initial">
          No Interview Rounds
        </Typography>
      )}
    </BootstrapDialog>
  );
};

export default InterViewResultUpdatePopup;
const validationSchema = Yup.object().shape({
  remarks: Yup.string().required('Reason is required.'),
});

const RemarksCell = ({ values, passRound, failInterview, handleSubmit }) => {
  const [editMode, setEditMode] = useState(false);

  const handleEditClick = () => {
    setEditMode(true);
  };

  // const handleSubmit = formikValues => {
  //   passRound({ ...values, remarks: formikValues.remarks });
  //   setEditMode(false);
  // };
  const handleFormSubmit = formikValues => {
    handleSubmit(values, formikValues.remarks, formikValues.action);
    setEditMode(false);
  };

  return (
    <TableCell>
      {editMode ? (
        <Formik
          initialValues={{
            remarks: values.remarks || '',
            action: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleFormSubmit}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            isSubmitting,
            touched,
            values,
          }) => (
            <Form>
              <Stack direction="row" justifyContent={'flex-end'}>
                <IconButton
                  aria-label="close"
                  onClick={() => setEditMode(false)}
                >
                  <CloseIcon />
                </IconButton>
              </Stack>
              <TextfieldWrapper
                name="remarks"
                textLabel="Remarks"
                multiline
                rows={4}
                otherProps={otherPropsRequired}
              />

              <Stack direction="row" spacing={2} mt={1}>
                <Button
                  type="submit"
                  sx={{
                    backgroundColor: '#057602',
                    color: 'white',
                    borderRadius: 10,
                    pl: 3,
                    pr: 3,
                    '&:hover': {
                      backgroundColor: '#057602',
                    },
                  }}
                  variant="contained"
                  onClick={() => {
                    setFieldValue('action', 'pass');
                    handleSubmit(values, '', values.action);
                  }}
                >
                  Pass
                </Button>
                <Button
                  // type="submit"
                  sx={{
                    backgroundColor: '#ff0000',
                    color: 'white',
                    borderRadius: 10,
                    pl: 3,
                    pr: 3,
                    '&:hover': {
                      backgroundColor: '#ff0000',
                    },
                  }}
                  variant="contained"
                  onClick={() => {
                    if (values.remarks)
                      handleSubmit(values, '', setFieldValue('action', 'fail'));
                  }}
                >
                  Fail
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      ) : (
        <Box>
          {values.status === 0 && (
            <Button
              size="small"
              sx={{ margin: 0, padding: 0 }}
              onClick={handleEditClick}
            >
              Update Status
            </Button>
          )}
          {values.status === 1 && <DoneIcon sx={{ color: '#057602' }} />}
          {values.status === 2 && <CloseIcon sx={{ color: '#ff0000' }} />}
        </Box>
      )}
    </TableCell>
  );
};
