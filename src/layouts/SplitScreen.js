import { Grid } from '@mui/material';

const SplitScreen = ({ left: Left, right: Right, orderLeft, orderRight }) => {
  return (
    <Grid
      sx={{ flex: 1 }}
      container
      spacing={{ xs: 2, sm: 2, md: 5 }}
      justifyContent="space-between"
      alignItems="center"
    >
      <Grid item sm={6} xs={12} order={orderLeft}>
        {Left}
      </Grid>
      <Grid item sm={6} xs={12} order={orderRight}>
        {Right}
      </Grid>
    </Grid>
  );
};

export default SplitScreen;
