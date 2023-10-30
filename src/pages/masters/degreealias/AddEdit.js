import { DegreeAliasApi } from '@/swagger_api/api/DegreeAliasApi';
import { DegreeApi } from '@/swagger_api/api/DegreeApi';
import { DegreeCreateDto } from '@/swagger_api/model/DegreeCreateDto';
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
    degreeId: '',
    degree: { name: '' },
    submit: null,
  });
  const [initialData, setInitialData] = useState([]);
  const defaultPropsdegree = {
    options: initialData,
    getOptionLabel: option => option?.value,
  };
  const SubmitDetails = async p => {
    if (router.query.guId) {
      const editData = {
        id: p.id,
        uniqueGuid: p.uniqueGuid,
        name: p.name,
        degreeId: p.degreeId,
      };
      updateDegreeAlias(editData);
    } else if (!router.query.guId) {
      const addData = {
        name: p.name,
        degreeId: p.degreeId,
      };
      createDegreeAlias(addData);
    }
  };

  var degreealias = new DegreeCreateDto();
  async function createDegreeAlias(m) {
    const k = new DegreeAliasApi();
    const opts = {};
    degreealias = {
      name: m.name,
      degreeId: m.degreeId,
    };
    opts.body = degreealias;
    await k
      .apiDegreeAliasPost(opts)
      .then(async response => {
        if (response.body.message === 'Created Successfully.') {
          Swal.fire({
            icon: 'success',
            title: 'Create',
            text: 'Degree Alias Created Successfully !',
          }).then(() => {
            router.replace(`${config.masterRoutes.degreealias}`);
          });
        } else if (response.body.message === 'Already Exists.') {
          Swal.fire({
            icon: 'info',
            title: '',
            text: 'Degree Alias already exists!',
          });
        } else if (response.body.message === 'Creation Failed.') {
          Swal.fire({
            icon: 'error',
            title: '',
            text: 'Degree Alias Creation Failed!',
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

  async function updateDegreeAlias(n) {
    const k = new DegreeAliasApi();
    const opts = {};
    degreealias = {
      id: n.id,
      uniqueGuid: n.uniqueGuid,
      name: n.name,
      degreeId: n.degreeId,
    };
    opts.body = degreealias;
    await k
      .apiDegreeAliasPut(opts)
      .then(async response => {
        console.log('put', response);
        if (response.body.message === 'Updated Successfully.') {
          Swal.fire({
            icon: 'success',
            title: 'Edit',
            text: 'Degree Alias Updated Successfully !',
          }).then(() => {
            router.replace(`${config.masterRoutes.degreealias}`);
          });
        } else if (response.body.message === 'Already Exists.') {
          Swal.fire({
            icon: 'info',
            title: '',
            text: 'Degree Alias Already Exists!',
          });
        } else if (response.body.message === 'Updation Failed.') {
          Swal.fire({
            icon: 'error',
            title: '',
            text: ' Degree Alias Updation Failed!',
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
    async function DegreeGet() {
      const k = new DegreeApi();
      await k
        .apiDegreeGet()
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
    DegreeGet();
  }, []);

  useEffect(() => {
    async function EditData(g) {
      const k = new DegreeAliasApi();
      await k
        .apiDegreeAliasGetByGuidGuidGet(g)
        .then(async response => {
          console.log('guid', response);
          setInitialState(response.body.result);
          if (response.body.message === 'No Record Found.') {
            Swal.fire({
              icon: 'info',
              title: '',
              text: 'No Record Found!',
            }).then(() => {
              router.replace(`${config.masterRoutes.degreealias}`);
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
          {router.query.guId ? 'Edit' : 'Add'} Degree Alias
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
            .max(
              100,
              ' Degree Alias Name must must not exceed above 50 Letters'
            )
            .matches(
              /^[a-zA-Z ]*$/,
              ' Degree Alias Name cannot contain numbers or special characters.'
            )
            .required(' Degree Alias Name is required'),
          degreeId: yup.string().required(' Select Degree from Dropdown'),
        })}
        onSubmit={(values, { resetForm }) =>
          SubmitDetails(values, { resetForm })
        }
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
                        label=" Degree Alias Name"
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
                          id="outlined-adornment-degree"
                          type="text"
                          value={values.degree.name}
                          name="degree"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label=" Degree Alias Name"
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
                        error={Boolean(touched.degreeId && errors.degreeId)}
                      >
                        <Autocomplete
                          fullWidth
                          {...defaultPropsdegree}
                          disableClearable
                          onChange={(event, value) => {
                            setFieldValue('degreeId', value.label);
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
                              label="Select Degree"
                              size="small"
                              value={values?.degreeId}
                              required
                              error={
                                touched.degreeId && Boolean(errors.degreeId)
                              }
                              helperText={touched.degreeId && errors.degreeId}
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
                    router.push(`${config.masterRoutes.degreealias}`)
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
