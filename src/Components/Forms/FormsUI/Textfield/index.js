import { Stack, TextField, Typography, useTheme } from '@mui/material';
import { useField } from 'formik';

import { FormControl } from '@mui/material';

const TextfieldWrapper = ({
  name,
  textLabel,
  otherProps,
  textLabelStyle,
  readOnly,
  InputProps,
  ...props
}) => {
  const [field, meta] = useField(name);
  const theme = useTheme();

  // if ('required' in otherProps) {
  //   const { required, ...rest } = otherProps;
  //   // do something if required is present
  // } else {
  //   const { ...rest } = otherProps;
  //   // do something else if required is not present
  // }

  const configTextfield = {
    ...field,
    size: otherProps?.size,
    ...props,

    InputProps: InputProps || {},
    disabled: readOnly,
    fullWidth: true,
    variant: 'outlined',
    placeholder: props?.placeHolder ? props?.placeHolder : textLabel,
  };

  if (meta && meta.touched && meta.error) {
    configTextfield.error = true;
    configTextfield.helperText = meta.error;
  }
  // Check if the textLabel is "Contact Number"
  if (textLabel === 'Contact Number' || textLabel === 'Mobile Number') {
    // If it is, add the start adornment
    configTextfield.InputProps.startAdornment = (
      <Typography
        disabled
        sx={{
          fontWeight: 500,
          paddingRight: 0.2,
          color: configTextfield.disabled
            ? theme.palette.text.disabled // Use disabled color from theme
            : '#212121',
        }}
      >
        +91
      </Typography>
    );
  }

  return (
    <FormControl fullWidth error={Boolean(meta.touched && meta.error)}>
      <Stack spacing={1}>
        {textLabel && (
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
            {textLabel} {otherProps?.required ? '*' : ''}
          </Typography>
        )}
        <>
          <TextField {...configTextfield} />
        </>
      </Stack>
    </FormControl>
  );
};

export default TextfieldWrapper;
