import { Box, MenuItem, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import PrimaryFillButton from '../buttonComponents/PrimaryFillButton'
import ParagraphHeading from '../headingComponents/ParagraphHeading'

function MenuItems({ headerdData, handleClose }) {
  const router = useRouter()

  return (
    <>
      {headerdData.navInItems.map((title, i) => (
        <Box key={title.id}>
          <MenuItem
            onClick={handleClose}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'pinkPalette.dark',
              cursor: `${title.name === 'Solutions' ? 'default' : 'inherit'}`,
              pointerEvents: `${
                title.name === 'Solutions' ? 'none' : 'inherit'
              }`,
              '&.Mui-selected': {
                backgroundColor: 'blue',
              },
              borderBottom: `${
                i === headerdData.navInItems.length - 1 || i === 0
                  ? ''
                  : '1px solid #A62973'
              }`,
              '&:hover': {
                backgroundColor: 'unset',
              },
            }}
          >
            <ParagraphHeading
              style={{ fontWeight: '600' }}
              sx={{
                color: 'pinkPalette.dark',
                position: 'relative',
                '&:before': {
                  content: '""',
                  width: '0%',
                  height: '2px',
                  bottom: '3px',
                  position: 'absolute',
                  backgroundColor: 'pinkPalette.dark',
                  transition: 'width 200ms ease',
                },
                '&:hover:before': {
                  width: `${title.name === 'Solutions' ? '0' : '100%'}`,
                  transition: 'width 200ms ease',
                },
              }}
            >
              {title.name === 'Solutions' ? (
                <Typography
                  component="span"
                  style={{ fontWeight: 600 }}
                  sx={{
                    fontSize: '14px',

                    fontFamily: (theme) => theme.typography.body1,
                    fontSize: {
                      xs: '14px',
                      md: '16px',
                      lg: '18px',
                      xl: '20px',
                    },
                  }}
                >
                  {title.name}
                </Typography>
              ) : (
                <Link
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                  }}
                  href={`${title.link || ''}`}
                >
                  {title.name}
                </Link>
              )}
            </ParagraphHeading>
          </MenuItem>
          {title.subItems && (
            <Stack
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              gap={1.2}
              sx={{ pb: 1.2, borderBottom: '1px solid #A62973' }}
            >
              {title.subItems.map((item) => (
                <ParagraphHeading
                  key={item.id}
                  sx={{
                    color: 'pinkPalette.dark',
                    position: 'relative',
                    '&:before': {
                      content: '""',
                      width: '0%',
                      height: '2px',
                      bottom: '2.5px',
                      position: 'absolute',
                      backgroundColor: 'pinkPalette.dark',
                      transition: 'width 200ms ease',
                    },
                    '&:hover:before': {
                      width: '100%',
                      transition: 'width 200ms ease',
                    },
                  }}
                  onClick={handleClose}
                >
                  <Link
                    style={{ textDecoration: 'none', color: 'inherit' }}
                    href={`${item.link || ''}`}
                  >
                    {item.name}
                  </Link>
                </ParagraphHeading>
              ))}
            </Stack>
          )}
        </Box>
      ))}
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        sx={{ marginTop: 1, display: { xs: 'flex', md: 'none' } }}
      >
        {headerdData.actionButtons.map((item) => (
          <PrimaryFillButton
            href={item.link}
            style={{ padding: '4px 20px', borderRadius: '16px' }}
            sx={{
              backgroundColor: 'pinkPalette.dark',
              color: 'primaryPalette.white',
              '&:hover': {
                backgroundColor: 'pinkPalette.dark',
              },
            }}
            key={item.id}
          >
            {item.name}
          </PrimaryFillButton>
        ))}
      </Stack>
    </>
  )
}

export default MenuItems
