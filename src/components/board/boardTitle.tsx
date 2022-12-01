import { UpdateteBoardForm } from 'components/forms/UpdateBoardForm';
import ModalWindow from 'components/modal/ModalWindow';
import React, { useState } from 'react';
import { Button, Container, Navbar, OverlayTrigger, Popover } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { removeBoard } from 'store/boardsSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from 'store/store';
import { Board } from 'store/types';
import info_icon from '../../assets/info_icon.svg';
import { DeleteWindow } from 'components/modal/DeleteWindow';
import PushMessage from 'components/pushMessage/PushMessage';

export const BoardTitle = ({ board }: { board: Board }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>();
  const [modalTitle, setModalTitle] = useState<string>('');
  const [toast, setToast] = useState(false);

  const showToast = () => setToast(!toast);
  const onHide = () => setIsOpen(false);
  const modifyBoard = () => {
    setModalTitle(t('board.edit board title') ?? '');
    setModalContent(<UpdateteBoardForm onClose={onHide} board={board} />);
    setIsOpen(true);
  };

  const deleteBoard = () => {
    setModalTitle(t('board.remove board title') ?? '');
    setModalContent(
      <DeleteWindow
        cancel={onHide}
        remove={() => {
          showToast();
          onHide();
          setTimeout(() => {
            navigate('/boards');
            dispatch(removeBoard({ boardId: board._id }));
          }, 1600);
        }}
        text={t('board.remove board message')}
      />
    );
    setIsOpen(true);
  };

  return (
    <Container fluid>
      <Navbar expand="lg" className="shadow rounded">
        <Container fluid>
          <Button size="sm" className="me-3 shadow" onClick={() => navigate('/boards')}>
            {t('Back')}
          </Button>
          <Navbar.Brand>{board.title}</Navbar.Brand>
          <OverlayTrigger
            trigger="click"
            placement="bottom"
            overlay={
              <Popover id={`popover-positioned-$"bottom"`} className="col-12">
                <Popover.Header as="h3">
                  {t('titleBoard')}: {board.title}
                </Popover.Header>
                <Popover.Body>
                  <p>
                    {t('id')} : {board._id}
                  </p>
                  <p>
                    {t('owner')} : {board.owner}
                  </p>
                  <p>
                    {t('users')} :
                    {board.users.map((user) => (
                      <li key={user.toString()}>{user}</li>
                    ))}
                  </p>
                </Popover.Body>
              </Popover>
            }
          >
            <span>
              <img width="20" src={info_icon} alt="edit" />
            </span>
          </OverlayTrigger>
          <div className="ms-auto">
            <Button onClick={modifyBoard} className="shadow" size="sm" variant="info">
              {t('edit')}
            </Button>{' '}
            <Button onClick={deleteBoard} className="shadow" size="sm" variant="warning">
              {t('delete')}
            </Button>
          </div>
        </Container>
      </Navbar>
      <ModalWindow modalTitle={modalTitle} show={isOpen} onHide={onHide}>
        {modalContent}
      </ModalWindow>
      <PushMessage text={t('board.remove board push')} isShow={toast} onHide={showToast} />
    </Container>
  );
};
