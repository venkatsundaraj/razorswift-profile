'use client';

import { bebasNeue } from '@/utils/themes/typography';
import styled from '@emotion/styled';
import { Typography } from '@mui/material';

const Heading = styled(Typography)(({ theme }) => ({
  lineHeight: 1.05,
  fontSize: '32px',
  fontWeight: 'normal',
  textTransform: 'uppercase',
  width: 'fit-content',
  fontFamily: bebasNeue.style.fontFamily,
  [theme.breakpoints.up('md')]: {
    fontSize: '42px',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '48px',
  },
  [theme.breakpoints.up('xl')]: {
    fontSize: '56px',
  },
}));

function PrimaryHeading({ children, ...props }) {
  return (
    <Heading variant="h2" {...props}>
      {children}
    </Heading>
  );
}

export default PrimaryHeading;
