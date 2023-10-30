import ShadowButton from '@/buttonComponents/ShadowButton';
import { Container, Stack, styled, Typography } from '@mui/material';
import { useRouter } from 'next/router';

const CreateProfile = () => {
  const router = useRouter();
  const ButtonText = styled(Typography)(({ theme }) => ({
    textTransform: 'none',
    fontSize: '20px',
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: '26.68px',
    [theme.breakpoints.down('md')]: {
      fontSize: '20px',
    },
  }));
  const QuestionText = styled(Typography)(({ theme }) => ({
    color: '#fff',
    fontSize: '38px',
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: '55.8px',
    [theme.breakpoints.down('md')]: {
      fontSize: '22px',
      lineHeight: '30px',
    },
  }));
  return (
    <Container
      maxWidth="xl"
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        height: 1,
        gap: 4,
        background:
          'radial-gradient(302.01% 219.19% at 50% 216.66%, #FB847D 0%, #672376 100%)',
        height: 375,
      }}
    >
      <Stack>
        <QuestionText>Ready to transform your career</QuestionText>
        <QuestionText>with Razorswift ?</QuestionText>
      </Stack>

      <ShadowButton
        onClick={() => router.push('/login')}
        size="large"
        height="66px"
        width="207.65px"
        backgroundColor="#fff"
      >
        <ButtonText color="#000">Build your profile</ButtonText>
      </ShadowButton>
    </Container>
  );
};

export default CreateProfile;
