import CheckboxWrapper from '@/components_fbl/FormComponents/FormUI/Checkbox/CheckboxWrapper';
import InputField from '@/components_fbl/FormComponents/FormUI/InputField/InputField';
import SubmitButton from '@/components_fbl/FormComponents/FormUI/SubmitButton/SubmitButton';
import ParagraphHeading from '@/components_fbl/headingComponents/ParagraphHeading';
import SubtitleHeading from '@/components_fbl/headingComponents/SubtitleHeading';
import { LoadingContext } from '@/reUsableComponents/LoadingComponents/LoadingContext';
import CoursesPageSelectWrapper from '@/src/components_fbl/FormComponents/FormUI/Select/CoursesSelectWrapper';
import Layout from '@/src/components_fbl/NavigationComponents/Layout';
import ToastProvider from '@/src/components_fbl/Provider/ToastProvider';
import CustomSection from '@/src/components_fbl/globalComponents/CustomContainer/CustomSection';
import CustomImage from '@/src/components_fbl/globalComponents/CustomImage/CustomImage';
import { edTechData } from '@/src/constants/Courses/coursesPageData';
import { AccountApi } from '@/swagger_api/*';
import { submitEnrollUserData } from '@/utils/enrollUser';
import {
  getCourseList,
  getSelectedCourse,
  getSelectedCourseData,
} from '@/utils/getCourseList';
import {
  alphabetsValidationSchema,
  emailValidation,
  validateContactNumber,
} from '@/utils/validationSchema';
import styled from '@emotion/styled';
import {
  Box,
  Container,
  Grid,
  InputLabel,
  Stack,
  Typography,
} from '@mui/material';
import { AxiosError } from 'axios';
import { Form, Formik } from 'formik';
import Head from 'next/head';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

const INITIAL_FORM_STATE = {
  fullName: '',
  email: '',
  transactionNumber: '',
  mobileNumber: '',
  existedUser: '',
  acceptTermsAndConditions: true,
  paymentMethod: 'Paytm',
};

const CustomCheckBox = styled(Link)(({ theme }) => ({
  fontSize: '14px',
  lineHeight: '16.8px',
  fontWeight: '600',
  color: theme.palette.primary.main,
  fontFamily: 'Urbanist',
  cursor: 'pointer',
  padding: 0,
  [theme.breakpoints.down('sm')]: {
    fontSize: '12px',
    lineHeight: '14.4px',
    fontWeight: '600',
  },
}));

const FORM_VALIDATION = Yup.object().shape({
  fullName: alphabetsValidationSchema('Full Name', true),
  email: emailValidation('Email', true),
  mobileNumber: validateContactNumber('Mobile Number', true),
  existedUser: Yup.string().max(200),
  transactionNumber: Yup.number().required('Transaction ID is required'),
  acceptTermsAndConditions: Yup.boolean().oneOf(
    [true],
    'The acceptance of Terms and Conditions is required.'
  ),
});

function EnrollForm({ data }) {
  const { loading, setLoading } = useContext(LoadingContext);
  const [course, setCourse] = useState(data);
  const [courseData, setCourseData] = useState({});

  useEffect(() => {
    const getData = async function () {
      const data = await getSelectedCourseData();
      if (!data) return;
      setCourseData(data);
    };
    getData();
  }, []);

  const enrollUser = async function (values, { setSubmitting, resetForm }) {
    try {
      setSubmitting(true);
      setLoading(true);

      let accountApi = new AccountApi();

      const opts = {
        body: {
          contactNumber: `91${values.mobileNumber}`,
          fullName: values.fullName.trim(),
          email: values.email.trim(),
          existedUser: values.existedUser ? values.existedUser : '',
          transactionNumber: values.transactionNumber,
          paymentMethod: values.paymentMethod,
          ...course,
        },
      };

      // const response = await new Promise(resolve => setTimeout(resolve, 2000));

      const result = await submitEnrollUserData(opts.body);
      if (result.status === 'Success') {
        toast.success('We will react you soon. Thank you.');
      }
      console.log(result, 'toast');
      resetForm();
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err);
      }
      return toast.error('Something went wrong. Please try after some time');
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };
  return (
    <Layout>
      <Head>
        <title>{course.name}</title>

        <meta name="description" content={course.description} />
      </Head>
      <ToastProvider>
        <Box component="main">
          <CustomSection style={{ padding: 'clamp(96px,8vw,140px) 0 32px' }}>
            <Container>
              <Grid container>
                <Grid item xs={12}>
                  <Stack
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center"
                    sx={{ mb: 2, width: '100%' }}
                  >
                    <Box
                      sx={{
                        color: 'primaryPalette.black',
                        flexBasis: { xs: '70%', sm: '80%' },
                      }}
                    >
                      <ParagraphHeading sx={{ mb: 0.4 }}>
                        Course Chosen
                      </ParagraphHeading>
                      <SubtitleHeading style={{ fontWeight: 'bold' }}>
                        {course.name}
                      </SubtitleHeading>
                    </Box>
                    <Box
                      sx={{
                        color: 'primaryPalette.black',
                        justifySelf: 'flex-end',
                      }}
                    >
                      <ParagraphHeading sx={{ mb: 0.4, textAlign: 'end' }}>
                        Course ID
                      </ParagraphHeading>
                      <SubtitleHeading
                        style={{ fontWeight: 'bold', textAlign: 'end' }}
                      >
                        {course.id}
                      </SubtitleHeading>
                    </Box>
                  </Stack>
                </Grid>

                <Grid item sm={12}>
                  <Typography
                    sx={{
                      color: '#000000',
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: 'clamp(24px, 2vw, 32px)',
                      mb: 2,
                    }}
                  >
                    Welcome to your Upskilling journey!
                  </Typography>
                </Grid>
                <Grid item sm={12}>
                  {courseData.main_text ? (
                    <ParagraphHeading
                      sx={{
                        textAlign: 'center',
                        color: '3A3A3A',
                      }}
                    >
                      {courseData.main_text}
                    </ParagraphHeading>
                  ) : (
                    <ParagraphHeading>Loading...</ParagraphHeading>
                  )}
                </Grid>
              </Grid>

              <Grid container alignItems="center">
                <Grid item xs={12} md={6}>
                  <Stack
                    sx={{
                      width: '100%',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      mt: { xs: 4, md: 0 },
                    }}
                  >
                    {courseData.title ? (
                      <ParagraphHeading
                        sx={{
                          textAlign: 'center',
                          color: '3A3A3A',
                        }}
                      >
                        {courseData.title}
                      </ParagraphHeading>
                    ) : (
                      <ParagraphHeading>Loading...</ParagraphHeading>
                    )}
                    <CustomImage
                      src={edTechData.qrImage}
                      width="clamp(300px, 40vw, 390px)"
                      aspectRatio="1/1"
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box>
                    <Formik
                      initialValues={INITIAL_FORM_STATE}
                      validationSchema={FORM_VALIDATION}
                      onSubmit={(values, { setSubmitting, resetForm }) => {
                        enrollUser(values, { setSubmitting, resetForm });
                      }}
                    >
                      {({
                        handleChange,
                        handleBlur,
                        values,
                        errors,
                        isSubmitting,
                        setFieldValue,
                      }) => (
                        <Form style={{ padding: 'clamp(12px,4vw,40px)' }}>
                          <Stack
                            flexDirection="column"
                            alingItems="center"
                            gap={3}
                          >
                            <Grid
                              container
                              spacing={3}
                              alingItems="center"
                              justifyContent="center"
                            >
                              <Grid item xs={12}>
                                <InputLabel
                                  htmlFor="filled-hidden-label-small"
                                  sx={{
                                    mb: 1.4,
                                    fontSize: 'clamp(16px, 1.6vw, 18px)',
                                    color: 'primaryPalette.black',
                                    fontWeight: '500',
                                  }}
                                >
                                  Full Name
                                </InputLabel>
                                <InputField
                                  sx={{
                                    borderRadius: '100vw',
                                    outline: 'none',
                                    backgroundColor: '#dedede',
                                    '& fieldset': { border: 'none' },
                                  }}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  fullWidth
                                  hiddenLabel
                                  id="filled-hidden-label-small"
                                  value={values.fullName}
                                  error={errors.fullName}
                                  type="text"
                                  variant="filled"
                                  name="fullName"
                                  label=""
                                  InputProps={{
                                    disableUnderline: true,
                                    sx: { borderRadius: '40px' },
                                  }}
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <InputLabel
                                  htmlFor="filled-hidden-label-small"
                                  sx={{
                                    mb: 1.4,
                                    fontSize: 'clamp(16px, 1.6vw, 18px)',
                                    color: 'primaryPalette.black',
                                    fontWeight: '500',
                                  }}
                                >
                                  Mobile Number
                                </InputLabel>
                                <Grid container alignItems="start">
                                  <Grid item xs={3} sm={2}>
                                    <Stack
                                      alignItems="center"
                                      justifyContent="center"
                                      sx={{
                                        borderRadius: 10,
                                        px: 2,
                                        py: 2,
                                        border: '1px solid #D1D1D1',
                                        mr: 2,
                                      }}
                                    >
                                      <Typography
                                        sx={{
                                          fontSize: '18px',
                                          color: 'primaryPalette.black',
                                          borderBottom: '1px solid #3A3A3A',
                                          display: 'block',
                                          lineHeight: '16px',
                                        }}
                                      >
                                        +91
                                      </Typography>
                                    </Stack>
                                  </Grid>
                                  <Grid item xs={9} sm={10}>
                                    <InputField
                                      sx={{
                                        borderRadius: '100vw',
                                        outline: 'none',
                                        backgroundColor: '#dedede',
                                        '& fieldset': { border: 'none' },
                                      }}
                                      fullWidth
                                      onChange={e => {
                                        setFieldValue(
                                          'mobileNumber',
                                          e.target.value.replace(/[^0-9]/g, '')
                                        );
                                      }}
                                      onBlur={handleBlur}
                                      value={values.mobileNumber}
                                      error={errors.mobileNumber}
                                      hiddenLabel
                                      id="filled-hidden-label-small"
                                      type="tel"
                                      variant="filled"
                                      name="mobileNumber"
                                      label=""
                                      InputProps={{
                                        disableUnderline: true,
                                        sx: { borderRadius: '40px' },
                                      }}
                                    />
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item xs={12}>
                                <InputLabel
                                  htmlFor="filled-hidden-label-small"
                                  sx={{
                                    mb: 1.4,
                                    fontSize: 'clamp(16px, 1.6vw, 18px)',
                                    color: 'primaryPalette.black',
                                    fontWeight: '500',
                                  }}
                                >
                                  Email Address
                                </InputLabel>
                                <InputField
                                  sx={{
                                    borderRadius: '100vw',
                                    outline: 'none',
                                    backgroundColor: '#dedede',
                                    '& fieldset': { border: 'none' },
                                  }}
                                  fullWidth
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.email}
                                  error={errors.email}
                                  hiddenLabel
                                  id="filled-hidden-label-small"
                                  type="email"
                                  variant="filled"
                                  name="email"
                                  label=""
                                  InputProps={{
                                    disableUnderline: true,
                                    sx: { borderRadius: '40px' },
                                  }}
                                />
                              </Grid>

                              <Grid item xs={12}>
                                <InputLabel
                                  htmlFor="filled-hidden-label-small"
                                  sx={{
                                    mb: 1.4,
                                    fontSize: 'clamp(16px, 1.6vw, 18px)',
                                    color: 'primaryPalette.black',
                                    fontWeight: '500',
                                  }}
                                >
                                  Input RazorSwift Profile URL, if you are an
                                  existing user
                                </InputLabel>
                                <InputField
                                  sx={{
                                    borderRadius: '100vw',
                                    outline: 'none',
                                    backgroundColor: '#dedede',
                                    '& fieldset': { border: 'none' },
                                  }}
                                  fullWidth
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.existedUser}
                                  error={errors.existedUser}
                                  hiddenLabel
                                  id="filled-hidden-label-small"
                                  type="text"
                                  variant="filled"
                                  name="existedUser"
                                  label=""
                                  InputProps={{
                                    disableUnderline: true,
                                    sx: { borderRadius: '40px' },
                                  }}
                                />
                              </Grid>

                              <Grid item xs={12}>
                                <InputLabel
                                  htmlFor="filled-hidden-label-small"
                                  sx={{
                                    mb: 1.4,
                                    fontSize: 'clamp(16px, 1.6vw, 18px)',
                                    color: 'primaryPalette.black',
                                    fontWeight: '500',
                                  }}
                                >
                                  Transaction ID
                                </InputLabel>
                                <Grid container spacing={2}>
                                  <Grid item xs={4} sm={4}>
                                    <CoursesPageSelectWrapper
                                      placeholder="Payment Method"
                                      name="paymentMethod"
                                      label="paymentMethod"
                                      textlabel="Payment Method"
                                      required
                                      sx={{
                                        color: 'pinkPalette.dark',
                                        width: '100%',
                                        position: 'relative',
                                        background: 'transparent',
                                        '& .MuiSelect-icon': {
                                          transition: 'all 0.265s ease',
                                          top: 'calc(50% - 16px)',
                                          width: '16px',
                                        },
                                        '.MuiSelect-outlined': {
                                          background: 'transparent',
                                        },
                                        '.MuiTypography-root': {
                                          color: 'pinkPalette.dark',
                                        },
                                        '.MuiOutlinedInput-notchedOutline': {
                                          border: 0,
                                        },
                                        '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline':
                                          {
                                            border: 0,
                                          },
                                        '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
                                          {
                                            border: 0,
                                          },
                                        '& .MuiSelect-icon': {
                                          top: 'calc(50% - 14px)',

                                          transition: 'all 0.265s ease',
                                          width: '20px',
                                        },
                                        '&:after': {
                                          content: "''",
                                          position: 'absolute',
                                          width: '108%',
                                          transform: 'translate(-50%,-50%)',
                                          zIndex: '-1',
                                          backgroundColor:
                                            'pinkPalette.navLight',
                                          height: '100%',
                                          top: '50%',
                                          left: '50%',
                                          borderRadius: 4,
                                        },
                                      }}
                                    />
                                  </Grid>
                                  <Grid item xs={8} sm={8}>
                                    <InputField
                                      sx={{
                                        borderRadius: '100vw',
                                        outline: 'none',
                                        backgroundColor: '#dedede',
                                        '& fieldset': { border: 'none' },
                                      }}
                                      fullWidth
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.transactionNumber}
                                      error={errors.transactionNumber}
                                      hiddenLabel
                                      id="filled-hidden-label-small"
                                      type="text"
                                      variant="filled"
                                      name="transactionNumber"
                                      label=""
                                      InputProps={{
                                        disableUnderline: true,
                                        sx: { borderRadius: '40px' },
                                      }}
                                    />
                                  </Grid>
                                </Grid>
                              </Grid>

                              <Grid item xs={12}>
                                <Stack
                                  justifyContent="center"
                                  flexDirection="row"
                                >
                                  <CheckboxWrapper
                                    component={
                                      <CustomCheckBox
                                        sx={{ textDecoration: 'none' }}
                                        component={Link}
                                        prefetch={false}
                                        href={'/termsofservices'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                      >
                                        Terms and conditions
                                      </CustomCheckBox>
                                    }
                                    name="acceptTermsAndConditions"
                                    legend="accept Terms And Conditions"
                                    label="I Accept"
                                  />
                                </Stack>
                              </Grid>
                              <Stack
                                sx={{
                                  alignSelf: 'center',
                                }}
                                flexDirection="column"
                                alignItems="center"
                                gap="14px"
                              >
                                <SubmitButton
                                  disabled={isSubmitting}
                                  type="submit"
                                  sx={{
                                    backgroundColor: 'violetPalette.dark',
                                    color: '#fff',
                                    '&:hover': {
                                      backgroundColor: 'violetPalette.dark',
                                      color: '#fff',
                                    },
                                  }}
                                >
                                  Submit
                                </SubmitButton>
                              </Stack>
                            </Grid>
                          </Stack>
                        </Form>
                      )}
                    </Formik>
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </CustomSection>
        </Box>
      </ToastProvider>
    </Layout>
  );
}

export default EnrollForm;

// export async function getServerSideProps(context) {
//   const { params } = context;

//   const courseId = params.courseId;

//   const filteredCourse = await getSelectedCourse(courseId);

//   return {
//     props: {
//       data: filteredCourse,
//     },
//   };
// }

export async function getStaticProps(context) {
  const { params } = context;

  const courseId = params.courseId;

  const filteredCourse = await getSelectedCourse(courseId);

  return {
    props: {
      data: filteredCourse,
    },
  };
}

export async function getStaticPaths() {
  const lists = await getCourseList();

  if (!lists.courses.length) return;
  const ids = lists.courses.map(item => item.id);

  const paths = ids.map(id => ({ params: { courseId: id.toString() } }));

  return {
    paths,
    fallback: false,
  };
}
