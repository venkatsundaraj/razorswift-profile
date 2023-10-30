import ShadowButtonSubmit from '@/buttonComponents/ShadowButtonSubmit';
import Textfield from '@/formComponents/FormsUI/Textfield';
import AuthFormLayout from '@/layouts/AuthFormLayout';
import { ButtonText } from '@/reUsableComponents/FormComponets';
import { LoadingContext } from '@/reUsableComponents/LoadingComponents/LoadingContext';
import { setAlertPopup } from '@/store/alertSlice';
import { AccountApi } from '@/swagger_api/*';
import { localStorageUtil } from '@/utils/CommonFunctions/localStorageUtil';
import { emailValidation } from '@/utils/validationSchema';
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
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

const LoginTypography = styled(Typography)(({ theme }) => ({
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

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const theme = useTheme();
  const { setLoading } = useContext(LoadingContext);
  const INITIAL_FORM_STATE = {
    companyEmail: '',
    password: '',
    rememberme: true,
  };

  const FORM_VALIDATION = Yup.object().shape({
    companyEmail: emailValidation('Company Email ID', true),
    password: Yup.string().required('Password is required'),
    rememberme: Yup.boolean().oneOf([true], ''),
  });

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
    console.log(!showPassword);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };
  function handleClick() {
    alert('Password reset instructions have been sent to your email!');
  }

  const Login = async values => {
    setLoading(true);
    var accountApi = new AccountApi();
    const opts = {
      body: {
        email: values.companyEmail,
        password: values.password,
      },
    };

    try {
      const response = await accountApi.apiAccountLogInPost(opts);
      setLoading(false);
      if (response.body.message === 'Authentication Successful.') {
        localStorageUtil.setItem('clientDetails', response.body.result);
        console.log('guid', response.body.result.uniqueGuid);
        console.log('pwd', response.body.password);
        dispatch(
          setAlertPopup({
            message: 'Authentication Successful.',
            type: 'success',
            duration: 3000,
          })
        );
        if (
          response.body.result.isFirstTimeLogin ||
          response.body.result.isFirstTimeLogin === null
        ) {
          router.push({
            pathname: '/client/login/resetpassword/',
            query: { guid: response.body.result.uniqueGuid },
          });
        } else {
          router.push({
            pathname: '/client/dashboard',
            query: { guid: response.body.result.uniqueGuid },
          });
        }
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
          message: 'Something went wrong Please try Again !',
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
          console.log(values);
          Login(values, { resetForm });
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
                  <LoginTypography>Login to Razorswift</LoginTypography>

                  <Textfield
                    autoFocus
                    autoComplete="off"
                    name="companyEmail"
                    textLabel="Company Email ID"
                  />
                  <Textfield
                    autoComplete="off"
                    name="password"
                    textLabel="Password"
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
                  {/* <Box
                    display='flex'
                    justifyContent='space-between'
                    alignItems='center'
                    flexDirection='row'
                    marginTop={3}>
                    <Checkbox name='rememberme' legend='rememberme' label='Remember me' />

                    <Button variant='text' onClick={handleClick}>
                      <Typography variant='subtitle1' fontWeight='bold' sx={{ color: 'purple' }}>
                        Forgot password
                      </Typography>
                    </Button>
                  </Box> */}
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
                  <ButtonText color="#fff">Login</ButtonText>
                </ShadowButtonSubmit>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </AuthFormLayout>
  );
};

export default LoginForm;
