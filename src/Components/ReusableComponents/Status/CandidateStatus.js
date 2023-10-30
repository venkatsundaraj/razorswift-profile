import { Typography } from '@mui/material';
import { useMemo } from 'react';

const CandidateStatus = ({ value }) => {
  const properties = useMemo(() => {
    const dataProps = {
      1: { textColor: '#006244', backgroundColor: '#CDFFF0', text: 'Passed' },
      2: { textColor: '#FF0000', backgroundColor: '#FFDCDC', text: 'Failed' },
      3: {
        textColor: '#ED5702',
        backgroundColor: 'rgba(237, 87, 2, 0.2)',
        text: 'In progress',
      },
      0: {
        textColor: '#1D1550',
        backgroundColor: '#E1DCFF',
        text: 'Yet to attend',
      },
      4: {
        textColor: '#6C4407',
        backgroundColor: '#F2E1C8',
        text: 'Processing',
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

export default CandidateStatus;
