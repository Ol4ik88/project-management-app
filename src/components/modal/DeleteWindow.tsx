import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { IDeleteWindow } from './DeleteWindow.type';

export function DeleteWindow({ cancel, remove, text }: IDeleteWindow) {
  const { t } = useTranslation();

  function handleRemoveClick() {
    remove();
    cancel();
  }
  return (
    <>
      <div>{text}</div>
      <Modal.Footer>
        <Button variant="secondary" type="reset" onClick={cancel}>
          {t('cancel')}
        </Button>
        <Button variant="info" type="submit" onClick={handleRemoveClick}>
          {t('delete')}
        </Button>
      </Modal.Footer>
    </>
  );
}
