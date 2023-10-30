import { Button, TextField } from '@mui/material';
import { Field, FieldArray, Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  rounds: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('Name is required'),
      date: Yup.date().required('Date is required'),
      panels: Yup.array().of(
        Yup.object().shape({
          name: Yup.string().required('Name is required'),
        })
      ),
    })
  ),
});

const initialValues = {
  rounds: [
    {
      name: '',
      date: '',
      panels: [{ name: '' }],
    },
  ],
};

const Form = () => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={values => {
        console.log(values);
      }}
    >
      {({ values, errors, touched, handleSubmit, handleChange }) => (
        <form onSubmit={handleSubmit}>
          <FieldArray name="rounds">
            {({ push, remove }) => (
              <div>
                {values.rounds.map((round, index) => (
                  <div key={index}>
                    <Field
                      name={`rounds[${index}].name`}
                      as={TextField}
                      label="Round Name"
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      error={
                        errors.rounds &&
                        errors.rounds[index] &&
                        errors.rounds[index].name &&
                        touched.rounds &&
                        touched.rounds[index] &&
                        touched.rounds[index].name
                      }
                      helperText={
                        touched.rounds &&
                        touched.rounds[index] &&
                        touched.rounds[index].name &&
                        errors.rounds &&
                        errors.rounds[index] &&
                        errors.rounds[index].name
                      }
                    />
                    <Field
                      name={`rounds[${index}].date`}
                      as={TextField}
                      type="date"
                      label="Round Date"
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      error={
                        errors.rounds &&
                        errors.rounds[index] &&
                        errors.rounds[index].date &&
                        touched.rounds &&
                        touched.rounds[index] &&
                        touched.rounds[index].date
                      }
                      helperText={
                        touched.rounds &&
                        touched.rounds[index] &&
                        touched.rounds[index].date &&
                        errors.rounds &&
                        errors.rounds[index] &&
                        errors.rounds[index].date
                      }
                    />
                    <FieldArray name={`rounds[${index}].panels`}>
                      {({ push, remove }) => (
                        <div>
                          {round.panels.map((panel, panelIndex) => (
                            <div key={panelIndex}>
                              <Field
                                name={`rounds[${index}].panels[${panelIndex}].name`}
                                as={TextField}
                                label="Panel Name"
                                variant="outlined"
                                margin="normal"
                                fullWidth
                                error={
                                  errors.rounds &&
                                  errors.rounds[index] &&
                                  errors.rounds[index].panels &&
                                  errors.rounds[index].panels[panelIndex] &&
                                  errors.rounds[index].panels[panelIndex]
                                    .name &&
                                  touched.rounds &&
                                  touched.rounds[index] &&
                                  touched.rounds[index].panels &&
                                  touched.rounds[index].panels[panelIndex] &&
                                  touched.rounds[index].panels[panelIndex].name
                                }
                                helperText={
                                  touched.rounds &&
                                  touched.rounds[index] &&
                                  touched.rounds[index].panels &&
                                  touched.rounds[index].panels[panelIndex] &&
                                  touched.rounds[index].panels[panelIndex]
                                    .name &&
                                  errors.rounds &&
                                  errors.rounds[index] &&
                                  errors.rounds[index].panels &&
                                  errors.rounds[index].panels[panelIndex] &&
                                  errors.rounds[index].panels[panelIndex].name
                                }
                              />
                              <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => remove(panelIndex)}
                              >
                                Remove Panel
                              </Button>
                            </div>
                          ))}
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => push({ name: '' })}
                          >
                            Add Panel
                          </Button>
                        </div>
                      )}
                    </FieldArray>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => remove(index)}
                    >
                      Remove Round
                    </Button>
                  </div>
                ))}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() =>
                    push({
                      name: '',
                      date: '',
                      panels: [{ name: '' }],
                    })
                  }
                >
                  Add Round
                </Button>
              </div>
            )}
          </FieldArray>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default Form;
