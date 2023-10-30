import { SkillAliasApi } from '@/swagger_api/api/SkillAliasApi';
import { SkillApi } from '@/swagger_api/api/SkillApi';
import { SkillCreateDto } from '@/swagger_api/model/SkillCreateDto';
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
    skillId: '',
    skill: { name: '' },
    submit: null,
  });
  const [initialData, setInitialData] = useState([]);
  const defaultPropsskill = {
    options: initialData,
    getOptionLabel: option => option?.value,
  };
  const SubmitDetails = async p => {
    if (router.query.guId) {
      const editData = {
        id: p.id,
        uniqueGuid: p.uniqueGuid,
        name: p.name,
        skillId: p.skillId,
      };
      updateSkillAlias(editData);
    } else if (!router.query.guId) {
      const addData = {
        name: p.name,
        skillId: p.skillId,
      };
      createSkillAlias(addData);
    }
  };

  var skillalias = new SkillCreateDto();
  async function createSkillAlias(m) {
    const k = new SkillAliasApi();
    const opts = {};
    skillalias = {
      name: m.name,
      skillId: m.skillId,
    };
    opts.body = skillalias;
    await k
      .apiSkillAliasPost(opts)
      .then(async response => {
        if (response.body.message === 'Created Successfully.') {
          Swal.fire({
            icon: 'success',
            title: 'Create',
            text: 'Skill Alias Created Successfully .',
          }).then(() => {
            router.replace(`${config.masterRoutes.skillalias}`);
          });
        } else if (response.body.message === 'Already Exists.') {
          Swal.fire({
            icon: 'info',
            title: '',
            text: 'Skill Alias Already Exists !',
          });
        } else if (response.body.message === 'Creation Failed.') {
          Swal.fire({
            icon: 'error',
            title: '',
            text: 'Skill Alias Creation Failed !',
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

  async function updateSkillAlias(n) {
    console.log();
    const k = new SkillAliasApi();
    const opts = {};
    skillalias = {
      id: n.id,
      uniqueGuid: n.uniqueGuid,
      name: n.name,
      skillId: n.skillId,
    };
    opts.body = skillalias;
    await k
      .apiSkillAliasPut(opts)
      .then(async response => {
        console.log('put', response);
        if (response.body.message === 'Updated Successfully.') {
          Swal.fire({
            icon: 'success',
            title: 'Edit',
            text: 'Skill Alias Updated Successfully .',
          }).then(() => {
            router.replace(`${config.masterRoutes.skillalias}`);
          });
        } else if (response.body.message === 'Already Exists.') {
          Swal.fire({
            icon: 'info',
            title: '',
            text: 'Skill Alias Already Exists !',
          });
        } else if (response.body.message === 'Updation Failed.') {
          Swal.fire({
            icon: 'error',
            title: '',
            text: ' Skill Alias Updation Failed !',
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
    async function SkillGet() {
      const k = new SkillApi();
      await k
        .apiSkillGet()
        .then(async response => {
          console.log('sns', response);
          const trim = response?.body?.result?.map(res => ({
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
    SkillGet();
  }, []);

  useEffect(() => {
    async function EditData(g) {
      const guid = {
        guid: g,
      };
      console.log(guid);
      const k = new SkillAliasApi();
      await k
        .apiSkillAliasGetByGuidGuidGet(g)
        .then(async response => {
          console.log('guid', response);
          setInitialState(response.body.result);
          if (response.body.message === 'No Record Found.') {
            Swal.fire({
              icon: 'info',
              title: '',
              text: 'No Record Found!',
            }).then(() => {
              router.replace(`${config.masterRoutes.skillalias}`);
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
          {router.query.guId ? 'Edit' : 'Add'} Skill Alias
        </Typography>
      </>
      <Formik
        enableReinitialize
        initialValues={initialState}
        validationSchema={yup.object().shape({
          id: yup.string().when('router.query.guId', {
            is: true,
            then: yup.string().required('Skill Alias Id is required'),
          }),
          uniqueGuid: yup.string().when('router.query.guId', {
            is: true,
            then: yup.string().required('UniqueGuid is required'),
          }),
          name: yup
            .string()
            .min(1)
            .max(100, 'Skill Alias Name must not exceed above 100 letters')
            .matches(
              /^[a-zA-Z ]*$/,
              'Skill Alias Name cannot contain numbers or special characters.'
            )
            .required('Skill Alias Name is required'),
          skillId: yup.string().required(' Select Skill from Dropdown'),
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
                        label="Skill Alias Name"
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
                          id="outlined-adornment-skillId"
                          type="text"
                          value={values.skill.name}
                          name="skillId"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          label="Skill Name"
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
                        error={Boolean(touched.skillId && errors.skillId)}
                      >
                        <Autocomplete
                          fullWidth
                          {...defaultPropsskill}
                          disableClearable
                          onChange={(event, value) => {
                            setFieldValue('skillId', value.label);
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
                              label="Select Skill"
                              size="small"
                              value={values?.skillId}
                              required
                              error={touched.skillId && Boolean(errors.skillId)}
                              helperText={touched.skillId && errors.skillId}
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
                    router.push(`${config.masterRoutes.skillalias}`)
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
