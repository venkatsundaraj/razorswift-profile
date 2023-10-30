import ShadowButtonSubmit from '@/buttonComponents/ShadowButtonSubmit';
import Textfield from '@/formComponents/FormsUI/Textfield';
import AuthFormLayout from '@/layouts/AuthFormLayout';
import { LoadingContext } from '@/reUsableComponents/LoadingComponents/LoadingContext';
import { setAlertPopup } from '@/store/alertSlice';
import { AccountApi } from '@/swagger_api/*';
import { localStorageUtil } from '@/utils/CommonFunctions/localStorageUtil';
import { validateContactNumber } from '@/utils/validationSchema';
import {
  Grid,
  Link as MuiLink,
  Stack,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import { Form, Formik } from 'formik';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
// import Select from '@/formComponents/FormsUI/Select';

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

const LoginForm = () => {
  const dispatch = useDispatch();
  const { loading, setLoading } = useContext(LoadingContext);
  const [isUserExists, setIsUserExists] = useState(false);
  const theme = useTheme();
  const router = useRouter();
  const INITIAL_FORM_STATE = {
    mobileNumber: '',
  };
  const FORM_VALIDATION = Yup.object().shape({
    mobileNumber: validateContactNumber('Mobile Number', true),
  });
  const CheckIsValidUser = async values => {
    setLoading(true);

    var accountApi = new AccountApi();
    const opts = {
      body: {
        contactNumber: `91${values.mobileNumber}`,
      },
    };
    await accountApi
      .apiAccountValidateCandidatePost(opts)
      .then(async response => {
        if (response.body.message === 'User Exists.') {
          localStorageUtil.setItem('loginDetails', opts.body);

          router.push({ pathname: `/otp`, query: { path: 'login' } });
          setLoading(false);
        } else {
          setLoading(false);
          setIsUserExists(true);
          dispatch(
            setAlertPopup({
              message: response.body.message,
              type: 'error',
              duration: 3000,
            })
          );
        }
      })
      .catch(function (error) {
        setLoading(false);
        dispatch(
          setAlertPopup({
            message: 'Something went wrong Please try Again !',
            type: 'error',
            duration: 3000,
          })
        );
        console.log(error);
      });
  };

  const CheckIsValidUserLogin = async values => {
    console.log(values.mobileNumber);
    setLoading(true);

    var accountApi = new AccountApi();
    const opts = {
      body: {
        contactNumber: `91${values.mobileNumber}`,
      },
    };

    await accountApi
      .apiAccountValidateCandidatePost(opts)
      .then(async response => {
        if (response.body.message === 'User Exists.') {
          localStorageUtil.setItem('loginDetails', opts.body);
          Login(values);
          setLoading(false);
        } else {
          setLoading(false);
          Swal.fire({
            icon: 'error',
            title: `User does not exists`,
            text: 'Please sign up.',
          });
        }
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  };
  const Login = async values => {
    setLoading(true);
    var accountApi = new AccountApi();
    const opts = {
      body: {
        contactNumber: `91${values.mobileNumber}`,
        isOTPValidated: true,
      },
    };

    await accountApi
      .apiAccountCandidateLogInPost(opts)
      .then(async response => {
        setLoading(false);
        if (response.body.message === 'Authentication Successful.') {
          localStorageUtil.setItem('userDetails', response.body.result);
          localStorageUtil.setItem('token', response.body.result.token);
          if (response.body.result.candidate.isStudent === null) {
            router.push('/candidatedocument');
          } else {
            router.push('/profile');
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops..',
            text: response.body.message,
          });
        }
      })
      .catch(function (error) {
        setLoading(false);
        console.log(error);
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  };
  return (
    <AuthFormLayout>
      <Formik
        initialValues={{
          ...INITIAL_FORM_STATE,
        }}
        validationSchema={FORM_VALIDATION}
        onSubmit={async values => {
          CheckIsValidUser(values);
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
              spacing={2}
              justifyContent="flex-start"
              alignItems="flex-end"
            >
              <Grid
                item
                xs={12}
                md={7}
                sx={{ [theme.breakpoints.up('sm')]: { minWidth: 300 } }}
              >
                <Stack spacing={1}>
                  <Textfield
                    autoFocus
                    autoComplete="off"
                    name="mobileNumber"
                    type="tel"
                    onChange={e => {
                      setIsUserExists(false);
                      setFieldValue(
                        'mobileNumber',
                        e.target.value.replace(/[^0-9]/g, '')
                      );
                    }}
                    textLabel="Mobile Number"
                  />
                  {isUserExists && (
                    <Stack justifyContent={'center'} alignItems="center">
                      <Typography>
                        User does not exists click to
                        <MuiLink
                          sx={{ textDecoration: 'none' }}
                          component={NextLink}
                          prefetch={false}
                          href={{
                            pathname: `/signup`,
                            query: { mobile: `91${values.mobileNumber}` },
                          }}
                          legacyBehavior
                        >
                          Sign up
                        </MuiLink>
                      </Typography>
                    </Stack>
                  )}
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
              {/* <Grid item xs={12} md={12} textAlign='center'>
                <ShadowButtonSubmit
                  height='50px'
                  width='100%'
                  minwidth='250px'
                  maxwidth='275px'
                  backgroundcolor={theme.palette.primary.main}
                  type='button'
                  onClick={() => CheckIsValidUserLogin(values)}>
                  <ButtonText color='#fff'>Login Otp</ButtonText>
                </ShadowButtonSubmit>
              </Grid> */}
            </Grid>
          </Form>
        )}
      </Formik>
    </AuthFormLayout>
  );
};

export default LoginForm;
