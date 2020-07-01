import React from 'react'
import styled from '@emotion/styled'

export default ({center, children}) => (
  <Div center={center}>
    {children}
  </Div>
)

const Div = styled('div')`
  display: flex;
  justify-content: ${({center}) => center ? 'center' : ''};
`
