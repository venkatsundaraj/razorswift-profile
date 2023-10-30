import CareerDropDown from '@/components_fbl/dropDownComponents/CareerDropDown';
import CareerDropDownBody from '@/components_fbl/dropDownComponents/CareerDropDownBody';
import { Box } from '@mui/material';
import { useState } from 'react';

function DropdownSection({ dropDownData, dropDownBodyData }) {
  const [dropDownBody, setDropDownBody] = useState(dropDownBodyData[0]);
  const onChangeHandler = function (value) {
    const selectedBody = dropDownBodyData.find(
      item => item.id.toString() === value.toString()
    );
    setDropDownBody(selectedBody);
  };
  return (
    <Box
      component="section"
      sx={{
        width: '100vw',
        backgroundColor: 'primaryPalette.white',
        padding: { xs: '16px 16px', sm: '24px 24px', lg: '64px 24px' },
      }}
    >
      <Box
        sx={{
          backgroundColor: `${dropDownBody.backgroundColor}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 4,
          minHeight: '100vh',
          width: '100%',
          borderRadius: 6,
          padding: theme => theme.spacing(4, 0),
          justifyContent: 'start',
        }}
      >
        <CareerDropDown
          changeHandler={onChangeHandler}
          dropDownData={dropDownData}
        />
        <CareerDropDownBody dropDownBodyData={dropDownBody} />
      </Box>
    </Box>
  );
}

export default DropdownSection;
