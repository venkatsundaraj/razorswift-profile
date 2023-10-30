import TextfieldWrapper from '@/formComponents/FormsUI/Textfield';
import { otherProps } from '@/pageComponents/Profile/Common/Properties/Properties';
import textLabel from '@/src/Components/LabelComponents/TextLabel';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { BootstrapDialog, BootstrapDialogTitle } from './PoupComponents';

function PassOrFailCandidateJobOpeningPopup({
  isDialogOpened,
  handleCloseDialog,
  handleFunction,
  title,
}) {
  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    if (reason && reason === 'backdropClick') return;
    handleCloseDialog(false);
  };
  const SubmitDetails = async values => {
    console.log('sub', values);

    handleFunction(values.reason);
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
          {title || 'Reason'}
        </Typography>
      </BootstrapDialogTitle>

      <Formik
        initialValues={{
          reason: '',
        }}
        validationSchema={yup.object().shape({
          reason: yup.string().required('Please enter remarks'),
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
                    textLabel="Reason for rejection"
                    otherProps={otherProps}
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

export default PassOrFailCandidateJobOpeningPopup;
