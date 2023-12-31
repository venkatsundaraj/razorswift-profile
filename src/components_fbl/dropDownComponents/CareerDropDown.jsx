import CustomDropDownIcon from '@/components_fbl/globalComponents/CustomDropDown/CustomDropDownIcon';
import TertiaryHeading from '@/components_fbl/headingComponents/TertiaryHeading';
import { FormControl, MenuItem, Select } from '@mui/material';
import { useState } from 'react';

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
                color: 'violetPalette.dark',
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
          backgroundColor: 'primaryPalette.white',
          '&:hover': {
            backgroundColor: '#fee2f4',
            '.MuiTypography-root': {
              // color: 'white',
            },
            '& .MuiSelect-icon': {
              // fill: 'white',
            },
          },
          position: 'relative',
          '.MuiTypography-root': {
            color: 'violetPalette.dark',
          },
          '.MuiOutlinedInput-notchedOutline': { border: 0 },
          '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            border: 0,
          },
          '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
            {
              border: 0,
            },
          '& .MuiSelect-icon': {
            top: 'calc(50% - 16px)',
            right: { xs: '12px', md: '24px' },
            fill: '#672376',
            transition: 'transform 0.265s ease',
          },
          '& .MuiSelect-select': {
            backgroundColor: 'transparent',
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
                color: 'primaryPalette.black',
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
