import TextfieldWrapper from '@/formComponents/FormsUI/Textfield';
import { otherPropsRequired } from '@/reUsableComponents/FormComponents';
import { LoadingContext } from '@/reUsableComponents/LoadingComponents/LoadingContext';
import textLabel from '@/src/Components/LabelComponents/TextLabel';
import { setAlertPopup } from '@/store/alertSlice';
import { JdInterviewRoundsPanelApi } from '@/swagger_api/*';
import { emailValidation, nameValidation } from '@/utils/validationSchema';
import { useTheme } from '@emotion/react';
import { AddCircleOutlineOutlined, Delete } from '@mui/icons-material';
import { IconButton, Stack, Tooltip, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import { FieldArray, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import { BootstrapDialog, BootstrapDialogTitle } from './PoupComponents';

const INITIAL_FORM_STATE = {
  panels: [
    {
      name: '',
      email: '',
    },
  ],
};

const validationSchema = Yup.object().shape({
  panels: Yup.array()
    .min(1, 'At least one Skill platform is required')
    .of(
      Yup.object().shape({
        name: nameValidation('Name', true),
        email: emailValidation('Email', true),
      })
    ),
});

const InterviewPanelsPopup = ({
  isDialogOpened,
  handleCloseDialog,
  submitPlatforms,
  title,
  isInterviewPopupInfo,
  setIsInterviewPopupInfo,
  dataReload,
}) => {
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);

  const [panelInfo, setPanelInfo] = useState([]);
  const { setLoading } = useContext(LoadingContext);
  const [jdInfoInitialValues, setJdInfoInitialValues] =
    useState(INITIAL_FORM_STATE);

  const jdInterviewRoundsPanelApi = useMemo(
    () => new JdInterviewRoundsPanelApi(),
    []
  );

  //this below is just directly without calling api
  // useEffect(() => {
  //   console.log(isInterviewPopupInfo);
  //   if (isInterviewPopupInfo) {
  //     setJdInfoInitialValues({ panels: isInterviewPopupInfo || INITIAL_FORM_STATE });
  //     setPanelInfo(isInterviewPopupInfo);
  //   } else {
  //     setJdInfoInitialValues(INITIAL_FORM_STATE);
  //   }
  // }, [isInterviewPopupInfo]);

  const fetchJobDescription = useCallback(
    async roundId => {
      try {
        const response =
          await jdInterviewRoundsPanelApi.apiJdInterviewRoundsPanelGetRoundPanelByRoundIdRoundIdGet(
            roundId
          );
        // console.log('response', response);
        if (response.body.result.length > 0) {
          return response.body.result;
        }
      } catch (error) {
        console.log(error);
      }
      return null;
    },
    [jdInterviewRoundsPanelApi]
  );

  const EditData = useCallback(async () => {
    console.log(isInterviewPopupInfo, 'isInterviewPopupInfo');
    const result = await fetchJobDescription(isInterviewPopupInfo.id);
    console.log(result, 'results');
    if (result) {
      setPanelInfo(result);
      setJdInfoInitialValues({ panels: result });
      console.log(jdInfoInitialValues);
    } else {
      setJdInfoInitialValues(INITIAL_FORM_STATE);
    }
    console.log('id', result);
  }, [fetchJobDescription, isInterviewPopupInfo.id]);

  useEffect(() => {
    console.log(isInterviewPopupInfo);
    if (isInterviewPopupInfo.id) EditData();
  }, [isInterviewPopupInfo, EditData]);

  const handleAdd = arrayHelpers => {
    arrayHelpers.push({
      name: '',
      email: '',
    });
    setCount(count + 1);
  };

  const handleSplice = (arrayHelpers, index) => {
    console.log(arrayHelpers);
    arrayHelpers.splice(index, 1);

    setCount(count - 1);
  };
  const addTotalPanel = async (post, { resetForm }) => {
    setLoading(true);
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
      setLoading(false);
      dispatch(
        setAlertPopup({
          message: 'Duplicate panels cannot be added',
          type: 'error',
          duration: 3000,
        })
      );
    } else {
      const opts = {
        body: output,
      };

      try {
        const response =
          await jdInterviewRoundsPanelApi.apiJdInterviewRoundsPanelInterviewRoundIdPost(
            isInterviewPopupInfo.id,
            opts
          );
        setLoading(false);
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
          dataReload();
        } else {
          dataReload();
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
    }
  };
  const updateTotalPanel = async (post, { resetForm }) => {
    setLoading(true);
    const body = {
      name: 'string',
      email: 'string',
      jdInterviewRoundsId: isInterviewPopupInfo.id,
    };

    console.log(post, body, 'updateTotalPanel');

    const output = post.panels.map(panel => {
      return {
        name: panel.name || '',
        email: panel.email || '',
        id: panel.id,
        jdInterviewRoundsId: isInterviewPopupInfo.id,

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
      setLoading(false);
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
      console.log(opts);
      try {
        const response =
          await jdInterviewRoundsPanelApi.apiJdInterviewRoundsPanelPut(opts);
        setLoading(false);
        if (response.body.message === 'Updated Successfully.') {
          dispatch(
            setAlertPopup({
              message: 'Jobs Interview Round panels updated successfully',
              type: 'success',
              duration: 3000,
            })
          );
          console.log(response.body.message);
          handleClose();
          dataReload();
        } else {
          dataReload();
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
      setLoading(false);
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
              message: 'Jobs panel created successfully',
              type: 'success',
              duration: 3000,
            })
          );
          console.log(response.body.message);

          dataReload();
        } else {
          dataReload();
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
      setLoading(false);
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
      try {
        const response = await jdTraits.apiJdTraitPut(opts);

        if (response.body.message === 'Updated Successfully.') {
          dispatch(
            setAlertPopup({
              message: 'Jobs panel updated successfully',
              type: 'success',
              duration: 3000,
            })
          );
          console.log(response.body.message);
          dataReload();
        } else {
          dataReload();
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
              message: 'Panel deleted successfully',
              type: 'success',
              duration: 3000,
            })
          );
          dataReload();
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

  const handleClose = (event, reason) => {
    if (reason && reason === 'backdropClick') return;
    handleCloseDialog();
  };
  const SubmitDetails = async values => {
    console.log('sub', values);
    submitPlatforms(values.reason);
  };
  console.log(jdInfoInitialValues, 'jdInfoInitialValues');

  return (
    <BootstrapDialog
      disableAutoFocus
      disableRestoreFocus
      disableEnforceFocus
      onClose={(event, reason) => {
        if (reason !== 'backdropClick') {
          handleCloseDialog();
          setIsInterviewPopupInfo({});
          setJdInfoInitialValues(INITIAL_FORM_STATE);
          setPanelInfo([]);
        }
      }}
      aria-labelledby="leave-popup"
      open={isDialogOpened}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        style: {
          borderRadius: 0,
        },
      }}
    >
      <BootstrapDialogTitle
        id="leave-popup"
        sx={{ p: '13px 17px', color: 'black' }}
        onClose={(event, reason) => {
          if (reason !== 'backdropClick') {
            handleCloseDialog();
            setIsInterviewPopupInfo({});
            setJdInfoInitialValues(INITIAL_FORM_STATE);
            setPanelInfo([]);
          }
        }}
      >
        <Typography
          variant="menutitle"
          align="center"
          sx={{ fontSize: '16px', textAlign: 'center', color: 'black' }}
        >
          {title || 'Reason for Rejection'}
        </Typography>
      </BootstrapDialogTitle>

      <Formik
        enableReinitialize
        initialValues={jdInfoInitialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          if (panelInfo.length > 0) {
            console.log('edit panel');
            updateTotalPanel(values, { resetForm });
          } else {
            addTotalPanel(values, { resetForm });
          }
        }}
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
                <FieldArray name="panels">
                  {arrayHelpers => (
                    <>
                      {values?.panels &&
                        values?.panels?.map((panels, index) => (
                          <Grid
                            container
                            spacing={2}
                            key={index}
                            justifyContent="flex-start"
                            alignItems={'flex-start'}
                          >
                            <Grid item xs={4}>
                              <TextfieldWrapper
                                name={`panels.${index}.name`}
                                readOnly={false}
                                textLabelStyle={textLabel}
                                textLabel="Name"
                                otherProps={otherPropsRequired}
                                // onChange={e => {
                                //   setFieldValue(`panels.${index}.name`);
                                // }}
                              />
                            </Grid>

                            <Grid item xs={4}>
                              <TextfieldWrapper
                                name={`panels.${index}.email`}
                                readOnly={false}
                                textLabelStyle={textLabel}
                                textLabel="Email"
                                otherProps={otherPropsRequired}
                                // onChange={e => {
                                //   setFieldValue(`panels.${index}.name`);
                                // }}
                              />
                            </Grid>

                            <Grid item xs={4} alignSelf="center">
                              <Stack
                                direction="row"
                                spacing={1}
                                justifyContent="center"
                                alignItems="center"
                              >
                                {'id' in values.panels[index] ? (
                                  <IconButton
                                    type="button"
                                    disableRipple
                                    size="large"
                                    aria-label="back"
                                    color="primary"
                                    // onClick={() => deletePanels(values.panels[index])}
                                    onClick={() =>
                                      handleSplice(values.panels, index)
                                    }
                                  >
                                    <Delete />
                                  </IconButton>
                                ) : (
                                  <>
                                    {values.panels.length > 1 && (
                                      <IconButton
                                        type="button"
                                        disableRipple
                                        size="large"
                                        aria-label="back"
                                        color="primary"
                                        onClick={() =>
                                          handleSplice(values.panels, index)
                                        }
                                      >
                                        <Delete />
                                      </IconButton>
                                    )}
                                  </>
                                )}

                                {'id' in values.panels[index]
                                  ? // <IconButton
                                    //   type='submit'
                                    //   disableRipple
                                    //   size='large'
                                    //   aria-label='back'
                                    //   color='primary'
                                    //   onClick={() => updatePanels(values.panels[index], index, values.panels)}>
                                    //   <SaveIcon />
                                    // </IconButton>
                                    null
                                  : // <IconButton
                                    //   type='submit'
                                    //   disableRipple
                                    //   size='large'
                                    //   aria-label='back'
                                    //   color='primary'
                                    //   onClick={() => addPanels(values.panels[index], index, values.panels)}>
                                    //   <AddTaskIcon />
                                    // </IconButton>
                                    null}
                              </Stack>
                            </Grid>
                          </Grid>
                        ))}
                    </>
                  )}
                </FieldArray>

                <Stack alignItems={'flex-end'}>
                  <Tooltip title="Add panel" arrow placement="right">
                    <IconButton
                      type="button"
                      disableRipple
                      size="large"
                      aria-label="back"
                      color="primary"
                      onClick={() => handleAdd(values.panels)}
                      // disabled={count >= 5}
                    >
                      <AddCircleOutlineOutlined />
                    </IconButton>
                  </Tooltip>
                </Stack>
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
                  {panelInfo.length > 0 ? 'Update' : 'Submit'}
                </Button>
              </Grid>
            </DialogActions>
          </form>
        )}
      </Formik>
    </BootstrapDialog>
  );
};

export default InterviewPanelsPopup;
