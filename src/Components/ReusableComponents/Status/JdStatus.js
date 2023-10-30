import { Typography } from '@mui/material';
import { useMemo } from 'react';

const JdStatus = ({
  value,
  text,
  borderRadius = 0,
  width = '100px',
  height = '50px',
}) => {
  const properties = useMemo(() => {
    const dataProps = {
      1: { textColor: '#006244', backgroundColor: '#CDFFF0', text: 'Open' },
      2: { textColor: '#153A03', backgroundColor: '#D6F2C8', text: 'Accepted' },
      3: { textColor: '#FF0000', backgroundColor: '#FFDCDC', text: 'Rejected' },
      4: {
        textColor: '#0000FF',
        backgroundColor: 'rgba(0, 0, 255, 0.2)',
        text: 'Inprogress',
      },
      5: { textColor: '#6C4407', backgroundColor: '#F2E1C8', text: 'Close' },
      6: {
        textColor: 'black',
        backgroundColor: 'rgba(128, 128, 128, 0.2)',
        text: 'Deactivate',
      },
      7: { textColor: '#1D1550', backgroundColor: '#E1DCFF', text: 'Hold' },
      default: {
        textColor: '#FFA500', // Changed to a distinct orange color for 'New' status
        backgroundColor: '#FFEDCC',
        text: 'New',
      },
    };

    return dataProps ? dataProps[value] : {};
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
        borderRadius: borderRadius,
        width: width,
      }}
      variant="h6"
    >
      {text || properties?.text}
    </Typography>
  );
};

export default JdStatus;
