import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  List,
  ListItem,
  Box,
  IconButton,
  ListItemText,
  Typography,
} from '@mui/material'
import styled from '@emotion/styled'
import { TickerBoxData } from '@/constants/Aspirants/aspirantPageData'
import ParagraphHeading from '../headingComponents/ParagraphHeading'
import ExtraParagraphHeading from '../headingComponents/ExtraParagraphHeading'

const TickerBox = styled(List)(({ theme }) => ({
  width: '100%',
  height: '65px',
  backgroundColor: theme.palette.pinkPalette.superLight,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
}))
function TickerComponent({ data }) {
  const [value, setValue] = useState(0)
  const [courses, setCourses] = useState(data.slidingValue)

  useEffect(() => {
    const timeOut = setInterval(() => {
      setValue((prev) => {
        return prev >= courses.length - 1 ? 0 : prev + 1
      })
    }, 2800)

    return () => {
      clearTimeout(timeOut)
    }
  }, [value])

  return (
    <TickerBox>
      <Box
        sx={{
          width: '550px',
          height: '100%',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        {courses.map((item, itemIndex) => {
          let position = 'slide nextSlide'
          if (value === itemIndex) {
            position = 'slide activeSlide'
          }

          if (
            itemIndex === value - 1 ||
            (value === 0 && itemIndex === courses.length - 1)
          ) {
            position = 'slide lastSlide'
          }

          return (
            <ExtraParagraphHeading
              className={position}
              key={item.id}
              sx={{
                position: 'absolute',
                top: { xs: '0', sm: '32.5%', md: '22.5%' },
                textAlign: 'center',
                cursor: 'pointer',
                px: '20px',
                width: '100%',
                color: 'primaryPalette.black',
              }}
              align="center"
              variant="body1"
            >
              <Link
                style={{ textDecoration: 'none', color: 'inherit' }}
                href="/"
              >
                {item.title}
              </Link>
              <Image
                style={{ marginLeft: '20px' }}
                alt={item.title}
                src={TickerBoxData.tickerArrow}
              />
            </ExtraParagraphHeading>
          )
        })}
      </Box>
    </TickerBox>
  )
}

export default TickerComponent
