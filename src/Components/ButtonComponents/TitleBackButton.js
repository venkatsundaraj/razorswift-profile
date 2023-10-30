import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton, Stack, Typography } from '@mui/material';

const TitleBackButton = ({ title, onClick }) => {
  return (
    <Stack direction="row" spacing={1}>
      <IconButton
        disableRipple
        sx={{
          padding: 0,
          paddingLeft: 0.1,

          color: '#121212',
          margin: 0,
        }}
        size="large"
        aria-label="back"
        onClick={onClick}
      >
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h2">{title}</Typography>
    </Stack>
  );
};

export default TitleBackButton;
