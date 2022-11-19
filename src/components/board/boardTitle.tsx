import ModalWindow from 'components/modal/ModalWindow';
import React, { useEffect, useState } from 'react';
import { Accordion, Button, Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getBoardById, removeBoard, selectBoards } from 'store/boardsSlice';
import { AppDispatch } from 'store/store';

export const BoardTitle = (props: { boardId: string }) => {
  const navigate = useNavigate();
  const boardId = props.boardId;
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { entities, error, status, ids } = useSelector(selectBoards);
  //const { _id, title, owner, users } = entities; //!как достать свойства доски
  const _id = '12345';
  const title = 'Board Title';
  const owner = 'Yura';
  const users = ['Olga', 'Rita', 'Sveta'];
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (status === 'idle' && boardId) {
      dispatch(getBoardById({ boardId }));
    }
  }, [boardId, dispatch, status]);

  const modifyBoard = () => {
    setIsOpen(true);
    //! форма изменения доски
    //const newBoard: Omit<IBoard, '_id'> = {...};
    //dispatch(editBoard({ boardId, ...newBoard }));
  };

  const deleteBoard = () => {
    setIsOpen(true);
    //!модальное окно - "удалять или нет"
    dispatch(removeBoard({ boardId }));
    //navigate('/boards');
  };

  return (
    <Container>
      <Row>
        <Col xs={7}>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>{title}</Accordion.Header>
              <Accordion.Body>
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
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
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
      {isOpen && (
        <ModalWindow modalTitle={t('editBoard')} show={isOpen} onHide={() => setIsOpen(false)}>
          <div> form</div>
        </ModalWindow>
      )}
    </Container>
  );
};
