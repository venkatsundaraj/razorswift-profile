import { Typography } from '@mui/material';
import { useState, useEffect } from 'react';

const Status = props => {
  const { textColor, backgroundColor, text, value } = props;
  const [properties, setProperties] = useState({});

  useEffect(() => {
    if (value === 'active') {
      setProperties({
        textColor: '#057602',
        backgroundColor: 'rgba(5, 118, 2, 0.2)',
        text: 'Active',
      });
    } else if (value === 'inactive') {
      setProperties({
        textColor: '#F83232',
        backgroundColor: 'rgba(248, 50, 50,0.2)',
        text: 'Inactive',
      });
    } else if (value === 'available') {
      setProperties({
        textColor: '#057602',
        backgroundColor: 'rgba(5, 118, 2, 0.2)',
        text: 'Available',
      });
    } else if (value === 'maintainance') {
      setProperties({
        textColor: '#F83232',
        backgroundColor: 'rgba(248, 50, 50,0.2)',
        text: 'Maintenance',
      });
    } else if (value === 'running') {
      setProperties({
        textColor: '#ED5702',
        backgroundColor: 'rgba(237, 87, 2, 0.2)',
        text: 'Running',
      });
    } else if (value === 'locked') {
      setProperties({
        textColor: '#D9BF09',
        backgroundColor: 'rgba(255, 225, 0, 0.2)',
        text: 'Locked',
      });
    } else if (value === 'Calibrated') {
      setProperties({
        textColor: '#057602',
        backgroundColor: 'rgba(5, 118, 2, 0.2)',
        text: 'Calibrated',
      });
    } else if (value === 'Upcoming') {
      setProperties({
        textColor: '#ED5702',
        backgroundColor: 'rgba(237, 87, 2, 0.2)',
        text: 'Upcoming',
      });
    }
  }, []);

  return (
    <Typography
      align="center"
      sx={{
        color: properties.textColor,
        minWidth: 100,
        backgroundColor: properties.backgroundColor,
        pl: '12px',
        pr: '12px',
        pt: '2px',
        pb: '2px',
        borderRadius: 20,
        fontWeight: 500,
      }}
      variant="h6"
    >
      {properties.text}
    </Typography>
  );
};

export default Status;
