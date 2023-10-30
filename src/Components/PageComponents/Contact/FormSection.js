import ShadowButtonSubmit from '@/buttonComponents/ShadowButtonSubmit';
import Checkbox from '@/formComponents/FormsUI/Checkbox';
import SelectWrapper from '@/formComponents/FormsUI/Select';
import Textfield from '@/formComponents/FormsUI/Textfield';
import { otherPropsRequired } from '@/reUsableComponents/FormComponents';
import { LoadingContext } from '@/reUsableComponents/LoadingComponents/LoadingContext';
import { setAlertPopup } from '@/store/alertSlice';
import { reverseCheckAndSet } from '@/utils/CommonFunctions/Functions';
import { convertToSentenceCase } from '@/utils/CommonFunctions/StringConversion';
import { callApi } from '@/utils/apirequest';
import {
  alphabetsValidationSchema,
  emailValidation,
  nameValidationwithNoRegex,
  staticDropDownValidation,
  validateContactNumber,
} from '@/utils/validationSchema';
import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
  styled,
  useTheme,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Form, Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { marginBottom } from 'src/utils/commonStyles';
import * as Yup from 'yup';
const HeroHeader = styled(Typography)(({ theme }) => ({
  color: '#1D1D1D',
  fontSize: '26px',
  fontWeight: '600',
  lineHeight: '47.8px',
  textAlign: 'inherit',
  // padding: '0px 0px 20px 0px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '18px',
    lineHeight: '30px',
    textAlign: 'cenetr',
  },
}));
const HeroSubTitle = styled(Typography)(({ theme }) => ({
  color: 'linear-gradient(180deg, #F1231A 0%, #FE8B86 100%);',
  fontSize: '28px',
  fontWeight: '700',
  lineHeight: '47.8px',
  textAlign: 'inherit',

  [theme.breakpoints.down('sm')]: {
    fontSize: '18px',
    lineHeight: '21.6px',
  },
}));
const PhoneNumberText = styled(Typography)(({ theme }) => ({
  textTransform: 'none',
  color: '#1D1D1D',
  fontWeight: '500',
  fontSize: '18px',
  lineHeight: '31.68px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '14px',

    lineHeight: '24px',
  },
}));
const NavLink = styled(Link)(({ theme }) => ({
  fontSize: '20px',
  lineHeight: '47.8px',
  fontWeight: '600',
  textDecoration: 'none',
  color: theme.palette.primary.main,

  fontFamily: 'Urbanist',
  cursor: 'pointer',
  [theme.breakpoints.down('sm')]: {
    fontSize: '14px',
    lineHeight: '16.8px',
  },
}));

const ButtonText = styled(Typography)(({ theme }) => ({
  textTransform: 'none',
  fontSize: '18px',
  fontWeight: '600',
  textAlign: 'center',
  lineHeight: '26.68px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '16px',
    lineHeight: '20.01px',
  },
}));
const CustomContainer = styled(Container)(({ theme }) => ({
  minHeight: '500px',
  // background:
  //   ' linear-gradient(270deg, #F7F2FF 0%, rgba(247, 242, 255, 0) 204.26%);',
  display: 'flex',

  justifyContent: 'space-evenly',
  gap: 20,
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}));
const LabelLink = styled(Link)(({ theme }) => ({
  fontSize: '14px',
  lineHeight: '16.8px',
  fontWeight: '600',
  color: theme.palette.primary.main,
  fontFamily: 'Urbanist',
  cursor: 'pointer',
  [theme.breakpoints.down('sm')]: {
    fontSize: '12px',
    lineHeight: '14.4px',
    fontWeight: '600',
  },
}));

const FormSection = () => {
  const theme = useTheme();
  const router = useRouter();
  const { loading, setLoading } = useContext(LoadingContext);
  const dispatch = useDispatch();
  const { query } = router;
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const INITIAL_FORM_STATE = {
    fullName: '',
    companyName: '',
    email: '',
    mobileNumber: '',
    moreInfo: '',
    isSubscribe: false,
    reason: '',
  };

  const FORM_VALIDATION = Yup.object().shape({
    fullName: alphabetsValidationSchema('Full Name', true),
    reason: staticDropDownValidation('Looking For', true, valueName),
    companyName: nameValidationwithNoRegex('Company Name', true),
    email: emailValidation('Email', true),
    mobileNumber: validateContactNumber('Mobile Number', true),
    moreInfo: Yup.string().required('Tell us more is required'),
    isSubscribe: Yup.boolean().required('Do you want receive communication'),
  });

  return (
    <CustomContainer maxWidth="lg" sx={{ ...marginBottom }}>
      <Grid spacing={4} container>
        <Grid item xs={12} sm={6}>
          <Formik
            initialValues={{
              ...INITIAL_FORM_STATE,
              reason: query.value,
            }}
            validationSchema={FORM_VALIDATION}
            onSubmit={async (values, { resetForm }) => {
              console.log(values);
              setLoading(true);
              try {
                const response = await callApi(
                  'contactRequest',
                  reverseCheckAndSet(values)
                );
                setLoading(false);
                console.log(response, 'response');

                dispatch(
                  setAlertPopup({
                    message: convertToSentenceCase(response?.data),
                    type: 'success',
                    duration: 3000,
                  })
                );

                resetForm();
              } catch (error) {
                setLoading(false);
                console.log(error);
                dispatch(
                  setAlertPopup({
                    message: 'Something went wrong. Please try again!',
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
              <Form noValidate>
                <Grid
                  container
                  alignItems="center"
                  spacing={{ xs: 2, sm: 0 }}
                  sx={{ marginBottom: 2, paddingLeft: 1 }}
                >
                  <Grid item xs={8} md={6}>
                    <HeroSubTitle>
                      <span
                        style={{
                          background:
                            '-webkit-linear-gradient(#F1231A,#FE8B86)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        I am looking for *
                      </span>
                    </HeroSubTitle>
                  </Grid>
                  <Grid item xs={8} md={6}>
                    <SelectWrapper
                      backgroundColor={!matches ? '#E5E5E5' : '#ffffff'}
                      name="reason"
                      label="Reason"
                      textLabel="Reason"
                      noTextLabel
                      options={valueName}
                      required
                      placeholder="Looking For"
                    />
                  </Grid>
                </Grid>

                <Box
                  sx={{
                    border: '1px solid #E5E5E5',
                    boxShadow: '0px 4px 30px rgba(0, 0, 0, 0.02)',
                    padding: 2,
                    borderRadius: '20px',
                  }}
                >
                  <Grid container spacing={1} justifyContent="space-between">
                    <Grid item xs={12} md={8}>
                      <Textfield
                        name="fullName"
                        textLabel="Full Name"
                        otherProps={otherPropsRequired}
                      />
                    </Grid>

                    <Grid item xs={12} md={8}>
                      <Textfield
                        name="companyName"
                        textLabel="Company Name"
                        otherProps={otherPropsRequired}
                      />
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <Textfield
                        name="email"
                        textLabel="Email"
                        required
                        otherProps={otherPropsRequired}
                      />
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <Textfield
                        name="mobileNumber"
                        type="tel"
                        textLabel="Mobile Number"
                        otherProps={otherPropsRequired}
                      />
                    </Grid>
                    <Grid item xs={12} md={8}>
                      <Textfield
                        name="moreInfo"
                        textLabel="Tell us more"
                        multiline
                        rows={4}
                        otherProps={otherPropsRequired}
                      />
                    </Grid>

                    <Grid item xs={12} md={8}>
                      <Checkbox
                        name="isSubscribe"
                        legend="Terms Of Service"
                        label="I agree to receive communication from Razorswift  "
                        labelStyle={{
                          fontSize: '14px',
                          lineHeight: '16.8px',
                          fontWeight: '500',
                          cursor: 'pointer',
                          [theme.breakpoints.down('sm')]: {
                            fontSize: '12px',
                            lineHeight: '20px',
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} md={7}>
                      <ShadowButtonSubmit
                        height="50px"
                        width="100%"
                        minwidth="181px"
                        maxwidth="375px"
                        backgroundcolor={theme.palette.primary.main}
                        type="submit"
                        onClick={handleSubmit}
                      >
                        <ButtonText color="#fff">Send Message</ButtonText>
                      </ShadowButtonSubmit>
                    </Grid>
                  </Grid>
                </Box>
              </Form>
            )}
          </Formik>
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          justifyContent="space-evenly"
          sx={{ marginTop: { xs: 0, sm: 15, lg: 15 } }}
        >
          <Stack direction="column" spacing={1}>
            <HeroHeader>
              Have any question, Our experts are ready to help or get answers to
              your question with these links
            </HeroHeader>
            <Stack direction="column" spacing={1}>
              {/* <NavLink href="">Book a Demo</NavLink> */}
              <NavLink href="">Join our team</NavLink>
              {/* <NavLink href="">Get help</NavLink> */}
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </CustomContainer>
  );
};

export default FormSection;

const valueName = [
  { id: 1, value: 'demo', name: 'Demo' },
  { id: 2, value: 'partnership', name: 'Partnership' },
  { id: 3, value: 'job', name: 'Job' },
  { id: 4, value: 'mentorship', name: 'Mentorship' },
];
