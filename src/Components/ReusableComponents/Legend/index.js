import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Legend = ({ items, maxWidth }) => {
  return (
    <Box
      display="grid"
      gridTemplateColumns="repeat(auto-fit, minmax(auto, 1fr))"
      gridGap={2}
      maxWidth={maxWidth}
    >
      {items.map((item, index) => (
        <Box key={index} display="flex" alignItems="center">
          <Box
            sx={{
              width: 12,
              height: 12,
              backgroundColor: item.color,
              marginRight: 1,
            }}
          />
          <Typography variant="body1" sx={{ marginRight: 1 }}>
            {item.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default Legend;
