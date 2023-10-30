import ShadowButtonSubmit from '@/buttonComponents/ShadowButtonSubmit';
import LoginFormCard from '@/cardComponents/Admin/LoginFormCard';
import Textfield from '@/formComponents/FormsUI/Textfield';
import IMAGES from '@/imageComponents/ImagePaths';
import NavbarLogoLink from '@/reUsableComponents/NavbarLogoLink';
import { setAlertPopup } from '@/store/alertSlice';
import { emailValidation } from '@/utils/validationSchema';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const theme = useTheme();
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
  const NavbarLogo = styled('div')(({ theme }) => ({
    cursor: 'pointer',
    [theme.breakpoints.down('md')]: {},
  }));
  const INITIAL_FORM_STATE = {
    email: '',
    password: '',
  };
  const FORM_VALIDATION = Yup.object().shape({
    email: emailValidation('Email', true),
    password: Yup.string().trim().required('Password is required'),
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
    console.log(!showPassword);
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  return (
    <Container maxWidth="xl" disableGutters>
      <Stack
        spacing={4}
        justifyContent={'center'}
        alignItems={'center'}
        sx={{ height: '100vh' }}
      >
        <NavbarLogo>
          <NavbarLogoLink src={IMAGES?.LOGO} alt="logo" url={'/'} />
        </NavbarLogo>
        <LoginFormCard sx={{ maxWidth: 600 }}>
          <Formik
            initialValues={{
              ...INITIAL_FORM_STATE,
            }}
            validationSchema={FORM_VALIDATION}
            onSubmit={async (values, { resetForm }) => {
              console.log('abc', values);
              if (
                values.email === 'admin@razorswift.net' &&
                values.password === 'admin@1234'
              ) {
                console.log('Login successful');
                dispatch(
                  setAlertPopup({
                    message: 'Logged in successfully',
                    type: 'success',
                    duration: 3000,
                  })
                );
                router.push('/admin/assessment/assessmentlist');
              } else {
                console.log('Login failed');
                dispatch(
                  setAlertPopup({
                    message: 'Authentication Failed',
                    type: 'error',
                    duration: 3000,
                  })
                );
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
              <Form onSubmit={handleSubmit}>
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  spacing={3}
                >
                  <Grid
                    container
                    spacing={4}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Grid item xs={12} md={12}>
                      <Textfield name="email" textLabel="Email" />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <Textfield
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
                    </Grid>

                    <Grid item xs={12} md={12} textAlign="center">
                      <ShadowButtonSubmit
                        height="40px"
                        width="40%"
                        minwidth="200px"
                        maxwidth="275px"
                        backgroundcolor={theme.palette.primary.main}
                        type="submit"
                        onClick={handleSubmit}
                      >
                        <ButtonText color="#fff">Login</ButtonText>
                      </ShadowButtonSubmit>
                    </Grid>
                  </Grid>
                </Stack>
              </Form>
            )}
          </Formik>
        </LoginFormCard>
      </Stack>
    </Container>
  );
};
export default LoginForm;
