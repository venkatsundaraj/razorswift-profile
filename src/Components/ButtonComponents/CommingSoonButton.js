import { Button } from '@mui/material';

const ComingSoonButton = props => {
  return (
    <Button variant="outlined" color="error" {...props}>
      Coming soon
    </Button>
  );
};

export default ComingSoonButton;
