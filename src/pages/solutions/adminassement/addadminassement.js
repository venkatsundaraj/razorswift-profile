import SelectWrapper from '@/formComponents/FormsUI/Select';
import Textfield from '@/formComponents/FormsUI/Textfield';
import { otherProps } from '@/pageComponents/Profile/Common/Properties/Properties';
import textLabel from '@/src/Components/LabelComponents/TextLabel';
import {
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { Form, Formik, useField } from 'formik';
import { useRouter } from 'next/router';
import { useState } from 'react';
import * as Yup from 'yup';
const AddAdminAssessment = () => {
  const [platform, setPlatform] = useState([]);
  const [skillversion, setSkillversion] = useState([]);
  const theme = useTheme();
  const router = useRouter();
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
  const otherProps = { size: 'small', required: true };
  const FilmSelect = ({
    name,
    label,
    value,
    onChange,
    touched,
    errors,
    options,
  }) => {
    const [field, meta] = useField(name);
    return (
      <>
        <Autocomplete
          fullWidth
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
              d;
              filtered.push({
                inputValue,
                title: `Add "${inputValue}"`,
              });
            }

            return filtered;
          }}
          id={name}
          options={options}
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
          renderInput={params => (
            <TextField
              {...params}
              fullWidth
              variant="outlined"
              {...otherProps}
              label=""
              placeholder="Select Platform"
              value={value}
            />
          )}
        />
        {meta.touched && meta.error && (
          <Typography variant="body2" color="error" gutterBottom>
            {meta.error}
          </Typography>
        )}
      </>
    );
  };
  const filter = createFilterOptions();
  const INITIAL_FORM_STATE = {
    title: '',
    platform: '',
    platformassessmentId: '',
    remarks: '',
    section: '',
    skill: '',
    level: '',
  };
  const FORM_VALIDATION = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    platform: Yup.string().required('Platform is required'),
    platformassessmentId: Yup.string().required(
      'Platform Assessment Id is required'
    ),
    remarks: Yup.string().required('Remarks is required'),
    section: Yup.string().required('Section is required'),
    skill: Yup.string().required('Skill is required'),
    level: Yup.string().required('Level is required'),
  });
  const SubmitDetails = async values => {
    console.log('sub', values);
  };

  return (
    <div>
      <>
        <Typography
          variant="h2"
          mt={2}
          mb={2}
          ml={3}
          align="left"
          sx={{ fontSize: '24px' }}
        >
          Add New Assessment
        </Typography>
      </>
      <Formik
        initialValues={{
          ...INITIAL_FORM_STATE,
        }}
        validationSchema={FORM_VALIDATION}
        onSubmit={(values, { resetForm }) =>
          SubmitDetails(values, { resetForm })
        }
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
            <Grid container spacing={2} justifyContent="space-between">
              <Grid item xs={12} md={12}>
                <Textfield
                  name="title"
                  textLabelStyle={textLabel}
                  textLabel="Title"
                  otherProps={otherProps}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                  <Typography
                    sx={{
                      margin: 0.2,
                      fontWeight: '600',
                      fontSize: '16px',
                      lineHeight: '19.8px',
                      color:
                        touched.platform && errors.platform
                          ? '#f44336'
                          : '#434343',
                      ...textLabel,
                    }}
                  >
                    {'Select Platform'} {otherProps.required ? '*' : ''}
                  </Typography>
                  <FilmSelect
                    options={platform}
                    touched={touched}
                    errors={errors}
                    name="Platform"
                    label="Select a Platform"
                    value={values.platform}
                    onChange={(e, value) => {
                      setFieldValue('platform', value);
                    }}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Textfield
                  name="platformassessmentId"
                  textLabelStyle={textLabel}
                  otherProps={otherProps}
                  textLabel="Platform Assessment ID"
                />
              </Grid>

              <Grid item xs={12} md={12}>
                <Textfield
                  name="remarks"
                  textLabelStyle={textLabel}
                  otherProps={otherProps}
                  textLabel="Remarks"
                />
              </Grid>

              {/* <Grid item xs={12}>
  <SectionFieldArray name='sections' />
</Grid> */}
              <Grid item xs={12} md={4}>
                <Textfield
                  name="section"
                  textLabelStyle={textLabel}
                  otherProps={otherProps}
                  textLabel="Section"
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Stack spacing={1}>
                  <Typography
                    sx={{
                      margin: 0.2,
                      fontWeight: '600',
                      fontSize: '16px',
                      lineHeight: '19.8px',
                      color:
                        touched.platform && errors.platform
                          ? '#f44336'
                          : '#434343',
                      ...textLabel,
                    }}
                  >
                    {'Select Skill Version'} {otherProps.required ? '*' : ''}
                  </Typography>
                  <FilmSelect
                    options={skillversion}
                    touched={touched}
                    errors={errors}
                    name="skillVersion"
                    label="Select a film"
                    value={values.skillVersion}
                    onChange={(e, value) => {
                      setFieldValue('skillVersion', value);
                    }}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} md={4}>
                <SelectWrapper
                  textLabelStyle={textLabel}
                  name="level"
                  textLabel="Level"
                  options={level}
                  placeholder="Select Level"
                  inputProps={otherProps}
                />
              </Grid>

              <Grid item xs={12} md={12} textAlign="right">
                <Button variant="contained" onClick={handleSubmit}>
                  Create
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default AddAdminAssessment;
const level = [
  { id: 1, value: 1, name: 'Beginner ' },
  { id: 2, value: 2, name: 'Intermediate' },
  { id: 2, value: 2, name: 'Expert' },
];
const LevelSkillSection = ({ index, remove }) => {
  const sectionName = `section[${index}]`;
  const skillVersionName = `skill[${index}]`;
  const levelName = `level[${index}]`;

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={12} md={4}>
        <Textfield
          name="section"
          textLabelStyle={textLabel}
          otherProps={otherProps}
          textLabel="Section"
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <Stack spacing={1}>
          <Typography
            sx={{
              margin: 0.2,
              fontWeight: '600',
              fontSize: '16px',
              lineHeight: '19.8px',
              color:
                touched.platform && errors.platform ? '#f44336' : '#434343',
              ...textLabel,
            }}
          >
            {'Select Skill Version'} {otherProps.required ? '*' : ''}
          </Typography>
          <FilmSelect
            options={skillversion}
            touched={touched}
            errors={errors}
            name="skillVersion"
            label="Select a film"
            value={values.skillVersion}
            onChange={(e, value) => {
              setFieldValue('skillVersion', value);
            }}
          />
        </Stack>
      </Grid>
      <Grid item xs={12} md={4}>
        <SelectWrapper
          textLabelStyle={textLabel}
          name="level"
          textLabel="Level"
          options={level}
          placeholder="Select Level"
          inputProps={otherProps}
        />
      </Grid>

      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => remove(index)}
        >
          Remove
        </Button>
      </Grid>
    </Grid>
  );
};
const SectionFieldArray = ({ name }) => {
  return (
    <FieldArray name={name}>
      {({ form, push, remove }) => (
        <>
          {form?.values[name]?.map((_, index) => (
            <LevelSkillSection key={index} index={index} remove={remove} />
          ))}
          <Grid container spacing={3} justifyContent="center">
            <Grid item>
              <Button
                sx={{ marginTop: 2 }}
                variant="contained"
                color="primary"
                onClick={() => {
                  push({ section: '', skill: '', level: '' });
                }}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </>
      )}
    </FieldArray>
  );
};
