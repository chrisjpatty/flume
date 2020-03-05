import React from 'react'
import { Portal } from 'react-portal'

export default ({ children, onCloseRequested }) => {

  return (
    <Portal>
      <div className="modal-wrapper">
        <div className="modal-body">
          {children}
        </div>
        <div className="modal-shade" onClick={onCloseRequested}></div>
      </div>
    </Portal>
  )
}
