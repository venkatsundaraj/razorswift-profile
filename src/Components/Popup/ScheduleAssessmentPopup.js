import HandleInputChangeAutocomplete from '@/formComponents/FormsUI/HandleInputChangeAutocomplete';
import { otherProps } from '@/pageComponents/Profile/Common/Properties/Properties';
import { LoadingContext } from '@/reUsableComponents/LoadingComponents/LoadingContext';
import textLabel from '@/src/Components/LabelComponents/TextLabel';
import { setAlertPopup } from '@/store/alertSlice';
import { AssessmentApi } from '@/swagger_api/*';
import { debounce } from '@/utils/CommonFunctions/Functions';
import { localStorageUtil } from '@/utils/CommonFunctions/localStorageUtil';
import { callApi } from '@/utils/apirequest';
import { useTheme } from '@emotion/react';
import CloseIcon from '@mui/icons-material/Close';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = props => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

function ScheduleAssessmentPopup({
  isDialogOpened,
  handleCloseDialog,
  popUpInfo,
  CandidateAssessmentRequestListApi,
  setPopUpInfo,
}) {
  const dispatch = useDispatch();
  const { lodaing, setLoading } = useContext(LoadingContext);

  const userDetails = localStorageUtil.getItem('userDetails');
  const theme = useTheme();
  const [assessmentNames, setAssessmentNames] = useState([]);
  const assessmentApi = useMemo(() => new AssessmentApi(), []);

  const handleClose = (event, reason) => {
    if (reason && reason === 'backdropClick') return;
    handleCloseDialog(false);
    CandidateAssessmentRequestListApi();
  };

  useEffect(() => {
    handleInputChangeAssessmentName('');
  }, []);

  const handleInputChangeAssessmentName = debounce(async (event, newValue) => {
    let opts = {
      isSelfAssessment: true,
      title: newValue,
    };
    try {
      const response = await assessmentApi.apiAssessmentGetSelfAssessmentGet(
        opts
      );
      console.log(response);
      const result = response.body.result;
      const trim = Array.isArray(result)
        ? result.map((res, index) => ({
            title: res?.title,
            year: res?.id,
          }))
        : [];
      setAssessmentNames(trim);
    } catch (error) {
      console.log(error);
    }
  }, 300);

  // const SubmitDetails = async values => {
  const SubmitDetails = async (values, { resetForm }) => {
    console.log('sub', values, popUpInfo);
    setLoading(true);
    const data = {
      isprod: process.env.NEXT_PUBLIC_IS_PROD === 'true',
      data: {
        cid: popUpInfo.candidate_id,
        email: popUpInfo.email,
        c_nm: popUpInfo.name,
        aid: values.aid.year,
        req_id: popUpInfo.request_id,
      },
    };
    console.log('data', data);

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
          handleCloseDialog();
        } else if (
          response.data.status === 200 &&
          response.data.sent === true
        ) {
          dispatch(
            setAlertPopup({ message: message, type: 'success', duration: 3000 })
          );
          handleCloseDialog();
          resetForm();
          handleInputChangeAssessmentName('');
        } else if (
          response.data.status === 200 &&
          response.data.sent === false
        ) {
          dispatch(
            setAlertPopup({ message: message, type: 'info', duration: 3000 })
          );
          handleCloseDialog();
          handleInputChangeAssessmentName('');
        } else {
          handleInputChangeAssessmentName('');
          dispatch(
            setAlertPopup({ message: message, type: 'info', duration: 3000 })
          );
          handleCloseDialog();
        }
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
        handleInputChangeAssessmentName('');
        dispatch(
          setAlertPopup({
            message: 'Something went wrong Please try Again !',
            type: 'error',
            duration: 3000,
          })
        );
      });
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
          Invite Candidate for Assessment
        </Typography>
      </BootstrapDialogTitle>

      <Formik
        initialValues={{
          aid: '',
        }}
        validationSchema={yup.object().shape({
          aid: yup.mixed().required('Please select Assessment'),
        })}
        // onSubmit={values => SubmitDetails(values)}
        onSubmit={(values, { resetForm }) =>
          SubmitDetails(values, { resetForm })
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
              <Grid
                container
                sx={{ mt: 0.5 }}
                spacing={2}
                justifyContent="center"
                alignItems="center"
              >
                <Grid item xs={12} sm={6} alignSelf="flex-start">
                  <HandleInputChangeAutocomplete
                    isNotAdd={true}
                    readOnly={false}
                    otherProps={otherProps}
                    options={assessmentNames}
                    handleInputChange={handleInputChangeAssessmentName}
                    name="aid"
                    textLabelStyle={textLabel}
                    label="Assessment"
                    placeHolder="Select Assessment"
                    value={values.aid}
                    onChange={(e, value) => {
                      setFieldValue('aid', value);
                    }}
                  />
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

export default ScheduleAssessmentPopup;
