import { Box, Button, Typography } from '@mui/material'
import Menu from '@mui/material/Menu'
import * as React from 'react'
import MenuItems from '../NavigationComponents/MenuItems'
import CustomImage from '../globalComponents/CustomImage/CustomImage'

export default function MenuButton({ headerdData }) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{
          transition: 'transform 0.3s ease, opacity 0.1s ease',
          opacity: '1',
          marginTop: '4px',
          '&:hover': {
            backgroundColor: 'transparent',
          },
          '&:hover > div h4': {
            transition: 'transform 0.3s ease, opacity 0.3s ease',
            opacity: '0',
          },
          '&:hover > div [data-id="1"]': {
            transform: `translate(100%)`,
          },
          '&:hover > div [data-id="-1"]': {
            transform: `translate(-100%)`,
          },
          '&:hover > div [data-id="-2"]': {
            transform: `translate(-200%)`,
          },
        }}
      >
        {headerdData.forMenu.map((item, i) => (
          <Box key={item.id}>
            {item.text ? (
              <Typography
                data-id={item.id}
                variant="h4"
                sx={{
                  fontSize: '36px',
                  color: 'violetPalette.dark',
                  transition: 'transform 0.3s ease',
                }}
              >
                {item.text}
              </Typography>
            ) : (
              <CustomImage
                data-id={item.id}
                width="28px"
                height="40px"
                src={item.name}
                alt="menu icon"
              />
            )}
          </Box>
        ))}
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        variant="menu"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MenuItems handleClose={handleClose} headerdData={headerdData} />
        {/* <SwipeAbleDrawer open={open} /> */}
      </Menu>
    </>
  )
}
