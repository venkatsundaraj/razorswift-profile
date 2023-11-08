import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { useField, useFormikContext } from 'formik';

import { FormHelperText } from '@mui/material';

const CheckboxWrapper = ({
  name,
  label,
  legend,
  labelStyle,
  component,
  textLabelStyle,
  onChangeValues,
  ...otherProps
}) => {
  const theme = useTheme();
  const { setFieldValue, values } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = evt => {
    const { checked } = evt.target;
    setFieldValue(name, checked);
  };

  const configCheckbox = {
    ...field,
    checked: values[name],

    onChange: onChangeValues || handleChange,
  };

  const configFormControl = {};
  if (meta && meta.touched && meta.error) {
    configFormControl.error = true;
  }

  return (
    <FormControl {...configFormControl}>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox {...configCheckbox} />}
          label={
            <Stack direction="row" spacing={0.5}>
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
                  ...labelStyle,
                  ...textLabelStyle,
                }}
              >
                {label}
              </Typography>

              {component}
            </Stack>
          }
        />
        {meta.touched && meta.error && (
          <FormHelperText error id="standard-weight-helper-text-selectValuesId">
            {meta.error}
          </FormHelperText>
        )}
      </FormGroup>
    </FormControl>
  );
};

export default CheckboxWrapper;
