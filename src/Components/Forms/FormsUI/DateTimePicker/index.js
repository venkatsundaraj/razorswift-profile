import { Stack, TextField, Typography } from '@mui/material';
import { useField } from 'formik';

import { FormControl } from '@mui/material';

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
  const placeHolder =
    formatValue === 'date'
      ? 'yyyy-mm-dd'
      : formatValue === 'month'
      ? 'yyyy-mm'
      : 'yyyy-mm-ddThh:mm:ss'.slice(0, 16);

  const configDateTimePicker = {
    ...field,
    ...inputProps,
    ...otherProps,
    type: formatValue || 'datetime-local',
    placeholder: placeHolder,
    variant: 'outlined',
    disabled: readOnly,
    fullWidth: true,
    InputLabelProps: {
      shrink: true,
    },
    inputProps: {
      step: 900, // 900 seconds = 15 minutes // set step to 5 minutes
      // custom format string for input and output
      // format: `yyyy-MM-dd'T'HH:mm:ssxxx`,
      format:
        formatValue === 'date'
          ? 'dd-mm-yyyy'
          : formatValue === 'month'
          ? 'Month , Yr'
          : 'yyyy-MM-ddTHH:mm:ssxxx',
      max: formatValue === 'month' ? '9999-12' : '9999-12-31T23:59:59.999Z',
      min: formatValue === 'month' ? '0001-01' : '0001-01-01T00:00:00.000Z',
    },
    value: field.value
      ? formatValue === 'date'
        ? new Date(field.value).toISOString().slice(0, 10)
        : formatValue === 'month'
        ? new Date(field.value).toISOString().slice(0, 7)
        : new Date(field.value).toISOString().slice(0, -1)
      : '', // convert input date to UTC format
    onChange: e => {
      const inputDate = new Date(e.target.value);
      if (isNaN(inputDate)) {
        helpers.setValue('');
        return;
      }
      helpers.setValue(
        formatValue === 'date'
          ? inputDate.toISOString()
          : inputDate.toISOString()
      ); // convert output date to UTC format
    },
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
        <TextField
          {...configDateTimePicker}
          placeholder={placeHolder}
          inputProps={{}}
        />
      </Stack>
    </FormControl>
  );
};

export default DateTimePicker;
