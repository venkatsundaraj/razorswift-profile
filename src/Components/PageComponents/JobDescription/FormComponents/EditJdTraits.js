import ShadowButtonSubmit from '@/buttonComponents/ShadowButtonSubmit';
import LoginFormCard from '@/cardComponents/Admin/LoginFormCard';
import TextfieldWrapper from '@/formComponents/FormsUI/Textfield';
import { otherPropsRequired } from '@/reUsableComponents/FormComponents';
import { ButtonText } from '@/reUsableComponents/FormComponets';
import { LoadingContext } from '@/reUsableComponents/LoadingComponents/LoadingContext';
import textLabel from '@/src/Components/LabelComponents/TextLabel';
import { UrlPaths } from '@/src/data/UrlPaths';
import { setAlertPopup } from '@/store/alertSlice';
import { JdTraitApi } from '@/swagger_api/api/CandidateSkillApi';
import { showConfirmationDialog } from '@/utils/CommonFunctions/SwalFunctions';
import { nameOtherValidationContact } from '@/utils/validationSchema';
import { useTheme } from '@emotion/react';
import { AddCircleOutlineOutlined, Delete } from '@mui/icons-material';
import AddTaskIcon from '@mui/icons-material/AddTask';
import SaveIcon from '@mui/icons-material/Save';
import { Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { FieldArray, Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { MyFormContext } from './JdStepper';

function hasDuplicates(values) {
  const titleSet = new Set();

  for (const softSkillEntry of values.softSkill) {
    titleSet.add(softSkillEntry.title);
  }

  for (const traitEntry of values.traits) {
    if (titleSet.has(traitEntry.name)) {
      return true; // Found a duplicate
    }
  }

  return false; // No duplicates found
}

const INITIAL_FORM_STATE = {
  traits: [
    {
      name: '',
      weight: '',
    },
  ],
};

const validationSchema = Yup.object().shape({
  traits: Yup.array().of(
    Yup.object().shape({
      //name: nameValidation('Name', true),
      name: nameOtherValidationContact('Name', true),
    })
  ),
});

const EditJdTraits = ({ onSubmit }) => {
  const {
    activeStep,
    setActiveStep,
    stepOneData,

    EditData,
    role,
    GetJdById,
  } = useContext(MyFormContext);

  const UrlBase =
    role === 'Admin' ? `${UrlPaths.adminJd}` : `${UrlPaths.clientJd}`;
  const { setLoading } = useContext(LoadingContext);
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch();
  const jdTraits = new JdTraitApi();

  const [count, setCount] = useState(1);

  const [jdInfoInitialValues, setJdInfoInitialValues] =
    useState(INITIAL_FORM_STATE);

  useEffect(() => {
    let trim;
    if (stepOneData?.jdTraits.length > 0) {
      trim = stepOneData?.jdTraits?.map(res => ({
        id: res?.id,
        weight: res?.weight,
        name: res?.name,
      }));
    } else {
      trim = [
        {
          name: '',
          weight: '',
        },
      ];
    }

    setJdInfoInitialValues({ traits: trim });
  }, [stepOneData]);

  const handleAdd = arrayHelpers => {
    arrayHelpers.push({
      name: '',
      weight: '0',
    });
    setCount(count + 1);
  };

  const handleSplice = (arrayHelpers, index) => {
    arrayHelpers.splice(index, 1);
    setCount(count - 1);
  };
  const addTraits = async (post, index, traits, values) => {
    console.log(post, 'post');
    setLoading(true);
    console.log(values);
    console.log(stepOneData);
    const fullObject = {
      softSkill: stepOneData?.jdSoftSkills?.map(res => ({
        year: res?.id,
        title: res?.name,
      })),
      traits: values.traits,
    };
    console.log(fullObject);
    console.log(hasDuplicates(fullObject));

    let hasDuplicatesTraits = hasDuplicates(fullObject);

    if (hasDuplicatesTraits) {
      setLoading(false);
      dispatch(
        setAlertPopup({
          message:
            'Duplicate Entry found kindly crosscheck in Soft skills and Other Soft Skills cannot be added',
          type: 'error',
          duration: 3000,
        })
      );
    } else {
      const opts = {
        body: { ...post, jobDescriptionId: stepOneData?.id, weight: '0' },
      };
      console.log('traites', opts);
      try {
        const response = await jdTraits.apiJdTraitPost(opts);
        setLoading(false);
        if (response.body.message === 'Created Successfully.') {
          dispatch(
            setAlertPopup({
              message: 'Other Soft Skill created successfully',
              type: 'success',
              duration: 3000,
            })
          );
          console.log(response.body.message);

          GetJdById(stepOneData?.id);
        } else {
          GetJdById(stepOneData?.id);
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
  const updateTraits = async (post, index, traits, values) => {
    // setLoading(true);
    console.log(values);
    console.log(stepOneData);
    const fullObject = {
      softSkill: stepOneData?.jdSoftSkills?.map(res => ({
        year: res?.id,
        title: res?.name,
      })),
      traits: values.traits,
    };
    console.log(fullObject);
    console.log(hasDuplicates(fullObject));

    let hasDuplicatesTraits = hasDuplicates(fullObject);

    if (hasDuplicatesTraits) {
      // Handle duplicate skill platforms
      setLoading(false);
      dispatch(
        setAlertPopup({
          message:
            'Duplicate Entry found kindly crosscheck in Soft skills and Other Soft Skills cannot be added',
          type: 'error',
          duration: 3000,
        })
      );
    } else {
      const opts = {
        body: { ...post, jobDescriptionId: stepOneData?.id, weight: '0' },
      };
      try {
        const response = await jdTraits.apiJdTraitPut(opts);
        setLoading(false);
        if (response.body.result) {
          dispatch(
            setAlertPopup({
              message: 'Other Soft Skill updated successfully',
              type: 'success',
              duration: 3000,
            })
          );
          console.log(response.body.message);
          GetJdById(stepOneData?.id);
        } else {
          GetJdById(stepOneData?.id);
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

  const deleteTraits = async post => {
    const confirmDelete = async () => {
      try {
        const response = await jdTraits.apiJdTraitIdDelete(post.id);
        if (response.body.result) {
          dispatch(
            setAlertPopup({
              message: 'Other Soft Skill deleted successfully',
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
          message: 'You have reverted the delete action',
          type: 'info',
          duration: 3000,
        })
      );
    };

    showConfirmationDialog(
      'Are you sure?',
      'You want to delete this Other Soft Skill!',
      confirmDelete,
      revertDelete
    );
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{ ...jdInfoInitialValues }}
      validationSchema={validationSchema}
      onSubmit={values => {
        console.log(values);
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
        resetForm,
      }) => (
        <>
          <Typography sx={{ alignSelf: 'flex-start', ...textLabel, mb: 1 }}>
            Other soft skills
          </Typography>
          <Form>
            <Grid container spacing={2} id="section-1">
              <Grid item xs={12} md={8}></Grid>
              <LoginFormCard sx={{ width: 900 }}>
                <Grid item xs={12} md={8}>
                  <FieldArray name="traits">
                    {arrayHelpers => (
                      <>
                        {values.traits &&
                          values.traits.map((traits, index) => (
                            <Grid
                              container
                              spacing={2}
                              key={index}
                              justifyContent="flex-start"
                              alignItems={'flex-start'}
                            >
                              <Grid item xs={4}>
                                <TextfieldWrapper
                                  name={`traits.${index}.name`}
                                  readOnly={false}
                                  textLabelStyle={textLabel}
                                  textLabel="Name"
                                  otherProps={otherPropsRequired}
                                  // onChange={e => {
                                  //   setFieldValue(`traits.${index}.name`);
                                  // }}
                                />
                              </Grid>

                              {/* <Grid item xs={4}>
                                  <TextfieldWrapper
                                    name={`traits.${index}.weight`}
                                    readOnly={false}
                                    textLabelStyle={textLabel}
                                    textLabel='Weight'
                                     otherProps={otherPropsRequired}
                                    // onChange={e => {
                                    //   setFieldValue(`traits.${index}.name`);
                                    // }}
                                  />
                                </Grid> */}

                              <Grid item xs={4} alignSelf="center">
                                <Stack
                                  direction="row"
                                  spacing={1}
                                  justifyContent="center"
                                  alignItems="center"
                                >
                                  {values.traits.length > 1 &&
                                    ('id' in values.traits[index] ? (
                                      <IconButton
                                        type="submit"
                                        disableRipple
                                        size="large"
                                        aria-label="back"
                                        color="primary"
                                        onClick={() =>
                                          deleteTraits(values.traits[index])
                                        }
                                      >
                                        <Delete />
                                      </IconButton>
                                    ) : (
                                      <IconButton
                                        type="submit"
                                        disableRipple
                                        size="large"
                                        aria-label="back"
                                        color="primary"
                                        onClick={() =>
                                          handleSplice(values.traits, index)
                                        }
                                      >
                                        <Delete />
                                      </IconButton>
                                    ))}

                                  {'id' in values.traits[index] ? (
                                    <IconButton
                                      type="button"
                                      disableRipple
                                      size="large"
                                      aria-label="back"
                                      color="primary"
                                      onClick={() =>
                                        updateTraits(
                                          values.traits[index],
                                          index,
                                          values.traits,
                                          values
                                        )
                                      }
                                    >
                                      <SaveIcon />
                                    </IconButton>
                                  ) : (
                                    <IconButton
                                      type="submit"
                                      disableRipple
                                      size="large"
                                      aria-label="back"
                                      color="primary"
                                      onClick={() => {
                                        if (values.traits[index].name) {
                                          handleSubmit();
                                          addTraits(
                                            values.traits[index],
                                            index,
                                            values.traits,
                                            values
                                          );
                                        }
                                      }}
                                    >
                                      <AddTaskIcon />
                                    </IconButton>
                                  )}
                                </Stack>
                              </Grid>
                            </Grid>
                          ))}
                      </>
                    )}
                  </FieldArray>
                  <Stack alignItems={'flex-end'}>
                    <Tooltip title="Add Traits" arrow placement="right">
                      <IconButton
                        type="button"
                        disableRipple
                        size="large"
                        aria-label="back"
                        color="primary"
                        onClick={() => handleAdd(values.traits)}
                        // disabled={count >= 5}
                      >
                        <AddCircleOutlineOutlined />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </Grid>
              </LoginFormCard>
              <Grid item xs={12} md={6} textAlign="center">
                <Stack direction={'row'} spacing={1}>
                  <ShadowButtonSubmit
                    height="50px"
                    width="100%"
                    minwidth="250px"
                    maxwidth="350px"
                    backgroundcolor={theme.palette.primary.main}
                    type="button"
                    onClick={() => setActiveStep(activeStep - 1)}
                  >
                    <ButtonText color="#fff">Back</ButtonText>
                  </ShadowButtonSubmit>
                  <ShadowButtonSubmit
                    height="50px"
                    width="100%"
                    minwidth="250px"
                    maxwidth="350px"
                    backgroundcolor={theme.palette.primary.main}
                    type="button"
                    onClick={() => {
                      router.replace({
                        pathname: `${UrlBase}view`,
                        query: { guId: stepOneData.uniqueGuid },
                      });
                    }}
                  >
                    <ButtonText color="#fff">View</ButtonText>
                  </ShadowButtonSubmit>
                </Stack>
              </Grid>
            </Grid>
          </Form>
        </>
      )}
    </Formik>
  );
};
export default EditJdTraits;
