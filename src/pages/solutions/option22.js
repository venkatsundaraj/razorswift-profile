// Assuming DateTimePicker component is in a separate file
import { Button, Container } from '@mui/material';
import {
  DatePicker,
  DateTimePicker,
  MobileDateTimePicker,
} from '@mui/x-date-pickers';
import dayjs from 'dayjs';

import { FormControl, Stack, TextField, Typography } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { format } from 'date-fns';
// import de from 'date-fns/locale/de';

// import zhCN from 'date-fns/locale/zh-CN';
import { Form, Formik, useField } from 'formik';
import { useState } from 'react';

const CustomDateTimePicker = ({
  name,
  textLabel,
  inputProps,
  textLabelStyle,
  readOnly,
  formatValue,
  ...otherProps
}) => {
  const [field, meta, helpers] = useField(name);
  const placeHolder =
    formatValue === 'date'
      ? 'yyyy-mm-dd'
      : formatValue === 'month'
      ? 'yyyy-mm'
      : 'yyyy-mm-ddThh:mm:ss'.slice(0, 16);
  const { setFieldValue } = useFormikContext();

  const handleChange = value => {
    if (!value) {
      helpers.setValue('');
      return;
    }
    helpers.setValue(value.toISOString());
  };

  const formatDate = date => {
    if (!date) return '';
    if (formatValue === 'date') return format(date, 'yyyy-MM-dd');
    if (formatValue === 'month') return format(date, 'yyyy-MM');
    return format(date, "yyyy-MM-dd'T'HH:mm:ssxxx");
  };

  const configDateTimePicker = {
    ...field,
    ...inputProps,
    ...otherProps,
    value: field.value ? new Date(field.value) : null,
  };

  if (meta && meta.touched && meta.error) {
    configDateTimePicker.error = true;
    configDateTimePicker.helperText = meta.error;
  }

  return (
    <FormControl fullWidth error={Boolean(meta.touched && meta.error)}>
      <Stack spacing={1}>
        <Typography
          sx={{
            margin: 0.2,
            fontFamily: 'Urbanist',
            fontWeight: '600',
            fontSize: '16px',
            lineHeight: '19.8px',
            ...textLabelStyle,
            color: meta && meta.touched && meta.error ? '#f44336' : '#434343',
          }}
        >
          {textLabel} {inputProps?.required ? '*' : ''}
        </Typography>
        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          adapterLocale={undefined}
        >
          {formatValue === 'date' && (
            <DatePicker
              {...configDateTimePicker}
              onChange={val => {
                setFieldValue(name, format(val, "yyyy-MM-dd'T'HH:mm:ssxxx"));
              }}
              showToolbar={false}
              slotProps={{
                textField: { variant: 'outlined' },
                inputFormat: 'dd/MM/yyyy',
                toolbar: {
                  toolbarPlaceholder: '__',
                  toolbarFormat: 'dd / mm / yyyy',
                  hidden: false,
                },
              }}
              //   renderInput={params => <TextField {...params} variant='outlined' placeholder={placeHolder} />}
              renderDay={(day, _value, dayState) => {
                const formattedDate = formatDate(day);
                return <div>{formattedDate}</div>;
              }}
            />
          )}
          {formatValue === 'datetime' && (
            <MobileDateTimePicker
              {...configDateTimePicker}
              onChange={val => {
                setFieldValue(name, format(val, "yyyy-MM-dd'T'HH:mm:ssxxx"));
              }}
              format="dd/MM/yyyy hh:mm:aa"
              slotProps={{
                textField: {
                  variant: 'outlined',
                  placeholder: 'select a date',
                },
                toolbar: {
                  toolbarPlaceholder: '__',
                  toolbarFormat: 'dd / MM / yyyy hh:mm:aa',
                  hidden: false,
                },
              }}
              //   renderInput={params => <TextField {...params} variant='outlined' placeholder={placeHolder} />}
              renderDay={(day, _value, dayState) => {
                const formattedDate = formatDate(day);
                return <div>{formattedDate}</div>;
              }}
            />
          )}
        </LocalizationProvider>
      </Stack>
    </FormControl>
  );
};

import { otherPropsRequired } from '@/reUsableComponents/FormComponents';
import textLabel from '@/src/Components/LabelComponents/TextLabel';
import { useFormikContext } from 'formik';

const FormikDatePicker = props => {
  const { name, ...restProps } = props;
  const [field] = useField(name);
  const { setFieldValue } = useFormikContext();

  return (
    <MobileDateTimePicker
      {...restProps}
      value={field.value ?? null}
      onChange={val => setFieldValue(name, val)}
    />
  );
};

// ...

const HomePage = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container maxWidth="xs">
        <Formik
          initialValues={{
            start_date: new Date('2023-06-07T13:24:42.508Z').toISOString(),
          }}
          onSubmit={values => console.log(values.$d.toISOString().slice(0, 10))}
        >
          <Form>
            <Stack gap={2} my={10}>
              <Typography variant="h3" fontWeight={700}>
                My Form
              </Typography>
              <FormikDatePicker
                name="start_date"
                formatValue="datetime"
                renderInput={params => (
                  <TextField {...params} label="Start date" />
                )}
              />
              <Button type="submit" variant="outlined" color="primary">
                Submit
              </Button>
            </Stack>
          </Form>
        </Formik>
      </Container>
    </LocalizationProvider>
  );
};

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
      <Formik initialValues={{ date: null }} onSubmit={handleSubmit}>
        <Form>
          <CustomDateTimePicker
            textLabelStyle={textLabel}
            name={`date`}
            formatValue="date"
            textLabel="Date"
            inputProps={otherPropsRequired}
          />

          <Button type="submit" variant="contained">
            Submit
          </Button>
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
