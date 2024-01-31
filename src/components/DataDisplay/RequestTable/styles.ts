import { styled, Td as ChakraTd, Th as ChakraTh } from '@chakra-ui/react'

const Td = styled(ChakraTd, {
  baseStyle: {
    paddingX: 4,
    paddingY: 2,
    fontSize: 'md',
    fontWeight: '400',
    lineHeight: '1rem',
  },
})

const Th = styled(ChakraTh, {
  baseStyle: {
    paddingX: 4,
    paddingY: 1,
    fontSize: 'xs',
    fontWeight: '700',
    lineHeight: '1rem',
    letterSpacing: '0.0375rem',
  },
})

export default {
  Td,
  Th,
}
