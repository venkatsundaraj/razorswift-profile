import ProfileCard from '@/cardComponents/ProfileCard';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import { Stack, styled, Typography } from '@mui/material';

const NormalListText = styled(Typography)(({ theme }) => ({
  textTransform: 'none',
  color: '#1D1D1D',
  fontWeight: '500',
  fontSize: '13px',
  lineHeight: '21px',
  [theme.breakpoints.down('sm')]: {
    fontWeight: '500',
    fontSize: '12px',
    lineHeight: '17px',
  },
}));
const InfoCard = ({ styleProps, text }) => {
  return (
    <ProfileCard
      styleProps={{
        minHeight: '50px',
        width: '100%',
        border: '1px solid #FFE9D2',
        background: '#FFF6ED',
        ...styleProps,
      }}
    >
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
        spacing={1.5}
      >
        <InfoRoundedIcon sx={{ color: '#A62973', fontSize: '25px' }} />
        <NormalListText variant="body1" color="initial">
          {text}
        </NormalListText>
      </Stack>
    </ProfileCard>
  );
};

export default InfoCard;
