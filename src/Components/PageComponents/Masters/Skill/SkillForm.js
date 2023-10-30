import CheckboxWrapper from '@/formComponents/FormsUI/Checkbox';
import { SkillApi } from '@/swagger_api/api/SkillApi';
import { SkillCreateDto } from '@/swagger_api/model/SkillCreateDto';
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

export default function SkillForm() {
  const router = useRouter();

  const [initialState, setInitialState] = useState({
    id: '',
    uniqueGuid: '',
    name: '',
    type: '',
    isTechnical: false,
    submit: null,
  });
  const SubmitDetails = async p => {
    if (router.query.guId) {
      const editData = {
        id: p.id,
        uniqueGuid: p.uniqueGuid,
        name: p.name,
        type: p.type,
        isTechnical: p.isTechnical,
      };
      updateSkill(editData);
    } else if (!router.query.guId) {
      const addData = {
        name: p.name,
        type: p.type,
        isTechnical: p.isTechnical,
      };
      createSkill(addData);
    }
  };
  var skill = new SkillCreateDto();
  async function createSkill(m) {
    const k = new SkillApi();
    const opts = {};
    skill = {
      name: m.name,
      type: m.type,
      isTechnical: m.isTechnical,
    };
    opts.body = skill;
    await k
      .apiSkillPost(opts)
      .then(async response => {
        if (response.body.message === 'Created Successfully.') {
          Swal.fire({
            icon: 'success',
            title: 'Create',
            text: 'Skill Created Successfully !',
          }).then(e => {
            router.replace(`${config.masterRoutes.skill}`);
          });
        } else if (response.body.message === 'Already Exists.') {
          Swal.fire({
            icon: 'info',
            title: '',
            text: 'Skill Already Exists!',
          });
        } else if (response.body.message === 'Creation Failed.') {
          Swal.fire({
            icon: 'error',
            title: 'Oops..',
            text: 'Skill Creation Failed!',
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

  async function updateSkill(n) {
    console.log();
    const k = new SkillApi();
    const opts = {};
    skill = {
      id: n.id,
      uniqueGuid: n.uniqueGuid,
      name: n.name,
      type: n.type,
      isTechnical: n.isTechnical,
    };
    opts.body = skill;
    await k
      .apiSkillPut(opts)
      .then(async response => {
        console.log('put', response);
        if (response.body.message === 'Updated Successfully.') {
          Swal.fire({
            icon: 'success',
            title: 'Edit',
            text: 'Skill Updated Successfully !',
          }).then(() => {
            router.replace(`${config.masterRoutes.skill}`);
          });
        } else if (response.body.message === 'Already Exists.') {
          Swal.fire({
            icon: 'info',
            title: '',
            text: 'Skill Already Exists!',
          });
        } else if (response.body.message === 'Updation Failed.') {
          Swal.fire({
            icon: 'error',
            title: 'Oops..',
            text: ' Skill Updation Failed!',
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
      const k = new SkillApi();
      await k
        .apiSkillGetByGuidGuidGet(g)
        .then(async response => {
          setInitialState(response.body.result);
          if (response.body.message === 'No Record Found.') {
            Swal.fire({
              icon: 'info',
              title: '',
              text: 'No Record Found!',
            }).then(() => {
              router.replace(`${config.masterRoutes.skill}`);
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
          {router.query.guId ? 'Edit' : 'Add'} Skill
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
            .max(100, 'Skill Name must not exceed above 100 Letters ')
            .matches(
              /^[a-zA-Z ]*$/,
              'Skill Name cannot contain numbers or special characters.'
            )
            .required('Skill Name is required'),
          type: yup
            .string()
            .min(1)
            .max(500)
            .matches(
              /^[A-Za-z0-9 ]+$/,
              'Skill Name cannot contain special characters.'
            ),
          isTechnical: yup.string().required('Is Technical is required'),
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
                        label="Skill Name"
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
                      error={Boolean(touched.type && errors.type)}
                    >
                      <TextField
                        id="outlined-adornment-type"
                        type="text"
                        value={values.type}
                        name="type"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        label="Type "
                        size="small"
                        error={Boolean(touched.type && errors.type)}
                      />
                      {touched.type && errors.type && (
                        <FormHelperText
                          error
                          id="standard-weight-helper-text-type"
                        >
                          {errors.type}
                        </FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <FormControl
                      fullWidth
                      size="small"
                      error={Boolean(touched.isTechnical && errors.isTechnical)}
                    >
                      <CheckboxWrapper
                        name="isTechnical"
                        legend="isTechnical"
                        label="Is Technical"
                      />
                      {touched.isTechnical && errors.isTechnical && (
                        <FormHelperText
                          error
                          id="standard-weight-helper-text-isTechnical"
                        >
                          {errors.isTechnical}
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
                  onClick={() => router.push(`${config.masterRoutes.skill}`)}
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
