import SectionHeader from '@/headingComponents/ProfileText/SectionHeader';
import { DataContext } from '@/reUsableComponents/DataContext/DataContext';
import { SlugContext } from '@/reUsableComponents/DataContext/SlugContext';
import { Button, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useContext, useState } from 'react';

const TextRole = styled(Typography)(({ theme }) => ({
  color: '#1A1A1A',
  fontWeight: '500',
  fontSize: '14px',
  lineHeight: '15.42px',
  textAlign: 'center',
  border: '2px solid #DDDDDD',
  [theme.breakpoints.down('sm')]: {
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '17.2px',
  },
}));
const ButtonText = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: '600',
  fontSize: '16px',
  lineHeight: '19.2px',
  textAlign: 'center',

  [theme.breakpoints.down('sm')]: {
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '16.8px',
  },
}));

const Expertise = () => {
  const [showAll, setShowAll] = useState(false);
  const [moreCount, setMoreCount] = useState(2);

  const context1 = useContext(SlugContext);
  const context2 = useContext(DataContext);

  const expertise = context2
    ? context2?.data?.expertise
    : context1.data?.expertise;

  const [displayCount, setDisplayCount] = useState(3);
  const [employees, setEmployees] = useState(expertise);

  const handleReadMoreClick = () => {
    if (displayCount + 5 >= expertise.length) {
      setDisplayCount(expertise.length);
    } else {
      setDisplayCount(displayCount + 5);
    }
  };

  return (
    <Stack direction="column">
      <SectionHeader>Expertise</SectionHeader>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {expertise &&
          expertise.slice(0, displayCount).map(employee => (
            <TextRole
              key={employee.id}
              style={{
                borderRadius: 50,
                minWidth: '150px',
                padding: '10px 10px',
              }}
            >
              {employee.skillName}
            </TextRole>
          ))}

        {expertise && displayCount < expertise.length && (
          <Button onClick={handleReadMoreClick}>More</Button>
        )}

        {expertise && displayCount > 5 && (
          <Button onClick={() => setDisplayCount(5)}>Read Less</Button>
        )}
      </div>
    </Stack>
  );
};

export default Expertise;
