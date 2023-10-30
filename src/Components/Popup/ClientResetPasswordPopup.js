import ShadowButtonSubmit from '@/buttonComponents/ShadowButtonSubmit';
import Textfield from '@/formComponents/FormsUI/Textfield';
import { setAlertPopup } from '@/store/alertSlice';
import { AccountApi } from '@/swagger_api/*';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
  styled,
  useTheme,
} from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { BootstrapDialog, BootstrapDialogTitle } from './PoupComponents';
const otherProps = { size: 'small', required: true };
const ButtonText = styled(Typography)(({ theme }) => ({
  textTransform: 'none',
  fontSize: '16px',
  fontWeight: '600',
  textAlign: 'center',
  lineHeight: '19.2px',
  [theme.breakpoints.down('md')]: {
    fontSize: '14px',
    lineHeight: '16.8px',
  },
}));

const FORM_VALIDATION = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Reset password is required'),
});

const ClientResetPasswordPopup = ({
  isDialogOpened,
  handleCloseDialog,
  popUpInfo,
}) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const textLabel = {
    color: ' rgba(106, 106, 106, 1)',
    fontWeight: '500',
    fontSize: '13px',
    lineHeight: '15.6px',
    textAlign: 'inherit',
    [theme.breakpoints.down('sm')]: {
      fontWeight: '500',
      fontSize: '11px',
      lineHeight: '13.2px',
    },
  };
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
    console.log(!showPassword);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const Reset = async (guid, password) => {
    var accountApi = new AccountApi();

    try {
      const response = await accountApi.apiAccountResetPasswordGuidPasswordGet(
        guid,
        password
      );
      if (response.body.message === 'Password Reset Success.') {
        dispatch(
          setAlertPopup({
            message: 'Password Reset Success.',
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
      console.log(error);
      dispatch(
        setAlertPopup({
          message: 'Something went wrong. Please try again!',
          type: 'error',
          duration: 3000,
        })
      );
    }
  };

  return (
    <BootstrapDialog
      disableAutoFocus
      disableRestoreFocus
      disableEnforceFocus
      onClose={(event, reason) => {
        if (reason !== 'backdropClick') {
          handleCloseDialog();
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
          handleCloseDialog();
        }}
      >
        <Typography
          variant="menutitle"
          align="center"
          sx={{ fontSize: '16px', textAlign: 'center', color: 'black' }}
        >
          {`${popUpInfo?.firstName || ''} ${popUpInfo?.middleName || ''} ${
            popUpInfo?.lastName || ''
          }`}
        </Typography>
      </BootstrapDialogTitle>

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
        <Formik
          initialValues={{
            password: '',
          }}
          validationSchema={FORM_VALIDATION}
          onSubmit={async (values, { resetForm }) => {
            console.log('val', values);
            Reset(popUpInfo?.uniqueGuid, values.password);
            handleCloseDialog();
            resetForm();
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
            <Form noValidate onSubmit={handleSubmit}>
              <Grid
                container
                spacing={4}
                justifyContent="center"
                alignItems="center"
              >
                <Grid
                  item
                  xs={12}
                  md={7}
                  sx={{ [theme.breakpoints.up('sm')]: { minWidth: 300 } }}
                >
                  <Stack spacing={4}>
                    <Textfield
                      autoComplete="off"
                      name="password"
                      textLabel="Reset Password"
                      type={showPassword ? 'text' : 'password'}
                      otherProps={{ ...otherProps }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                              size="large"
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Stack>
                </Grid>

                <Grid
                  item
                  xs={12}
                  md={7}
                  textAlign="center"
                  sx={{ [theme.breakpoints.up('sm')]: { minWidth: 300 } }}
                >
                  <ShadowButtonSubmit
                    height="40px"
                    width="50%"
                    minwidth="100px"
                    maxwidth="100px"
                    backgroundcolor={theme.palette.primary.main}
                    type="submit"
                    onClick={handleSubmit}
                  >
                    <ButtonText color="#fff">Reset</ButtonText>
                  </ShadowButtonSubmit>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </BootstrapDialog>
  );
};
export default ClientResetPasswordPopup;
