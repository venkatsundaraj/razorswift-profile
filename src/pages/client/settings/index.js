import ShadowButtonSubmit from '@/buttonComponents/ShadowButtonSubmit';
import MainCard from '@/cardComponents/MainCard';
import CkEditorForm from '@/formComponents/FormsUI/CkEditorForm';
import TextfieldWrapper from '@/formComponents/FormsUI/Textfield';
import ClientLayout from '@/layouts/NavLayout/ClientLayout';
import SubmissionButton from '@/pageComponents/Profile/Common/Components/SubmissionButton';
import {
  otherPropsNotRequired,
  otherPropsRequired,
} from '@/reUsableComponents/FormComponents';
import { ButtonText } from '@/reUsableComponents/FormComponets';
import { LoadingContext } from '@/reUsableComponents/LoadingComponents/LoadingContext';
import textLabel from '@/src/Components/LabelComponents/TextLabel';
import MuiDateTimePicker from '@/src/Components/MuiDateTimePicker';
import { setAlertPopup } from '@/store/alertSlice';
import { ClientApi } from '@/swagger_api/api/CityApi';
import { formatDate } from '@/utils/CommonFunctions/DateRelatedFunction';
import { localStorageUtil } from '@/utils/CommonFunctions/localStorageUtil';
import { otpRegExp } from '@/utils/regex';
import { Box, Grid, Stack, Typography, styled, useTheme } from '@mui/material';
import { Form, Formik } from 'formik';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

function Dangerous({ text }) {
  return (
    <>
      {typeof window !== 'undefined' && text && (
        <Typography
          sx={{
            color: '#1D1D1D',
            fontWeight: '500',
            fontSize: '16px',
            lineHeight: '19px',
            textAlign: 'inherit',
            '@media (max-width: 600px)': {
              fontWeight: '500',
              fontSize: '12px',
              lineHeight: '14.4px',
            },
          }}
          component="div"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      )}
    </>
  );
}
const NormalListText = styled(Typography)(({ theme }) => ({
  textTransform: 'none',
  color: '#1D1D1D',
  fontWeight: '500',
  fontSize: '15px',
  lineHeight: '21px',
  [theme.breakpoints.down('sm')]: {
    fontWeight: '500',
    fontSize: '12px',
    lineHeight: '17px',
  },
}));
const SubTitle = styled(Typography)(({ theme, weight, color, lineHeight }) => ({
  color: color || '#1D1D1D',
  fontWeight: weight || '500',
  fontSize: '16px',
  lineHeight: lineHeight || '19px',
  textAlign: 'inherit',
  wordWrap: 'break-word',
  [theme.breakpoints.down('sm')]: {
    fontWeight: weight || '500',
    fontSize: '12px',
    lineHeight: lineHeight || '14.4px',
  },
}));

const Title = styled(Typography)(({ theme, weight, color, lineHeight }) => ({
  color: color || '#434343',
  fontWeight: weight || '500',
  fontSize: '13px',
  lineHeight: lineHeight || '18px',
  textAlign: 'inherit',
  wordWrap: 'break-word',
  [theme.breakpoints.down('sm')]: {
    fontWeight: weight || '500',
    fontSize: '11px',
    lineHeight: lineHeight || '14.4px',
  },
}));

const INITIAL_FORM_STATE = {
  name: '',
  gstNumber: '',
  status: '',
  isBranched: '',
  webSite: '',
  companySize: '',
  dateOfOnBoarding: '',
  typeOfService: '',
  isActive: '',
  assignment: '',
  brief: '',
  businessVerticalId: '',
  companyProfile: '',
};
const FORM_VALIDATION = Yup.object().shape({
  companySize: Yup.string()
    .trim()
    .matches(otpRegExp, 'Company Size must be a number')
    .min(1, 'Company Size is required')
    .max(6, 'Company Size cannot exceed 6 digits'),
  dateOfOnBoarding: Yup.date()
    .nullable()
    .required('Date of Onboarding is required'),
  companyProfile: Yup.string().required('Company Profile is required'),
});
const Settings = () => {
  const [readOnly, setReadOnly] = useState(true);
  const [initialValues, setInitialValues] = useState(INITIAL_FORM_STATE);
  const dispatch = useDispatch();
  const theme = useTheme();
  const { setLoading } = useContext(LoadingContext);
  const clientDetails = localStorageUtil.getItem('clientDetails');
  const clientId = clientDetails?.contact?.clientId;
  console.log('clientiD', clientId);
  const clientApi = useMemo(() => new ClientApi(), []);

  const GetClient = useCallback(async () => {
    const id = clientId;
    try {
      const response = await clientApi.apiClientIdGet(id);
      if (response.body.message === 'Record Fetched Successfully.') {
        console.log('resss', response.body.result);
        setInitialValues(response.body.result);
      }
    } catch (error) {
      console.log(error);
    }
    return null;
  }, [clientApi, clientId]);

  const editClientsRegistration = async initialValues => {
    setLoading(true);
    //const { contacts, clientContracts, businessVertical, clientAddresses, ...data } = initialValues;
    const opts = {
      body: {
        id: clientId,
        ...initialValues,
      },
    };

    delete opts.body.clientAddresses;

    try {
      const response = await clientApi.apiClientPut(opts);
      setLoading(false);
      if (response.body.message === 'Updated Successfully.') {
        dispatch(
          setAlertPopup({
            message: 'Client updated successfully',
            type: 'success',
            duration: 3000,
          })
        );
        setReadOnly(true);
        GetClient();
      } else if (response.body.message === 'Already Exists.') {
        dispatch(
          setAlertPopup({
            message: 'Already exists.',
            type: 'error',
            duration: 3000,
          })
        );
      } else if (response.body.message === 'Updation Failed.') {
        dispatch(
          setAlertPopup({
            message: 'Updating failed',
            type: 'error',
            duration: 3000,
          })
        );
      }
    } catch (error) {
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
  useEffect(() => {
    GetClient();
  }, [GetClient]);
  console.log('initialValues', initialValues);

  return (
    <ClientLayout>
      <MainCard title="Settings">
        <Stack spacing={2} marginBottom={2}>
          {/* <NormalListText variant='body1' color='initial'>
            Role:
            {initialValues?.contacts && initialValues.contacts.length > 0
              ? initialValues.contacts[0].contactType === 1
                ? '    Admin'
                : '    User'
              : '-'}
          </NormalListText> */}
        </Stack>
        <Stack spacing={2}>
          {readOnly && (
            <Box alignSelf={'flex-end'}>
              <ShadowButtonSubmit
                height="50px"
                width="100px"
                minwidth="100px"
                maxwidth="250px"
                backgroundcolor={theme.palette.primary.main}
                type="button"
                disableRipple // Disable ripple effect on button click
                // Disable button interaction
                onClick={() => setReadOnly(false)}
              >
                <ButtonText color="#fff">Edit</ButtonText>
              </ShadowButtonSubmit>
            </Box>
          )}
          {readOnly && (
            <MainCard style={{ height: '380px' }}>
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1.5}
              >
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6} md={4}>
                    <Values title="Name" name={initialValues?.name || '-'} />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Values
                      title="Gst Number"
                      name={initialValues?.gstNumber || '-'}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={4}>
                    <Values
                      title="Type of Service"
                      name={initialValues?.typeOfService || '-'}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Values
                      title="Date of Onboarding"
                      name={formatDate(initialValues?.dateOfOnBoarding) || '-'}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Values
                      title="Company Size"
                      name={initialValues?.companySize || '-'}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Values
                      title="Website"
                      name={initialValues?.webSite || '-'}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={4}>
                    <Stack spacing={2}>
                      <Title>Company Profile</Title>
                      <SubTitle>
                        <Dangerous
                          text={initialValues?.companyProfile || '-'}
                        />
                      </SubTitle>
                    </Stack>
                  </Grid>
                </Grid>
              </Stack>
            </MainCard>
          )}

          {!readOnly && (
            <Formik
              enableReinitialize
              initialValues={{
                ...initialValues,
              }}
              validationSchema={FORM_VALIDATION}
              onSubmit={values => {
                editClientsRegistration(values);
                console.log('put', values);
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
                resetForm,
              }) => (
                <Form onSubmit={handleSubmit}>
                  <Stack spacing={2}>
                    <Grid container spacing={4}>
                      <Grid item xs={12} md={6}>
                        <TextfieldWrapper
                          name="name"
                          readOnly={true}
                          textLabel="Name"
                          textLabelStyle={textLabel}
                          otherProps={otherPropsRequired}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextfieldWrapper
                          name="gstNumber"
                          textLabel="Gst Number"
                          textLabelStyle={textLabel}
                          readOnly={true}
                          otherProps={otherPropsRequired}
                        />
                      </Grid>

                      {/* <Grid item xs={12} md={6}>
                  <Checkbox name='isBranched' legend='Is Branched' label='Is Branched' />
                </Grid> */}
                      <Grid item xs={12} md={6}>
                        <TextfieldWrapper
                          name="webSite"
                          textLabel="Website"
                          readOnly={true}
                          textLabelStyle={textLabel}
                          otherProps={otherPropsRequired}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextfieldWrapper
                          name="typeOfService"
                          textLabel="Type of Service"
                          textLabelStyle={textLabel}
                          readOnly={true}
                          otherProps={otherPropsRequired}
                        />
                      </Grid>
                      {/* <Grid item xs={12} md={6}>
                  <TextfieldWrapper
                    name='businessVertical?.name'
                    textLabel='Business vertical'
                    textLabelStyle={textLabel}
                    readOnly={readOnly}
                    otherProps={otherPropsRequired}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextfieldWrapper
                    name='brief'
                    textLabel='Brief'
                    textLabelStyle={textLabel}
                    readOnly={readOnly}
                    otherProps={otherPropsRequired}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextfieldWrapper
                    name='assignment'
                    textLabel='Assignment'
                    textLabelStyle={textLabel}
                    readOnly={readOnly}
                    otherProps={otherPropsRequired}
                  />
                </Grid> */}

                      <Grid item xs={12} md={6}>
                        <MuiDateTimePicker
                          formatValue={'date'}
                          textLabelStyle={textLabel}
                          name="dateOfOnBoarding"
                          textLabel="Date of Onboarding"
                          otherProps={otherPropsRequired}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <TextfieldWrapper
                          name="companySize"
                          textLabel="Company Size"
                          textLabelStyle={textLabel}
                          otherProps={otherPropsNotRequired}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <CkEditorForm
                          otherProps={otherPropsRequired}
                          textLabelStyle={textLabel}
                          name="companyProfile"
                          label="Company Profile"
                        />
                      </Grid>
                    </Grid>

                    {!readOnly && (
                      <Stack
                        direction={'row'}
                        justifyContent="flex-end"
                        spacing={2}
                      >
                        <SubmissionButton
                          onClick={() => {
                            resetForm();
                            setReadOnly(true);
                          }}
                        >
                          Cancel
                        </SubmissionButton>
                        <SubmissionButton onClick={handleSubmit}>
                          Update
                        </SubmissionButton>
                      </Stack>
                    )}
                  </Stack>
                </Form>
              )}
            </Formik>
          )}
        </Stack>
      </MainCard>
    </ClientLayout>
  );
};

export default Settings;
const Values = ({ title, name }) => {
  return (
    <Stack spacing={2}>
      <Title>{title}</Title>
      <SubTitle>{name}</SubTitle>
    </Stack>
  );
};
