import { JdSlugContext } from '@/reUsableComponents/DataContext/JdSlugContext';
import { Stack, Typography, styled } from '@mui/material';
import { useContext } from 'react';
const Header = styled(Typography)(({ theme }) => ({
  textTransform: 'none',
  color: '#1A1A1A',
  fontWeight: '700',
  fontSize: '24px',
  lineHeight: '36.25px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '18px',
    lineHeight: '29px',
  },
}));

const HeaderLine = styled(Typography)(({ theme }) => ({
  textTransform: 'none',
  color: '#434343',
  fontWeight: '500',
  fontSize: '18px',
  lineHeight: '31.91px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '12px',
    lineHeight: '25.3px',
  },
}));
const Jd = () => {
  const context = useContext(JdSlugContext);
  return (
    <Stack direction="row" justifyContent="space-between" alignItems={'center'}>
      <Stack spacing={2}>
        <Header>{context.data.title ? context.data.title : '-'}</Header>
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <HeaderLine>
            <span style={{ fontWeight: '700' }}>
              {context?.data?.client?.name ? context?.data?.client?.name : '-'}
            </span>
          </HeaderLine>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Jd;
