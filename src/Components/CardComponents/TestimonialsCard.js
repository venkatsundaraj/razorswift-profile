import IMAGES from '@/imageComponents/ImagePaths';
import { styled, useTheme } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const TestimonialsCard = ({ header, title, subTitle, url }) => {
  const theme = useTheme();
  const HeaderText = styled(Typography)(({ theme }) => ({
    color: '#1D1D1D',
    textTransform: 'none',
    textAlign: 'initial',
    fontSize: '20px',
    fontWeight: '600',
    lineHeight: '33.4px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '11.05px',
      lineHeight: '18.46px',
    },
  }));
  const SubTitle = styled(Typography)(({ theme }) => ({
    color: '#6A6A6A',
    textTransform: 'none',
    textAlign: 'initial',
    fontSize: '16px',
    fontWeight: '500',
    lineHeight: '25.92px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '8.84px',
      lineHeight: '14.32px',
    },
  }));
  const CustomBox = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: theme.spacing(2),
    marginTop: 12,

    // marginTop: theme.spacing(1),
  }));

  return (
    <Card
      sx={{
        width: '376.27px',
        maxHeight: 209,
        borderRadius: 3,
        [theme.breakpoints.down('sm')]: {
          width: '207px',
          borderRadius: 2,
        },
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <HeaderText>{header}</HeaderText>
        <CustomBox>
          <Avatar
            alt={header}
            // size={100}
            src={IMAGES.T_IM1.default.src}
            style={{ border: 0 }}
            sx={{
              background: 'transparent',
              backgroundColor: 'rgba(0,0,0,0)',
              width: 57.22,
              height: 57.22,
              [theme.breakpoints.down('sm')]: {
                width: 31.62,
                height: 31.62,
              },
            }}
          />

          <Box>
            <HeaderText>{title}</HeaderText>
            <SubTitle>{subTitle}</SubTitle>
          </Box>
        </CustomBox>
      </CardContent>
    </Card>
  );
};

export default TestimonialsCard;
