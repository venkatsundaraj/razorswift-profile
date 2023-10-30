import { Typography } from '@mui/material';
import { useMemo } from 'react';

const Status = ({ value }) => {
  const properties = useMemo(() => {
    const dataProps = {
      1: { text: 'Schedule', textColor: '#6C4407', backgroundColor: '#F2E1C8' },
      2: {
        text: 'In progress',
        textColor: '#ED5702',
        backgroundColor: 'rgba(237, 87, 2, 0.2)',
      },
      3: {
        text: 'Completed',
        textColor: '#006244',
        backgroundColor: '#CDFFF0',
      },
    };
    return dataProps[value] || {};
  }, [value]);

  return (
    <Typography
      align="center"
      sx={{
        color: properties.textColor,
        minWidth: 100,
        backgroundColor: properties.backgroundColor,
        border: `1px solid ${properties.textColor} `,
        pl: '12px',
        pr: '12px',
        pt: '2px',
        pb: '2px',
        fontWeight: 500,
      }}
      variant="h6"
    >
      {properties.text}
    </Typography>
  );
};

export default Status;
