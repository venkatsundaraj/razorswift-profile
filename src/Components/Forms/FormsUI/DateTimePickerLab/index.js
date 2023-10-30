import { DatePicker } from '@mui/lab';
import { Stack, TextField, Typography } from '@mui/material';
import { useField } from 'formik';

const DateTimePickerLab = ({
  name,
  textLabel,
  inputProps,
  textLabelStyle,
  readOnly,
  ...otherProps
}) => {
  const [field, meta, helpers] = useField(name);

  const configDateTimePicker = {
    ...field,
    ...inputProps,
    ...otherProps,
    disabled: readOnly,
    fullWidth: true,
    InputLabelProps: {
      shrink: true,
    },
    inputProps: {
      // custom format string for input and output
      format: 'yyyy-MM',
    },
    value: field.value || null,
    onChange: date => {
      helpers.setValue(date);
    },
    renderInput: params => {
      return <TextField {...params} />;
    },
    components: {
      OpenPickerIcon: null,
      SwitchViewButton: null,
      ClockIcon: null,
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
            ...textLabelStyle,
            color: meta && meta.touched && meta.error ? '#f44336' : '#434343',
          }}
        >
          {textLabel} {inputProps?.required ? '*' : ''}
        </Typography>
        <DatePicker {...configDateTimePicker} views={['year']} minView="year" />
      </Stack>
    </>
  );
};

export default DateTimePickerLab;
