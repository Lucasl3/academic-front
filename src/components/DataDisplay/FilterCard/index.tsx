import React, { useState } from 'react'

import { Button, Stack } from '@chakra-ui/react'

function FilterCard() {
  const [selectedButtons, setSelectedButtons] = useState<string[]>([])

  const handleClick = (buttonLetter: string) => {
    if (selectedButtons.includes(buttonLetter)) {
      setSelectedButtons(
        selectedButtons.filter((letter) => letter !== buttonLetter),
      )
    } else {
      setSelectedButtons([...selectedButtons, buttonLetter])
    }
  }

  return (
    <Stack direction="row" spacing={4} align="center" px={10} py={3}>
      {['Enviado', 'Em andamento', 'Finalizado'].map((buttonLetter) => (
        <Button
          key={buttonLetter}
          backgroundColor={
            selectedButtons.includes(buttonLetter) ? '#444A63' : '#FBFBFB'
          }
          color={selectedButtons.includes(buttonLetter) ? 'white' : 'black'}
          borderColor={
            selectedButtons.includes(buttonLetter) ? '#444A63' : '#FBFBFB'
          }
          variant="solid"
          px={10}
          py={5}
          width="200px"
          onClick={() => handleClick(buttonLetter)}
          fontSize={14}
          fontWeight="semibold"
        >
          {buttonLetter.toUpperCase()}
        </Button>
      ))}
    </Stack>
  )
}

export default FilterCard
