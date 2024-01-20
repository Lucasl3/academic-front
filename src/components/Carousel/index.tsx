import React from 'react'
import { RiArrowRightSLine, RiArrowLeftSLine } from 'react-icons/ri'
import Slider from 'react-slick'

import { Box, IconButton } from '@chakra-ui/react'

import { ICarouselProps } from './types'

const Carousel = ({ children, ...rest }: ICarouselProps) => {
  const [slider, setSlider] = React.useState<Slider | null>(null)

  const LeftArrow = () => {
    return (
      <IconButton
        aria-label="left-arrow"
        colorScheme="facebook"
        isRound
        position="absolute"
        left="-25px"
        top="50%"
        transform={'translate(0%, -50%)'}
        zIndex={4}
        onClick={() => slider?.slickPrev()}
      >
        <RiArrowLeftSLine size={24} />
      </IconButton>
    )
  }

  const RightArrow = () => {
    return (
      <IconButton
        aria-label="right-arrow"
        colorScheme="facebook"
        isRound
        position="absolute"
        right="-25px"
        top="50%"
        transform={'translate(0%, -50%)'}
        zIndex={2}
        onClick={() => slider?.slickNext()}
      >
        <RiArrowRightSLine size={24} />
      </IconButton>
    )
  }
  return (
    <Box width="full">
      <Slider
        ref={(slider) => setSlider(slider)}
        prevArrow={<LeftArrow />}
        nextArrow={<RightArrow />}
        {...rest}
      >
        {children}
      </Slider>
    </Box>
  )
}

export default Carousel
