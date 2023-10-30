import CheckboxWrapper from '@/formComponents/FormsUI/Checkbox';
import { EducationInstituteApi } from '@/swagger_api/api/EducationInstituteApi';
import { EducationInstituteCreateDto } from '@/swagger_api/model/EducationInstituteCreateDto';
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
    isPremium: false,
    isApprroved: false,
    submit: null,
  });
  const SubmitDetails = async p => {
    if (router.query.guId) {
      const editData = {
        id: p.id,
        uniqueGuid: p.uniqueGuid,
        name: p.name,
        isPremium: p.isPremium,
        isApprroved: p.isApprroved,
      };
      updateEducationInstitute(editData);
    } else if (!router.query.guId) {
      const addData = {
        name: p.name,
        isPremium: p.isPremium,
        isApprroved: p.isApprroved,
      };
      createEducationInstitute(addData);
    }
  };
  var educationinstitute = new EducationInstituteCreateDto();
  async function createEducationInstitute(m) {
    const k = new EducationInstituteApi();
    const opts = {};
    educationinstitute = {
      name: m.name,
      isPremium: m.isPremium,
      isApprroved: m.isApprroved,
    };
    opts.body = educationinstitute;
    await k
      .apiEducationInstitutePost(opts)
      .then(async response => {
        if (response.body.message === 'Created Successfully.') {
          Swal.fire({
            icon: 'success',
            title: 'Create',
            text: 'Educational Institute Created Successfully.',
          }).then(() => {
            router.replace(`${config.masterRoutes.educationinstitute}`);
          });
        } else if (response.body.message === 'Already Exists.') {
          Swal.fire({
            icon: 'info',
            title: '',
            text: 'Educational Institute Already Exists!',
          });
        } else if (response.body.message === 'Creation Failed.') {
          Swal.fire({
            icon: 'error',
            title: 'Oops..',
            text: 'Educational Institute Creation Failed!',
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
  async function updateEducationInstitute(n) {
    console.log();
    const k = new EducationInstituteApi();
    const opts = {};
    educationinstitute = {
      id: n.id,
      uniqueGuid: n.uniqueGuid,
      name: n.name,
      isPremium: n.isPremium,
      isApprroved: n.isApprroved,
    };
    opts.body = educationinstitute;
    await k
      .apiEducationInstitutePut(opts)
      .then(async response => {
        console.log('put', response);
        if (response.body.message === 'Updated Successfully.') {
          Swal.fire({
            icon: 'success',
            title: 'Edit',
            text: 'Educational Institute Updated Successfully.',
          }).then(() => {
            router.replace(`${config.masterRoutes.educationinstitute}`);
          });
        } else if (response.body.message === 'Already Exists.') {
          Swal.fire({
            icon: 'info',
            title: '',
            text: 'Educational Institute Already Exists!',
          });
        } else if (response.body.message === 'Updation Failed.') {
          Swal.fire({
            icon: 'error',
            title: 'Oops..',
            text: ' Educational Institute Updation Failed!',
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
      const k = new EducationInstituteApi();
      await k
        .apiEducationInstituteGetByGuidGuidGet(g)
        .then(async response => {
          console.log('guid', response);
          setInitialState(response.body.result);
          if (response.body.message === 'No Record Found.') {
            Swal.fire({
              icon: 'info',
              title: '',
              text: 'No Record Found!',
            }).then(() => {
              router.replace(`${config.masterRoutes.educationinstitute}`);
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
          {router.query.guId ? 'Edit' : 'Add'} Educational Institute
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
            .min(2)
            .max(
              100,
              'Educational Institute Name must not exceed above 100 Letters '
            )
            .matches(
              /^[A-Za-z0-9 ]+$/,
              'Educational Institute Name cannot contain special characters.'
            )
            .required('Educational Institute Name is required'),
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
                <Grid container spacing={4}>
                  <Grid item xs={12} md={12}>
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
                        label="Educational Institute Name"
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
                  <Grid item xs={3} md={3}>
                    <FormControl
                      fullWidth
                      size="small"
                      error={Boolean(touched.isPremium && errors.isPremium)}
                    >
                      <CheckboxWrapper
                        name="isPremium"
                        legend="isPremium"
                        label="Is Premium"
                      />
                      {touched.isPremium && errors.isPremium && (
                        <FormHelperText
                          error
                          id="standard-weight-helper-text-isPremium"
                        >
                          {errors.isPremium}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={3} md={3}>
                    <FormControl
                      fullWidth
                      size="small"
                      error={Boolean(touched.isApprroved && errors.isApprroved)}
                    >
                      <CheckboxWrapper
                        name="isApprroved"
                        legend="isApprroved"
                        label="Is Apprroved"
                      />
                      {touched.isApprroved && errors.isApprroved && (
                        <FormHelperText
                          error
                          id="standard-weight-helper-text-isApprroved"
                        >
                          {errors.isApprroved}
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
                  onClick={() =>
                    router.push(`${config.masterRoutes.educationinstitute}`)
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
