import { UpdateteBoardForm } from 'components/forms/UpdateBoardForm';
import ModalWindow from 'components/modal/ModalWindow';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Navbar, OverlayTrigger, Popover, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from 'store/store';
import { Board } from 'store/types';
import info_icon from '../../assets/info_icon.svg';

export const BoardTitle = ({ board }: { board: Board }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const [isOpen, setIsOpen] = useState(0);
  const modalTitle = isOpen === 1 ? t('editBoard') : t('deleteBoard');

  const modifyBoard = () => {
    setIsOpen(1);
  };

  const deleteBoard = () => {
    setIsOpen(2);
    //!модальное окно - "удалять или нет"
    navigate('/boards');
  };

  return (
    <Container fluid>
      <Navbar expand="lg" className="shadow rounded">
        <Container fluid>
          <Button size="sm" className="me-3" onClick={() => navigate('/boards')}>
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
            <Button onClick={modifyBoard} className="" size="sm" variant="primary">
              {t('edit')}
            </Button>{' '}
            <Button onClick={deleteBoard} className="" size="sm" variant="primary">
              {t('delete')}
            </Button>
          </div>
        </Container>
      </Navbar>
      {isOpen > 0 && (
        <ModalWindow modalTitle={modalTitle} show={isOpen > 0} onHide={() => setIsOpen(0)}>
          {isOpen == 1 ? (
            <UpdateteBoardForm onClose={() => setIsOpen(0)} board={board} />
          ) : (
            <div> Удаление доски </div>
          )}
        </ModalWindow>
      )}
    </Container>
  );
};
