import { CountryApi } from '@/swagger_api/api/CountryApi';
import { StateApi } from '@/swagger_api/api/StateApi';
import { StateCreateDto } from '@/swagger_api/model/StateCreateDto';
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
  const [initialState, setInitialState] = useState({
    id: '',
    uniqueGuid: '',
    name: '',
    code: '',
    numericCode: '',
    countryId: '',
    country: {
      name: '',
    },
    submit: null,
  });
  const [initialData, setInitialData] = useState([]);
  const defaultPropscountry = {
    options: initialData,
    getOptionLabel: option => option?.value,
  };
  const SubmitDetails = async p => {
    if (router.query.guId) {
      const editData = {
        id: p.id,
        uniqueGuid: p.uniqueGuid,
        name: p.name,
        code: p.code,
        numericCode: p.numericCode,
        countryId: p.countryId,
      };
      updateState(editData);
    } else if (!router.query.guId) {
      const addData = {
        name: p.name,
        code: p.code,
        numericCode: p.numericCode,
        countryId: p.countryId,
      };
      createState(addData);
    }
  };
  var state = new StateCreateDto();
  async function createState(m) {
    const k = new StateApi();
    const opts = {};
    state = {
      name: m.name,
      code: m.code,
      numericCode: m.numericCode,
      countryId: m.countryId,
    };
    opts.body = state;
    await k
      .apiStatePost(opts)
      .then(async response => {
        if (response.body.message === 'Created Successfully.') {
          Swal.fire({
            icon: 'success',
            title: 'Create',
            text: 'State Created Successfully.',
          }).then(() => {
            router.replace(`${config.masterRoutes.state}`);
          });
        } else if (response.body.message === 'Already Exists.') {
          Swal.fire({
            icon: 'info',
            title: '',
            text: 'State Already Exists!',
          });
        } else if (response.body.message === 'Creation Failed.') {
          Swal.fire({
            icon: 'error',
            title: 'Oops..',
            text: 'State Creation Failed!',
          });
        }
        console.log('post', response);
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

  async function updateState(m) {
    const k = new StateApi();
    const opts = {};
    state = {
      id: m.id,
      uniqueGuid: m.uniqueGuid,
      name: m.name,
      code: m.code,
      numericCode: m.numericCode,
      countryId: m.countryId,
    };
    opts.body = state;
    await k
      .apiStatePut(opts)
      .then(async response => {
        if (response.body.message === 'Updated Successfully.') {
          Swal.fire({
            icon: 'success',
            title: 'Edit',
            text: 'State Updated Successfully.',
          }).then(() => {
            router.replace(`${config.masterRoutes.state}`);
          });
        } else if (response.body.message === 'Already Exists.') {
          Swal.fire({
            icon: 'info',
            title: '',
            text: 'State already exists!',
          });
        } else if (response.body.message === 'Updation Failed.') {
          Swal.fire({
            icon: 'error',
            title: 'Oops..',
            text: 'State Updation Failed!',
          });
        }
        console.log('put', response);
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
    async function CountryGet() {
      const k = new CountryApi();
      await k
        .apiCountryGet()
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
    CountryGet();
  }, []);

  useEffect(() => {
    async function EditData(g) {
      const guid = {
        guid: g,
      };
      const k = new StateApi();
      await k
        .apiStateGetByGuidGuidGet(g)
        .then(async response => {
          setInitialState(response.body.result);
          if (response.body.message === 'No Record Found.') {
            Swal.fire({
              icon: 'info',
              title: '',
              text: 'No Record Found!',
            }).then(() => {
              router.replace(`${config.masterRoutes.state}`);
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
          {router.query.guId ? 'Edit' : 'Add'} State
        </Typography>
      </>
      <Formik
        enableReinitialize
        initialValues={initialState}
        validationSchema={yup.object().shape({
          id: yup.string().when('router.query.guId', {
            is: true,
            then: yup.string().required('State Id is required'),
          }),
          uniqueGuid: yup.string().when('router.query.guId', {
            is: true,
            then: yup.string().required('UniqueGuid is required'),
          }),
          name: yup
            .string()
            .min(3)
            .max(100, 'State Name must not exceed above 100 Letters')
            .matches(
              /^[a-zA-Z ]*$/,
              'State Name cannot contain numbers or special characters.'
            )
            .required('State Name is required'),
          code: yup
            .string()
            .min(1)
            .max(8, 'State Code must not exceed above 8 Letters ')
            .matches(/^[ A-Za-z0-9_@./#&+-]*$/, 'Enter Proper Code')
            .nullable(true)
            .required('State Code is required'),
          numericCode: yup
            .string()
            .min(1)
            .max(5, 'Numeric Code must be less than 5 digits')
            .matches(
              /^([0-9]*[1-9][0-9]*(\.[0-9]+)?|[0]+\.[0-9]*[1-9][0-9]*)$/,
              'Numeric Code must be between 1 and 99999'
            )
            .required('Numeric Code is required'),
          countryId: yup.string().required('Select Country from Dropdown'),
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
                        label="State Name"
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
                      error={Boolean(touched.code && errors.code)}
                    >
                      <TextField
                        id="outlined-adornment-code"
                        type="text"
                        value={values.code}
                        name="code"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="State Code "
                        inputProps={{}}
                        size="small"
                        error={Boolean(touched.code && errors.code)}
                      />
                      {touched.code && errors.code && (
                        <FormHelperText
                          error
                          id="standard-weight-helper-text-code"
                        >
                          {errors.code}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>

                  <Grid item xs={6} md={6}>
                    <FormControl
                      fullWidth
                      size="small"
                      error={Boolean(touched.numericCode && errors.numericCode)}
                    >
                      <TextField
                        id="outlined-adornment-numericCode"
                        type="text"
                        name="numericCode"
                        value={values.numericCode}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Numeric Code"
                        inputProps={{}}
                        size="small"
                        error={Boolean(
                          touched.numericCode && errors.numericCode
                        )}
                      />
                      {touched.numericCode && errors.numericCode && (
                        <FormHelperText
                          error
                          id="standard-weight-helper-text-name"
                        >
                          {errors.numericCode}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  {router.query.guId && (
                    <Grid item xs={6} md={6}>
                      <FormControl fullWidth size="small">
                        <TextField
                          id="outlined-adornment-countryId"
                          type="text"
                          value={values.country.name}
                          name="countryId"
                          label=" Country Name"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          size="small"
                          error={Boolean(touched.countryId && errors.countryId)}
                        />
                      </FormControl>
                    </Grid>
                  )}
                  {!router.query.guId && (
                    <Grid item xs={6} md={6}>
                      <FormControl
                        fullWidth
                        size="small"
                        error={Boolean(touched.countryId && errors.countryId)}
                      >
                        <Autocomplete
                          fullWidth
                          {...defaultPropscountry}
                          disableClearable
                          onChange={(event, value) => {
                            setFieldValue('countryId', value.label);
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
                              label="Select Country"
                              size="small"
                              value={values?.countryId}
                              required
                              error={
                                touched.countryId && Boolean(errors.countryId)
                              }
                              helperText={touched.countryId && errors.countryId}
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
                  onClick={() => router.push(`${config.masterRoutes.state}`)}
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
