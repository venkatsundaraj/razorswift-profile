import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Grid, IconButton, TextField } from '@mui/material';
import { Field, FieldArray, Formik } from 'formik';
import * as Yup from 'yup';

const initialValues = {
  contacts: [], // Initialize the contacts array as an empty array
  newContact: {
    name: '',
    email: '',
    contactNumber: '',
  },
};

const MyForm = () => {
  const handleSubmit = values => {
    console.log(values);
    // Logic for form submission
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        contacts: Yup.array().of(
          Yup.object().shape({
            name: Yup.string().required('Name is required'),
            email: Yup.string()
              .email('Invalid email address')
              .required('Email is required'),
            contactNumber: Yup.string().required('Contact number is required'),
          })
        ),
      })}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <form onSubmit={handleSubmit}>
          <FieldArray name="contacts">
            {({ push, remove }) => (
              <>
                {values.contacts.map((contact, index) => (
                  <Grid container spacing={2} key={index}>
                    <Grid item xs={4}>
                      <Field
                        name={`contacts[${index}].name`}
                        label="Name"
                        component={TextField}
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <Field
                        name={`contacts[${index}].email`}
                        label="Email"
                        component={TextField}
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <Field
                        name={`contacts[${index}].contactNumber`}
                        label="Contact Number"
                        component={TextField}
                        variant="outlined"
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <IconButton onClick={() => remove(index)}>
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                ))}
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Field
                      name="newContact.name"
                      label="Name"
                      component={TextField}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Field
                      name="newContact.email"
                      label="Email"
                      component={TextField}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Field
                      name="newContact.contactNumber"
                      label="Contact Number"
                      component={TextField}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={1}>
                    <Button
                      onClick={() => {
                        push(values.newContact);
                        values.newContact.name = '';
                        values.newContact.email = '';
                        values.newContact.contactNumber = '';
                      }}
                    >
                      Add
                    </Button>
                  </Grid>
                </Grid>
              </>
            )}
          </FieldArray>
          <Button type="submit">Submit</Button>
        </form>
      )}
    </Formik>
  );
};

export default MyForm;
