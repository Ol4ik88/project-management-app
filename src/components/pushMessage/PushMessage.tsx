import React from 'react';
import Toast from 'react-bootstrap/Toast';
import { IPushMessage } from './PushMessage.type';

function PushMessage({ text, isShow, onHide }: IPushMessage) {
  return (
    <Toast
      className="position-fixed bottom-0 end-0 border border-2 border-dark m-2"
      onClose={onHide}
      show={isShow}
      delay={1500}
      autohide
    >
      <Toast.Header className="justify-content-between text-dark">{text}</Toast.Header>
    </Toast>
  );
}

export default PushMessage;
