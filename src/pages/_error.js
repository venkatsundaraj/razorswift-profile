import PrimaryFillButton from '@/components_fbl/buttonComponents/PrimaryFillButton';
import CustomSection from '@/components_fbl/globalComponents/CustomContainer/CustomSection';
import ExtraParagraphHeading from '@/components_fbl/headingComponents/ExtraParagraphHeading';
import { Stack } from '@mui/material';
import { useRouter } from 'next/router';

function ErrorPage({ error, reset }) {
  const router = useRouter();
  return (
    <CustomSection
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ExtraParagraphHeading sx={{ color: 'pinkPalette.light' }}>
        {error?.message}
      </ExtraParagraphHeading>
      <Stack
        alignItems="center"
        justifyContent="center"
        flexDirection="row"
        gap={5}
      >
        <PrimaryFillButton
          onClick={reset}
          sx={{
            backgroundColor: 'pinkPalette.dark',
            color: 'primaryPalette.white',
            '&:hover': {
              backgroundColor: 'pinkPalette.dark',
              color: 'primaryPalette.white',
            },
          }}
          variant="filled"
        >
          Retry
        </PrimaryFillButton>
        <PrimaryFillButton
          sx={{
            backgroundColor: 'pinkPalette.dark',
            color: 'primaryPalette.white',
            '&:hover': {
              backgroundColor: 'pinkPalette.dark',
              color: 'primaryPalette.white',
            },
          }}
          variant="filled"
          onClick={() => router.back()}
        >
          Go Back
        </PrimaryFillButton>
      </Stack>
    </CustomSection>
  );
}

export default ErrorPage;
