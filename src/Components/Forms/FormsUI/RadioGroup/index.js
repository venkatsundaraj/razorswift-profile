import {
  FormControl,
  FormControlLabel,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import { useField, useFormikContext } from 'formik';

import { FormHelperText } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup, { useRadioGroup } from '@mui/material/RadioGroup';
import { styled } from '@mui/material/styles';

const StyledFormControlLabel = styled(props => <FormControlLabel {...props} />)(
  ({ theme, checked }) => ({
    '.MuiFormControlLabel-label': checked && {
      color: theme.palette.primary.main,
    },
  })
);

function MyFormControlLabel(props) {
  const radioGroup = useRadioGroup();

  let checked = false;

  if (radioGroup) {
    checked = radioGroup.value === props.value;
  }

  return <StyledFormControlLabel checked={checked} {...props} />;
}

const RadioGroupWrapper = ({
  name,
  label,
  textLabel,
  legend,
  options,
  labelStyle,
  component,
  textLabelStyle,
  ...otherProps
}) => {
  const theme = useTheme();
  const { setFieldValue, values } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = evt => {
    setFieldValue(name, evt.target.value);
  };

  const configRadio = {
    ...field,
    onChange: handleChange,
  };

  const configFormControl = {};
  if (meta && meta.touched && meta.error) {
    configFormControl.error = true;
  }

  return (
    <FormControl {...configFormControl}>
      <RadioGroup
        onChange={e => {
          setFieldValue(name, event.target.value);
        }}
        name={name}
        value={values[name]}
        defaultValue={options[0].value}
      >
        {options.map((optionValues, index) => (
          <MyFormControlLabel
            checked={values[name] === optionValues.value}
            key={optionValues.id}
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
                  {optionValues.name}
                </Typography>
              </Stack>
            }
            control={<Radio />}
          />
        ))}
      </RadioGroup>

      {meta.touched && meta.error && (
        <FormHelperText error id="standard-weight-helper-text-selectValuesId">
          {meta.error}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default RadioGroupWrapper;
