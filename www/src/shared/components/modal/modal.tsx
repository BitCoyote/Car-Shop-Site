// import Close from './close/close'
import { Button } from 'gerami'
import React from 'react'

import './modal.scss'

type modalProps = {
  show: boolean
  modalClosed: any
}

const Modal: React.FC<modalProps> = (props) => {
  const showHide = props.show ? 'modal display-block' : 'modal display-none'
  return (
    <div className={showHide}>
      <div className="center modal-container">
        <section className="modal-mail">
          {props.children}
          <Button onClick={props.modalClosed}>Close</Button>
        </section>
      </div>
    </div>
  )
}

export default Modal
