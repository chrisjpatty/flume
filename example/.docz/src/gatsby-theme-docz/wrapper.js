import React from 'react'
import { Global, css } from '@emotion/core'

export default ({ children }) => (
  <div id="FLUME_WRAPPER">
    <Global
      styles={css`
        body{
          background: #13161F;
        }
      `}
    />
    {children}
  </div>
)
