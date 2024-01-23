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
  defaultState,
  ...props
}) {
  const [solutionItems, setSolutionItems] = useState(solutionsData || []);
  const [value, setValue] = useState(defaultState);
  const { setFieldValue, values } = useFormikContext();

  useEffect(() => {
    setValue(defaultState);
  }, [defaultState]);

  const handleChangeOne = function (event) {
    setValue(event.target.value);

    const getData = solutionItems.find(
      item => item.id.toString() === event.target.value.toString()
    );

    // console.log(getData);

    setFieldValue(name, getData.data);
  };

  return (
    <FormControl>
      <Stack>
        <Select
          {...props}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          IconComponent={CustomDropDownIconWhite}
          onChange={handleChangeOne}
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
          {solutionItems.map(item => (
            <MenuItem value={item.data} key={item.name} disableRipple>
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
