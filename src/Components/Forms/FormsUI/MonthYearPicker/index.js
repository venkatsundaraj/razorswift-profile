import { Autocomplete } from '@mui/lab';
import { TextField } from '@mui/material';
import { createFilterOptions } from '@mui/material/Autocomplete';
import { useFormikContext } from 'formik';
import * as Yup from 'yup';

const filterOptions = createFilterOptions({
  matchFrom: 'any',
  stringify: option => `${option.month}-${option.year}`,
});

const validationSchema = Yup.object({
  month: Yup.number().required(),
  year: Yup.number().required(),
});

const MonthYearPicker = ({ start, end, name }) => {
  const { values, setFieldValue } = useFormikContext();
  const options = [];
  for (let year = start; year <= end; year++) {
    for (let month = 1; month <= 12; month++) {
      options.push({ month, year });
    }
  }

  return (
    <Autocomplete
      id={name}
      options={options}
      getOptionLabel={option =>
        `${new Date(2000, option.month - 1).toLocaleString('default', {
          month: 'long',
        })} ${option.year}`
      }
      filterOptions={filterOptions}
      renderInput={params => (
        <TextField
          {...params}
          label="Month and Year"
          name={name}
          variant="outlined"
          error={
            !!(values[name] && values[name].month && values[name].year) &&
            validationSchema.fields[name].validateSync(values[name])
          }
          helperText={
            !!(values[name] && values[name].month && values[name].year) &&
            validationSchema.fields[name].validateSync(values[name])
          }
        />
      )}
      onChange={(event, value) => {
        setFieldValue(name, value);
      }}
      value={values[name]}
    />
  );
};

export default MonthYearPicker;
