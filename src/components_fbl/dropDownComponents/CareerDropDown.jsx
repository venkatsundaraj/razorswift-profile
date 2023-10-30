import { FormControl, MenuItem, Select } from '@mui/material';
import { useState } from 'react';
import CustomDropDownIcon from '../globalComponents/CustomDropDown/CustomDropDownIcon';
import TertiaryHeading from '../headingComponents/TertiaryHeading';

function CareerDropDown({ dropDownData, changeHandler }) {
  const [profession, setProfession] = useState('1');
  const handleChange = function (e) {
    setProfession(e.target.value);
    changeHandler(e.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      <Select
        value={profession}
        IconComponent={CustomDropDownIcon}
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
        onChange={handleChange}
        displayEmpty
        MenuProps={{
          PaperProps: {
            sx: {
              borderRadius: 10,
              padding: theme => theme.spacing(2, 2),
              '& .MuiMenuItem-root': {
                padding: 2,
                borderRadius: 6,
                fontSize: '18px',
              },
            },
          },
        }}
        sx={{
          padding: theme => ({
            xs: theme.spacing(1, 2),
            md: theme.spacing(1, 4),
          }),
          boxShadow: '0px 10px 15px -3px rgba(0,0,0,0.1)',
          backgroundColor: 'primaryPalette.white',
          borderRadius: theme => theme.spacing(5),
          color: 'violetPalette.dark',
          position: 'relative',
          '& .MuiSelect-icon': {
            top: 'calc(50% - 16px)',
            right: { xs: '12px', md: '24px' },
            transition: 'all 0.265s ease',
          },
        }}
      >
        {dropDownData?.map(item => (
          <MenuItem
            key={item.id}
            name={item.title}
            disableRipple
            value={item.id}
            sx={{
              padding: 2,
              textAlign: 'center',
              textAlign: 'center',
            }}
          >
            <TertiaryHeading
              style={{ width: '100%' }}
              sx={{
                color: 'primaryPalette.dark',
                fontWeight: '600',
                textAlign: 'center',
              }}
            >
              {item.title}
            </TertiaryHeading>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default CareerDropDown;
