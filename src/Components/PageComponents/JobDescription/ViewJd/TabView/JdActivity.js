import MainCard from '@/cardComponents/MainCard';
import { MyJdViewer } from '@/pageComponents/JobDescription/ViewJd';
import CustomNoRowsOverlay from '@/reUsableComponents/DataGridComponets/CustomNoRowsOverlay';
import { LoadingContext } from '@/reUsableComponents/LoadingComponents/LoadingContext';
import CandidateInterviewPanelUpdatePopup from '@/src/Components/Popup/CandidateInterviewPanelUpdatePopup';
import InterViewResultUpdatePopup from '@/src/Components/Popup/InterViewResultUpdatePopup';
import InviteCandidateAssessmentPopup from '@/src/Components/Popup/InviteCandidateAssessmentPopup';
import RejectCandidateJobOpeningPopup from '@/src/Components/Popup/RejectCandidateJobOpeningPopup';
import ResultViewPopup from '@/src/Components/Popup/ResultViewPopup';
import { setAlertPopup } from '@/store/alertSlice';
import {
  JdAndCandidateStatusApi,
  JdAndTaggedCandidateApi,
  SourcingSequenceApi,
} from '@/swagger_api/*';
import { formatContactNumber } from '@/utils/CommonFunctions/Functions';
import { callApi } from '@/utils/apirequest';
import {
  resultStatusEnum,
  roundsStatus,
  sourceSequenceEnum,
} from '@/utils/enum';
import renderCellExpand from '@/view/CellExpand';
import { CustomDataGridMasters } from '@/view/dgrid';
import {
  Avatar,
  Button,
  Chip,
  Grid,
  Link as MuiLink,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/system';
import NextLink from 'next/link';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
const StyledChip = styled(Chip)(
  ({ theme, backgroundColor, isSelected, border }) => ({
    display: 'flex',
    minHeight: 40,
    alignItems: 'center',
    justifyContent: 'center', // Align content to the right
    height: '100%',
    backgroundColor: isSelected ? theme.palette.primary.main : backgroundColor,
    color: isSelected ? '#fff' : theme.palette.primary.main,
    '&:hover': {
      backgroundColor: isSelected
        ? backgroundColor
        : theme.palette.primary.main,
      color: isSelected ? theme.palette.primary.main : '#fff',
    },
    mx: 2,

    border: '2px solid #DDDDDD !important',
    fontWeight: '700',
  })
);

const JdActivity = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { setLoading } = useContext(LoadingContext);
  const { jdData } = useContext(MyJdViewer);
  const acceptType = roundsStatus['Accept'];
  const rejectType = roundsStatus['Reject'];
  const [candidateList, setCandidateList] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isRejectPopupOpen, setIsRejectPopupOpen] = useState(false);
  const [isResultPopupOpen, setIsResultPopupOpen] = useState(false);
  const [popUpResultInfo, setPopUpResultInfo] = useState({});
  const [rejectValues, setRejectValues] = useState({});
  const [popUpInfo, setPopUpInfo] = useState({});
  const [selectedDegree, setSelectedDegree] = useState(null);
  const [sourceSequence, setSourceSequence] = useState([]);
  const sourcingSequenceApi = useMemo(() => new SourcingSequenceApi(), []);
  const jdAndCandidateStatusApi = useMemo(
    () => new JdAndCandidateStatusApi(),
    []
  );
  const jdAndTaggedCandidateApi = useMemo(
    () => new JdAndTaggedCandidateApi(),
    []
  );

  const getSourceSequenceByJdId = useCallback(async () => {
    try {
      const response =
        await sourcingSequenceApi.apiSourcingSequenceGetAllSourcingSequenceCountByJdIdJdIdGet(
          jdData?.id
        );
      if (response?.body?.result && response?.body?.result?.length > 0) {
        const trim =
          response?.body?.result?.map((res, index) => ({
            id: index + 1,
            ...res,
          })) || [];
        console.log('values', trim);

        setSourceSequence(trim);
      }
    } catch (err) {
      console.log(err);
    }
  }, [sourcingSequenceApi, jdData?.id]);

  useEffect(() => {
    getSourceSequenceByJdId();
  }, [getSourceSequenceByJdId]);

  const [
    isCandidateInterviewPanelPopupOpen,
    setCandidateIsInterviewPanelPopupOpen,
  ] = useState(false);
  const [
    candidateInterViewPanelPopupInfo,
    setCandidateInterViewPanelPopupInfo,
  ] = useState({});
  const [isInterviewUpdatePopupOpen, setIsInterviewUpdatePopupOpen] =
    useState(false);
  const [interviewUpdatePopupInfo, setInterviewUpdatePopupInfo] = useState({});

  const columns = [
    {
      field: 'slno',
      headerName: 'Sl no',
      maxWidth: 10,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      renderCell: renderCellExpand,
      sortable: false,
      filterable: false,
    },
    {
      field: 'fullName',
      headerName: 'Name',
      minWidth: 100,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      renderCell: renderCellExpand,
    },
    {
      field: 'email',
      headerName: 'Email',
      minWidth: 100,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      renderCell: renderCellExpand,
    },
    {
      field: 'contactNumber',
      headerName: 'Contact Number',
      minWidth: 100,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      renderCell: params => <span>{formatContactNumber(params.value)}</span>,
    },
    // {
    //   field: 'totalExperienceInYears',
    //   headerName: 'Experience',
    //   minWidth: 100,
    //   flex: 1,
    //   headerClassName: 'super-app-theme--header',
    //   headerAlign: 'left',
    //   align: 'left',
    //   renderCell: renderCellExpand,
    // },
    {
      field: 'slug',
      headerName: 'Slug',
      headerClassName: 'super-app-theme--header',
      flex: 1,
      renderCell: params => (
        <>
          <MuiLink
            sx={{
              maxWidth: '500px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              textDecoration: 'none',
              display: 'inline-block',
              verticalAlign: 'middle',
            }}
            style={{ textDecoration: 'none' }}
            component={NextLink}
            prefetch={false}
            href={params.row.slug ? `/aspirant/${params.row.slug}` : ''}
            target="_blank"
            rel="noopener noreferrer"
          >
            {params.row.slug}
          </MuiLink>
        </>
      ),
    },
    {
      field: 'remarks',
      headerName: 'Remarks',
      minWidth: 100,
      flex: 1,
      headerClassName: 'super-app-theme--header',
      headerAlign: 'left',
      align: 'left',
      renderCell: renderCellExpand,
    },

    {
      field: 'action',
      headerName: 'Actions',
      minWidth: 150,
      headerClassName: 'super-app-theme--header',
      flex: 1,
      renderCell: params => (
        <>
          {params.row.status !== resultStatusEnum['Passed'] &&
            params.row.status !== resultStatusEnum['Rejected'] && (
              <>
                {params.row?.sourcingSequenceId ==
                  sourceSequenceEnum['Schedule Assessment'] && (
                  <>
                    <Button
                      onClick={() => {
                        setIsPopupOpen(true);
                        setPopUpInfo(params.row);
                      }}
                    >
                      Invite
                    </Button>
                    <Button
                      onClick={() => {
                        setIsRejectPopupOpen(true);
                        setRejectValues(params.row);
                      }}
                    >
                      Reject
                    </Button>
                  </>
                )}
                {params.row?.sourcingSequenceId ===
                  sourceSequenceEnum['Update Assessment Result'] && (
                  <Button
                    onClick={() => {
                      updateResultsData(params.row);
                    }}
                  >
                    Update Results
                  </Button>
                )}
                {params.row?.sourcingSequenceId ===
                  sourceSequenceEnum['Schedule Interview'] && (
                  <>
                    <Button
                      onClick={() => {
                        setCandidateIsInterviewPanelPopupOpen(true);
                        setCandidateInterViewPanelPopupInfo(params.row);
                      }}
                    >
                      Schedule
                    </Button>
                    <Button
                      onClick={() => {
                        setIsRejectPopupOpen(true);
                        setRejectValues(params.row);
                      }}
                    >
                      Reject
                    </Button>
                  </>
                )}
                {params.row?.sourcingSequenceId ===
                  sourceSequenceEnum['Update Interview Result'] && (
                  <>
                    <Button
                      onClick={() => {
                        console.log('params.row', params.row);
                        setIsInterviewUpdatePopupOpen(true);
                        setInterviewUpdatePopupInfo(params.row);
                        console.log(
                          'interviewUpdatePopupInfo',
                          interviewUpdatePopupInfo
                        );
                      }}
                    >
                      Update Interview Results
                    </Button>
                  </>
                )}
                {(params.row?.sourcingSequenceId ===
                  sourceSequenceEnum['Offer roll out'] ||
                  params.row?.sourcingSequenceId ===
                    sourceSequenceEnum['Accept offer'] ||
                  params.row?.sourcingSequenceId ===
                    sourceSequenceEnum['Accept joining']) && (
                  <>
                    <Button
                      onClick={() => {
                        sweetAlertPopup(
                          'pass',
                          params.row,
                          params.row?.sourcingSequenceId
                        );
                      }}
                    >
                      Yes
                    </Button>
                    <Button
                      onClick={() => {
                        sweetAlertPopup(
                          'fail',
                          params.row,
                          params.row?.sourcingSequenceId
                        );
                      }}
                    >
                      No
                    </Button>
                  </>
                )}
              </>
            )}

          {(params.row.status === resultStatusEnum['Passed'] ||
            params.row.status === resultStatusEnum['Rejected']) && (
            <>
              {(params.row?.sourcingSequenceId ===
                sourceSequenceEnum['Update Assessment Result'] ||
                params.row?.sourcingSequenceId ===
                  sourceSequenceEnum['Update Interview Result']) && (
                <>
                  <CandidateStatus value={params.row.status} />
                </>
              )}

              {(params.row?.sourcingSequenceId ===
                sourceSequenceEnum['Schedule Assessment'] ||
                params.row?.sourcingSequenceId ===
                  sourceSequenceEnum['Schedule Interview']) && (
                <>
                  <CandidateStatus
                    dataProps={scheduleProps}
                    value={params.row.status}
                    text={
                      params.row.status === resultStatusEnum['Passed']
                        ? 'Scheduled'
                        : 'Rejected'
                    }
                  />
                </>
              )}
              {params.row?.sourcingSequenceId ===
                sourceSequenceEnum['Offer roll out'] && (
                <>
                  <CandidateStatus
                    value={params.row.status}
                    text={
                      params.row.status === resultStatusEnum['Passed']
                        ? 'Offer rolled out'
                        : 'Rejected'
                    }
                  />
                </>
              )}
              {params.row?.sourcingSequenceId ===
                sourceSequenceEnum['Accept offer'] && (
                <>
                  <CandidateStatus
                    value={params.row.status}
                    text={
                      params.row.status === resultStatusEnum['Passed']
                        ? 'Offer accepted'
                        : 'Rejected'
                    }
                  />
                </>
              )}
              {params.row?.sourcingSequenceId ===
                sourceSequenceEnum['Accept joining'] && (
                <>
                  <CandidateStatus
                    value={params.row.status}
                    text={
                      params.row.status === resultStatusEnum['Passed']
                        ? 'Joined'
                        : 'Rejected'
                    }
                  />
                </>
              )}
            </>
          )}
        </>
      ),
    },
  ];

  const getRequestList = useCallback(
    async value => {
      let opts = {
        jdId: jdData?.id,
      };
      try {
        const response =
          await jdAndCandidateStatusApi.apiJdAndCandidateStatusGetSequenceIdGet(
            value,
            opts
          );
        if (response.body.message === 'Records Fetched Successfully.') {
          const filteredArray = response.body.result.filter(
            item => item.jobDescriptionId === jdData.id
          );

          const trim = filteredArray?.map((res, index) => ({
            slno: index + 1,
            ...res?.candidate,
            ...res,
          }));
          console.log(trim);
          setCandidateList(trim);
        } else if (response.body.message === 'No Records Found.') {
          setCandidateList([]);
        }
      } catch (err) {
        console.log(err);
      }
    },
    [jdAndTaggedCandidateApi, jdData?.id]
  );

  useEffect(() => {
    console.log(selectedDegree);
    if (selectedDegree) {
      getRequestList(selectedDegree.id);
    }
  }, [getRequestList, selectedDegree]);

  const dataUpdatingFunction = useCallback(() => {
    if (selectedDegree) {
      getRequestList(selectedDegree.id);
      getSourceSequenceByJdId();
    }
  }, [getRequestList, getSourceSequenceByJdId, selectedDegree]);

  const handleSubmitInviteCandidateAssessmentPopup = values => {
    setLoading(true);
    console.log(values);
    const data = {
      isprod: process.env.NEXT_PUBLIC_IS_PROD === 'true',
      data: {
        cid: values.rowValues.candidateId,
        email: values.rowValues.candidate.email,
        c_nm: values.rowValues.candidate.fullName, //name should be replaced
        aid: values.formValues.aid.year,
        jd_id: values.rowValues.jobDescriptionId,
      },
    };
    callApi('AdminInviteCandidate', data)
      .then(response => {
        setLoading(false);
        console.log(response, 'response');

        const message =
          response.data.message.charAt(0).toUpperCase() +
          response.data.message.slice(1).toLowerCase();
        if (response.data.status === 500) {
          dispatch(
            setAlertPopup({ message: message, type: 'error', duration: 3000 })
          );
          setIsPopupOpen(false);
        } else if (
          response.data.status === 200 &&
          response.data.sent === true
        ) {
          updateStatus(values.rowValues);
          dispatch(
            setAlertPopup({ message: message, type: 'success', duration: 3000 })
          );
          setIsPopupOpen(false);
          // updateStatus(values.rowValues);
        } else {
          dispatch(
            setAlertPopup({ message: message, type: 'info', duration: 3000 })
          );
          setIsPopupOpen(false);
        }
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
        dispatch(
          setAlertPopup({
            message: 'Something went wrong Please try Again !',
            type: 'error',
            duration: 3000,
          })
        );
      });
  };
  const updateResultsData = async post => {
    setLoading(true);
    console.log(post);
    const data = {
      isprod: process.env.NEXT_PUBLIC_IS_PROD === 'true',
      data: {
        cid: post.candidateId,

        jd_id: post.jobDescriptionId,
      },
    };

    callApi('JdCandidateStatusUpdate', data)
      .then(response => {
        setLoading(false);
        console.log(response, 'response');

        setPopUpResultInfo({ rowValues: post, resultValues: response?.data });

        setIsResultPopupOpen(true);
        dataUpdatingFunction();
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
        dispatch(
          setAlertPopup({
            message: 'Something went wrong Please try Again !',
            type: 'error',
            duration: 3000,
          })
        );
      });
  };

  const updateStatus = async post => {
    console.log(post);
    const opts = { type: acceptType, id: post.id, remarks: '' };
    console.log(post.id);

    try {
      const response =
        await jdAndCandidateStatusApi.apiJdAndCandidateStatusUpdateCandidateSourcingSequencePut(
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
        console.log(response.body.message);
        dataUpdatingFunction();
      } else {
        dataUpdatingFunction();
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
  const sweetAlertPopup = async (type, post, status) => {
    let message = '';
    if (type === 'fail') {
      message = 'Are you sure you want to reject the candidate?';
    } else {
      switch (status) {
        case sourceSequenceEnum['Offer roll out']:
          message = 'Are you sure you want to roll out an offer?';
          break;
        case sourceSequenceEnum['Accept offer']:
          message = 'Are you sure the candidate has accepted the offer?';
          break;
        case sourceSequenceEnum['Accept joining']:
          message = 'Are you sure the candidate has joined?';
          break;
        default:
          message =
            type === 'fail'
              ? 'Are you sure you want to reject the candidate?'
              : '';
          break;
      }
    }

    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'blue',
        cancelButtonColor: 'grey',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        reverseButtons: true,
        allowOutsideClick: false,
      });

      if (result.isConfirmed) {
        if (type === 'pass') {
          updateStatus(post);
        } else if (type === 'fail') {
          setIsRejectPopupOpen(true);
          setRejectValues(post);
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        dispatch(
          setAlertPopup({
            message: 'You have reverted the  action',
            type: 'info',
            duration: 3000,
          })
        );
      }
    } catch (error) {
      console.log('error', error);
      dispatch(
        setAlertPopup({
          message: 'Something went wrong. Please try again!',
          type: 'error',
          duration: 3000,
        })
      );
    }
  };
  // const sweetAlertPopup = async (type, post, status) => {
  //   let message = '';
  //   if (type === 'fail') {
  //     message = 'Are you sure you want to reject the candidate?';
  //   } else {
  //     switch (status) {
  //       case sourceSequenceEnum['Offer roll out']:
  //         message = 'Are you sure you want to roll out an offer?';
  //         break;
  //       case sourceSequenceEnum['Accept offer']:
  //         message = 'Are you sure the candidate has accepted the offer?';
  //         break;
  //       case sourceSequenceEnum['Accept joining']:
  //         message = 'Are you sure the candidate has joined?';
  //         break;
  //       default:
  //         message =
  //           type === 'fail'
  //             ? 'Are you sure you want to reject the candidate?'
  //             : '';
  //         break;
  //     }
  //   }

  //   try {
  //     showConfirmationDialog(
  //       'Are you sure?',
  //       message,
  //       () => {
  //         if (type === 'pass') {
  //           updateStatus(post);
  //         } else if (type === 'fail') {
  //           setIsRejectPopupOpen(true);
  //           setRejectValues(post);
  //         }
  //       },
  //       () => {
  //         dispatch(
  //           setAlertPopup({
  //             message: 'You have reverted the action',
  //             type: 'info',
  //             duration: 3000,
  //           })
  //         );
  //       }
  //     );
  //   } catch (error) {
  //     console.log('error', error);
  //     dispatch(
  //       setAlertPopup({
  //         message: 'Something went wrong. Please try again!',
  //         type: 'error',
  //         duration: 3000,
  //       })
  //     );
  //   }
  // };

  const rejectReason = async post => {
    console.log(post);
    const opts = { type: rejectType, id: rejectValues.id, remarks: post };
    console.log(opts);
    if (rejectValues)
      try {
        const response =
          await jdAndCandidateStatusApi.apiJdAndCandidateStatusUpdateCandidateSourcingSequencePut(
            opts
          );
        if (response.body.result) {
          setIsPopupOpen(false);
          setIsRejectPopupOpen(false);
          dispatch(
            setAlertPopup({
              message: response.body.message,
              type: 'success',
              duration: 3000,
            })
          );
          console.log(response.body.message);
          dataUpdatingFunction();
          setRejectValues({});
        } else {
          dataUpdatingFunction();
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

  const passCandidate = async post => {
    console.log(post);
    const opts = { type: acceptType, id: post.rowValues.id, remarks: '' };

    try {
      const response =
        await jdAndCandidateStatusApi.apiJdAndCandidateStatusUpdateCandidateSourcingSequencePut(
          opts
        );
      if (response.body.result) {
        setIsResultPopupOpen(false);
        setPopUpResultInfo({});
        dispatch(
          setAlertPopup({
            message: response.body.message,
            type: 'success',
            duration: 3000,
          })
        );
        console.log(response.body.message);
        dataUpdatingFunction();
      } else {
        dataUpdatingFunction();
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
  const failCandidate = async post => {
    console.log(post);
    const opts = {
      type: rejectType,
      id: post.rowValues.id,
      remarks: 'Test failed',
    };
    if (rejectValues)
      try {
        const response =
          await jdAndCandidateStatusApi.apiJdAndCandidateStatusUpdateCandidateSourcingSequencePut(
            opts
          );
        if (response.body.result) {
          setIsResultPopupOpen(false);
          setPopUpResultInfo({});
          dispatch(
            setAlertPopup({
              message: response.body.message,
              type: 'success',
              duration: 3000,
            })
          );
          console.log(response.body.message);
          dataUpdatingFunction();
        } else {
          dataUpdatingFunction();
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
    <MainCard title="Candidates Status">
      <Grid container spacing={2}>
        {sourceSequence.map(item => (
          <Grid item xs={6} sm={4} md={4} key={item.id}>
            <StyledChip
              key={item.id}
              disabled={jdData?.isHold || [1, 3, 5, 6].includes(jdData.status)}
              label={
                <Stack direction="row" alignItems={'center'} spacing={2}>
                  <span
                    style={{ display: 'flex', flexDirection: 'row-reverse' }}
                  >
                    {item.name}
                  </span>
                  <Avatar sx={{ width: 24, height: 24 }}>{item.count}</Avatar>
                </Stack>
              }
              isSelected={
                selectedDegree?.id ? item?.id === selectedDegree?.id : false
              }
              fullWidth
              border={theme.palette.primary.main}
              backgroundColor={'#fff'}
              onClick={() => {
                setSelectedDegree(item);
                getSourceSequenceByJdId();
              }}
            />
          </Grid>
        ))}
      </Grid>

      <CustomDataGridMasters
        componentsProps={{
          NoRowsOverlay: () => (
            <CustomNoRowsOverlay
              title={`${
                !selectedDegree
                  ? `Please select the value to view details`
                  : `No Candidates found in ${selectedDegree?.name} status`
              }`}
            />
          ),
        }}
        data={{
          columns: columns,
          initialState: {
            columns: {
              columnVisibilityModel: {
                id: true,
              },
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            },
          },
          rows: candidateList,
        }}
        loading={false}
      />

      <InviteCandidateAssessmentPopup
        isDialogOpened={isPopupOpen}
        handleCloseDialog={() => setIsPopupOpen(false)}
        handleSubmitInviteCandidateAssessmentPopup={
          handleSubmitInviteCandidateAssessmentPopup
        }
        popUpInfo={popUpInfo}
        dataUpdatingFunction={dataUpdatingFunction}
      />
      <RejectCandidateJobOpeningPopup
        title="Reason for rejecting Jobs"
        isDialogOpened={isRejectPopupOpen}
        handleCloseDialog={() => setIsRejectPopupOpen(false)}
        rejectReason={rejectReason}
        dataUpdatingFunction={dataUpdatingFunction}
      />
      <ResultViewPopup
        title="Reason for rejecting Jobs"
        isDialogOpened={isResultPopupOpen}
        popUpInfo={popUpResultInfo}
        handleCloseDialog={() => {
          setIsResultPopupOpen(false);
          setPopUpResultInfo({});
        }}
        rejectReason={rejectReason}
        passCandidate={passCandidate}
        failCandidate={failCandidate}
        dataUpdatingFunction={dataUpdatingFunction}
      />
      <CandidateInterviewPanelUpdatePopup
        isDialogOpened={isCandidateInterviewPanelPopupOpen}
        handleCloseDialog={() => setCandidateIsInterviewPanelPopupOpen(false)}
        candidateInterViewPanelPopupInfo={candidateInterViewPanelPopupInfo}
        setCandidateInterViewPanelPopupInfo={
          setCandidateInterViewPanelPopupInfo
        }
        dataUpdatingFunction={dataUpdatingFunction}
      />

      <InterViewResultUpdatePopup
        isDialogOpened={isInterviewUpdatePopupOpen}
        handleCloseDialog={() => {
          setIsInterviewUpdatePopupOpen(false);
          setInterviewUpdatePopupInfo({});
        }}
        popUpInfo={interviewUpdatePopupInfo}
        k={'jjj'}
        dataUpdatingFunction={dataUpdatingFunction}
      />
    </MainCard>
  );
};

export default JdActivity;

const CandidateStatus = ({ value, text, dataProps }) => {
  const properties = useMemo(() => {
    const dataProps1 = {
      1: {
        textColor: '#006244',
        backgroundColor: '#CDFFF0',
        text: text || 'Passed',
      },
      2: {
        textColor: '#FF0000',
        backgroundColor: '#FFDCDC',
        text: text || 'Failed',
      },
      3: {
        textColor: '#ED5702',
        backgroundColor: 'rgba(237, 87, 2, 0.2)',
        text: text || 'In progress',
      },
      0: {
        textColor: '#1D1550',
        backgroundColor: '#E1DCFF',
        text: text || 'Yet to attend',
      },
      4: {
        textColor: '#6C4407',
        backgroundColor: '#F2E1C8',
        text: text || 'Processing',
      },
      ready: {
        textColor: '#1D1550',
        backgroundColor: '#E1DCFF',
        text: text || 'Ready',
      },
      delivered: {
        textColor: '#153A03',
        backgroundColor: '#D6F2C8',
        text: text || 'Delivered',
      },
    };

    return dataProps ? dataProps[value] : dataProps1[value];
  }, [value, dataProps, text]);

  return (
    <Typography
      align="center"
      sx={{
        color: properties.textColor,
        minWidth: 100,
        backgroundColor: properties.backgroundColor,
        border: `1px solid ${properties.textColor} `,
        pl: '12px',
        pr: '12px',
        pt: '2px',
        pb: '2px',
        fontWeight: 500,
      }}
      variant="h6"
    >
      {text || properties.text}
    </Typography>
  );
};

const scheduleProps = {
  1: { textColor: '#006244', backgroundColor: '#CDFFF0', text: 'Schedule' },
  2: { textColor: '#FF0000', backgroundColor: '#FFDCDC', text: 'Reject' },
};
