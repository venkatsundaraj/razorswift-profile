import { Typography } from '@mui/material';
import { useMemo } from 'react';

const ActiveStatusComponent = ({ value, text }) => {
  const properties = useMemo(() => {
    const dataProps = {
      1: { textColor: '#153A03', backgroundColor: '#D6F2C8', text: 'Active' },
      2: {
        textColor: '#FF0000',
        backgroundColor: '#FFDCDC',
        text: 'In Active',
      },
    };

    return dataProps[value];
  }, [value]);

  return (
    <Typography
      align="center"
      sx={{
        color: properties?.textColor,
        minWidth: 100,
        backgroundColor: properties?.backgroundColor,
        border: `1px solid ${properties?.textColor} `,
        pl: '12px',
        pr: '12px',
        pt: '2px',
        pb: '2px',
        fontWeight: 500,
      }}
      variant="h6"
    >
      {text || properties?.text}
    </Typography>
  );
};

export default ActiveStatusComponent;
