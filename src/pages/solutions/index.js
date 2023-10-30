import {
  otherProps,
  projectSkillValue,
} from '@/pageComponents/Profile/Common/Properties/Properties';
import { LoadingContext } from '@/reUsableComponents/LoadingComponents/LoadingContext';
import { useTheme } from '@emotion/react';
import { Button, Grid, Stack, styled, Typography } from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Form, Formik } from 'formik';
import { useContext, useState } from 'react';
import * as Yup from 'yup';

const commonStyle = {
  height: '100px',
  width: '100%',
  backgroundColor: 'white',
};

const SkillMainName = styled(Typography)(({ theme }) => ({
  color: '#1D1D1D',
  fontWeight: '600',
  fontSize: '15px',
  lineHeight: '23.33px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  [theme.breakpoints.down('md')]: {
    fontSize: '12px',
    lineHeight: '18.66px',
  },
}));

const SkillSubName = styled(Typography)(({ theme }) => ({
  color: '#1D1D1D',
  fontWeight: '600',
  fontSize: '13px',
  lineHeight: '20.33px',
  width: '100%',
  maxWidth: '150px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  [theme.breakpoints.down('md')]: {
    fontSize: '10px',
    lineHeight: '16.66px',
  },
}));

const validationSchema = Yup.object().shape({
  skillId: Yup.number().required('Required'),
  skillAliases: Yup.array().of(
    Yup.object().shape({
      skillAliasName: Yup.string().required('Required'),
      experienceInMonths: Yup.number().required('Number is required'),
      weightByCandidate: Yup.number()
        .required('Number is required')
        .integer('Number must be an integer')
        .min(0, 'Number must be greater than or equal to 0')
        .max(100, 'Number must be less than or equal to 100'),
    })
  ),
});

const initialValues = {
  skillId: 1,

  film: { title: 'The Shawshank Redemption', year: 1994 },
};
const filter = createFilterOptions();

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  // ...
];

const FilmSelect = ({ name, label, value, onChange, touched, errors }) => {
  return (
    <>
      <Autocomplete
        variant="outlined"
        value={value}
        onChange={onChange}
        filterOptions={(options, params) => {
          const { inputValue } = params;
          const isExisting = options?.some(
            option => inputValue === option.title
          );
          const filtered = options ? filter(options, params) : [];
          if (inputValue !== '' && !isExisting) {
            filtered.push({
              inputValue,
              title: `Add "${inputValue}"`,
            });
          }

          return filtered;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        id={name}
        options={top100Films}
        getOptionLabel={option => {
          if (typeof option === 'string') {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.title;
        }}
        renderOption={(props, option) => <li {...props}>{option.title}</li>}
        freeSolo
        renderInput={params => <TextField label="" {...params} />}
      />
      {touched.projectAndSkills && errors.projectAndSkills && (
        <Typography error variant="body2" color="error" gutterBottom>
          {errors.projectAndSkills}
        </Typography>
      )}
    </>
  );
};

const Solutions = () => {
  const { loading, setLoading } = useContext(LoadingContext);
  const [count, setCount] = useState(1);
  const theme = useTheme();
  const [screenStatus, setScreenStatus] = useState('1');
  const [technicalSkillsInitialValues, setTechnicalSkillsInitialValues] =
    useState(initialValues);

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
  const handleClick = () => {
    setLoading(true); // set isLoading to true

    setTimeout(() => {
      setLoading(false); // set isLoading to false after 2 seconds
    }, 2000);
  };
  return (
    <div>
      <h1>Sign Up</h1>
      <button onClick={handleClick} disabled={loading}>
        {loading ? 'Loading...' : 'Click me!'}
      </button>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={values => {
          setTechnicalSkillsInitialValues(values);
          setScreenStatus('1');
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          setFieldValue,
          handleSubmit,
          touched,
          values,
        }) => (
          <Form>
            <Grid container>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <Typography
                    sx={{
                      margin: 0.2,

                      fontWeight: '600',
                      fontSize: '16px',
                      lineHeight: '19.8px',
                      color:
                        touched.projectAndSkills && errors.projectAndSkills
                          ? '#f44336'
                          : '#434343',
                      ...textLabel,
                    }}
                  >
                    {'Skill Name'} {otherProps.required ? '*' : ''}
                  </Typography>
                  <>
                    <Autocomplete
                      fullWidth
                      id="tags-standard"
                      variant="outlined"
                      options={projectSkillValue}
                      defaultValue={{
                        id: 1,
                        skillName: 'javascript',
                        value: 1,
                      }}
                      getOptionLabel={option => option.skillName}
                      renderInput={params => (
                        <TextField
                          {...params}
                          fullWidth
                          variant="outlined"
                          {...otherProps}
                          label=""
                          placeholder="Project skills"
                          value={values?.skillId}
                        />
                      )}
                      onChange={(event, value) => {
                        setFieldValue('skillId', value.value);
                      }}
                      isOptionEqualToValue={(option, value) =>
                        option.value === value.value
                      }
                    />
                    {touched.projectAndSkills && errors.projectAndSkills && (
                      <Typography
                        error
                        variant="body2"
                        color="error"
                        gutterBottom
                      >
                        {errors.projectAndSkills}
                      </Typography>
                    )}
                  </>
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <Typography
                    sx={{
                      margin: 0.2,

                      fontWeight: '600',
                      fontSize: '16px',
                      lineHeight: '19.8px',
                      color:
                        touched.projectAndSkills && errors.projectAndSkills
                          ? '#f44336'
                          : '#434343',
                      ...textLabel,
                    }}
                  >
                    {'Skill Name'} {otherProps.required ? '*' : ''}
                  </Typography>
                  <FilmSelect
                    touched={touched}
                    errors={errors}
                    name="film"
                    label="Select a film"
                    value={values.film}
                    onChange={(e, value) => {
                      setFieldValue('film', value);
                    }}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Solutions;
