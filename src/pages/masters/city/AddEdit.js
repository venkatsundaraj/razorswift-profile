import DashboardLayout from '@/layouts/DashboardLayout';
import { CityApi } from '@/swagger_api/api/CityApi';
import { StateApi } from '@/swagger_api/api/StateApi';
import { CityCreateDto } from '@/swagger_api/model/CityCreateDto';
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
    pinCode: '',
    stdCode: '',
    stateId: '',
    countryId: 'India',
    state: { name: '' },
    state: { country: { name: '' } },
    submit: null,
  });

  const [initialData, setInitialData] = useState([]);
  const defaultPropsstate = {
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
        pinCode: p.pinCode,
        stdCode: p.stdCode,
        stateId: p.stateId,
      };
      updateCity(editData);
    } else if (!router.query.guId) {
      const addData = {
        name: p.name,
        code: p.code,
        pinCode: p.pinCode,
        stdCode: p.stdCode,
        stateId: p.stateId,
      };
      createCity(addData);
    }
  };
  var state = new CityCreateDto();
  async function createCity(m) {
    const k = new CityApi();
    const opts = {};
    state = {
      name: m.name,
      code: m.code,
      pinCode: m.pinCode,
      stdCode: m.stdCode,
      stateId: m.stateId,
    };
    opts.body = state;
    await k
      .apiCityPost(opts)
      .then(async response => {
        if (response.body.message === 'Created Successfully.') {
          Swal.fire({
            icon: 'success',
            title: 'Create',
            text: 'City Created Successfully.',
          }).then(() => {
            router.replace(`${config.masterRoutes.city}`);
          });
        } else if (response.body.message === 'Already Exists.') {
          Swal.fire({
            icon: 'info',
            title: '',
            text: 'City Already Exists!',
          });
        } else if (response.body.message === 'Creation Failed.') {
          Swal.fire({
            icon: 'error',
            title: 'Oops..',
            text: 'City Creation Failed!',
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

  async function updateCity(m) {
    const k = new CityApi();
    const opts = {};
    state = {
      id: m.id,
      uniqueGuid: m.uniqueGuid,
      name: m.name,
      code: m.code,
      pinCode: m.pinCode,
      stdCode: m.stdCode,
      stateId: m.stateId,
    };
    opts.body = state;
    await k
      .apiCityPut(opts)
      .then(async response => {
        if (response.body.message === 'Updated Successfully.') {
          Swal.fire({
            icon: 'success',
            title: 'Edit',
            text: 'City Updated Successfully.',
          }).then(() => {
            router.replace(`${config.masterRoutes.city}`);
          });
        } else if (response.body.message === 'Already Exists.') {
          Swal.fire({
            icon: 'info',
            title: '',
            text: 'City already exists!',
          });
        } else if (response.body.message === 'Updation Failed.') {
          Swal.fire({
            icon: 'error',
            title: 'Oops..',
            text: 'City Updation Failed!',
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
    async function GetState() {
      const k = new StateApi();
      await k
        .apiStateGetAllByCountryIdCountryIdGet(77)
        .then(async response => {
          console.log('irtfch', response);
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
    GetState();
  }, []);

  useEffect(() => {
    async function EditData(g) {
      const k = new CityApi();
      await k
        .apiCityGetByGuidGuidGet(g)
        .then(async response => {
          setInitialState(response.body.result);
          if (response.body.message === 'No Record Found.') {
            Swal.fire({
              icon: 'info',
              title: '',
              text: 'No Record Found!',
            }).then(() => {
              router.replace(`${config.masterRoutes.city}`);
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
      <DashboardLayout />
      <>
        <Typography
          variant="h2"
          mt={2}
          mb={2}
          ml={3}
          align="left"
          sx={{ fontSize: '24px' }}
        >
          {router.query.guId ? 'Edit' : 'Add'} City
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
            .min(1)
            .max(100, 'City Name must not exceed above 100 Letters')
            .matches(
              /^[a-zA-Z0-9\s\W]+$/,
              'City Name cannot contain numbers or special characters.'
            )
            .required('City Name is required'),
          code: yup
            .string()
            .min(1)
            .max(20, 'City Code must not exceed above 20 Letters ')
            .matches(/^[a-zA-Z0-9\s\W]+$/, 'Enter Proper Code')
            .nullable(true)
            .required('City Code is required'),
          pinCode: yup
            .string()
            .matches(/^\d{6}$/, ' Pin Code must be 6 digit number')
            .required('Pin Code is required'),
          stdCode: yup
            .string()
            .min(2)
            .max(10, 'Std Code must not exceed above 10 digits')
            .matches(/^-?\d+$/, 'Std Code must be Integers')
            .required('Std Code is required'),
          stateId: yup.string().required('Select State from Dropdown'),
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
                        label="City Name"
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
                        label="City Code "
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
                      error={Boolean(touched.pinCode && errors.pinCode)}
                    >
                      <TextField
                        id="outlined-adornment-pinCode"
                        type="text"
                        value={values.pinCode}
                        name="pinCode"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Pin Code "
                        inputProps={{}}
                        size="small"
                        error={Boolean(touched.pinCode && errors.pinCode)}
                      />
                      {touched.pinCode && errors.pinCode && (
                        <FormHelperText
                          error
                          id="standard-weight-helper-text-code"
                        >
                          {errors.pinCode}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <FormControl
                      fullWidth
                      size="small"
                      error={Boolean(touched.stdCode && errors.stdCode)}
                    >
                      <TextField
                        id="outlined-adornment-stdCode"
                        type="text"
                        value={values.stdCode}
                        name="stdCode"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Std Code "
                        inputProps={{}}
                        size="small"
                        error={Boolean(touched.stdCode && errors.stdCode)}
                      />
                      {touched.stdCode && errors.stdCode && (
                        <FormHelperText
                          error
                          id="standard-weight-helper-text-stdCode"
                        >
                          {errors.stdCode}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  {router.query.guId && (
                    <Grid item xs={6} md={6}>
                      <FormControl fullWidth size="small">
                        <TextField
                          id="outlined-adornment-stateId"
                          type="text"
                          value={values.state.name}
                          name="stateId"
                          //label=' State Name'
                          onBlur={handleBlur}
                          onChange={handleChange}
                          size="small"
                          disabled
                          error={Boolean(touched.stateId && errors.stateId)}
                        />
                      </FormControl>
                    </Grid>
                  )}
                  {!router.query.guId && (
                    <Grid item xs={6} md={6}>
                      <FormControl
                        fullWidth
                        size="small"
                        error={Boolean(touched.stateId && errors.stateId)}
                      >
                        <Autocomplete
                          fullWidth
                          {...defaultPropsstate}
                          disableClearable
                          onChange={(event, value) => {
                            setFieldValue('stateId', value.label);
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
                              label="Select State"
                              size="small"
                              value={values?.stateId}
                              required
                              error={touched.stateId && Boolean(errors.stateId)}
                              helperText={touched.stateId && errors.stateId}
                            />
                          )}
                        />
                      </FormControl>
                    </Grid>
                  )}
                  {router.query.guId && (
                    <Grid item xs={6} md={6}>
                      <FormControl fullWidth size="small">
                        <TextField
                          id="outlined-adornment-state?.country?.name"
                          type="text"
                          value={values?.state?.country?.name}
                          name="state?.country?.name"
                          label=" Country Name"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          size="small"
                          disabled
                          error={Boolean(
                            touched.state?.country?.name &&
                              errors.state?.country?.name
                          )}
                        />
                      </FormControl>
                    </Grid>
                  )}
                  {!router.query.guId && (
                    <Grid item xs={6} md={6}>
                      <FormControl fullWidth size="small">
                        <TextField
                          id="outlined-adornment-countryId"
                          type="text"
                          value={initialState.countryId}
                          name="countryId"
                          label="Country Name"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          size="small"
                          disabled
                          error={Boolean(touched.countryId && errors.countryId)}
                        />
                      </FormControl>
                    </Grid>
                  )}

                  {/* {!router.query.guId && (
                    <Grid item xs={6} md={6}>
                      <FormControl fullWidth size='small' error={Boolean(touched.countryId && errors.countryId)}>
                        <Autocomplete
                          fullWidth
                          {...defaultPropscountry}
                          disableClearable
                          onChange={(event, value) => {
                            setFieldValue('countryId', value.label);
                          }}
                          isOptionEqualToValue={(option, value) => option.id === value.id}
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
                              label='Select Country'
                              size='small'
                              value={values?.countryId}
                              required
                              error={touched.countryId && Boolean(errors.countryId)}
                              helperText={touched.countryId && errors.countryId}
                            />
                          )}
                        />
                      </FormControl>
                    </Grid>
                  )} */}
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
                  onClick={() => router.push(`${config.masterRoutes.city}`)}
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
