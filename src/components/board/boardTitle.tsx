import ModalWindow from 'components/modal/ModalWindow';
import React, { useEffect, useState } from 'react';
import { Accordion, Button, Col, Container, OverlayTrigger, Popover, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getBoardById, removeBoard, selectBoards } from 'store/boardsSlice';
import { AppDispatch } from 'store/store';
import info_icon from '../../assets/info_icon.svg';

export const BoardTitle = (props: { boardId: string }) => {
  const navigate = useNavigate();
  const boardId = props.boardId;
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { entities, error, status, ids } = useSelector(selectBoards);

  const { _id, title, owner, users } = entities[boardId]; //!получить имена вместо id
  //! добавить описание доски

  const [isOpen, setIsOpen] = useState(0);
  const modalTitle = isOpen === 1 ? t('editBoard') : t('deleteBoard');

  //const [isOpen, setIsOpen] = useState(0);

  useEffect(() => {
    if (status === 'idle' && boardId) {
      dispatch(getBoardById({ boardId }));
    }
  }, [boardId, dispatch, status]);

  const modifyBoard = () => {
    setIsOpen(1);
    //! форма изменения доски
    //const newBoard: Omit<IBoard, '_id'> = {...};
    //dispatch(editBoard({ boardId, ...newBoard }));
  };

  const deleteBoard = () => {
    setIsOpen(2);
    //!модальное окно - "удалять или нет"
    dispatch(removeBoard({ boardId }));
    navigate('/boards');
  };

  return (
    <Container>
      <Row className="mb-5">
        <Col className="row justify-content-start px-5">
          <OverlayTrigger
            trigger="click"
            placement="bottom"
            overlay={
              <Popover id={`popover-positioned-$"bottom"`} className="col-12">
                <Popover.Header as="h3">
                  {t('titleBoard')}: {title}
                </Popover.Header>
                <Popover.Body>
                  <p>
                    {t('id')} : {_id}
                  </p>
                  <p>
                    {t('owner')} : {owner}
                  </p>
                  <p>
                    {t('users')} :
                    {users.map((user) => (
                      <li key={user.toString()}>{user}</li>
                    ))}
                  </p>
                </Popover.Body>
              </Popover>
            }
          >
            <Button variant="info" size="lg" className="col-10 h-100 ">
              {title} - {t('infoBoard')}
              {'  '}
              <img width="30" src={info_icon} alt="edit" />
            </Button>
          </OverlayTrigger>
        </Col>

        <Col className="row justify-content-around">
          <Button onClick={modifyBoard} className="col-5 h-100" variant="primary">
            {t('edit')}
          </Button>

          <Button onClick={deleteBoard} className="col-5 h-100" variant="primary">
            {t('delete')}
          </Button>
        </Col>
      </Row>

      {isOpen > 0 && (
        <ModalWindow modalTitle={modalTitle} show={isOpen > 0} onHide={() => setIsOpen(0)}>
          {isOpen == 1 ? <div> Редактирование доски </div> : <div> Удаление доски </div>}
        </ModalWindow>
      )}
    </Container>
  );
};
