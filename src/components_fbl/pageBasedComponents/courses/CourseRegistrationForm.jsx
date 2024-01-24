import CheckboxWrapper from '@/components_fbl/FormComponents/FormUI/Checkbox/CheckboxWrapper';
import InputField from '@/components_fbl/FormComponents/FormUI/InputField/InputField';
import SubmitButton from '@/components_fbl/FormComponents/FormUI/SubmitButton/SubmitButton';
import ExtraParagraphHeading from '@/components_fbl/headingComponents/ExtraParagraphHeading';
import ParagraphHeading from '@/components_fbl/headingComponents/ParagraphHeading';
import SubtitleHeading from '@/components_fbl/headingComponents/SubtitleHeading';
import { LoadingContext } from '@/reUsableComponents/LoadingComponents/LoadingContext';
import CustomSection from '@/src/components_fbl/globalComponents/CustomContainer/CustomSection';
import { AccountApi } from '@/swagger_api/*';
import { submitEnrollUserData } from '@/utils/enrollUser';
import {
  getSelectedCourseData,
  getSelectedCourseDataNew,
} from '@/utils/getCourseList';
import { validateContactNumber } from '@/utils/validationSchema';
import styled from '@emotion/styled';
import {
  Box,
  Container,
  Grid,
  InputLabel,
  Stack,
  Typography,
} from '@mui/material';
import Modal from '@mui/material/Modal';
import { AxiosError } from 'axios';
import { Form, Formik } from 'formik';
import { Parser } from 'html-to-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';

const INITIAL_FORM_STATE = {
  mobileNumber: '',
  acceptTermsAndConditions: true,
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
  mobileNumber: validateContactNumber('Mobile Number', true),
  acceptTermsAndConditions: Yup.boolean().oneOf(
    [true],
    'The acceptance of Terms and Conditions is required.'
  ),
});

function CourseRegistrationForm({ data }) {
  const { loading, setLoading } = useContext(LoadingContext);
  const [course, setCourse] = useState(data);
  const [courseData, setCourseData] = useState({});
  const [courseDataOne, setCourseDataOne] = useState({});
  const [enrollUrl, setEnrollUrl] = useState('');
  const [open, setOpen] = useState(null);

  const router = useRouter();
  const htmlParser = new Parser();

  useEffect(() => {
    const getData = async function () {
      const data = await getSelectedCourseData();
      const data1 = await getSelectedCourseDataNew();
      console.log(data, data1);
      if (!data.enroll_page && !data1.enroll_page) return;
      setCourseData(data.enroll_page);
      setCourseDataOne(data1.enroll_page);
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
          phone_number: values.mobileNumber ? `91${values.mobileNumber}` : '',
          course_id: +course.id,
          course_amount: +course.internal_amount,
          isprod: true,
        },
      };

      console.log(opts.body);

      const result = await submitEnrollUserData(opts.body);
      console.log(result);
      if (result.status === 'Success') {
        toast.success('We will react you soon. Thank you.');
        setOpen(true);
        setEnrollUrl(result.payment_link);
      }

      resetForm();
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err);
      }
      console.log(err);
      return toast.error(err.message);
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };
  return (
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

            <Grid container spacing={2}>
              <Grid item md={2}></Grid>
              <Grid item xs={12} md={8}>
                <Stack
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    fontSize: 'clamp(14px, 1.4vw, 16px)',
                    lineHeight: '1.5',
                    py: 2,
                    fontWeight: 'normal',
                    color: 'primaryPalette.black',
                  }}
                >
                  {courseDataOne.instructions ? (
                    <ExtraParagraphHeading
                      sx={{
                        color: 'primaryPalette.black',
                        textAlign: 'center',
                        fontWeight: '500',
                      }}
                    >
                      {htmlParser.parse(courseDataOne.instructions)}
                    </ExtraParagraphHeading>
                  ) : (
                    <ExtraParagraphHeading
                      sx={{ color: 'primaryPalette.black' }}
                    >
                      Loading...
                    </ExtraParagraphHeading>
                  )}
                </Stack>
              </Grid>
              <Grid item md={2}></Grid>
            </Grid>
            <Grid container>
              <Grid item xs={1} md={3}></Grid>
              <Grid item xs={10} md={6}>
                <Stack
                  sx={{
                    fontSize: 'clamp(14px, 1.4vw, 16px)',
                    lineHeight: '1.5',
                    py: 2,
                    fontWeight: 'normal',
                    color: 'primaryPalette.black',
                  }}
                >
                  {courseDataOne.steps ? (
                    htmlParser.parse(courseDataOne.steps)
                  ) : (
                    <ParagraphHeading sx={{ color: 'primaryPalette.black' }}>
                      Loading...
                    </ParagraphHeading>
                  )}
                </Stack>
              </Grid>
              <Grid item xs={1} md={3}></Grid>
            </Grid>
          </Grid>

          <Grid container alignItems="center">
            {/* <Grid item xs={12} md={2}></Grid> */}
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
                      <Stack flexDirection="column" alingItems="center" gap={3}>
                        <Grid
                          container
                          spacing={3}
                          alingItems="center"
                          justifyContent="center"
                        >
                          <Grid item xs={12}>
                            {courseDataOne.textbox_label ? (
                              <InputLabel
                                htmlFor="filled-hidden-label-small"
                                sx={{
                                  mb: 2,
                                  fontSize: 'clamp(14px, 1.6vw, 16px)',
                                  color: 'primaryPalette.black',
                                  fontWeight: '500',
                                  textWrap: 'wrap',
                                  display: 'flex',
                                }}
                              >
                                {courseDataOne.textbox_label}
                              </InputLabel>
                            ) : (
                              <ParagraphHeading
                                sx={{ color: 'primaryPalette.black' }}
                              >
                                Loading...
                              </ParagraphHeading>
                            )}
                            <InputField
                              name="mobileNumber"
                              id="filled-hidden-label-small"
                              onChange={e => {
                                setFieldValue(
                                  'mobileNumber',
                                  e.target.value.replace(/[^0-9]/g, '')
                                );
                              }}
                              onBlur={handleBlur}
                              hiddenLabel
                              InputProps={{
                                disableUnderline: true,
                                sx: { borderRadius: '40px' },
                                startAdornment: (
                                  <Typography
                                    sx={{
                                      fontWeight: 500,
                                      color: '#212121',
                                      marginRight: '5px',
                                    }}
                                  >
                                    +91
                                  </Typography>
                                ),
                              }}
                              type="tel"
                              label=""
                              sx={{
                                borderRadius: '100vw',
                                outline: 'none',
                                backgroundColor: '#dedede',
                                '& fieldset': { border: 'none' },
                              }}
                              max={10}
                              value={values.mobileNumber}
                              variant="filled"
                              error={errors.mobileNumber}
                            />
                          </Grid>

                          <Grid item xs={12}>
                            <Stack justifyContent="center" flexDirection="row">
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
                                mt: 2,
                                '&:hover': {
                                  backgroundColor: 'violetPalette.dark',
                                  color: '#fff',
                                },
                              }}
                            >
                              {courseData.Button_label
                                ? courseData.Button_label
                                : 'Submit'}
                            </SubmitButton>
                          </Stack>

                          <Grid container sx={{ mt: 4 }}>
                            <Grid item xs={12}>
                              <Stack
                                sx={{
                                  fontSize: 'clamp(14px, 1.4vw, 16px)',
                                  lineHeight: '1.5',
                                  py: 2,
                                  fontWeight: 'normal',
                                  color: 'primaryPalette.black',
                                }}
                              >
                                {courseDataOne.confirmation ? (
                                  <ExtraParagraphHeading
                                    sx={{
                                      color: 'primaryPalette.black',
                                      textAlign: 'center',
                                    }}
                                  >
                                    {htmlParser.parse(
                                      courseDataOne.confirmation
                                    )}
                                  </ExtraParagraphHeading>
                                ) : (
                                  <ExtraParagraphHeading
                                    sx={{ color: 'primaryPalette.black' }}
                                  >
                                    Loading...
                                  </ExtraParagraphHeading>
                                )}

                                {courseDataOne.support ? (
                                  <ParagraphHeading
                                    sx={{
                                      color: 'primaryPalette.black',
                                      textAlign: 'center',
                                      mt: 2,
                                    }}
                                  >
                                    {htmlParser.parse(courseDataOne.support)}
                                  </ParagraphHeading>
                                ) : (
                                  <ParagraphHeading
                                    sx={{
                                      color: 'primaryPalette.black',
                                      textAlign: 'center',
                                    }}
                                  >
                                    Loading...
                                  </ParagraphHeading>
                                )}
                              </Stack>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Stack>
                    </Form>
                  )}
                </Formik>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack alignItems={'center'} justifyContent={'center'}>
                <ParagraphHeading>Hello world</ParagraphHeading>
              </Stack>
            </Grid>
          </Grid>
          <Modal
            open={open}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Stack
              sx={{
                backgroundColor: 'primaryPalette.white',
                padding: 6,
                borderRadius: 4,
              }}
              flexDirection={'column'}
              gap={2}
            >
              <ParagraphHeading
                sx={{
                  color: 'primaryPalette.black',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  maxWidth: '320px',
                }}
              >
                Thank you for choosing us. Please use the below link to enroll.
              </ParagraphHeading>
              <ParagraphHeading
                sx={{ textDecoration: 'underline', textAlign: 'center' }}
              >
                {enrollUrl}
              </ParagraphHeading>
            </Stack>
          </Modal>
        </Container>
      </CustomSection>
    </Box>
  );
}

export default CourseRegistrationForm;
