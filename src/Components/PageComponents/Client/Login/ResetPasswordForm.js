import ShadowButtonSubmit from '@/buttonComponents/ShadowButtonSubmit';
import Textfield from '@/formComponents/FormsUI/Textfield';
import AuthFormLayout from '@/layouts/AuthFormLayout';
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
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import * as Yup from 'yup';

import { LoadingContext } from '@/reUsableComponents/LoadingComponents/LoadingContext';
import { useDispatch } from 'react-redux';

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
const ResetTypography = styled(Typography)(({ theme }) => ({
  fontSize: '22px',
  lineHeight: '28.96px',
  fontWeight: '800',
  color: '#000000',
  fontFamily: 'Urbanist',
  cursor: 'pointer',
  [theme.breakpoints.down('sm')]: {
    fontSize: '14px',
    lineHeight: '25.34px',
    fontWeight: '600',
    display: 'none',
  },
}));

const ResetPasswordForm = () => {
  const router = useRouter();
  console.log(router.query, 'query');
  console.log('GUId:', router.query.guid);
  const { setLoading } = useContext(LoadingContext);
  const dispatch = useDispatch();
  const theme = useTheme();

  const INITIAL_FORM_STATE = {
    password: '',
    confirmPassword: '',
  };

  const FORM_VALIDATION = Yup.object().shape({
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf(
        [Yup.ref('password'), null],
        'Confirm Reset Password must be same as Password '
      )
      .required('Confirm Password is required'),
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
    console.log(!showPassword);
  };
  const handleClickShowResetPassword = () => {
    setShowResetPassword(!showResetPassword);
    console.log(!showPassword);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  const Reset = async (guid, password) => {
    setLoading(true);
    var accountApi = new AccountApi();
    try {
      const response = await accountApi.apiAccountResetPasswordGuidPasswordGet(
        guid,
        password
      );
      setLoading(false);
      if (response.body.message === 'Password Reset Success.') {
        dispatch(
          setAlertPopup({
            message: 'Password reset successfully.',
            type: 'success',
            duration: 3000,
          })
        );
        router.replace('/client/login');
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
      setLoading(false);
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
    <AuthFormLayout>
      <Formik
        initialValues={{
          ...INITIAL_FORM_STATE,
        }}
        validationSchema={FORM_VALIDATION}
        onSubmit={async (values, { resetForm }) => {
          console.log('val', values);
          Reset(router.query.guid, values.password);
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
              justifyContent="flex-start"
              alignItems="flex-end"
            >
              <Grid
                item
                xs={12}
                md={7}
                sx={{ [theme.breakpoints.up('sm')]: { minWidth: 300 } }}
              >
                <Stack spacing={4}>
                  <ResetTypography>Reset Password</ResetTypography>
                  <Textfield
                    autoComplete="off"
                    name="password"
                    textLabel="Reset Password"
                    type={showPassword ? 'text' : 'password'}
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
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Textfield
                    autoComplete="off"
                    name="confirmPassword"
                    textLabel="Confirm Reset Password"
                    type={showResetPassword ? 'text' : 'password'}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowResetPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            size="large"
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
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
                  height="50px"
                  width="100%"
                  minwidth="250px"
                  maxwidth="275px"
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
    </AuthFormLayout>
  );
};

export default ResetPasswordForm;
