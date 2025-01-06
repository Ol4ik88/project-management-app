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
        <Button variant="warning" type="submit" onClick={handleRemoveClick} className="shadow">
          {t('delete')}
        </Button>
        <Button variant="info" type="reset" onClick={cancel} className="shadow">
          {t('cancel')}
        </Button>
      </Modal.Footer>
    </>
  );
}
