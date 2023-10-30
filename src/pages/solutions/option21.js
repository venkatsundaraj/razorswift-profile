// Assuming DateTimePicker component is in a separate file
import { Button } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

import { Grid } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import de from 'date-fns/locale/de';
import { otherPropsRequired } from '@/reUsableComponents/FormComponents';
import textLabel from '@/src/Components/LabelComponents/TextLabel';

// import zhCN from 'date-fns/locale/zh-CN';
import { Form, Formik } from 'formik';
import { useState } from 'react';

import MuiDateTimePicker from '@/src/Components/MuiDateTimePicker';
import * as Yup from 'yup';

const today = new Date();
today.setHours(0, 0, 0, 0);

const FORM_VALIDATION = Yup.object().shape({
  datetime: Yup.date()
    .typeError('Start date  is required')
    .required('Start date is required')
    .test(
      'is-today-or-future',
      "Start date must be today's date or a future date",
      function (value) {
        return value && value.setHours(0, 0, 0, 0) >= today.getTime();
      }
    ),
});

const SimpleForm = () => {
  const [value, setValue] = useState(dayjs('2022-04-17T15:30'));

  const handleSubmit = values => {
    // Handle form submission here
    console.log(values);
    console.log(values.date);
    console.log(typeof values.date);
    // console.log('2023-06-07T13:24:42.508Z');
    console.log('format', new Date(values.date));

    // console.log(new Date(values).toISOString());
  };

  return (
    <>
      <Formik
        initialValues={{ date: null, datetime: '', month: null }}
        validationSchema={FORM_VALIDATION}
        onSubmit={handleSubmit}
      >
        <Form>
          <Grid container spacing={0}>
            <Grid item xs={6}>
              <MuiDateTimePicker
                textLabelStyle={textLabel}
                name={`date`}
                formatValue="date"
                textLabel="Date"
                otherProps={otherPropsRequired}
              />
            </Grid>
            <Grid item xs={6}>
              <MuiDateTimePicker
                textLabelStyle={textLabel}
                name={`datetime`}
                formatValue="datetime"
                textLabel="Date"
                otherProps={otherPropsRequired}
              />
            </Grid>
            <Grid item xs={6}>
              <MuiDateTimePicker
                textLabelStyle={textLabel}
                name={`month`}
                formatValue="month"
                textLabel="Date"
                otherProps={otherPropsRequired}
              />
            </Grid>
            <Grid item xs={6}>
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </Grid>
          </Grid>
        </Form>
      </Formik>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          label="Uncontrolled picker"
          defaultValue={dayjs('2022-04-17T15:30')}
        />
        <DateTimePicker
          label="Controlled picker"
          value={value}
          onChange={newValue => setValue(newValue)}
        />
      </LocalizationProvider>
    </>
  );
};

export default SimpleForm;
