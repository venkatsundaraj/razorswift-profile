import { useFormikContext } from 'formik';
// Import your custom SwitchButton component
import SwitchButton from '@/reUsableComponents/SwitchButton';
import { FormControl, FormHelperText, Stack, Typography } from '@mui/material';

const SwitchButtonWrapper = ({
  name,
  label,
  onChangeValues,
  LeftLabel,
  RightLabel,
  textLabel,
  noTextLabel,
  backgroundColor,
  placeholder,
  inputProps,
  textLabelStyle,
  readOnly,
  nameValue,

  InputProps,
  textProps,
  ...otherProps
}) => {
  const { setFieldValue, values, errors, touched, meta } = useFormikContext();

  const handleChange = event => {
    console.log(event.target.checked);

    setFieldValue(name, event.target.checked);
    if (onChangeValues) {
      onChangeValues(event.target.checked);
    }
  };

  const isError = errors[name] && touched[name];

  return (
    <FormControl error={isError} sx={{ height: 50 }}>
      <Stack spacing={2}>
        {!noTextLabel && (
          <Typography
            sx={{
              margin: 0.2,
              fontWeight: '600',
              fontSize: '16px',
              lineHeight: '19.8px',
              ...textLabelStyle,
              color: meta && meta.touched && meta.error ? '#f44336' : '#434343',
            }}
          >
            {textLabel} {inputProps?.required ? '*' : ''}
          </Typography>
        )}
        <Stack>
          <SwitchButton
            checked={values[name]}
            workingFunctions={handleChange}
            Left={LeftLabel}
            Right={RightLabel}
          />
        </Stack>
      </Stack>

      {isError && <FormHelperText>{errors[name]}</FormHelperText>}
    </FormControl>
  );
};

export default SwitchButtonWrapper;
