import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Typography from '@mui/material/Typography';
import * as React from 'react';

function isOverflown(element) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}
const GridCellExpand = React.memo(props => {
  const { width, value } = props;
  const wrapper = React.useRef(null);
  const cellDiv = React.useRef(null);
  const cellValue = React.useRef(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showFullCell, setShowFullCell] = React.useState(false);
  const [showPopper, setShowPopper] = React.useState(false);
  const handleMouseEnter = () => {
    const isCurrentlyOverflown = isOverflown(cellValue.current);
    setShowPopper(isCurrentlyOverflown);
    setAnchorEl(cellDiv.current);
    setShowFullCell(true);
  };
  const handleMouseLeave = () => {
    setShowFullCell(false);
  };
  React.useEffect(() => {
    if (!showFullCell) {
      return undefined;
    }
    function handleKeyDown(nativeEvent) {
      // IE11, Edge (prior to using Bink?) use 'Esc'
      if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
        setShowFullCell(false);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [setShowFullCell, showFullCell]);
  return React.createElement(
    Box,
    {
      ref: wrapper,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      sx: {
        alignItems: 'center',
        // lineHeight: '24px',
        width: '100%',
        height: '100%',
        position: 'relative',
        display: 'flex',
      },
    },
    React.createElement(Box, {
      ref: cellDiv,
      sx: {
        height: '100%',
        width,
        display: 'block',
        position: 'absolute',
        top: 0,
      },
    }),
    React.createElement(
      Box,
      {
        ref: cellValue,
        sx: {
          whiteSpace: 'wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
      },
      value
    ),
    showPopper &&
      React.createElement(
        Popper,
        {
          open: showFullCell && anchorEl !== null,
          anchorEl,
          style: { width, marginLeft: -17 },
        },
        React.createElement(
          Paper,
          {
            elevation: 1,
            style: { minHeight: wrapper.current.offsetHeight - 3 },
          },
          React.createElement(
            Typography,
            {
              variant: 'body2',
              style: {
                padding: 8,
                whiteSpace: 'normal',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              },
            },
            value
          )
        )
      )
  );
});
export default function renderCellExpand(params) {
  return React.createElement(GridCellExpand, {
    value: params.value || '',
    width: params.colDef.computedWidth,
  });
}
