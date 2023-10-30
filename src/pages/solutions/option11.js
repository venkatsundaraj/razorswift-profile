import { Button } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';

const initialValues = {
  servicesData: 'Construction,Sales or Purchase',
};

const options = [
  { value: 'Design & Permitting', label: 'Design & Permitting' },
  { value: 'Financing', label: 'Financing' },
  { value: 'Construction', label: 'Construction' },
  { value: 'Sales or Purchase', label: 'Sales or Purchase' },
];

const MultiSelectButtonGroup = ({ name, options, onChange, value }) => {
  const handleButtonClick = optionValue => {
    const optionIndex = value.indexOf(optionValue);
    if (optionIndex > -1) {
      const newValue = value
        .split(',')
        .filter(v => v !== optionValue)
        .join(',');
      onChange(name, newValue);
    } else {
      const newValue = value ? `${value},${optionValue}` : optionValue;
      onChange(name, newValue);
    }
  };

  return (
    <div>
      {options.map(option => (
        <Button
          key={option.value}
          variant={value.indexOf(option.value) > -1 ? 'contained' : 'outlined'}
          color="primary"
          onClick={() => handleButtonClick(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
};

const option11 = () => {
  const [formValues, setFormValues] = useState(initialValues);

  const handleFormSubmit = values => {
    console.log(values);
  };

  return (
    <div>
      <Formik initialValues={formValues} onSubmit={handleFormSubmit}>
        {({ values, setFieldValue }) => (
          <Form>
            <Field
              name="servicesData"
              render={() => (
                <MultiSelectButtonGroup
                  name="servicesData"
                  options={options}
                  onChange={setFieldValue}
                  value={values.servicesData}
                />
              )}
            />
            <Button type="submit">Submit</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default option11;
