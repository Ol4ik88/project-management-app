import { UpdateteBoardForm } from 'components/forms/UpdateBoardForm';
import ModalWindow from 'components/modal/ModalWindow';
import React, { useEffect, useState } from 'react';
import { Button, Container, Navbar, OverlayTrigger, Popover } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { removeBoard } from 'store/boardsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from 'store/store';
import { Board } from 'store/types';
import info_icon from '../../assets/info_icon.svg';
import { DeleteWindow } from 'components/modal/DeleteWindow';
import PushMessage from 'components/pushMessage/PushMessage';
import { getUsers, selectUsers } from 'store/userSlice';

export const BoardTitle = ({ board }: { board: Board }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { users } = useSelector(selectUsers);

  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>();
  const [modalTitle, setModalTitle] = useState<string>('');
  const [toast, setToast] = useState(false);

  useEffect(() => {
    if (!users.length) {
      dispatch(getUsers());
    }
  }, [dispatch]);

  const showToast = () => setToast(!toast);
  const onHide = () => setIsOpen(false);
  const modifyBoard = () => {
    setModalTitle(t('board.edit title') ?? '');
    setModalContent(<UpdateteBoardForm onClose={onHide} board={board} />);
    setIsOpen(true);
  };

  const deleteBoard = () => {
    setModalTitle(t('board.remove title') ?? '');
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
        text={t('board.remove message')}
      />
    );
    setIsOpen(true);
  };

  return (
    <Container fluid>
      <Navbar expand="lg" className="shadow rounded">
        <Container fluid>
          <Button size="sm" className="me-3 shadow" onClick={() => navigate('/boards')}>
            {t('back')}
          </Button>
          <Navbar.Brand>{board.title}</Navbar.Brand>
          <OverlayTrigger
            trigger="click"
            placement="bottom"
            overlay={
              <Popover id={`popover-positioned-$"bottom"`} className="col-12">
                <Popover.Header as="h3">
                  {t('board.title')}: {board.title}
                </Popover.Header>
                <Popover.Body>
                  <p>
                    {t('board.description')} : {board.description}
                  </p>
                  <p>
                    {t('board.owner')}: {users.find((user) => user._id === board.owner)?.name ?? ''}
                  </p>
                  <div>
                    {t('task-info.users')}
                    {board.users.length ? (
                      <ul>
                        {board.users.map((id) => (
                          <li key={id}>{users.find((user) => user._id === id)?.name ?? ''}</li>
                        ))}
                      </ul>
                    ) : (
                      t('none')
                    )}
                  </div>
                </Popover.Body>
              </Popover>
            }
          >
            <span role="button">
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
      <PushMessage text={t('board.remove push')} isShow={toast} onHide={showToast} />
    </Container>
  );
};
