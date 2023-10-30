import GroupsIcon from '@mui/icons-material/Groups';
import { Grid, Stack, styled } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const Title = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  color: '#6A6A6A',
  fontWeight: '400',
  textAlign: 'initial',
  lineHeight: '17px',
  [theme.breakpoints.down('md')]: {
    fontSize: '10px',
    lineHeight: '12px',
  },
}));

const Description = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  color: '#1D1D1D',
  fontWeight: '600',
  textAlign: 'initial',
  lineHeight: '17px',
  [theme.breakpoints.down('md')]: {
    fontSize: '12px',
    lineHeight: '16px',
  },
}));
const Level = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  color: '#1D1D1D',
  fontWeight: '500',
  // textAlign: 'center',
  lineHeight: '19px',
  [theme.breakpoints.down('md')]: {
    fontSize: '10px',
    lineHeight: '12px',
  },
}));

const MediaCard = props => {
  const { id, src, title, description, level, subscribers } = props;
  return (
    <Card
      sx={{
        maxWidth: 345,
        borderRadius: '10px',
        mb: '10px',
        minHeight: '290px',
      }}
    >
      <CardMedia
        component="iframe"
        src={src}
        height="150"
        width="150"
        alt={props.title}
        sx={{ borderRadius: '15px 15px 0px 0px', border: 0 }}
      />
      <CardContent>
        <Title gutterBottom>{title}</Title>
        <Description gutterBottom>{description}</Description>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item>
            <Level>{level}</Level>
          </Grid>
          <Grid item>
            <Stack direction="row" alignItems="center" gap={1}>
              <GroupsIcon />
              <Typography variant="body1">{subscribers}</Typography>
            </Stack>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default MediaCard;
