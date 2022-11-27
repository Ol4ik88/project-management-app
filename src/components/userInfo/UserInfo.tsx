import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser, selectAuth, signOut } from 'store/authSlice';
import { AppDispatch } from 'store/store';
import { Card, Button } from 'react-bootstrap';
import { UpdateUserForm } from 'components/forms/UpdateUserForm';
import ModalWindow from 'components/modal/ModalWindow';
import { DeleteWindow } from 'components/modal/DeleteWindow';
import { UserTasks } from './UserTasks';

export function UserInfo() {
  const dispatch = useDispatch<AppDispatch>();
  const { auth } = useSelector(selectAuth);
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>();
  const [modalTitle, setModalTitle] = useState<string>('');
  const { t } = useTranslation();

  const onHide = () => setIsOpen(false);
  const handleClickDelete = () => {
    setModalTitle(t('user-page.remove title') ?? '');
    setModalContent(
      <DeleteWindow
        cancel={onHide}
        remove={() => {
          dispatch(removeUser({ userId: auth._id ?? '' }));
          dispatch(signOut());
        }}
        text={t('user-page.remove message')}
      />
    );
    setIsOpen(true);
  };

  const handleClickEdit = () => {
    setModalTitle(t('user-page.update title') ?? '');
    setModalContent(<UpdateUserForm onClose={onHide} />);
    setIsOpen(true);
  };
  return (
    <>
      <Card className="mb-2 text-center shadow" style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{t('user-page.info')}</Card.Title>
          <Card.Text>
            <span>
              {t('sign-up.name')}: {auth.name}
            </span>
          </Card.Text>
          <Card.Text>
            <span>
              {t('sign-up.login')}: {auth.login}
            </span>
          </Card.Text>
          <div>
            <Button variant="secondary" onClick={handleClickEdit}>
              {t('edit')}
            </Button>{' '}
            <Button variant="info" onClick={handleClickDelete}>
              {t('delete')}
            </Button>
          </div>
        </Card.Body>
        <UserTasks userId={auth._id} />
      </Card>
      <ModalWindow modalTitle={modalTitle} show={isOpen} onHide={onHide}>
        {modalContent}
      </ModalWindow>
    </>
  );
}
