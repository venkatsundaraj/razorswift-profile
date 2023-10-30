import CheckboxWrapper from '@/formComponents/FormsUI/Checkbox';
import SelectWrapper from '@/formComponents/FormsUI/Select';
import { CompanyApi } from '@/swagger_api/api/CompanyApi';
import { CompanyCreateDto } from '@/swagger_api/model/CompanyCreateDto';
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
    companySize: '',
    companyType: '',
    isPremium: false,
    submit: null,
  });
  const SubmitDetails = async p => {
    console.log('sub', p);
    if (router.query.guId) {
      const editData = {
        id: p.id,
        uniqueGuid: p.uniqueGuid,
        name: p.name,
        companySize: p.companySize,
        companyType: p.companyType * 1,
        isPremium: p.isPremium,
      };
      updateCompany(editData);
    } else if (!router.query.guId) {
      const addData = {
        name: p.name,
        companySize: p.companySize,
        companyType: p.companyType * 1,
        isPremium: p.isPremium,
      };
      createCompany(addData);
    }
  };
  var company = new CompanyCreateDto();
  async function createCompany(m) {
    const k = new CompanyApi();
    const opts = {};
    company = {
      name: m.name,
      companySize: m.companySize,
      companyType: m.companyType,
      isPremium: m.isPremium,
    };
    opts.body = company;
    await k
      .apiCompanyPost(opts)
      .then(async response => {
        if (response.body.message === 'Created Successfully.') {
          Swal.fire({
            icon: 'success',
            title: 'Create',
            text: 'Company Created Successfully !',
          }).then(() => {
            router.replace(`${config.masterRoutes.company}`);
          });
        } else if (response.body.message === 'Already Exists.') {
          Swal.fire({
            icon: 'info',
            title: '',
            text: 'Company Already Exists!',
          });
        } else if (response.body.message === 'Creation Failed.') {
          Swal.fire({
            icon: 'error',
            title: 'Oops..',
            text: 'Company Creation Failed!',
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

  async function updateCompany(n) {
    console.log();
    const k = new CompanyApi();
    const opts = {};
    company = {
      id: n.id,
      uniqueGuid: n.uniqueGuid,
      name: n.name,
      companySize: n.companySize,
      companyType: n.companyType,
      isPremium: n.isPremium,
    };
    opts.body = company;
    await k
      .apiCompanyPut(opts)
      .then(async response => {
        console.log('put', response);
        if (response.body.message === 'Updated Successfully.') {
          Swal.fire({
            icon: 'success',
            title: 'Edit',
            text: 'Company Updated Successfully.',
          }).then(() => {
            router.replace(`${config.masterRoutes.company}`);
          });
        } else if (response.body.message === 'Already Exists.') {
          Swal.fire({
            icon: 'info',
            title: '',
            text: 'Company Already Exists!',
          });
        } else if (response.body.message === 'Updation Failed.') {
          Swal.fire({
            icon: 'error',
            title: 'Oops..',
            text: ' Company Updation Failed!',
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
      const k = new CompanyApi();
      await k
        .apiCompanyGetByGuidGuidGet(g)
        .then(async response => {
          console.log('guid', response);
          setInitialState(response.body.result);
          if (response.body.message === 'No Record Found.') {
            Swal.fire({
              icon: 'info',
              title: '',
              text: 'No Record Found!',
            }).then(() => {
              router.replace(`${config.masterRoutes.company}`);
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
          {router.query.guId ? 'Edit' : 'Add'} Company
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
            .max(100, 'Company Name must be less than 100 ')
            .matches(
              /^[A-Za-z0-9 ]+$/,
              'Company Name cannot contain special characters.'
            )
            .required('Company Name is required'),
          companySize: yup
            .string()
            .min(1)
            .max(8, 'Company Size must be less than 8')
            .matches(
              /^[1-9][0-9]{0,7}$/,
              'Company Size must be between 1 and 99999999'
            )
            .required('Company Size is required'),
          companyType: yup.string().required('Company Type is required'),
          isPremium: yup.string().required('Is Premium is required'),
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
                        label="Company Name"
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
                      error={Boolean(touched.companySize && errors.companySize)}
                    >
                      <TextField
                        id="outlined-adornment-companySize"
                        type="number"
                        value={values.companySize}
                        name="companySize"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Company Size "
                        size="small"
                        error={Boolean(
                          touched.companySize && errors.companySize
                        )}
                      />
                      {touched.companySize && errors.companySize && (
                        <FormHelperText
                          error
                          id="standard-weight-helper-text-companySize"
                        >
                          {errors.companySize}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <SelectWrapper
                      name="companyType"
                      label="Company Type"
                      textLabel="Company Type"
                      noTextLabel
                      options={valueName}
                      required
                      placeholder="Company Type"
                    />
                  </Grid>

                  <Grid item xs={6} md={6}>
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
                  onClick={() => router.push(`${config.masterRoutes.company}`)}
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
  { id: 1, value: 1, name: 'PrivateLimited' },
  { id: 2, value: 2, name: 'PublicSector' },
];
