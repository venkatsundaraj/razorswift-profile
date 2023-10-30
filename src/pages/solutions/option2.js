import { Button, Grid } from '@mui/material';
import { FieldArray, Form, Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';

import TextfieldWrapper from '@/formComponents/FormsUI/Textfield';

const validationSchema = Yup.object().shape({
  skill: Yup.string().required('Required'),
  softSkills: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('Required'),
      level: Yup.string().required('Required'),
    })
  ),
});

const initialValues = {
  skill: '',
  softSkills: [],
};

const Option2 = () => {
  const [count, setCount] = useState(1);
  const [showForm, setShowForm] = useState(false);

  const handleAdd = arrayHelpers => {
    arrayHelpers.push({ name: '', level: '' });
    setCount(count + 1);
    setShowForm(true);
  };

  const handleRemove = (arrayHelpers, index) => {
    arrayHelpers.remove(index);
    setCount(count - 1);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={values => {
        console.log(values);
      }}
    >
      {({ values }) => (
        <Form>
          <Grid container>
            <Grid item xs={12}>
              <TextfieldWrapper
                name={`skill`}
                readOnly={false}
                textLabel="Skill Name"
              />
            </Grid>
            <Grid item xs={12}>
              <FieldArray name="softSkills">
                {arrayHelpers => (
                  <>
                    {values.softSkills.map((softSkill, index) => (
                      <Grid container spacing={2} key={index}>
                        <Grid item xs={4}>
                          <TextfieldWrapper
                            name={`softSkills.${index}.name`}
                            readOnly={false}
                            textLabel="First Name"
                          />
                        </Grid>
                        <Grid item xs={2}>
                          <Button
                            type="button"
                            variant="contained"
                            onClick={() => handleRemove(arrayHelpers, index)}
                          >
                            Remove
                          </Button>
                        </Grid>
                      </Grid>
                    ))}
                    <Button
                      type="button"
                      variant="contained"
                      onClick={() => handleAdd(arrayHelpers)}
                      disabled={count >= 5}
                      sx={{ mt: 2 }}
                    >
                      Add
                    </Button>
                  </>
                )}
              </FieldArray>
            </Grid>
          </Grid>
          {showForm && (
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values, { resetForm }) => {
                arrayHelpers.push(values);
                resetForm();
                setShowForm(false);
              }}
            >
              {formik => (
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <TextfieldWrapper
                      name={`name`}
                      readOnly={false}
                      textLabel="Name"
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextfieldWrapper
                      name={`level`}
                      readOnly={false}
                      textLabel="Level"
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      type="submit"
                      variant="contained"
                      onClick={formik.handleSubmit}
                    >
                      Add Skill
                    </Button>
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      variant="contained"
                      onClick={() => setShowForm(false)}
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              )}
            </Formik>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default Option2;
