import { JobTitleAliasApi } from '@/swagger_api/api/JobTitleAliasApi';
import { JobTitleApi } from '@/swagger_api/api/JobTitleApi';
import { JobTitleAliasCreateDto } from '@/swagger_api/model/JobTitleAliasCreateDto';
import {
  Autocomplete,
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
    jobTitleId: '',
    jobTitle: { name: '' },
    submit: null,
  });
  const [initialData, setInitialData] = useState([]);
  const defaultPropsjobtitle = {
    options: initialData,
    getOptionLabel: option => option?.value,
  };
  const SubmitDetails = async p => {
    if (router.query.guId) {
      const editData = {
        id: p.id,
        uniqueGuid: p.uniqueGuid,
        name: p.name,
        jobTitleId: p.jobTitleId,
      };
      updateJobTitleAlias(editData);
    } else if (!router.query.guId) {
      const addData = {
        name: p.name,
        jobTitleId: p.jobTitleId,
      };
      createJobTitleAlias(addData);
    }
  };
  var jobtitlealias = new JobTitleAliasCreateDto();
  async function createJobTitleAlias(m) {
    const k = new JobTitleAliasApi();
    const opts = {};
    jobtitlealias = {
      name: m.name,
      jobTitleId: m.jobTitleId,
    };
    opts.body = jobtitlealias;
    await k
      .apiJobTitleAliasPost(opts)
      .then(async response => {
        if (response.body.message === 'Created Successfully.') {
          Swal.fire({
            icon: 'success',
            title: 'Create',
            text: 'Job Title Alias Created Successfully !',
          }).then(() => {
            router.replace(`${config.masterRoutes.jobtitlealias}`);
          });
        } else if (response.body.message === 'Already Exists.') {
          Swal.fire({
            icon: 'info',
            title: '',
            text: 'Job Title Alias already exists!',
          });
        } else if (response.body.message === 'Creation Failed.') {
          Swal.fire({
            icon: 'error',
            title: 'Oops..',
            text: 'Job Title Alias Creation Failed!',
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
  async function updateJobTitleAlias(n) {
    const k = new JobTitleAliasApi();
    const opts = {};
    jobtitlealias = {
      id: n.id,
      uniqueGuid: n.uniqueGuid,
      name: n.name,
      jobTitleId: n.jobTitleId,
    };
    opts.body = jobtitlealias;
    await k
      .apiJobTitleAliasPut(opts)
      .then(async response => {
        console.log('put', response);
        if (response.body.message === 'Updated Successfully.') {
          Swal.fire({
            icon: 'success',
            title: 'Edit',
            text: 'Job Title Alias Updated Successfully !',
          }).then(() => {
            router.replace(`${config.masterRoutes.jobtitlealias}`);
          });
        } else if (response.body.message === 'Already Exists.') {
          Swal.fire({
            icon: 'info',
            title: '',
            text: 'Job Title Alias already exists!',
          });
        } else if (response.body.message === 'Updation Failed.') {
          Swal.fire({
            icon: 'error',
            title: 'Oops..',
            text: 'Job Title Alias Updation Failed!',
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
    async function JobTitleGet() {
      const k = new JobTitleApi();
      await k
        .apiJobTitleGet()
        .then(async response => {
          console.log('sns', response);
          const trim = response?.body?.result?.map((res, index) => ({
            label: res?.id,
            value: res?.name,
          }));
          setInitialData(trim);
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
    JobTitleGet();
  }, []);

  useEffect(() => {
    async function EditData(g) {
      const guid = {
        guid: g,
      };
      console.log(guid);
      const k = new JobTitleAliasApi();
      await k
        .apiJobTitleAliasGetByGuidGuidGet(g)
        .then(async response => {
          console.log('guid', response);
          setInitialState(response.body.result);
          if (response.body.message === 'No Record Found.') {
            Swal.fire({
              icon: 'info',
              title: '',
              text: 'No Record Found!',
            }).then(() => {
              router.replace(`${config.masterRoutes.jobtitlealias}`);
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
          {router.query.guId ? 'Edit' : 'Add'} Job Title Alias
        </Typography>
      </>
      <Formik
        enableReinitialize
        initialValues={initialState}
        validationSchema={yup.object().shape({
          id: yup.string().when('router.query.guId', {
            is: true,
            then: yup.string().required('Job Title Id is required'),
          }),
          uniqueGuid: yup.string().when('router.query.guId', {
            is: true,
            then: yup.string().required('UniqueGuid is required'),
          }),
          name: yup
            .string()
            .min(1)
            .max(100, 'Job Title  must be less than 255')
            .matches(
              /^[a-zA-Z ]*$/,
              'Job Title cannot contain numbers or special characters.'
            )
            .required('Job Title Alias is required'),
          jobTitleId: yup
            .string()
            .required(' Select Job Title Alias from Dropdown'),
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
          setFieldValue,
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
                        label="Job Title Alias"
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
                  {router.query.guId && (
                    <Grid item xs={6} md={6}>
                      <FormControl fullWidth size="small">
                        <TextField
                          disabled
                          id="outlined-adornment-jobTitleId"
                          type="text"
                          value={values.jobTitle.name}
                          name="jobTitleId"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label="Job Title"
                          size="small"
                        />
                      </FormControl>
                    </Grid>
                  )}
                  {!router.query.guId && (
                    <Grid item xs={6} md={6}>
                      <FormControl
                        fullWidth
                        size="small"
                        error={Boolean(touched.jobTitleId && errors.jobTitleId)}
                      >
                        <Autocomplete
                          fullWidth
                          {...defaultPropsjobtitle}
                          disableClearable
                          onChange={(event, value) => {
                            setFieldValue('jobTitleId', value.label);
                          }}
                          isOptionEqualToValue={(option, value) =>
                            option.id === value.id
                          }
                          renderInput={params => (
                            <TextField
                              {...params}
                              sx={{
                                '& .MuiInputBase-root': {
                                  '& input': {
                                    textAlign: 'left',
                                    fontSize: 12,
                                    height: 24,
                                  },
                                },
                              }}
                              label="Select Job Title"
                              size="small"
                              value={values?.jobTitleId}
                              required
                              error={
                                touched.jobTitleId && Boolean(errors.jobTitleId)
                              }
                              helperText={
                                touched.jobTitleId && errors.jobTitleId
                              }
                            />
                          )}
                        />
                      </FormControl>
                    </Grid>
                  )}
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
                  onClick={() =>
                    router.push(`${config.masterRoutes.jobtitlealias}`)
                  }
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
