import SelectWrapper from '@/formComponents/FormsUI/Select';
import { ParserApi } from '@/swagger_api/api/ParserApi';
import { LanguageCreateDto } from '@/swagger_api/model/LanguageCreateDto';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  FormControl,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import config from 'config';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import * as yup from 'yup';
export default function AddEdit() {
  const router = useRouter();
  console.log('router', router);
  const [initialState, setInitialState] = useState({
    id: '',
    uniqueGuid: '',
    name: '',
    userName: '',
    userKey: '',
    version: '',
    password: '',
    serviceUrl: '',
    dataModel: '',
    parserType: '',
    submit: null,
  });
  const SubmitDetails = async p => {
    if (router.query.guId) {
      const editData = {
        id: p.id,
        uniqueGuid: p.uniqueGuid,
        name: p.name,
        userName: p.userName,
        userKey: p.userKey,
        version: p.version,
        password: p.password,
        serviceUrl: p.serviceUrl,
        dataModel: p.dataModel,
        parserType: p.parserType,
      };
      updateParser(editData);
    } else if (!router.query.guId) {
      const addData = {
        name: p.name,
        userName: p.userName,
        userKey: p.userKey,
        version: p.version,
        password: p.password,
        serviceUrl: p.serviceUrl,
        dataModel: p.dataModel,
        parserType: p.parserType,
      };
      createParser(addData);
    }
  };
  var parser = new LanguageCreateDto();
  async function createParser(m) {
    const k = new ParserApi();
    const opts = {};
    parser = {
      name: m.name,
      userName: m.userName,
      userKey: m.userKey,
      version: m.version,
      password: m.password,
      serviceUrl: m.serviceUrl,
      dataModel: m.dataModel,
      parserType: m.parserType,
    };
    opts.body = parser;
    await k
      .apiParserPost(opts)
      .then(async response => {
        if (response.body.message === 'Created Successfully.') {
          Swal.fire({
            icon: 'success',
            title: 'Create',
            text: 'Parser Created Successfully !',
          }).then(() => {
            router.replace(`${config.masterRoutes.parser}`);
          });
        } else if (response.body.message === 'Already Exists.') {
          Swal.fire({
            icon: 'info',
            title: '',
            text: 'Parser Already Exists!',
          });
        } else if (response.body.message === 'Creation Failed.') {
          Swal.fire({
            icon: 'error',
            title: 'Oops..',
            text: 'Parser Creation Failed!',
          });
        }
        console.log('create', response);
      })
      .catch(function (error) {
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
  }
  async function updateParser(n) {
    console.log();
    const k = new ParserApi();
    const opts = {};
    parser = {
      id: n.id,
      uniqueGuid: n.uniqueGuid,
      name: n.name,
      userName: n.userName,
      userKey: n.userKey,
      version: n.version,
      password: n.password,
      serviceUrl: n.serviceUrl,
      dataModel: n.dataModel,
      parserType: n.parserType,
    };
    opts.body = parser;
    await k
      .apiParserPut(opts)
      .then(async response => {
        console.log('put', response);
        if (response.body.message === 'Updated Successfully.') {
          Swal.fire({
            icon: 'success',
            title: 'Edit',
            text: 'Parser Updated Successfully !',
          }).then(() => {
            router.replace(`${config.masterRoutes.parser}`);
          });
        } else if (response.body.message === 'Already Exists.') {
          Swal.fire({
            icon: 'info',
            title: '',
            text: 'Parser Already Exists!',
          });
        } else if (response.body.message === 'Updation Failed.') {
          Swal.fire({
            icon: 'error',
            title: 'Oops..',
            text: ' Parser Updation Failed!',
          });
        }
      })
      .catch(function (error) {
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
  }
  useEffect(() => {
    async function EditData(g) {
      const k = new ParserApi();
      await k
        .apiParserGetByGuidGuidGet(g)
        .then(async response => {
          console.log('guid', response);
          setInitialState(response.body.result);
          if (response.body.message === 'No Record Found.') {
            Swal.fire({
              icon: 'info',
              title: '',
              text: 'No Record Found!',
            }).then(() => {
              router.replace(`${config.masterRoutes.parser}`);
            });
          }
        })
        .catch(function (error) {
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
    if (router.query.guId) EditData(router.query.guId);
  }, [router.query.guId]);
  useEffect(() => {
    console.log('router query changes', router.query);
  }, [router.query]);
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
          {router.query.guId ? 'Edit' : 'Add'} Parser
        </Typography>
      </>
      <Formik
        enableReinitialize
        initialValues={initialState}
        validationSchema={yup.object().shape({
          id: yup.string().when('router.query.guId', {
            is: true,
            then: yup.string().required('Id is required'),
          }),
          uniqueGuid: yup.string().when('router.query.guId', {
            is: true,
            then: yup.string().required('UniqueGuid is required'),
          }),
          name: yup
            .string()
            .min(1)
            .max(100, 'Parser Name must not exceed above 100 Letters')
            .matches(
              /^[a-zA-Z0-9!@#$%^&*()_+,\-.\/:;<=>?@[\\\]^_`{|}~]+$/,
              'Parser Name should not contain any special characters'
            )
            .required('Name is required'),
          userName: yup
            .string()
            .min(1)
            .max(100, 'User Name must be less than 100 Letters')
            .matches(
              /^[a-zA-Z0-9!@#$%^&*()_+,\-.\/:;<=>?@[\\\]^_`{|}~]+$/,
              'User Name should not contain any special characters'
            )
            .required('User Name is required'),
          userKey: yup
            .string()
            .min(1)
            .max(500, 'User Key must be less than 500 Letters')
            .matches(/^[ A-Za-z0-9_@./#&+-]*$/, 'Enter Proper User Key')
            .required('User Key is required'),
          version: yup
            .string()
            .min(1)
            .max(500, 'Version must be less than 500 Letters')
            .matches(/^\d+\.\d+\.\d+$/, 'Invalid version number format')
            .required('Version is required'),
          password: yup
            .string()
            .min(8)
            .max(100)
            .required('Password is required'),
          serviceUrl: yup
            .string()
            .min(1)
            .max(500, 'Service Url must be less than 500 ')
            .matches(
              /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
              'Please enter Correct Url Format!'
            )
            .required('Enter Service URL'),
          dataModel: yup
            .string()
            .min(1)
            .max(100, 'Data Model must be less than 100 ')
            .matches(/^[ A-Za-z0-9_@./#&+-]*$/, 'Enter Proper Data Model')
            .required('Data Model is required'),
          parserType: yup.string().required('Parser Type is required'),
        })}
        onSubmit={(values, { resetForm }) =>
          SubmitDetails(values, { resetForm })
        }
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          touched,
          values,
        }) => (
          <form noValidate onSubmit={handleSubmit}>
            <DialogContent>
              {initialState && (
                <Grid container spacing={2}>
                  <Grid item xs={6} md={6}>
                    <FormControl
                      fullWidth
                      size="small"
                      error={Boolean(touched.name && errors.name)}
                    >
                      <TextField
                        id="outlined-adornment-name"
                        type="text"
                        value={values.name}
                        name="name"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Parser Name"
                        size="small"
                        error={Boolean(touched.name && errors.name)}
                      />
                      {touched.name && errors.name && (
                        <FormHelperText
                          error
                          id="standard-weight-helper-text-name"
                        >
                          {errors.name}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <FormControl
                      fullWidth
                      size="small"
                      error={Boolean(touched.userName && errors.userName)}
                    >
                      <TextField
                        id="outlined-adornment-userName"
                        type="text"
                        value={values.userName}
                        name="userName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="User Name "
                        size="small"
                        error={Boolean(touched.userName && errors.userName)}
                      />
                      {touched.userName && errors.userName && (
                        <FormHelperText
                          error
                          id="standard-weight-helper-text-userName"
                        >
                          {errors.userName}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <FormControl
                      fullWidth
                      size="small"
                      error={Boolean(touched.userKey && errors.userKey)}
                    >
                      <TextField
                        id="outlined-adornment-userKey"
                        type="text"
                        value={values.userKey}
                        name="userKey"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="User Key "
                        size="small"
                        error={Boolean(touched.userKey && errors.userKey)}
                      />
                      {touched.userKey && errors.userKey && (
                        <FormHelperText
                          error
                          id="standard-weight-helper-text-userKey"
                        >
                          {errors.userKey}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <FormControl
                      fullWidth
                      size="small"
                      error={Boolean(touched.version && errors.version)}
                    >
                      <TextField
                        id="outlined-adornment-version"
                        type="text"
                        value={values.version}
                        name="version"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Version "
                        size="small"
                        error={Boolean(touched.version && errors.version)}
                      />
                      {touched.version && errors.version && (
                        <FormHelperText
                          error
                          id="standard-weight-helper-text-version"
                        >
                          {errors.version}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <FormControl
                      fullWidth
                      size="small"
                      error={Boolean(touched.password && errors.password)}
                    >
                      <TextField
                        id="outlined-adornment-password"
                        type="text"
                        value={values.password}
                        name="password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Password "
                        size="small"
                        error={Boolean(touched.password && errors.password)}
                      />
                      {touched.password && errors.password && (
                        <FormHelperText
                          error
                          id="standard-weight-helper-text-password"
                        >
                          {errors.password}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <FormControl
                      fullWidth
                      size="small"
                      error={Boolean(touched.serviceUrl && errors.serviceUrl)}
                    >
                      <TextField
                        id="outlined-adornment-serviceUrl"
                        type="text"
                        value={values.serviceUrl}
                        name="serviceUrl"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Service Url "
                        size="small"
                        error={Boolean(touched.serviceUrl && errors.serviceUrl)}
                      />
                      {touched.serviceUrl && errors.serviceUrl && (
                        <FormHelperText
                          error
                          id="standard-weight-helper-text-serviceUrl"
                        >
                          {errors.serviceUrl}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <FormControl
                      fullWidth
                      size="small"
                      error={Boolean(touched.dataModel && errors.dataModel)}
                    >
                      <TextField
                        id="outlined-adornment-dataModel"
                        type="text"
                        value={values.dataModel}
                        name="dataModel"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Data Model "
                        size="small"
                        error={Boolean(touched.dataModel && errors.dataModel)}
                      />
                      {touched.dataModel && errors.dataModel && (
                        <FormHelperText
                          error
                          id="standard-weight-helper-text-dataModel"
                        >
                          {errors.dataModel}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <SelectWrapper
                      name="parserType"
                      label="Parser Type Type"
                      textLabel="Parser Type Type"
                      noTextLabel
                      options={valueName}
                      required
                      placeholder="Parser Type Type"
                    />
                  </Grid>
                </Grid>
              )}
              {errors.submit && (
                <Box sx={{ mt: 3 }}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Box>
              )}
            </DialogContent>
            {initialState && (
              <DialogActions>
                <Button
                  variant="outline"
                  onClick={() => router.push(`${config.masterRoutes.parser}`)}
                >
                  Cancel
                </Button>
                {router.query.guId && (
                  <Button variant="contained" onClick={handleSubmit}>
                    Edit
                  </Button>
                )}
                {!router.query.guId && (
                  <Button variant="contained" onClick={handleSubmit}>
                    Add
                  </Button>
                )}
              </DialogActions>
            )}
          </form>
        )}
      </Formik>
    </div>
  );
}
const valueName = [
  { id: 1, value: 1, name: 'ResumeParser' },
  { id: 2, value: 2, name: 'JDParser' },
  { id: 3, value: 3, name: 'Both' },
];
