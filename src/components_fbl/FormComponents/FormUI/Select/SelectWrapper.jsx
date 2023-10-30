import { CustomDropDownIconWhite } from '@/components_fbl/globalComponents/CustomDropDown/CustomDropDownIcon';
import ParagraphHeading from '@/components_fbl/headingComponents/ParagraphHeading';
import { solutionsData } from '@/constants/Aspirants/aspirantPageData';
import { FormControl, MenuItem, Select, Stack } from '@mui/material';
import { useFormikContext } from 'formik';
import { useEffect, useState } from 'react';

function SelectWrapper({ name, placeholder, nameValue, ...props }) {
  const [value, setValue] = useState('2');
  const { setFieldValue, values } = useFormikContext();

  useEffect(() => {
    setFieldValue(name, 'Aspirant');
  }, []);

  const handleChange = function (event) {
    setValue(event.target.value);

    const getData = solutionsData.find(
      item => item.id.toString() === event.target.value.toString()
    );

    setFieldValue(name, getData.name);
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
          sx={{
            color: 'pinkPalette.dark',
            position: 'relative',
            '& .MuiSelect-icon': {
              transition: 'all 0.265s ease',
              top: 'calc(50% - 16px)',
              width: '20px',
            },
            '&:after': {
              content: "''",
              position: 'absolute',
              width: '98%',
              zIndex: '-1',
              backgroundColor: 'pinkPalette.navLight',
              height: '50%',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%) rotate(-4deg)',
              borderRadius: 4,
            },
          }}
        >
          {solutionsData.map(item => (
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
