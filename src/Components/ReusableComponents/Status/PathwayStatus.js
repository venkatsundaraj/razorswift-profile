import { Typography } from '@mui/material';
import { useMemo } from 'react';

const PathwayStatus = ({ value, text }) => {
  const properties = useMemo(() => {
    const dataProps = {
      1: {
        text: text || 'Yet to begin',
        textColor: '#6C4407',
        backgroundColor: '#F2E1C8',
      },
      2: {
        text: text || 'In progress',
        textColor: '#ED5702',
        backgroundColor: 'rgba(237, 87, 2, 0.2)',
      },
      3: {
        text: text || 'Completed',
        textColor: '#006244',
        backgroundColor: '#CDFFF0',
      },
    };
    return dataProps[value] || {};
  }, [value, text]);

  return (
    <Typography
      align="center"
      sx={{
        color: properties.textColor,
        minWidth: 100,
        maxWidth: 150,
        backgroundColor: properties.backgroundColor,
        border: `1px solid ${properties.textColor} `,
        pl: '12px',
        pr: '12px',
        pt: '2px',
        pb: '2px',
        fontWeight: 500,
        height: '25px',
      }}
      variant="h6"
    >
      {properties.text}
    </Typography>
  );
};

export default PathwayStatus;
