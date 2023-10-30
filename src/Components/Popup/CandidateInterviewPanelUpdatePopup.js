import SelectWrapper from '@/formComponents/FormsUI/Select';
import TextfieldWrapper from '@/formComponents/FormsUI/Textfield';
import { otherProps } from '@/pageComponents/Profile/Common/Properties/Properties';
import textLabel from '@/src/Components/LabelComponents/TextLabel';
import { modeTypes } from '@/src/data/Enum';
import { setAlertPopup } from '@/store/alertSlice';
import DoneIcon from '@mui/icons-material/Done';
// import { alpha, styled } from '@mui/material/styles';
import ShadowButtonSubmit from '@/buttonComponents/ShadowButtonSubmit';
import { otherPropsRequired } from '@/reUsableComponents/FormComponents';
import { ButtonText } from '@/reUsableComponents/FormComponets';
import Legend from '@/reUsableComponents/Legend';
import { LoadingContext } from '@/reUsableComponents/LoadingComponents/LoadingContext';
import MuiDateTimePicker from '@/src/Components/MuiDateTimePicker';
import { legendItems } from '@/src/data/app.data';
import {
  JdClientInterviewApi,
  JdClientInterviewRoundsApi,
  JdInterviewRoundApi,
  JdInterviewRoundsPanelApi,
} from '@/swagger_api/*';
import { getFormTypes } from '@/utils/CommonFunctions/EnumFunctions';
import {
  checkAndSet,
  reverseCheckAndSet,
} from '@/utils/CommonFunctions/Functions';
import { AddCircleOutlineOutlined, Delete } from '@mui/icons-material';
import AddTaskIcon from '@mui/icons-material/AddTask';
import ScheduleIcon from '@mui/icons-material/Schedule';
import {
  Box,
  Chip,
  Container,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/system';
import { FieldArray, Form, Formik } from 'formik';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import { BootstrapDialog, BootstrapDialogTitle } from './PoupComponents';

const compareAndGetMatchedObject = (obj1, obj2) =>
  obj2.find(obj => obj.id === obj1.id) || null;

const StyledChip = styled(Chip)(
  ({
    theme,
    backgroundColor,
    isSelected,
    border,
    selectedBackgroundColor,
  }) => ({
    display: 'flex',
    minHeight: 40,
    alignItems: 'center',
    justifyContent: 'center', // Align content to the right
    height: '100%',
    backgroundColor: isSelected
      ? selectedBackgroundColor || theme.palette.primary.main
      : backgroundColor,
    color: isSelected
      ? '#fff'
      : selectedBackgroundColor || theme.palette.primary.main,
    '&:hover': {
      backgroundColor: isSelected
        ? backgroundColor
        : selectedBackgroundColor || theme.palette.primary.main,
      color: isSelected
        ? selectedBackgroundColor || theme.palette.primary.main
        : '#fff',
    },
    mx: 2,
    width: '100%',
    // 'maxWidth': 200,
    minWidth: 200,

    border: '2px solid #DDDDDD !important',
    fontWeight: '700',
  })
);

const INITIAL_FORM_STATE = {
  rounds: [
    {
      roundName: '',
      date: '',
      duration: '',
      mode: 'Offline',
      link: '',
      panels: [{ name: '', email: '' }],
    },
  ],
};
const validationSchema = Yup.object().shape({
  rounds: Yup.array().of(
    Yup.object().shape({
      roundName: Yup.string().required('Name is required'),
      date: Yup.date(),
      duration: Yup.string()
        .matches(/^\d+$/, 'Duration must be a positive integer')
        .when(['date'], {
          is: date => date,
          then: Yup.string().required('Duration is required'),
          otherwise: Yup.string(),
        }),

      mode: Yup.string().when(['date'], {
        is: date => date,
        then: Yup.string().required('Mode is required'),
        otherwise: Yup.string(),
      }),
      link: Yup.string().when(['date'], {
        is: date => date,
        then: Yup.string().required('Location is required'),
        otherwise: Yup.string(),
      }),
      panels: Yup.array().of(
        Yup.object().shape({
          name: Yup.string().required('Name is required'),
          email: Yup.string().required('Email is required'),
        })
      ),
    })
  ),
});
const validationSchema2 = Yup.object().shape({
  roundName: Yup.string().required('Name is required'),
  date: Yup.date(),
  duration: Yup.string()
    .matches(/^\d+$/, 'Duration must be a positive integer')
    .when(['date'], {
      is: date => date,
      then: Yup.string().required('Duration is required'),
      otherwise: Yup.string(),
    }),
  mode: Yup.string().when(['date'], {
    is: date => date,
    then: Yup.string().required('Mode is required'),
    otherwise: Yup.string(),
  }),
  link: Yup.string().when(['date'], {
    is: date => date,
    then: Yup.string().required('Location is required'),
    otherwise: Yup.string(),
  }),
  panels: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('Name is required'),
      email: Yup.string().required('Email is required'),
    })
  ),
});

const CandidateInterviewPanelUpdatePopup = ({
  isDialogOpened,
  handleCloseDialog,
  candidateInterViewPanelPopupInfo,
  setCandidateInterViewPanelPopupInfo,
  dataUpdatingFunction,
}) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [count, setCount] = useState(1);
  const [formView, setFormView] = useState(false);
  const { loading, setLoading } = useContext(LoadingContext);
  const [clientInterviewInfo, setClientInterViewInfo] = useState([]);
  const [FormStatus, setFormStatus] = useState('1');
  const [clientInterviewRounds, setClientInterviewRounds] = useState([]);
  const isAddingViewing = getFormTypes('Add_View') === FormStatus;
  const isEditing = getFormTypes('Edit_Form') === FormStatus;
  const isAdding = getFormTypes('Add_Form') === FormStatus;
  const [jdInfoInitialValues, setJdInfoInitialValues] =
    useState(INITIAL_FORM_STATE);
  const [roundInfoInitialValues, setRoundInfoInitialValues] = useState({});

  const jdInterviewRoundsPanelApi = useMemo(
    () => new JdInterviewRoundsPanelApi(),
    []
  );
  const jdClientInterviewApi = useMemo(() => new JdClientInterviewApi(), []);
  const jdClientInterviewRoundsApi = useMemo(
    () => new JdClientInterviewRoundsApi(),
    []
  );

  const jdInterviewRoundApi = useMemo(() => new JdInterviewRoundApi(), []);

  const fetchInterviewFromJobDescription = useCallback(
    async info => {
      console.log(info);
      try {
        const response =
          await jdInterviewRoundApi.apiJdInterviewRoundGetInterviewPanelByJobDescriptionIdJobDescriptionIdGet(
            info?.jobDescriptionId
          );
        console.log(
          'apiJdInterviewRoundGetInterviewPanelByJobDescriptionIdJobDescriptionIdGet',
          response
        );
        if (response.body.result && response.body.result.length > 0) {
          setFormView(true);
          return response.body.result;
        } else {
          setFormStatus('1');
          setFormView(false);
          // dispatch(
          //   setAlertPopup({ message: 'Kindly add interview rounds for the Jobs', type: 'warning', duration: 3000 })
          // );
          return null;
        }
      } catch (error) {
        console.log(error);
      }
      return null;
    },
    [jdInterviewRoundApi]
  );

  const clientInterviewPanel = useCallback(
    async info => {
      try {
        const response =
          await jdClientInterviewApi.apiJdClientInterviewGetJdClientInterviewByIdJobDescriptionIdCandidateIdGet(
            info.jobDescriptionId,
            info.candidateId
          );
        console.log(
          'apiJdClientInterviewGetJdClientInteviewByIdJobDescriptionIdCandidateIdGet',
          response
        );
        if (response?.body?.result) {
          setFormView(true);
          setFormStatus('3');

          return response?.body?.result;
        }
      } catch (error) {
        console.log(error);
      }
      return null;
    },
    [jdClientInterviewApi]
  );

  const EditData = useCallback(
    async (post = {}) => {
      if (candidateInterViewPanelPopupInfo?.id) {
        const result = await clientInterviewPanel(
          candidateInterViewPanelPopupInfo
        );

        if (result) {
          console.log(result, 'results', 'clientInterviewPanel');
          console.log('ARRAY,', result);
          setClientInterViewInfo(result);

          const mappedResult = result.jdClientInterviewRounds.map(round => {
            console.log(round.jdClientInterviewRoundPanels);
            let panels = round.jdClientInterviewRoundPanels?.map(panel => ({
              name: panel.name,
              email: panel.email,
              id: panel?.id,
            }));

            if (!panels || panels.length === 0) {
              panels = [{ name: '', email: '' }];
            }

            return {
              isRescheduled: round.isRescheduled,
              roundName: round.roundName,
              date: round.date || '',
              duration: round.duration || '',
              status: round.status || 0,
              mode: round.mode || '',
              link: round.link || '',
              panels: panels,
              id: round.id,
              jdClientInterviewId: round.jdClientInterviewId,
            };
          });

          const rounds = { rounds: mappedResult };

          setClientInterviewRounds(checkAndSet(mappedResult));
          console.log('mappedResult clientInterviewPanel', rounds);
          console.log('initial values', INITIAL_FORM_STATE);
          setJdInfoInitialValues(checkAndSet(rounds));
          if (mappedResult.length > 0) {
            if (post && Object.keys(post).length > 0) {
              const reInitialValues = compareAndGetMatchedObject(
                post,
                rounds?.rounds
              );
              setRoundInfoInitialValues(reInitialValues);
            } else {
              console.log(
                'roundInfoInitialValues',
                'roundInfoInitialValues',
                post
              );
              setRoundInfoInitialValues(mappedResult[0]);
            }
          }
        } else {
          const resultFromValues = await fetchInterviewFromJobDescription(
            candidateInterViewPanelPopupInfo
          );
          console.log(resultFromValues, 'resultFromValues');
          if (resultFromValues) {
            const mappedResult = resultFromValues.map(round => {
              let panels = round.jdInterviewRoundsPanels?.map(panel => ({
                name: panel.name,
                email: panel.email,
                id: panel?.id,
              }));

              if (!panels || panels.length === 0) {
                panels = [{ name: '', email: '' }];
              }

              return {
                isRescheduled: round?.isRescheduled,
                roundName: round.name,
                date: round.date || '',
                duration: round.duration || '',
                mode: 'Offline',
                link: round.link || '',
                panels: panels,
                ...round,
              };
            });

            console.log(
              'mappedResult fetchInterviewFromJobDescription',
              mappedResult
            );
            const rounds = { rounds: mappedResult };
            console.log('mappedResult', rounds);

            setFormStatus('2');
            setJdInfoInitialValues(checkAndSet(rounds));
          }
        }
      }
    },
    [
      clientInterviewPanel,
      candidateInterViewPanelPopupInfo,
      fetchInterviewFromJobDescription,
    ]
  );

  useEffect(() => {
    if (candidateInterViewPanelPopupInfo) EditData();
  }, [candidateInterViewPanelPopupInfo, EditData]);

  const handleAdd = arrayHelpers => {
    console.log(candidateInterViewPanelPopupInfo);
    arrayHelpers.push({
      roundName: '',
      date: '',
      duration: '',
      mode: '',
      link: '',
      jdClientInterviewId: clientInterviewInfo?.id,
      status: 0,
      panels: [{ name: '', email: '' }],
    });
    setCount(count + 1);
  };
  const handleAddPanel = arrayHelpers => {
    console.log(candidateInterViewPanelPopupInfo);
    arrayHelpers.push({
      name: '',
      email: '',
      jdClientInterviewId: clientInterviewInfo?.id,
    });
    setCount(count + 1);
  };

  const handleSplice = (arrayHelpers, index) => {
    arrayHelpers.splice(index, 1);
    setCount(count - 1);
  };
  const addTotalPanel = async (post, { resetForm }) => {
    const body = {
      name: 'string',
      email: 'string',
      jdInterviewRoundsId: isInterviewPopupInfo.id,
    };

    console.log(post, body);

    const output = post.panels.map(panel => {
      return {
        name: panel.name || '',
        email: panel.email || '',
        // jdInterviewRoundsId: isInterviewPopupInfo.id,
      };
    });

    const hasDuplicatesTraits =
      output.filter((panel, index) => {
        // Check for duplicates with the same name or skillPlatformId
        return output.some((p, i) => {
          return index !== i && p.email === panel.email;
        });
      }).length > 0;

    if (hasDuplicatesTraits) {
      // Handle duplicate skill platforms
      dispatch(
        setAlertPopup({
          message: 'Duplicate panels cannot be added',
          type: 'error',
          duration: 3000,
        })
      );
    } else {
      const opts = {
        interviewRoundId: isInterviewPopupInfo.id,
        body: output,
      };

      try {
        const response =
          await jdInterviewRoundsPanelApi.apiJdInterviewRoundsPanelPost(opts);

        if (response.body.message === 'Created Successfully.') {
          dispatch(
            setAlertPopup({
              message: 'Jobs Interview Round panels created successfully',
              type: 'success',
              duration: 3000,
            })
          );
          console.log(response.body.message);
          handleClose();

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
    }
  };

  const addPanels = async (post, index, traits) => {
    console.log(post);

    const hasDuplicatesTraits =
      traits.filter((panel, index) => {
        // Check for duplicates with the same name or skillPlatformId
        return traits.some((p, i) => {
          return index !== i && p.email === panel.email;
        });
      }).length > 0;

    if (hasDuplicatesTraits) {
      // Handle duplicate skill platforms
      dispatch(
        setAlertPopup({
          message: 'Duplicate panels cannot be added',
          type: 'error',
          duration: 3000,
        })
      );
    } else {
      const opts = {
        body: {
          ...post,
          jobDescriptionId: isInterviewPopupInfo?.id,
          weight: '0',
        },
      };
      console.log('traites', opts);
      try {
        const response = await jdTraits.apiJdTraitPost(opts);

        if (response.body.message === 'Created Successfully.') {
          dispatch(
            setAlertPopup({
              message: 'Jobs soft skill  created successfully',
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
    }
  };
  const updatePanels = async (post, index, traits) => {
    console.log(post);

    const hasDuplicatesTraits =
      traits.filter((trait, index) => {
        // Check for duplicates with the same name or skillPlatformId
        return traits.some((p, i) => {
          return index !== i && p.name === trait.name;
        });
      }).length > 0;

    if (hasDuplicatesTraits) {
      // Handle duplicate skill platforms
      dispatch(
        setAlertPopup({
          message: 'Duplicate traits cannot be added',
          type: 'error',
          duration: 3000,
        })
      );
    } else {
      const opts = {
        body: {
          ...post,
          jobDescriptionId: isInterviewPopupInfo?.id,
          weight: '0',
        },
      };
      try {
        const response = await jdTraits.apiJdTraitPut(opts);

        if (response.body.message === 'Updated Successfully.') {
          dispatch(
            setAlertPopup({
              message: 'Jobs soft skill  updated successfully',
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
    }
  };
  const deletePanels = async post => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You want to delete this Trait!',
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
        const response = await jdTraits.apiJdTraitIdDelete(post.id);
        if (response.body.message === 'Deleted Successfully.') {
          dispatch(
            setAlertPopup({
              message: 'Trait deleted successfully',
              type: 'success',
              duration: 3000,
            })
          );
          EditData();
        } else {
          dispatch(
            setAlertPopup({
              message: response.body.message,
              type: 'error',
              duration: 3000,
            })
          );
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        dispatch(
          setAlertPopup({
            message: 'You have reverted the delete action',
            type: 'info',
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
  const submitRoundsValues = async (post, { resetForm }) => {
    console.log(post.rounds, 'rounds');
    console.log(candidateInterViewPanelPopupInfo);
    const jdClientInterviewRounds = post.rounds.map(round => {
      // const jdInterviewRoundsPanels = round.panels.map(panel => ({
      //   name: panel.name,
      //   email: panel.email,
      // }));
      const jdInterviewRoundsPanels = round.panels
        .map(panel => ({
          name: panel.name,
          email: panel.email,
        }))
        .filter(panel => panel.name !== '' || panel.email !== '');

      const finalJdInterviewRoundsPanels =
        jdInterviewRoundsPanels.length > 0 ? jdInterviewRoundsPanels : null;
      return {
        roundName: round.roundName,
        date: round.date,
        duration: round.duration,
        mode: round.mode,
        status: 0,
        link: round.link,
        jdClientInterviewRoundPanels: finalJdInterviewRoundsPanels,
      };
    });
    const postJdClientInterView = {
      status: 0,
      progressiveStatus: 1,
      clientId: candidateInterViewPanelPopupInfo?.clientId,
      candidateId: candidateInterViewPanelPopupInfo?.candidateId,
      jobDescriptionId: candidateInterViewPanelPopupInfo?.jobDescriptionId,
      jdAndCandidateStatusId: candidateInterViewPanelPopupInfo?.id,
      jdClientInterviewRounds: jdClientInterviewRounds,
    };

    console.log(post);

    console.log('post', postJdClientInterView);
    const opts = {
      body: reverseCheckAndSet(postJdClientInterView),
    };
    console.log('handle submit round values', opts);
    setLoading(true);
    try {
      const response = await jdClientInterviewApi.apiJdClientInterviewPost(
        opts
      );
      // const response = null;
      setLoading(false);
      if (response.body.message === 'Created Successfully.') {
        dispatch(
          setAlertPopup({
            message: 'Jobs interview scheduled successfully',
            type: 'success',
            duration: 3000,
          })
        );
        console.log(response.body.message);
        handleClose();
        dataUpdatingFunction();

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
      console.log(error);
      setLoading(false);
      dispatch(
        setAlertPopup({
          message: 'Something went wrong Please try Again !',
          type: 'error',
          duration: 3000,
        })
      );
    }
  };
  const updateRounds = async (post, { resetForm }) => {
    console.log(post.rounds);
    console.log(candidateInterViewPanelPopupInfo);
    const jdClientInterviewRounds = post.rounds.map(round => {
      const jdInterviewRoundsPanels = round.panels.map(panel => ({
        name: panel.name,
        email: panel.email,
      }));
      return {
        roundName: round.roundName,
        date: round.date,
        duration: round.duration,
        mode: round.mode,
        status: 0,
        link: round.link,
        jdClientInterviewRoundPanels: jdInterviewRoundsPanels,
      };
    });
    const postJdClientInterView = {
      status: 0,
      progressiveStatus: 1,
      clientId: candidateInterViewPanelPopupInfo?.clientId,
      candidateId: candidateInterViewPanelPopupInfo?.candidateId,
      jobDescriptionId: candidateInterViewPanelPopupInfo?.jobDescriptionId,
      jdAndCandidateStatusId: candidateInterViewPanelPopupInfo?.id,
      jdClientInterviewRounds: jdClientInterviewRounds,
    };

    const body = {
      name: 'string',
      email: 'string',
      jdInterviewRoundsId: candidateInterViewPanelPopupInfo.id,
    };

    console.log(post, body);

    console.log('post', postJdClientInterView);
    const opts = {
      body: postJdClientInterView,
    };
    console.log('handle submit round values', opts);

    try {
      const response = await jdClientInterviewApi.apiJdClientInterviewPost(
        opts
      );

      if (response.body.message === 'Created Successfully.') {
        dispatch(
          setAlertPopup({
            message: 'Jobs interview scheduled successfully',
            type: 'success',
            duration: 3000,
          })
        );
        console.log(response.body.message);
        handleClose();

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

  const handleClose = (event, reason) => {
    if (reason && reason === 'backdropClick') return;
    handleCloseDialog(false);
    setCandidateInterViewPanelPopupInfo({});
    setJdInfoInitialValues(checkAndSet(INITIAL_FORM_STATE));
    setRoundInfoInitialValues({});
  };

  const SubmitDetails = async values => {
    console.log('sub', values);
  };

  const addClientInterviewRound = async post => {
    console.log(post);
    setLoading(true);
    console.log(post.panels);
    const opts = {
      body: { ...post, jdClientInterviewRoundPanels: post.panels },
    };
    console.log('addClientInterviewRound', opts);

    const hasDuplicatesPanels = post.panels.some((panel, index) => {
      return post.panels.some((p, i) => {
        return index !== i && p.email === panel.email;
      });
    });
    if (hasDuplicatesPanels) {
      setLoading(false);
      dispatch(
        setAlertPopup({
          message: 'Duplicate Panel members cannot be added',
          type: 'error',
          duration: 3000,
        })
      );
    } else {
      try {
        const response =
          await jdClientInterviewRoundsApi.apiJdClientInterviewRoundsPut(opts);
        setLoading(false);

        if (response.body.result) {
          dispatch(
            setAlertPopup({
              message: `Jobs Rounds ${
                post?.isRescheduled ? 'Rescheduled' : 'Scheduled'
              } successfully`,
              type: 'success',
              duration: 3000,
            })
          );
          console.log(response.body.message);
          dataUpdatingFunction();
          EditData(response.body.result);
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
        setLoading(false);
        dispatch(
          setAlertPopup({
            message: 'Something went wrong Please try Again !',
            type: 'error',
            duration: 3000,
          })
        );
      }
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
      maxWidth="xl"
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
          {'Interview Schedule'}
        </Typography>
      </BootstrapDialogTitle>
      {isAddingViewing && (
        <Box sx={{ textAlign: 'center' }}>
          <Stack alignItems="center" spacing={2}>
            <Typography
              variant="body2"
              color="initial"
              style={{
                textAlign: 'center',
                justifyContent: 'center',
                height: '50px',
              }}
            >
              Kindly add interview rounds for the Jobs
            </Typography>
          </Stack>
        </Box>
      )}
      {!isAddingViewing && (
        <>
          {isAdding && (
            <Formik
              enableReinitialize
              initialValues={jdInfoInitialValues}
              validationSchema={validationSchema}
              onSubmit={(values, { resetForm }) =>
                submitRoundsValues(values, { resetForm })
              }
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
                <form noValidate onSubmit={handleSubmit}>
                  <DialogContent>
                    <Stack
                      container
                      sx={{ mt: 0.5 }}
                      spacing={2}
                      justifyContent="center"
                      alignItems="center"
                    >
                      <FieldArray name="rounds">
                        {({ push, remove }) => (
                          <Stack spacing={2}>
                            {values.rounds.map((round, index) => (
                              <Box
                                key={index}
                                sx={{ backgroundColor: '#ededed' }}
                              >
                                <Grid
                                  container
                                  spacing={2}
                                  key={index}
                                  justifyContent="flex-start"
                                  alignItems={'flex-start'}
                                  sx={{ padding: 1 }}
                                >
                                  <Grid item xs={6} md={3}>
                                    <TextfieldWrapper
                                      name={`rounds[${index}].roundName`}
                                      readOnly={false}
                                      textLabelStyle={textLabel}
                                      textLabel="Name"
                                      otherProps={{ ...otherProps }}
                                    />
                                  </Grid>
                                  <Grid item xs={6} md={3}>
                                    <MuiDateTimePicker
                                      textLabelStyle={textLabel}
                                      name={`rounds[${index}].date`}
                                      textLabel="Date"
                                      formatValue="datetime"
                                      otherProps={otherPropsRequired}
                                    />
                                  </Grid>
                                  <Grid item xs={6} md={3}>
                                    <TextfieldWrapper
                                      name={`rounds[${index}].duration`}
                                      readOnly={false}
                                      textLabelStyle={textLabel}
                                      textLabel="Duration(min)"
                                      otherProps={{ ...otherProps }}
                                    />
                                  </Grid>
                                  <Grid item xs={6} md={3}>
                                    <SelectWrapper
                                      name={`rounds[${index}].mode`}
                                      textLabelStyle={textLabel}
                                      textLabel="Mode"
                                      options={modeTypes}
                                      placeholder="Select mode"
                                      inputProps={otherProps}
                                    />
                                  </Grid>
                                  <Grid item xs={6} md={3}>
                                    <TextfieldWrapper
                                      name={`rounds[${index}].link`}
                                      readOnly={false}
                                      textLabelStyle={textLabel}
                                      textLabel="Location"
                                      otherProps={{ ...otherProps }}
                                    />
                                  </Grid>
                                  {false && (
                                    <Grid item>
                                      <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => remove(index)}
                                      >
                                        Remove Round
                                      </Button>
                                      <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() =>
                                          push({
                                            roundName: '',
                                            date: '',
                                            duration: '',
                                            mode: '',
                                            link: '',
                                            panels: [{ name: '', email: '' }],
                                          })
                                        }
                                      >
                                        Add Round
                                      </Button>
                                    </Grid>
                                  )}
                                  <Grid item>
                                    <FieldArray
                                      name={`rounds[${index}].panels`}
                                    >
                                      {({ push, remove }) => (
                                        <div>
                                          {round.panels.map(
                                            (panel, panelIndex) => (
                                              <div key={panelIndex}>
                                                <Grid
                                                  container
                                                  spacing={2}
                                                  key={index}
                                                  justifyContent="flex-start"
                                                  alignItems={'flex-start'}
                                                >
                                                  <Grid item xs={4}>
                                                    <TextfieldWrapper
                                                      name={`rounds[${index}].panels[${panelIndex}].name`}
                                                      readOnly={false}
                                                      textLabelStyle={textLabel}
                                                      textLabel="Name"
                                                      otherProps={{
                                                        ...otherProps,
                                                      }}
                                                      // onChange={e => {
                                                      //   setFieldValue(`panels.${index}.name`);
                                                      // }}
                                                    />
                                                  </Grid>
                                                  <Grid item xs={4}>
                                                    <TextfieldWrapper
                                                      name={`rounds[${index}].panels[${panelIndex}].email`}
                                                      readOnly={false}
                                                      textLabelStyle={textLabel}
                                                      textLabel="Email"
                                                      otherProps={{
                                                        ...otherProps,
                                                      }}
                                                      // onChange={e => {
                                                      //   setFieldValue(`panels.${index}.name`);
                                                      // }}
                                                    />
                                                  </Grid>
                                                  <Grid item xs={4}>
                                                    {round.panels.length >
                                                      1 && (
                                                      <IconButton
                                                        type="button"
                                                        disableRipple
                                                        size="large"
                                                        aria-label="back"
                                                        color="primary"
                                                        onClick={() =>
                                                          remove(panelIndex)
                                                        }
                                                      >
                                                        <Delete />
                                                      </IconButton>
                                                    )}

                                                    <IconButton
                                                      type="button"
                                                      disableRipple
                                                      size="large"
                                                      aria-label="back"
                                                      color="primary"
                                                      onClick={() =>
                                                        push({
                                                          name: '',
                                                          email: '',
                                                        })
                                                      }
                                                      // disabled={count >= 5}
                                                    >
                                                      <AddCircleOutlineOutlined />
                                                    </IconButton>
                                                  </Grid>
                                                </Grid>
                                              </div>
                                            )
                                          )}
                                        </div>
                                      )}
                                    </FieldArray>
                                  </Grid>
                                </Grid>
                                {index !== values.rounds.length - 1 && (
                                  <Divider />
                                )}
                              </Box>
                            ))}
                          </Stack>
                        )}
                      </FieldArray>
                    </Stack>
                  </DialogContent>
                  <DialogActions
                    sx={{
                      justifyContent: 'center',
                    }}
                  >
                    <Grid item xs={4} sm={4} alignSelf="flex-end">
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
                        type="submit"
                        variant="contained"
                        onClick={handleSubmit}
                      >
                        Schedule
                      </Button>
                    </Grid>
                  </DialogActions>
                </form>
              )}
            </Formik>
          )}

          {isEditing && (
            <>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-end"
              >
                {/* Other content */}
                <Legend items={legendItems} maxWidth={450} />
              </Stack>
              {clientInterviewRounds && clientInterviewRounds.length > 0 && (
                <Grid
                  container
                  spacing={1}
                  sx={{ padding: 1, display: 'flex', alignItems: 'stretch' }}
                >
                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{
                        border: '1px solid gray',
                        p: 2,
                        minHeight: 100,
                        height: '100%',
                      }}
                    >
                      <Typography sx={{ mb: 2 }}>Interview Rounds</Typography>
                      <Grid
                        container
                        spacing={2}
                        sx={{ mb: 2 }}
                        alignItems={'flex-start'}
                        justifyContent={'center'}
                      >
                        {clientInterviewRounds.map(item => (
                          <Grid item key={item.id}>
                            <StyledChip
                              key={item.id}
                              label={item.roundName}
                              isSelected={
                                roundInfoInitialValues
                                  ? roundInfoInitialValues.id === item.id
                                  : false
                              }
                              selectedBackgroundColor={
                                item.status === 1
                                  ? '#057602'
                                  : item.status === 2
                                  ? '#ff0000'
                                  : item.status === 0 && item.date
                                  ? '#3399ff'
                                  : '#ffa500'
                              }
                              backgroundColor={'#fff'}
                              fullWidth
                              border={theme.palette.primary.main}
                              onClick={() => {
                                setRoundInfoInitialValues(item);
                                console.log('roundInfoInitialValues', item);
                              }}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{
                        border: '1px solid gray',
                        p: 2,
                        minHeight: 100,
                        height: '100%',
                      }}
                    >
                      {roundInfoInitialValues &&
                        Object.keys(roundInfoInitialValues).length > 0 && (
                          <Container maxWidth="lg">
                            <Formik
                              enableReinitialize
                              initialValues={roundInfoInitialValues}
                              validationSchema={validationSchema2}
                              onSubmit={async values => {
                                console.log(values);
                                if ('id' in values) {
                                  console.log('edit', values);
                                  addClientInterviewRound(values);
                                  // editSkillPlatForm(SkillPlatformValues);
                                } else {
                                  addClientInterviewRound(values);
                                  console.log('add', values);

                                  // addSkillPlatForm(skillPlaformValuesAdd);
                                }
                              }}
                            >
                              {({
                                errors,
                                handleBlur,
                                handleChange,
                                setFieldValue,
                                handleSubmit,
                                touched,
                                values,
                              }) => (
                                <Form>
                                  <Container maxWidth="sm">
                                    <Grid
                                      container
                                      spacing={2}
                                      mb={2}
                                      justifyContent="space-between"
                                      alignItems={'flex-start'}
                                    >
                                      {/* <Grid item xs={6} md={3}>
                          <TextfieldWrapper
                            name={`roundName`}
                            readOnly={values.status === 1}
                            textLabelStyle={textLabel}
                            textLabel='Name'
                            otherProps={{ ...otherProps }}
                          />s
                        </Grid> */}
                                      <Grid item xs={12}>
                                        <Typography
                                          variant="h4"
                                          sx={{ fontWeight: 'bold' }}
                                        >
                                          RoundName:{' '}
                                          <span
                                            style={{ fontWeight: 'normal' }}
                                          >
                                            {values.roundName}
                                          </span>
                                        </Typography>
                                      </Grid>
                                      <Grid item xs={6} md={6}>
                                        <MuiDateTimePicker
                                          readOnly={values.status === 1}
                                          textLabelStyle={textLabel}
                                          name={`date`}
                                          textLabel="Date"
                                          formatValue="datetime"
                                          // inputProps={otherProps}
                                          otherProps={otherPropsRequired}
                                        />
                                      </Grid>
                                      <Grid item xs={6} md={6}>
                                        <TextfieldWrapper
                                          name={`duration`}
                                          readOnly={values.status === 1}
                                          textLabelStyle={textLabel}
                                          textLabel="Duration(min)"
                                          otherProps={{ ...otherProps }}
                                        />
                                      </Grid>
                                      <Grid item xs={6} md={6}>
                                        <SelectWrapper
                                          readOnly={values.status === 1}
                                          name={`mode`}
                                          textLabelStyle={textLabel}
                                          textLabel="Mode"
                                          options={modeTypes}
                                          placeholder="Select mode"
                                          inputProps={otherProps}
                                        />
                                      </Grid>
                                      <Grid item xs={6} md={6}>
                                        <TextfieldWrapper
                                          readOnly={values.status === 1}
                                          name={`link`}
                                          textLabelStyle={textLabel}
                                          textLabel="Location"
                                          otherProps={{ ...otherProps }}
                                        />
                                      </Grid>
                                      <Grid item xs={12}>
                                        <Typography variant="body1">
                                          Panels
                                        </Typography>
                                      </Grid>

                                      <Grid item>
                                        <FieldArray name={`panels`}>
                                          {({ push, remove }) => (
                                            <div>
                                              {values.panels &&
                                                values.panels.length > 0 &&
                                                values.panels.map(
                                                  (panel, panelIndex) => (
                                                    <div key={panelIndex}>
                                                      <Grid
                                                        container
                                                        spacing={2}
                                                        key={panelIndex}
                                                        justifyContent="flex-start"
                                                        alignItems={
                                                          'flex-start'
                                                        }
                                                      >
                                                        <Grid item xs={4}>
                                                          <TextfieldWrapper
                                                            readOnly={
                                                              values.status ===
                                                              1
                                                            }
                                                            name={`panels.[${panelIndex}].name`}
                                                            textLabelStyle={
                                                              textLabel
                                                            }
                                                            textLabel="Name"
                                                            otherProps={{
                                                              ...otherProps,
                                                            }}
                                                            // onChange={e => {
                                                            //   setFieldValue(`panels.${index}.name`);
                                                            // }}
                                                          />
                                                        </Grid>
                                                        <Grid item xs={4}>
                                                          <TextfieldWrapper
                                                            readOnly={
                                                              values.status ===
                                                              1
                                                            }
                                                            name={`panels.[${panelIndex}].email`}
                                                            textLabelStyle={
                                                              textLabel
                                                            }
                                                            textLabel="Email"
                                                            otherProps={{
                                                              ...otherProps,
                                                            }}
                                                            // onChange={e => {
                                                            //   setFieldValue(`panels.${index}.name`);
                                                            // }}
                                                          />
                                                        </Grid>
                                                        <Grid item xs={4}>
                                                          {'id' in values ? (
                                                            <>
                                                              {values.panels
                                                                .length > 1 && (
                                                                <IconButton
                                                                  disabled={
                                                                    values.status !==
                                                                    0
                                                                  }
                                                                  type="button"
                                                                  disableRipple
                                                                  size="large"
                                                                  aria-label="back"
                                                                  color="primary"
                                                                  onClick={() =>
                                                                    handleSplice(
                                                                      values.panels,
                                                                      panelIndex
                                                                    )
                                                                  }
                                                                >
                                                                  <Delete />
                                                                </IconButton>
                                                              )}
                                                            </>
                                                          ) : (
                                                            <IconButton
                                                              disabled={
                                                                values.status !==
                                                                0
                                                              }
                                                              type="button"
                                                              disableRipple
                                                              size="large"
                                                              aria-label="back"
                                                              color="primary"
                                                              onClick={() =>
                                                                handleSplice(
                                                                  values.panels,
                                                                  panelIndex
                                                                )
                                                              }
                                                            >
                                                              <Delete />
                                                            </IconButton>
                                                          )}
                                                          {values.status !==
                                                          1 ? (
                                                            <IconButton
                                                              disabled={
                                                                values.status !==
                                                                0
                                                              }
                                                              type="button"
                                                              disableRipple
                                                              size="large"
                                                              aria-label="back"
                                                              color="primary"
                                                              onClick={() =>
                                                                handleAddPanel(
                                                                  values.panels
                                                                )
                                                              }
                                                              // disabled={count >= 5}
                                                            >
                                                              <AddCircleOutlineOutlined />
                                                            </IconButton>
                                                          ) : null}
                                                        </Grid>
                                                      </Grid>
                                                    </div>
                                                  )
                                                )}
                                            </div>
                                          )}
                                        </FieldArray>
                                      </Grid>
                                      <Grid
                                        item
                                        xs={12}
                                        md={12}
                                        textAlign="center"
                                      >
                                        <Stack
                                          direction="row"
                                          spacing={1}
                                          justifyContent="center"
                                          alignItems="center"
                                        >
                                          {'id' in values ? null : (
                                            <IconButton
                                              disabled={values.status !== 0}
                                              type="button"
                                              disableRipple
                                              size="large"
                                              aria-label="back"
                                              color="primary"
                                              onClick={() => {
                                                // handleSplice(values, index)
                                              }}
                                            >
                                              <Delete />
                                            </IconButton>
                                          )}

                                          {'id' in values ? (
                                            <>
                                              <ShadowButtonSubmit
                                                height="50px"
                                                width="100%"
                                                minwidth="250px"
                                                maxwidth="350px"
                                                disabled={values.status !== 0}
                                                backgroundcolor={
                                                  theme.palette.primary.main
                                                }
                                                type="submit"
                                              >
                                                <ButtonText color="#fff">
                                                  {values.isRescheduled
                                                    ? 'Reschedule'
                                                    : 'Schedule'}
                                                </ButtonText>
                                              </ShadowButtonSubmit>
                                            </>
                                          ) : (
                                            <IconButton
                                              type="submit"
                                              disableRipple
                                              size="large"
                                              aria-label="back"
                                              color="primary"
                                            >
                                              <AddTaskIcon />
                                            </IconButton>
                                          )}
                                        </Stack>
                                      </Grid>
                                    </Grid>
                                  </Container>
                                </Form>
                              )}
                            </Formik>
                          </Container>
                        )}
                    </Box>
                  </Grid>
                </Grid>
              )}
              {/* {clientInterviewRounds && clientInterviewRounds.length < 1 && (
                <Typography>There no Interview Rounds</Typography>
              )} */}

              {false &&
                clientInterviewRounds &&
                clientInterviewRounds.map((round, index) => (
                  <Container
                    key={index}
                    sx={{ mb: 2, backgroundColor: '#ededed', p: 2 }}
                  >
                    <Formik
                      enableReinitialize
                      initialValues={round}
                      validationSchema={validationSchema2}
                      onSubmit={async values => {
                        console.log(values);
                        if ('id' in values) {
                          console.log('edit', values);
                          addClientInterviewRound(values);
                          // editSkillPlatForm(SkillPlatformValues);
                        } else {
                          addClientInterviewRound(values);
                          console.log('add', values);

                          // addSkillPlatForm(skillPlaformValuesAdd);
                        }
                      }}
                    >
                      {({
                        errors,
                        handleBlur,
                        handleChange,
                        setFieldValue,
                        handleSubmit,
                        touched,
                        values,
                      }) => (
                        <Form>
                          <Grid
                            container
                            spacing={2}
                            key={index}
                            justifyContent="space-between"
                            alignItems={'flex-start'}
                          >
                            <Grid item xs={6} md={3}>
                              <TextfieldWrapper
                                name={`roundName`}
                                readOnly={
                                  clientInterviewRounds[index].status === 1
                                }
                                textLabelStyle={textLabel}
                                textLabel="Name"
                                otherProps={{ ...otherProps }}
                              />
                            </Grid>
                            <Grid item xs={6} md={2}>
                              <MuiDateTimePicker
                                readOnly={
                                  clientInterviewRounds[index].status === 1
                                }
                                textLabelStyle={textLabel}
                                name={`date`}
                                textLabel="Date"
                                formatValue="datetime"
                                // inputProps={otherProps}
                                otherProps={otherPropsRequired}
                              />
                            </Grid>
                            <Grid item xs={6} md={3}>
                              <TextfieldWrapper
                                name={`duration`}
                                readOnly={
                                  clientInterviewRounds[index].status === 1
                                }
                                textLabelStyle={textLabel}
                                textLabel="Duration(min)"
                                otherProps={{ ...otherProps }}
                              />
                            </Grid>
                            <Grid item xs={6} md={2}>
                              <SelectWrapper
                                readOnly={
                                  clientInterviewRounds[index].status === 1
                                }
                                name={`mode`}
                                textLabelStyle={textLabel}
                                textLabel="Mode"
                                options={modeTypes}
                                placeholder="Select mode"
                                inputProps={otherProps}
                              />
                            </Grid>
                            <Grid item xs={6} md={3}>
                              <TextfieldWrapper
                                readOnly={
                                  clientInterviewRounds[index].status === 1
                                }
                                name={`link`}
                                textLabelStyle={textLabel}
                                textLabel="Location"
                                otherProps={{ ...otherProps }}
                              />
                            </Grid>

                            <Grid item>
                              <FieldArray name={`panels`}>
                                {({ push, remove }) => (
                                  <div>
                                    {round.panels.map((panel, panelIndex) => (
                                      <div key={panelIndex}>
                                        <Grid
                                          container
                                          spacing={2}
                                          key={index}
                                          justifyContent="flex-start"
                                          alignItems={'flex-start'}
                                        >
                                          <Grid item xs={4}>
                                            <TextfieldWrapper
                                              readOnly={
                                                clientInterviewRounds[index]
                                                  .status === 1
                                              }
                                              name={`panels.[${panelIndex}].name`}
                                              textLabelStyle={textLabel}
                                              textLabel="Name"
                                              otherProps={{ ...otherProps }}
                                              // onChange={e => {
                                              //   setFieldValue(`panels.${index}.name`);
                                              // }}
                                            />
                                          </Grid>
                                          <Grid item xs={4}>
                                            <TextfieldWrapper
                                              readOnly={
                                                clientInterviewRounds[index]
                                                  .status === 1
                                              }
                                              name={`panels.[${panelIndex}].email`}
                                              textLabelStyle={textLabel}
                                              textLabel="Email"
                                              otherProps={{ ...otherProps }}
                                              // onChange={e => {
                                              //   setFieldValue(`panels.${index}.name`);
                                              // }}
                                            />
                                          </Grid>
                                          <Grid item xs={4}>
                                            {'id' in panel ? (
                                              <>
                                                {false && (
                                                  <IconButton
                                                    type="button"
                                                    disableRipple
                                                    size="large"
                                                    aria-label="back"
                                                    color="primary"
                                                    onClick={() =>
                                                      handleSplice(
                                                        round.panels,
                                                        panelIndex
                                                      )
                                                    }
                                                  >
                                                    <Delete />
                                                  </IconButton>
                                                )}
                                              </>
                                            ) : (
                                              <IconButton
                                                type="button"
                                                disableRipple
                                                size="large"
                                                aria-label="back"
                                                color="primary"
                                                onClick={() =>
                                                  handleSplice(
                                                    round.panels,
                                                    panelIndex
                                                  )
                                                }
                                              >
                                                <Delete />
                                              </IconButton>
                                            )}
                                            {clientInterviewRounds[index]
                                              .status !== 1 ? (
                                              <IconButton
                                                type="button"
                                                disableRipple
                                                size="large"
                                                aria-label="back"
                                                color="primary"
                                                onClick={() =>
                                                  handleAddPanel(round.panels)
                                                }
                                                // disabled={count >= 5}
                                              >
                                                <AddCircleOutlineOutlined />
                                              </IconButton>
                                            ) : null}
                                          </Grid>
                                        </Grid>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </FieldArray>
                            </Grid>
                            <Grid item xs={2} alignSelf="center">
                              <Stack
                                direction="row"
                                spacing={1}
                                justifyContent="center"
                                alignItems="center"
                              >
                                {'id' in clientInterviewRounds[index] ? (
                                  <>
                                    {false && (
                                      <IconButton
                                        type="button"
                                        disableRipple
                                        size="large"
                                        aria-label="back"
                                        color="primary"
                                        // onClick={() => deleteSkillPlatForm(values)}
                                      >
                                        <Delete />
                                      </IconButton>
                                    )}
                                  </>
                                ) : (
                                  <IconButton
                                    type="button"
                                    disableRipple
                                    size="large"
                                    aria-label="back"
                                    color="primary"
                                    onClick={() =>
                                      handleSplice(clientInterviewRounds, index)
                                    }
                                  >
                                    <Delete />
                                  </IconButton>
                                )}

                                {'id' in clientInterviewRounds[index] ? (
                                  <>
                                    {clientInterviewRounds[index].status ===
                                    1 ? (
                                      <DoneIcon sx={{ color: '#057602' }} />
                                    ) : (
                                      <IconButton
                                        type="submit"
                                        disableRipple
                                        size="large"
                                        aria-label="back"
                                        color="primary"
                                      >
                                        <ScheduleIcon />
                                      </IconButton>
                                    )}
                                  </>
                                ) : (
                                  <IconButton
                                    type="submit"
                                    disableRipple
                                    size="large"
                                    aria-label="back"
                                    color="primary"
                                  >
                                    <AddTaskIcon />
                                  </IconButton>
                                )}
                              </Stack>
                            </Grid>
                          </Grid>
                        </Form>
                      )}
                    </Formik>
                  </Container>
                ))}
              {false && (
                <Stack
                  direction="row"
                  alignItems={'center'}
                  justifyContent="flex-end"
                >
                  <Stack alignItems={'flex-end'}>
                    <Tooltip title="Add version" arrow placement="right">
                      <IconButton
                        type="button"
                        disableRipple
                        size="large"
                        aria-label="back"
                        color="primary"
                        onClick={() => handleAdd(clientInterviewRounds)}
                        // disabled={count >= 5}
                      >
                        <AddCircleOutlineOutlined />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Stack>
              )}
            </>
          )}
        </>
      )}
    </BootstrapDialog>
  );
};

export default CandidateInterviewPanelUpdatePopup;
