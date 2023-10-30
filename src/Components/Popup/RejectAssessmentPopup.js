import TextfieldWrapper from '@/formComponents/FormsUI/Textfield';
import { otherPropsRequired } from '@/reUsableComponents/FormComponents';
import { LoadingContext } from '@/reUsableComponents/LoadingComponents/LoadingContext';
import textLabel from '@/src/Components/LabelComponents/TextLabel';
import { setAlertPopup } from '@/store/alertSlice';
import { convertToSentenceCase } from '@/utils/CommonFunctions/StringConversion';
import { callApi } from '@/utils/apirequest';
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
import { useContext } from 'react';
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

function RejectAssessmentPopup({
  isDialogOpened,
  handleCloseDialog,
  popUpInfo,
  setPopUpInfo,
  CandidateAssessmentRequestListApi,
}) {
  const dispatch = useDispatch();
  const { loading, setLoading } = useContext(LoadingContext);

  const handleClose = (event, reason) => {
    if (reason && reason === 'backdropClick') return;
    handleCloseDialog(false);
    setLoading(false);
  };
  const SubmitDetails = async values => {
    console.log('sub', values, popUpInfo);
    setLoading(true);
    const data = {
      isprod: process.env.NEXT_PUBLIC_IS_PROD === 'true',
      data: {
        req_id: popUpInfo.request_id,
        reason: values.reason,
      },
    };
    callApi('AdminRejectInvite', data)
      .then(response => {
        setLoading(false);
        console.log(response, 'response');
        const message = convertToSentenceCase(response.data.message);
        if (response.data.status === 500) {
          dispatch(
            setAlertPopup({ message: message, type: 'error', duration: 3000 })
          );
          handleCloseDialog();
        } else if (response.data.status === 200) {
          dispatch(
            setAlertPopup({ message: message, type: 'success', duration: 3000 })
          );
          handleCloseDialog();
          CandidateAssessmentRequestListApi();
        }
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
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
          Reason for Rejection
        </Typography>
      </BootstrapDialogTitle>

      <Formik
        initialValues={{
          reason: '',
        }}
        validationSchema={yup.object().shape({
          reason: yup.string().required('Reason is required'),
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
                <Grid item xs={12} sm={6} alignSelf="flex-start">
                  <TextfieldWrapper
                    multiline
                    rows={3}
                    name="reason"
                    textLabelStyle={textLabel}
                    textLabel="Reason"
                    otherProps={otherPropsRequired}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions
              sx={{
                justifyContent: 'center',
              }}
            >
              {' '}
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
                  Submit
                </Button>
              </Grid>
            </DialogActions>
          </form>
        )}
      </Formik>
    </BootstrapDialog>
  );
}

export default RejectAssessmentPopup;
