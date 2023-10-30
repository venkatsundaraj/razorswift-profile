import { MenuItem, Stack, Typography } from '@mui/material';
import { useField, useFormikContext } from 'formik';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { FormControl, Select } from '@mui/material';
import FormHelperText from '@mui/material/FormHelperText';
import OutlinedInput from '@mui/material/OutlinedInput';

const ITEM_HEIGHT = 200;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT,
      top: 100,
    },
  },
};

const SelectWrapper = ({
  name,
  options,
  textLabel,
  noTextLabel,
  backgroundColor,
  placeholder,
  inputProps,
  textLabelStyle,
  readOnly,
  nameValue,
  onChangeValues,
  InputProps,
  textProps,
  input,
  ...otherProps
}) => {
  const { setFieldValue, values } = useFormikContext();
  const [field, meta] = useField(name);

  const configSelect = {
    ...field,
    textProps,

    size: inputProps?.size,
    InputProps: InputProps || {},
    // select: true,
    disabled: readOnly,
    variant: 'outlined',
    fullWidth: true,
    placeholder: placeholder ? placeholder : 'Placeholder',
  };

  if (meta && meta.touched && meta.error) {
    // configSelect.error = true;
    // configSelect.helperText = meta.error;
  }

  return (
    <FormControl fullWidth error={Boolean(meta.touched && meta.error)}>
      <Stack spacing={1}>
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
        <>
          <Select
            {...textProps}
            SelectDisplayProps={{
              style: {
                backgroundColor: backgroundColor || '#ffffff',
              },
            }}
            disabled={readOnly}
            displayEmpty
            MenuProps={MenuProps}
            fullWidth
            inputProps={{ 'aria-label': 'Without label' }}
            renderValue={selected => {
              if (selected?.length === 0 || !selected) {
                return (
                  <Typography
                    sx={
                      {
                        // color: '#434343',
                        // fontWeight: '600',
                        // fontSize: '18px',
                        // lineHeight: '21.6px',
                      }
                    }
                  >
                    {placeholder ? placeholder : 'Placeholder'}
                  </Typography>
                );
              }
              let obj = options.find(o => o?.value === selected);

              return obj?.name;
            }}
            input={input || <OutlinedInput />}
            IconComponent={KeyboardArrowDownIcon}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={nameValue ? nameValue : values[name]}
            {...configSelect}
            onChange={
              onChangeValues
                ? onChangeValues
                : e => {
                    setFieldValue(name, e.target.value);
                  }
            }
          >
            <MenuItem disabled value="">
              <Typography>
                {placeholder ? placeholder : 'Placeholder'}
              </Typography>
            </MenuItem>
            {options.map((option, index) => (
              <MenuItem key={option.id} value={option.value}>
                {option.name}
              </MenuItem>
            ))}
          </Select>
        </>
      </Stack>
      {meta.touched && meta.error && (
        <FormHelperText error id="standard-weight-helper-text-selectValuesId">
          {meta.error}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default SelectWrapper;
