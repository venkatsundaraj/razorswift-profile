import { FormControl, MenuItem, Select } from '@mui/material';
import { useFormikContext } from 'formik';
import { useEffect, useState } from 'react';

const options = [
  { id: 2, name: 'Google Pay', link: '/', data: 'Google Pay' },
  { id: 1, name: 'Paytm', link: '/', data: 'Paytm' },
  { id: 3, name: 'Phone Pay', link: '/', data: 'Phone Pay' },
  { id: 4, name: 'Others', link: '/', data: 'Others' },
];
const CoursesPageSelectWrapper = function ({
  name,
  placeholder,
  namevalue,
  ...props
}) {
  const [value, setValue] = useState('1');
  const { setFieldValue } = useFormikContext();

  useEffect(() => {
    setFieldValue(name, 'Paytm');
  }, []);

  const handleChange = function (event) {
    setValue(event.target.value);

    const getData = options.find(
      item => item.id.toString() === event.target.value.toString()
    );

    setFieldValue(name, getData.data);
  };
  return (
    <FormControl sx={{ width: '100%' }}>
      <Select
        {...props}
        onChange={handleChange}
        value={value}
        MenuProps={{
          PaperProps: {
            sx: {
              '& .MuiMenuItem-root': {
                fontSize: '18px',
                background: 'transparent',
              },
            },
          },
        }}
      >
        {options.map((item, index) => (
          <MenuItem
            value={item.id}
            name={item.name}
            key={item.id}
            disableRipple
          >
            {item.data}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CoursesPageSelectWrapper;
