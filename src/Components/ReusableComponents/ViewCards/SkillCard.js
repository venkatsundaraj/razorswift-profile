import { Button, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';

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

const SkillCard = ({ skills }) => {
  const [showAll, setShowAll] = useState(false);
  const [moreCount, setMoreCount] = useState(2);
  const [displayCount, setDisplayCount] = useState(3);
  console.log('skills working thinhshsh', skills);

  const handleReadMoreClick = () => {
    if (displayCount + 5 >= skills.length) {
      setDisplayCount(skills.length);
    } else {
      setDisplayCount(displayCount + 5);
    }
  };

  return (
    <Stack direction="column">
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {skills &&
          skills.slice(0, displayCount).map(skill => (
            <TextRole
              key={skill.id}
              style={{
                borderRadius: 50,
                minWidth: '150px',
                padding: '10px 10px',
              }}
            >
              {skill.candidateSkillPlatform.name}
            </TextRole>
          ))}

        {skills && displayCount < skills.length && (
          <Button onClick={handleReadMoreClick}>More</Button>
        )}

        {skills && displayCount > 5 && (
          <Button onClick={() => setDisplayCount(5)}>Read Less</Button>
        )}
      </div>
    </Stack>
  );
};

export default SkillCard;
