import InfoIcon from '@mui/icons-material/Info';
import { IconButton } from '@mui/material';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import * as React from 'react';
export default function PathWayPopOver({ iconButton, info, value, type }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <React.Fragment>
      <IconButton aria-describedby={id} onClick={handleClick}>
        <InfoIcon fontSize="12px" color="primary" />
      </IconButton>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {type != 'html' && (
          <Typography sx={{ p: 2, maxWidth: 300, wordWrap: 'break-word' }}>
            {info}
          </Typography>
        )}

        {type === 'html' && (
          <Typography
            sx={{ p: 2, maxWidth: 300, wordWrap: 'break-word' }}
            dangerouslySetInnerHTML={{ __html: info }}
          />
        )}
      </Popover>
    </React.Fragment>
  );
}
