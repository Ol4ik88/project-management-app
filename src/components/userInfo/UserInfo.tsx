import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { removeUser, selectAuth, signOut } from 'store/authSlice';
import { AppDispatch } from 'store/store';
import { Card, Button } from 'react-bootstrap';
import { UpdateUserForm } from 'components/forms/UpdateUserForm';
import ModalWindow from 'components/modal/ModalWindow';
import { DeleteWindow } from 'components/modal/DeleteWindow';
import { useNavigate } from 'react-router-dom';
import PushMessage from 'components/pushMessage/PushMessage';

export function UserInfo() {
  const dispatch = useDispatch<AppDispatch>();
  const { auth } = useSelector(selectAuth);
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>();
  const [modalTitle, setModalTitle] = useState<string>('');
  const [toast, setToast] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const onHide = () => setIsOpen(false);
  const showToast = () => setToast(!toast);
  const handleClickDelete = () => {
    setModalTitle(t('user-page.remove title') ?? '');
    setModalContent(
      <DeleteWindow
        cancel={onHide}
        remove={() => {
          showToast();
          onHide();
          setTimeout(() => {
            navigate('/');
            dispatch(removeUser({ userId: auth._id ?? '' }));
            dispatch(signOut());
          }, 1600);
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
      <Card className="mb-2 text-center shadow" style={{ width: '25rem' }}>
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
            <Button
              variant="primary"
              onClick={handleClickEdit}
              className="col-12 col-sm-5 mb-2 shadow"
            >
              {t('edit')}
            </Button>{' '}
            <Button
              variant="warning"
              onClick={handleClickDelete}
              className="col-12 col-sm-5 mb-2 shadow"
            >
              {t('delete')}
            </Button>
          </div>
        </Card.Body>
      </Card>
      <ModalWindow modalTitle={modalTitle} show={isOpen} onHide={onHide}>
        {modalContent}
      </ModalWindow>
      <PushMessage text={t('user-page.remove push')} isShow={toast} onHide={showToast} />
    </>
  );
}
