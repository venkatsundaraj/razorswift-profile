import { CountryApi } from '@/swagger_api/api/CountryApi';
import { CountryCreateDto } from '@/swagger_api/model/CountryCreateDto';
import {
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
    twoLetterCode: '',
    threeLetterCode: '',
    numericCode: '',
    submit: null,
  });
  const SubmitDetails = async p => {
    if (router.query.guId) {
      const editData = {
        id: p.id,
        uniqueGuid: p.uniqueGuid,
        name: p.name,
        code: p.code,
        twoLetterCode: p.twoLetterCode,
        threeLetterCode: p.threeLetterCode,
        numericCode: p.numericCode,
      };
      updateCountry(editData);
    } else if (!router.query.guId) {
      const addData = {
        name: p.name,
        code: p.code,
        twoLetterCode: p.twoLetterCode,
        threeLetterCode: p.threeLetterCode,
        numericCode: p.numericCode,
      };
      createCountry(addData);
    }
  };

  var country = new CountryCreateDto();
  async function createCountry(m) {
    const k = new CountryApi();
    const opts = {};
    country = {
      name: m.name,
      code: m.code,
      twoLetterCode: m.twoLetterCode,
      threeLetterCode: m.threeLetterCode,
      numericCode: m.numericCode,
    };
    opts.body = country;
    await k
      .apiCountryPost(opts)
      .then(async response => {
        if (response.body.message === 'Created Successfully.') {
          Swal.fire({
            icon: 'success',
            title: 'Create',
            text: 'Country Created Successfully.',
          }).then(e => {
            router.replace(`${config.masterRoutes.country}`);
          });
        } else if (response.body.message === 'Already Exists.') {
          Swal.fire({
            icon: 'info',
            title: '',
            text: 'Country Already Exists!',
          });
        } else if (response.body.message === 'Creation Failed.') {
          Swal.fire({
            icon: 'error',
            title: '',
            text: 'Country Creation Failed!',
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

  async function updateCountry(n) {
    const k = new CountryApi();
    const opts = {};
    country = {
      id: n.id,
      uniqueGuid: n.uniqueGuid,
      name: n.name,
      code: n.code,
      twoLetterCode: n.twoLetterCode,
      threeLetterCode: n.threeLetterCode,
      numericCode: n.numericCode,
    };
    opts.body = country;
    await k
      .apiCountryPut(opts)
      .then(async response => {
        if (response.body.message === 'Updated Successfully.') {
          Swal.fire({
            icon: 'success',
            title: 'Edit',
            text: 'Country Updated Successfully.',
          }).then(() => {
            router.replace(`${config.masterRoutes.country}`);
          });
        } else if (response.body.message === 'Already Exists.') {
          Swal.fire({
            icon: 'info',
            title: '',
            text: 'Country Already Exists!',
          });
        } else if (response.body.message === 'Updation Failed.') {
          Swal.fire({
            icon: 'error',
            title: '',
            text: ' Country Updation Failed!',
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
      const k = new CountryApi();
      await k
        .apiCountryGetByGuidGuidGet(g)
        .then(async response => {
          setInitialState(response.body.result);
          if (response.body.message === 'No Record Found.') {
            Swal.fire({
              icon: 'info',
              title: '',
              text: 'No Record Found!',
            }).then(() => {
              router.replace(`${config.masterRoutes.country}`);
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
          {router.query.guId ? 'Edit' : 'Add'} Country
        </Typography>
      </>
      <Formik
        enableReinitialize
        initialValues={initialState}
        validationSchema={yup.object().shape({
          id: yup.string().when('router.query.guId', {
            is: true,
            then: yup.string().required('Country Id is required'),
          }),
          uniqueGuid: yup.string().when('router.query.guId', {
            is: true,
            then: yup.string().required('UniqueGuid is required'),
          }),
          name: yup
            .string()
            .min(3)
            .max(100, 'Country Name should not exceed above 100 Letters')
            .matches(
              /^[a-zA-Z ]*$/,
              'Country Name cannot contain numbers or special characters'
            )
            .required('Country Name is required'),
          code: yup
            .string()
            .min(1)
            .max(50, 'Country Code should not exceed above 50 Letters ')
            .matches(
              /^[a-zA-Z0-9\s\-\_\$\&\@\#\!\%\*\(\)\+\=\[\]\{\}\;\:\'\"\,\.\/\?\`\^\|\~\>\<\\]+$/g,
              'Enter Proper Country Code'
            )
            .required('Country Code is required'),
          twoLetterCode: yup
            .string()
            .min(2, 'Two Letter Code should not exceed above 2 Letters')
            .max(2, 'Two Letter Code should not exceed above 2 Letters')
            .nullable(true)
            .matches(
              /^[a-zA-Z ]*$/,
              'Two Letter Code cannot contain numbers or special characters'
            )
            .required('Two Letter Code is required'),
          threeLetterCode: yup
            .string()
            .min(3)
            .max(3, 'Three Letter Code should not exceed above 3 Letters ')
            .nullable(true)
            .matches(
              /^[a-zA-Z ]*$/,
              'Three Letter Code cannot contain numbers or special characters'
            )
            .required('Three Letter Code is required'),
          numericCode: yup
            .string()
            .min(1)
            .max(5, 'Numeric Code must be less than 5 digits')
            .nullable(true)
            .matches(
              /^([0-9]*[1-9][0-9]*(\.[0-9]+)?|[0]+\.[0-9]*[1-9][0-9]*)$/,
              'Numeric Code must be between 1 and 99999'
            )
            .required('Numeric Code is required'),
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
                        label=" Country Name"
                        inputProps={{}}
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
                        label="Country Code "
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
                      error={Boolean(
                        touched.twoLetterCode && errors.twoLetterCode
                      )}
                    >
                      <TextField
                        id="outlined-adornment-twoLetterCode"
                        type="text"
                        name="twoLetterCode"
                        value={values.twoLetterCode}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label=" Two Letter Code"
                        inputProps={{}}
                        size="small"
                        error={Boolean(
                          touched.twoLetterCode && errors.twoLetterCode
                        )}
                      />
                      {touched.twoLetterCode && errors.twoLetterCode && (
                        <FormHelperText
                          error
                          id="standard-weight-helper-text-name"
                        >
                          {errors.twoLetterCode}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <FormControl
                      fullWidth
                      size="small"
                      error={Boolean(
                        touched.threeLetterCode && errors.threeLetterCode
                      )}
                    >
                      <TextField
                        id="outlined-adornment-threeLetterCode"
                        type="text"
                        name="threeLetterCode"
                        value={values.threeLetterCode}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Three Letter Code"
                        inputProps={{}}
                        size="small"
                        error={Boolean(
                          touched.threeLetterCode && errors.threeLetterCode
                        )}
                      />
                      {touched.threeLetterCode && errors.threeLetterCode && (
                        <FormHelperText
                          error
                          id="standard-weight-helper-text-name"
                        >
                          {errors.threeLetterCode}
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
                </Grid>
              )}
            </DialogContent>
            {initialState && (
              <DialogActions>
                <Button
                  variant="outline"
                  onClick={() => router.push(`${config.masterRoutes.country}`)}
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
