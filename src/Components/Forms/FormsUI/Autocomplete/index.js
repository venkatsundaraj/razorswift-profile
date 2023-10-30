import { Autocomplete, TextField, Typography } from '@mui/material';
import { useField, useFormikContext } from 'formik';

const AutocompleteWrapper = ({
  label,
  name,
  options,
  textLabel,
  noTextLabel,
  backgroundColor,
  placeholder,
  inputProps,
  textLabelStyle,
  readOnly,
  ...otherProps
}) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta, values] = useField(name);

  const handleChange = (_, value) => {
    setFieldValue(name, value);
  };

  return (
    <>
      {!noTextLabel && (
        <Typography
          sx={{
            margin: 0.2,

            fontWeight: '600',
            fontSize: '16px',
            lineHeight: '19.8px',
            color: meta && meta.touched && meta.error ? '#f44336' : '#434343',
            ...textLabelStyle,
          }}
        >
          {textLabel} {otherProps.required ? '*' : ''}
        </Typography>
      )}
      <Autocomplete
        multiple
        id={name}
        options={options}
        getOptionLabel={option => option.skillName}
        value={values.name}
        onChange={handleChange}
        renderInput={params => (
          <TextField
            {...params}
            label=""
            variant="outlined"
            placeholder={label}
          />
        )}
        {...otherProps}
      />
      {meta.touched && meta.error && (
        <Typography variant="body2" color="error" gutterBottom>
          {meta.error}
        </Typography>
      )}
    </>
  );
};

export default AutocompleteWrapper;
