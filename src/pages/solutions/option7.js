import { Stack, Typography } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useField } from 'formik';

const DateTimePicker = ({
  name,
  textLabel,
  inputProps,
  textLabelStyle,
  readOnly,
  formatValue,
  ...otherProps
}) => {
  const [field, meta, helpers] = useField(name);

  const configDateTimePicker = {
    ...field,
    ...inputProps,
    ...otherProps,
    type: formatValue || 'datetime-local',
    variant: 'outlined',
    disabled: readOnly,
    fullWidth: true,
    InputLabelProps: {
      shrink: true,
    },
    inputProps: {
      step: 300, // set step to 5 minutes
      // custom format string for input and output
      format:
        formatValue === 'date' ? 'yyyy-MM-dd' : `yyyy-MM-dd'T'HH:mm:ssxxx`,
    },
    value: field.value
      ? formatValue === 'date'
        ? new Date(field.value).toISOString().slice(0, 10)
        : new Date(field.value).toISOString().slice(0, -1)
      : '', // convert input date to UTC format
    onChange: e => {
      helpers.setValue(
        formatValue === 'date'
          ? new Date(e.target.value).toISOString()
          : new Date(e.target.value).toISOString()
      ); // convert output date to UTC format
    },
  };

  if (meta && meta.touched && meta.error) {
    configDateTimePicker.error = true;
    configDateTimePicker.helperText = meta.error;
  }

  return (
    <>
      <Stack spacing={1}>
        <Typography
          sx={{
            margin: 0.2,
            fontFamily: 'Urbanist',
            fontWeight: '600',
            fontSize: '16px',
            lineHeight: '19.8px',
            color: meta && meta.touched && meta.error ? '#f44336' : '#434343',
            ...textLabelStyle,
          }}
        >
          {textLabel} {inputProps?.required ? '*' : ''}
        </Typography>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker {...configDateTimePicker} />
        </LocalizationProvider>
      </Stack>
    </>
  );
};

const option7 = () => {
  return <div>wihsdh</div>;
};

export default option7;
