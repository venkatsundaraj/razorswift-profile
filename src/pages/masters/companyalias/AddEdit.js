import { CompanyAliasApi } from '@/swagger_api/api/CompanyAliasApi';
import { CompanyApi } from '@/swagger_api/api/CompanyApi';
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
  const [initialState, setInitialState] = useState({
    id: '',
    uniqueGuid: '',
    name: '',
    companyId: '',
    company: {
      name: '',
    },
    submit: null,
  });
  const [initialData, setInitialData] = useState([]);
  const defaultPropscompany = {
    options: initialData,
    getOptionLabel: option => option?.value,
  };
  const SubmitDetails = async p => {
    if (router.query.guId) {
      const editData = {
        id: p.id,
        uniqueGuid: p.uniqueGuid,
        name: p.name,
        companyId: p.companyId,
      };
      updateCompanyAlias(editData);
    } else if (!router.query.guId) {
      const addData = {
        name: p.name,
        companyId: p.companyId,
      };
      createCompanyAlias(addData);
    }
  };

  var companyalias = new DegreeCreateDto();
  async function createCompanyAlias(m) {
    const k = new CompanyAliasApi();
    const opts = {};
    companyalias = {
      name: m.name,
      companyId: m.companyId,
    };
    opts.body = companyalias;
    await k
      .apiCompanyAliasPost(opts)
      .then(async response => {
        if (response.body.message === 'Created Successfully.') {
          Swal.fire({
            icon: 'success',
            title: 'Create',
            text: 'Company Alias Created Successfully !',
          }).then(() => {
            router.replace(`${config.masterRoutes.companyalias}`);
          });
        } else if (response.body.message === 'Already Exists.') {
          Swal.fire({
            icon: 'info',
            title: '',
            text: 'Company Alias already exists!',
          });
        } else if (response.body.message === 'Creation Failed.') {
          Swal.fire({
            icon: 'error',
            title: '',
            text: 'Company Alias Creation Failed!',
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

  async function updateCompanyAlias(n) {
    const k = new CompanyAliasApi();
    const opts = {};
    companyalias = {
      id: n.id,
      uniqueGuid: n.uniqueGuid,
      name: n.name,
      companyId: n.companyId,
    };
    opts.body = companyalias;
    await k
      .apiCompanyAliasPut(opts)
      .then(async response => {
        console.log('put', response);
        if (response.body.message === 'Updated Successfully.') {
          Swal.fire({
            icon: 'success',
            title: 'Edit',
            text: 'Company Alias Updated Successfully !',
          }).then(() => {
            router.replace(`${config.masterRoutes.companyalias}`);
          });
        } else if (response.body.message === 'Already Exists.') {
          Swal.fire({
            icon: 'info',
            title: '',
            text: 'Company Alias Already Exists!',
          });
        } else if (response.body.message === 'Updation Failed.') {
          Swal.fire({
            icon: 'error',
            title: '',
            text: ' Company Alias Updation Failed!',
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
    async function CompanyGet() {
      const k = new CompanyApi();
      await k
        .apiCompanyGet()
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
    CompanyGet();
  }, []);

  useEffect(() => {
    async function EditData(g) {
      const guid = {
        guid: g,
      };
      console.log(guid);
      const k = new CompanyAliasApi();
      await k
        .apiCompanyAliasGetByGuidGuidGet(g)
        .then(async response => {
          console.log('guid', response);
          setInitialState(response.body.result);
          if (response.body.message === 'No Record Found.') {
            Swal.fire({
              icon: 'info',
              title: '',
              text: 'No Record Found!',
            }).then(() => {
              router.replace(`${config.masterRoutes.companyalias}`);
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
          {router.query.guId ? 'Edit' : 'Add'} Company Alias
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
            .max(100, 'Company Alias Name must not exceed above 100 Letters')
            .matches(
              /^[a-zA-Z ]*$/,
              'Company Alias Name cannot contain numbers or special characters.'
            )
            .required('Company Alias Name is required'),
          companyId: yup.string().required(' Select Company from Dropdown'),
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
                        label="Company Alias Name"
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
                          id="outlined-adornment-companyId"
                          type="text"
                          value={values.company.name}
                          name="companyId"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label="Company Name"
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
                        error={Boolean(touched.companyId && errors.companyId)}
                      >
                        <Autocomplete
                          fullWidth
                          {...defaultPropscompany}
                          disableClearable
                          onChange={(event, value) => {
                            setFieldValue('companyId', value.label);
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
                              label="Select Company"
                              size="small"
                              value={values?.companyId}
                              required
                              error={
                                touched.companyId && Boolean(errors.companyId)
                              }
                              helperText={touched.companyId && errors.companyId}
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
                    router.push(`${config.masterRoutes.companyalias}`)
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
