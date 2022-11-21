import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export function RemoveUserContent({ cancel, remove }: { cancel: () => void; remove: () => void }) {
  const { t } = useTranslation();

  function handleReoveClick() {
    remove();
    cancel();
  }
  return (
    <>
      <div>{t('user-page.remove message')}</div>
      <Modal.Footer>
        <Button variant="secondary" type="reset" onClick={cancel}>
          {t('cancel')}
        </Button>
        <Button variant="info" type="submit" onClick={handleReoveClick}>
          {t('delete')}
        </Button>
      </Modal.Footer>
    </>
  );
}
