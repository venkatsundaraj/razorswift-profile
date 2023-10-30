import SelectWrapper from '@/formComponents/FormsUI/Select';
import { Button, Grid } from '@mui/material';
import { FieldArray, Form, Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';

import TextfieldWrapper from '@/formComponents/FormsUI/Textfield';

const validationSchema = Yup.object().shape({
  softSkills: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required('Required'),
      level: Yup.string().required('Required'),
    })
  ),
});

const initialValues = {
  softSkills: [
    {
      name: 'aa',
      level: 1,
    },
    {
      name: 'vv',
      level: 2,
    },
    {
      name: 'ss',
      level: 3,
    },
  ],
};

const levelValues = [
  { id: 1, value: 1, name: 'Beginner' },
  { id: 2, value: 2, name: 'Intermediate' },
  { id: 3, value: 3, name: 'Expert' },
];

const option3 = () => {
  const [count, setCount] = useState(1);

  const handleAdd = arrayHelpers => {
    arrayHelpers.push({ name: '', level: '' });
    setCount(count + 1);
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
          <FieldArray name="softSkills">
            {arrayHelpers => (
              <>
                {values.softSkills.map((softSkill, index) => (
                  <Grid container spacing={2} key={index}>
                    <Grid item xs={4}>
                      <TextfieldWrapper
                        name={`softSkills.${index}.name`}
                        readOnly={false}
                        // textLabelStyle={textLabel}
                        textLabel="First Name"
                        // otherProps={otherProps}
                      />
                    </Grid>
                    {/* <Grid item xs={4}>
                      <Field name={`softSkills.[${index}].level`} label={`Level #${index + 1}`} as={Select} fullWidth>
                        {levelValues.map(level => (
                          <MenuItem key={level.id} value={level.value}>
                            {level.name}
                          </MenuItem>
                        ))}
                      </Field>
                    </Grid> */}
                    <Grid item xs={4}>
                      <SelectWrapper
                        // textLabelStyle={textLabel}
                        name={`softSkills.[${index}].level`}
                        textLabel={`Level #${index + 1}`}
                        options={levelValues}
                        nameValue={softSkill.level}
                        placeholder="Select status"
                        // inputProps={otherProps}
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

export default option3;
