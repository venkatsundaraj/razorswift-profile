import { CustomDropDownIconWhite } from '@/components_fbl/globalComponents/CustomDropDown/CustomDropDownIcon';
import ParagraphHeading from '@/components_fbl/headingComponents/ParagraphHeading';

import { FormControl, MenuItem, Select, Stack } from '@mui/material';
import { useFormikContext } from 'formik';
import { useEffect, useState } from 'react';

function SelectWrapper({
  name,
  placeholder,
  nameValue,
  solutionsData,
  ...props
}) {
  const [solutionItems, setSolutionItems] = useState(solutionsData || []);
  const [value, setValue] = useState('2');
  const { setFieldValue, values } = useFormikContext();

  useEffect(() => {
    setFieldValue(name, 'Aspirant');
  }, []);

  const handleChange = function (event) {
    setValue(event.target.value);

    const getData = solutionItems.find(
      item => item.id.toString() === event.target.value.toString()
    );

    setFieldValue(name, getData.data);
  };

  return (
    <FormControl>
      <Stack>
        <Select
          {...props}
          labelId="demo-simple-select-label"
          IconComponent={CustomDropDownIconWhite}
          id="demo-simple-select"
          onChange={handleChange}
          value={value}
          displayEmpty
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
          {solutionItems.map(item => (
            <MenuItem
              value={item.id}
              name={item.name}
              key={item.id}
              disableRipple
            >
              <ParagraphHeading
                sx={{
                  textAlign: 'center',
                  width: '100%',
                  color: 'primaryPalette.black',
                }}
              >
                {item.name}
              </ParagraphHeading>
            </MenuItem>
          ))}
        </Select>
      </Stack>
    </FormControl>
  );
}

export default SelectWrapper;
