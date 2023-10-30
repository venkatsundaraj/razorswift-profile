import {
  Autocomplete,
  FormControl,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { createFilterOptions } from '@mui/material/Autocomplete';
import { useField } from 'formik';
const filter = createFilterOptions();

const GetValuesAutocomplete = ({
  name,
  readOnly,
  label,
  value,
  placeHolder,
  textLabelStyle,
  onChange,
  options,
  otherProps,
  multiple,
  isNotAdd,
  ...props
}) => {
  const [field, meta] = useField(name);

  return (
    <FormControl fullWidth error={Boolean(meta.touched && meta.error)}>
      <Stack spacing={1}>
        <Typography
          sx={{
            margin: 0.2,
            fontWeight: '600',
            fontSize: '16px',
            lineHeight: '19.8px',
            ...textLabelStyle,
            color: meta.touched && meta.error ? '#f44336' : '#434343',
          }}
        >
          {label} {otherProps?.required ? '*' : ''}
        </Typography>
        <Autocomplete
          multiple={multiple || false}
          sx={{
            '& .MuiOutlinedInput-root.MuiInputBase-sizeSmall': {
              paddingTop: '9px',
            },
          }}
          freeSolo
          fullWidth
          value={
            multiple
              ? value?.map(selected =>
                  options.find(option => option?.title === selected?.title)
                )
              : field.value
          }
          onChange={onChange}
          // filterOptions={(options, params) => {
          //   const filtered = options ? filter(options, params) : [];

          //   return filtered;
          // }}
          filterOptions={(options, params) => {
            const filtered = options ? filter(options, params) : [];

            if (!multiple && !readOnly && !isNotAdd) {
              const { inputValue } = params;
              const isExisting = options.some(
                option => inputValue === option.title
              );

              if (inputValue !== '' && !isExisting && options.length === 0) {
                filtered.push({
                  inputValue,
                  title: `Add "${inputValue}"`,
                });
              }
            }

            return filtered;
          }}
          id={name}
          {...otherProps}
          disabled={readOnly}
          options={options}
          getOptionLabel={option => {
            if (typeof option === 'string') {
              return option;
            }
            if (option && option?.inputValue) {
              return option?.inputValue;
            }
            return option?.title;
          }}
          renderOption={(props, option) => <li {...props}>{option.title}</li>}
          {...props}
          renderInput={params => (
            <TextField
              {...params}
              fullWidth
              variant="outlined"
              // label=''
              placeholder={placeHolder}
              value={field.value}
              error={meta.touched && Boolean(meta.error)}
              helperText={meta.touched && meta.error}
            />
          )}
        />
      </Stack>
    </FormControl>
  );
};

export default GetValuesAutocomplete;
