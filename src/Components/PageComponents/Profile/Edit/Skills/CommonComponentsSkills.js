import { Box, Stack, styled, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

export const commonStyle = {
  height: '100px',
  width: '100%',
  backgroundColor: 'white',
};

export const SkillMainName = styled(Typography)(({ theme }) => ({
  color: '#1D1D1D',
  fontWeight: '600',
  fontSize: '15px',
  lineHeight: '23.33px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  [theme.breakpoints.down('md')]: {
    fontSize: '12px',
    lineHeight: '18.66px',
  },
}));
export const SkillSubName = styled(Typography)(({ theme }) => ({
  color: '#1D1D1D',
  fontWeight: '600',
  fontSize: '13px',
  lineHeight: '20.33px',
  width: '100%',
  // maxWidth: '300px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  [theme.breakpoints.down('md')]: {
    fontSize: '10px',
    lineHeight: '16.66px',
  },
}));

// const ExperienceBadge = ({ weight }) => {
//   const [properties, setProperties] = useState({});

//   const WeightNumber = parseInt(weight);

//   useEffect(() => {
//     if (WeightNumber >= 0 && WeightNumber <= 33) {
//       setProperties({ backgroundColor: 'rgba(255, 153, 0, 0.78);', text: 'Beginner' });
//     } else if (WeightNumber >= 34 && WeightNumber <= 67) {
//       setProperties({ backgroundColor: '#4238D1', text: 'Intermediate' });
//     } else if (WeightNumber >= 68 && WeightNumber <= 100) {
//       setProperties({ backgroundColor: '#1DB653', text: 'Expert' });
//     }
//   }, []);
//   return (
//     <Stack
//       sx={{
//         width: '100%',
//         maxWidth: '130px',
//         textAlign: 'center',
//         borderRadius: '4px',
//         backgroundColor: properties.backgroundColor,
//       }}
//       direction='row'
//       // alignItems={'space-between'}
//       justifyContent={'flex-end'}
//       spacing={0.5}
//       divider={<Divider orientation='vertical' flexItem />}>
//       <SkillSubName
//         sx={{
//           maxWidth: '40px',
//           textAlign: 'center',
//           color: 'white',
//         }}>
//         {weight}%
//       </SkillSubName>
//       <SkillSubName sx={{ maxWidth: '90px', textAlign: 'center', color: 'white' }}>{properties.text}</SkillSubName>
//     </Stack>
//   );
// };

export const SkillBadge = ({ SkillSubName }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: '5px',
      }}
    >
      <Box
        sx={{
          height: 5,
          width: 5,
          borderRadius: '100%',
          bgcolor: 'red',
        }}
      />
      {SkillSubName}
    </Box>
  );
};

export const ExperienceBadge = ({ level }) => {
  const [properties, setProperties] = useState({});

  useEffect(() => {
    if (level === 1) {
      setProperties({
        backgroundColor: 'rgba(255, 153, 0, 0.78);',
        text: 'Beginner',
      });
    } else if (level === 2) {
      setProperties({ backgroundColor: '#4238D1', text: 'Intermediate' });
    } else if (level === 3) {
      setProperties({ backgroundColor: '#1DB653', text: 'Expert' });
    }
  }, [level]);
  return (
    <Stack
      sx={{
        width: '100%',
        minWidth: '100px',
        maxWidth: '100px',
        textAlign: 'center',
        borderRadius: '4px',
        p: 0.5,
        backgroundColor: properties?.backgroundColor,
      }}
      direction="row"
      // alignItems={'space-between'}
      justifyContent={'center'}
      spacing={0.5}
    >
      <SkillSubName
        sx={{ maxWidth: '90px', textAlign: 'center', color: 'white' }}
      >
        {properties?.text}
      </SkillSubName>
    </Stack>
  );
};

export const SkillTypeBadge = ({ level }) => {
  const [properties, setProperties] = useState({});

  useEffect(() => {
    if (level === 1) {
      setProperties({
        backgroundColor: 'rgba(255, 153, 0, 0.78);',
        text: 'Must have',
      });
    } else if (level === 2) {
      setProperties({ backgroundColor: '#4238D1', text: 'Good to have' });
    } else if (level === 3) {
      setProperties({ backgroundColor: '#1DB653', text: 'Expert' });
    }
  }, [level]);
  return (
    <Stack
      sx={{
        width: '100%',
        minWidth: '100px',
        maxWidth: '100px',
        textAlign: 'center',
        borderRadius: '4px',
        p: 0.5,
        backgroundColor: properties?.backgroundColor,
      }}
      direction="row"
      // alignItems={'space-between'}
      justifyContent={'center'}
      spacing={0.5}
    >
      <SkillSubName
        sx={{ maxWidth: '90px', textAlign: 'center', color: 'white' }}
      >
        {properties?.text}
      </SkillSubName>
    </Stack>
  );
};
