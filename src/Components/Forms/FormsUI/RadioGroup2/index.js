import { useTheme } from '@emotion/react';
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import { useField, useFormikContext } from 'formik';

const RadioGroupWrapper2 = ({
  name,
  label,
  options,
  textLabel,
  legend,
  labelStyle,
  component,
  textLabelStyle,
  inputProps,
  rowDirection,
  otherProps,
}) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const theme = useTheme();

  const handleChange = event => {
    // console.log('calues jobtitkletype', event.target.value);
    setFieldValue(name, event.target.value);
  };

  const configRadioGroup = {
    ...field,
    ...otherProps,
    row: rowDirection,
    onChange: handleChange,
  };

  if (meta && meta.touched && meta.error) {
    configRadioGroup.error = true;
  }

  return (
    <FormControl
      sx={{ margin: 0.2 }}
      fullWidth
      error={Boolean(meta && meta.touched && meta.error)}
    >
      <Stack spacing={1}>
        <Typography
          sx={{
            margin: 0.2,
            fontWeight: '600',
            fontSize: '16px',
            lineHeight: '19.8px',

            ...labelStyle,
            ...textLabelStyle,
            color: meta && meta.touched && meta.error ? '#f44336' : '#434343',
          }}
        >
          {textLabel} {otherProps.required ? '*' : ''}
        </Typography>
        <RadioGroup {...configRadioGroup}>
          {options.map(option => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              control={<Radio />}
              label={
                <Typography
                  sx={{
                    fontSize: '14px',
                    lineHeight: '16.8px',
                    fontWeight: '600',
                    fontFamily: 'Urbanist',
                    cursor: 'pointer',
                    [theme.breakpoints.down('sm')]: {
                      fontSize: '12px',
                      lineHeight: '14.4px',
                      fontWeight: '600',
                    },
                    color: theme.palette.primary.main,
                  }}
                >
                  {option.name}
                </Typography>
              }
            />
          ))}
        </RadioGroup>
        {meta && meta.touched && meta.error && (
          <FormHelperText error id={`${name}-helper-text`}>
            {meta.error}
          </FormHelperText>
        )}
      </Stack>
    </FormControl>
  );
};

export default RadioGroupWrapper2;
