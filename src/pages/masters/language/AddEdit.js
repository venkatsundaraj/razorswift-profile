import { LanguageApi } from '@/swagger_api/api/LanguageApi';
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
  const [initialState, setInitialState] = useState({
    id: '',
    uniqueGuid: '',
    name: '',
    code: '',
    submit: null,
  });
  const SubmitDetails = async p => {
    if (router.query.guId) {
      const editData = {
        id: p.id,
        uniqueGuid: p.uniqueGuid,
        name: p.name,
        code: p.code,
      };
      updateLanguage(editData);
    } else if (!router.query.guId) {
      const addData = {
        name: p.name,
        code: p.code,
      };
      createLanguage(addData);
    }
  };
  var language = new LanguageCreateDto();
  async function createLanguage(m) {
    const k = new LanguageApi();
    const opts = {};
    language = {
      name: m.name,
      code: m.code,
    };
    opts.body = language;
    await k
      .apiLanguagePost(opts)
      .then(async response => {
        if (response.body.message === 'Created Successfully.') {
          Swal.fire({
            icon: 'success',
            title: 'Create',
            text: 'Language Created Successfully !',
          }).then(() => {
            router.replace(`${config.masterRoutes.language}`);
          });
        } else if (response.body.message === 'Already Exists.') {
          Swal.fire({
            icon: 'info',
            title: '',
            text: 'Language already exists!',
          });
        } else if (response.body.message === 'Creation Failed.') {
          Swal.fire({
            icon: 'error',
            title: 'Oops..',
            text: 'Language Creation Failed!',
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
  async function updateLanguage(n) {
    const k = new LanguageApi();
    const opts = {};
    language = {
      id: n.id,
      uniqueGuid: n.uniqueGuid,
      name: n.name,
      code: n.code,
    };
    opts.body = language;
    await k
      .apiLanguagePut(opts)
      .then(async response => {
        console.log('put', response);
        if (response.body.message === 'Updated Successfully.') {
          Swal.fire({
            icon: 'success',
            title: 'Edit',
            text: 'Language Updated Successfully !',
          }).then(() => {
            router.replace(`${config.masterRoutes.language}`);
          });
        } else if (response.body.message === 'Already Exists.') {
          Swal.fire({
            icon: 'info',
            title: '',
            text: 'Language Already Exists!',
          });
        } else if (response.body.message === 'Updation Failed.') {
          Swal.fire({
            icon: 'error',
            title: 'Oops..',
            text: ' Language Updation Failed!',
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
      const guid = {
        guid: g,
      };
      console.log(guid);
      const k = new LanguageApi();
      await k
        .apiLanguageGetByGuidGuidGet(g)
        .then(async response => {
          console.log('guid', response);
          setInitialState(response.body.result);
          if (response.body.message === 'No Record Found.') {
            Swal.fire({
              icon: 'info',
              title: '',
              text: 'No Record Found!',
            }).then(() => {
              router.replace(`${config.masterRoutes.language}`);
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
          {router.query.guId ? 'Edit' : 'Add'} Language
        </Typography>
      </>
      <Formik
        enableReinitialize
        initialValues={initialState}
        validationSchema={yup.object().shape({
          id: yup.string().when('router.query.guId', {
            is: true,
            then: yup.string().required('Language Id is required'),
          }),
          uniqueGuid: yup.string().when('router.query.guId', {
            is: true,
            then: yup.string().required('UniqueGuid is required'),
          }),
          name: yup
            .string()
            .min(2)
            .max(100, 'Language Name must not exceed above 100 Letters ')
            .matches(
              /^[a-zA-Z ]*$/,
              'Language Name cannot contain numbers or special characters.'
            )
            .required('Language Name is required'),
          code: yup
            .string()
            .min(1)
            .max(100, 'Language Code must be less than 100')
            .matches(
              /^[a-zA-Z ]*$/,
              'Language Code cannot contain numbers or special characters.'
            )
            .required('Language Code is required'),
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
                        label="Language "
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
                        label="Code "
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
                  onClick={() => router.push(`${config.masterRoutes.language}`)}
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
