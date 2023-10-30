import ShadowButtonSubmit from '@/buttonComponents/ShadowButtonSubmit';
import TextfieldWrapper from '@/formComponents/FormsUI/Textfield';
import { otherPropsNotRequired } from '@/reUsableComponents/FormComponents';
import { LoadingContext } from '@/reUsableComponents/LoadingComponents/LoadingContext';
import { CandidateApi } from '@/swagger_api/*';
import { Grid, Typography, styled, useTheme } from '@mui/material';
import { Form, Formik } from 'formik';
import { useContext, useState } from 'react';
import * as Yup from 'yup';

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

const INITIAL_FORM_STATE = {
  skill: '',
  skillPlatform: '',
  minimumExperience: '',
  maximumExperience: '',
};
const FORM_VALIDATION = Yup.object().shape({});

const AdvanceSearch = ({ setCandidatesList }) => {
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
  const [data, setData] = useState({});
  const { setLoading } = useContext(LoadingContext);
  const candidateApi = new CandidateApi();
  async function searchFilter(m) {
    setLoading(true);
    const opts = {
      skill: m?.skill || '',
      skillPlatform: m?.skillPlatform || '',
      minimumExperience: m?.minimumExperience || '',
      maximumExperience: m?.maximumExperience || '',
    };

    await candidateApi
      .apiCandidateGetAllBySearchFilterGet(opts)
      .then(async response => {
        setLoading(false);
        console.log('get', response);
        if (response.body.message === 'Records Fetched Successfully.') {
          const trim = response?.body?.result?.map((res, index) => ({
            slno: index + 1,
            ...res,
          }));
          console.log('trim', trim);
          setCandidatesList(prevState => ({
            ...prevState,
            rows: trim,
          }));
          setData(response?.body?.result);
        } else if (response.body.message === 'No Records Found.') {
          setCandidatesList(prevState => ({
            ...prevState,
            rows: [],
          }));
          setData([]);
        }
      })
      .catch(function (error) {
        setLoading(false);
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
  }

  return (
    <Formik
      enableReinitialize
      initialValues={{
        INITIAL_FORM_STATE,
      }}
      validationSchema={FORM_VALIDATION}
      onSubmit={async values => {
        searchFilter(values);
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
          <Typography variant="h1" sx={{ fontSize: 18, marginBottom: 2 }}>
            Advance Search
          </Typography>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={4} md={3}>
              <TextfieldWrapper
                name="skill"
                textLabel="Technology"
                textLabelStyle={textLabel}
                otherProps={otherPropsNotRequired}
              />
            </Grid>
            <Grid item xs={4} md={3}>
              <TextfieldWrapper
                name="skillPlatform"
                textLabel="Skill"
                textLabelStyle={textLabel}
                otherProps={otherPropsNotRequired}
              />
            </Grid>
            <Grid item xs={3} md={2}>
              <TextfieldWrapper
                name="minimumExperience"
                textLabel="Min Experience"
                textLabelStyle={textLabel}
                otherProps={otherPropsNotRequired}
              />
            </Grid>
            <Grid item xs={3} md={2}>
              <TextfieldWrapper
                name="maximumExperience"
                textLabel="Max Experience"
                textLabelStyle={textLabel}
                otherProps={otherPropsNotRequired}
              />
            </Grid>
            <Grid
              item
              xs={3}
              md={2}
              style={{ justifyContent: 'center', alignItems: 'center' }}
            >
              <ShadowButtonSubmit
                height="35px"
                width="100%"
                minwidth="100px"
                maxwidth="100px"
                backgroundcolor={theme.palette.primary.main}
                type="submit"
                onClick={handleSubmit}
              >
                <ButtonText color="#fff">Filter</ButtonText>
              </ShadowButtonSubmit>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};
export default AdvanceSearch;
