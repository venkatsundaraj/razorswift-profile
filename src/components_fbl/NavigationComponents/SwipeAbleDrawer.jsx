import { Drawer } from '@mui/material';

function SwipeAbleDrawer({ open }) {
  return (
    <Drawer anchor="top" open={open} onClose={toggleDrawer(anchor, false)}>
      {list(anchor)}
    </Drawer>
  );
}

export default SwipeAbleDrawer;
