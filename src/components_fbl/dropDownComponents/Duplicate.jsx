import { Container, Grid, Stack } from '@mui/material';
import PrimaryHeading from '../headingComponents/PrimaryHeading';
const titles = ['Hello World', 'Hello World', 'Hello World'];
function Duplicate() {
  return (
    <Container sx={{ py: 5 }}>
      <Grid container spacing={2}>
        {titles.map(item => (
          <Grid
            item
            key={Math.random()}
            xs={4}
            alignItems="center"
            justifyContent="center"
          >
            <Stack
              sx={{ height: '200px', backgroundColor: 'teal' }}
              alignItems="center"
              justifyContent="center"
            >
              <PrimaryHeading style={{ color: '#fff' }}>{item}</PrimaryHeading>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Duplicate;
