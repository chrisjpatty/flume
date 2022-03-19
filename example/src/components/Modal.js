import React from 'react'
import { Portal } from 'react-portal'

const Modal = ({ children, onCloseRequested }) => {

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
};

export default Modal;