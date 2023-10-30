import GetValuesAutocomplete from '@/formComponents/FormsUI/GetValuesAutocomplete';
import { MyJdViewer } from '@/pageComponents/JobDescription/ViewJd';
import { otherPropsRequired } from '@/reUsableComponents/FormComponents';
import textLabel from '@/src/Components/LabelComponents/TextLabel';
import { setAlertPopup } from '@/store/alertSlice';
import { JdAndAssessmentApi } from '@/swagger_api/*';
import { debounce } from '@/utils/CommonFunctions/Functions';
import { useTheme } from '@emotion/react';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import { Formik } from 'formik';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { BootstrapDialog, BootstrapDialogTitle } from './PoupComponents';

function InviteCandidateAssessmentPopup({
  isDialogOpened,
  handleCloseDialog,
  popUpInfo,

  handleSubmitInviteCandidateAssessmentPopup,
}) {
  const { jdData } = useContext(MyJdViewer);
  const dispatch = useDispatch();
  const theme = useTheme();
  const [assessmentNames, setAssessmentNames] = useState([]);
  const jdAndAssessmentApi = useMemo(() => new JdAndAssessmentApi(), []);

  const handleClose = (event, reason) => {
    if (reason && reason === 'backdropClick') return;

    handleCloseDialog(false);
  };

  // useEffect(() => {
  //   handleInputChangeAssessmentName('');
  // }, []);

  const handleInputChangeAssessmentName = debounce(async (event, newValue) => {
    let opts = {
      name: newValue,
    };

    await assessmentApi
      .apiass(opts)
      .then(async response => {
        const trim =
          response?.body?.result?.map((res, index) => ({
            title: res?.title,
            year: res?.id,
          })) || [];
        setAssessmentNames(trim);
      })
      .catch(function (error) {
        console.log(error);
        setAssessmentNames([]);
      });
  }, 300);

  // const GetAssessmentList = useCallback(async () => {
  //   try {
  //     const response = await jdAndAssessmentApi.apiJdAndAssessmentGetAssessmentByIdJdIdGet(jdData.id);
  //     console.log('responseeee', response);
  //     const trim =
  //       response?.body?.result?.map((res, index) => ({
  //         title: res?.title,
  //         year: res?.id,
  //       })) || [];
  //     setAssessmentNames(trim);
  //     console.log('gettt', trim);
  //   } catch (error) {
  //     console.log(error);
  //     setAssessmentNames([]);
  //   }
  // }, [jdAndAssessmentApi, jdData]);
  const GetAssessmentList = useCallback(async () => {
    try {
      const response =
        await jdAndAssessmentApi.apiJdAndAssessmentGetAssessmentByIdJdIdGet(
          jdData.id
        );
      console.log('responseeee', response);
      if (response.body.message === 'No Records Found.') {
        dispatch(
          setAlertPopup({
            message:
              'Please ensure that the Jobs assessments are tagged to schedule the assessment.',
            type: 'info',
            duration: 3000,
          })
        );
        console.log(response.body.message);
      } else {
        const trim =
          response?.body?.result?.map((res, index) => ({
            title: res?.title,
            year: res?.id,
          })) || [];
        setAssessmentNames(trim);
        console.log('gettt', trim);
      }
    } catch (error) {
      console.log(error);
      setAssessmentNames([]);
    }
  }, [dispatch, jdAndAssessmentApi, jdData]);

  useEffect(() => {
    GetAssessmentList();
  }, [GetAssessmentList]);

  const SubmitDetails = async values => {
    console.log('sub', values, popUpInfo);
    const combinedValues = { formValues: values, rowValues: popUpInfo };
    handleSubmitInviteCandidateAssessmentPopup(combinedValues);
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
        onClose={() => {
          handleClose();
        }}
      >
        <Typography
          variant="menutitle"
          align="center"
          sx={{ fontSize: '16px', textAlign: 'center', color: 'black' }}
        >
          Invite Candidate For Assessment
        </Typography>
      </BootstrapDialogTitle>

      <Formik
        initialValues={{
          aid: '',
          date: '',
        }}
        validationSchema={yup.object().shape({
          aid: yup.mixed().required('Please select assessment'),

          // date: yup.mixed().required('Please select date'),
        })}
        onSubmit={values => SubmitDetails(values)}
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
              <Grid
                container
                sx={{ mt: 0.5 }}
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                {/* <Grid item xs={12} sm={6} alignSelf='flex-start'>
                  <HandleInputChangeAutocomplete
                    isNotAdd={true}
                    readOnly={false}
                    otherProps={otherProps}
                    options={assessmentNames}
                    handleInputChange={handleInputChangeAssessmentName}
                    name='aid'
                    textLabelStyle={textLabel}
                    label='Select Assessment'
                    placeHolder='Select your assessment'
                    value={values.aid}
                    onChange={(e, value) => {
                      setFieldValue('aid', value);
                    }}
                  />
                </Grid> */}
                <Grid item xs={12} md={6}>
                  <GetValuesAutocomplete
                    otherProps={otherPropsRequired}
                    options={assessmentNames}
                    textLabelStyle={textLabel}
                    name="aid"
                    label="Jobs Assessment"
                    placeHolder="Select Jobs assessment"
                    value={values.aid}
                    onChange={(e, value) => {
                      setFieldValue('aid', value);
                    }}
                  />

                  {assessmentNames.length === 0 && (
                    <Typography
                      variant="body2"
                      color="error"
                      sx={{ fontSize: '13px' }}
                    >
                      Kindly tag the Jobs assessments to appear here.
                    </Typography>
                  )}
                </Grid>
              </Grid>
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
                  variant="contained"
                  onClick={handleSubmit}
                >
                  Invite
                </Button>
              </Grid>
            </DialogActions>
          </form>
        )}
      </Formik>
    </BootstrapDialog>
  );
}

export default InviteCandidateAssessmentPopup;
