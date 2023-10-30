import Typography from '@mui/material/Typography';
import { GridOverlay } from '@mui/x-data-grid';

function CustomNoRowsOverlay({ title }) {
  return (
    <GridOverlay>
      <Typography variant="h6" align="center" sx={{ fontSize: '15px' }} mt={18}>
        {title}
      </Typography>
    </GridOverlay>
  );
}

export default CustomNoRowsOverlay;
