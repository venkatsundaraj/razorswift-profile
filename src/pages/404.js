import CustomSection from '@/components_fbl/globalComponents/CustomContainer/CustomSection';
import styled from '@emotion/styled';
import { Box, Button, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';
import SecondaryHeading from '../components_fbl/headingComponents/SecondaryHeading';

export const IdealButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'transparent',
  padding: '6px 12px',
  color: 'black',
  borderRadius: 8,
  boxShadow: 2,
  border: '1px solid black',
  fontSize: '16px',
  '&:hover': {
    backgroundColor: 'transparent',
    color: 'black',
  },
}));

export default function Custom404() {
  const router = useRouter();

  return (
    <Box component="main">
      <CustomSection
        sx={{
          minHeight: '100vh',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 4,
          justifyContent: 'center',
        }}
      >
        <SecondaryHeading>Page not found</SecondaryHeading>
        <Stack
          flexDirection="row"
          gap={5}
          alignItems="center"
          justifyContent="space-between"
        >
          <IdealButton onClick={e => router.back()}>Go back</IdealButton>
          <IdealButton onClick={e => router.refresh()}>Refresh</IdealButton>
        </Stack>
      </CustomSection>
    </Box>
  );
}
