import { FormControl, Stack, Typography } from '@mui/material';
import { MobileDatePicker, MobileDateTimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { format } from 'date-fns';
import { useField, useFormikContext } from 'formik';

const MuiDateTimePicker = ({
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

  const formatDate = date => {
    if (!date) return '';
    if (formatValue === 'date') return format(date, 'yyyy-MM-dd');
    if (formatValue === 'month') return format(date, 'yyyy-MM');
    return format(date, "yyyy-MM-dd'T'HH:mm:ss");
  };

  const configDateTimePicker = {
    ...(field && field.value ? field : {}),
    disabled: readOnly,
    fullWidth: true,
    size: otherProps?.otherProps?.size,
    value: field.value ? new Date(field.value) : null,
  };

  if (meta && meta.touched && meta.error) {
    configDateTimePicker.error = true;
    configDateTimePicker.helperText = meta.error;
  }
  //   const formatDateTime = datetime => {
  //     if (datetime && !isNaN(new Date(datetime))) {
  //       return format(new Date(datetime), "yyyy-MM-dd'T'HH:mm:ssxxx");
  //     }
  //     return null;
  //   };
  const formatDateTime = (datetime, formatValue) => {
    if (datetime && !isNaN(new Date(datetime))) {
      if (formatValue === 'date') {
        return format(new Date(datetime), 'yyyy-MM-dd');
      } else if (formatValue === 'month') {
        return format(new Date(datetime), 'yyyy-MM');
      } else {
        return format(new Date(datetime), "yyyy-MM-dd'T'HH:mm:ssxxx");
      }
    }
    return null;
  };

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
          {textLabel} {otherProps?.otherProps?.required ? '*' : ''}
        </Typography>
        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          adapterLocale={undefined}
        >
          {(formatValue === 'date' || formatValue === 'month') && (
            <MobileDatePicker
              clearable
              views={
                formatValue === 'month'
                  ? ['month', 'year']
                  : ['day', 'month', 'year']
              }
              {...configDateTimePicker}
              onChange={val => {
                // console.log(val, 'date');
                // const formattedDate = val ? formatDateTime(val) : null; // Handle null value
                // setFieldValue(name, formattedDate);
                if (formatValue === 'date' && val) {
                  val.setHours(0, 0, 0, 0);
                }
                if (formatValue === 'month' && val) {
                  val.setDate(1);
                  val.setHours(0, 0, 0, 0);
                }
                console.log(val, 'date');
                const formattedDate = val ? formatDateTime(val) : null; // Handle null value
                setFieldValue(name, formattedDate);
              }}
              showToolbar={false}
              format={formatValue === 'month' ? 'MMMM yyyy' : 'dd / MM / yyyy'}
              slotProps={{
                actionBar: {
                  actions: ['clear', 'today', 'cancel', 'accept'],
                },
                textField: { variant: 'outlined', ...configDateTimePicker },

                toolbar: {
                  toolbarPlaceholder: '__',
                  toolbarFormat: `${
                    formatValue === 'month' ? 'MMMM yyyy' : 'dd / MM / yyyy'
                  }`,

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
              clearable
              {...configDateTimePicker}
              onChange={val => {
                console.log(val, 'val');
                const formattedDate = val ? formatDateTime(val) : null; // Handle null value
                setFieldValue(name, formattedDate);
              }}
              timeSteps={{ minutes: 15 }}
              minutesStep={15}
              format="dd/MM/yyyy hh:mm:aa"
              slotProps={{
                actionBar: {
                  actions: ['clear', 'today', 'cancel', 'accept'],
                },
                textField: {
                  variant: 'outlined',
                  ...configDateTimePicker,
                  placeholder: 'dd/MM/yyyy hh:mm:am/pm',
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

export default MuiDateTimePicker;
