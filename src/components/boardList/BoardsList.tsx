import React, { MouseEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectBoards, removeBoard } from 'store/boardsSlice';
import { Card, Col, Row, Button, Modal } from 'react-bootstrap';
import { AppDispatch } from 'store/store';
import { Link } from 'react-router-dom';
import ModalWindow from 'components/modal/ModalWindow';
import { useTranslation } from 'react-i18next';
import { UpdateteBoardForm } from 'components/forms/UpdateBoardForm';
import { Board } from 'store/types';
import edit_icon from '../../assets/registaration_icon.svg';
import delete_icon from '../../assets/delete_icon.svg';
import { DeleteWindow } from 'components/modal/DeleteWindow';

export function BoardsList() {
  const dispatch = useDispatch<AppDispatch>();
  const { entities, ids } = useSelector(selectBoards);
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>();
  const [modalTitle, setModalTitle] = useState<string>('');
  const { t } = useTranslation();

  function handleClickDelete(boardId: string, e: MouseEvent) {
    e.preventDefault();
    setModalTitle(t('board.remove board title') ?? '');
    setModalContent(
      <DeleteWindow
        cancel={() => setIsOpen(false)}
        remove={() => dispatch(removeBoard({ boardId }))}
        text={t('board.remove board message')}
      />
    );
    setIsOpen(true);
  }
  function handleClickEdit(board: Board, e: MouseEvent) {
    e.preventDefault();
    setModalTitle(t('board.edit board title') ?? '');
    setModalContent(<UpdateteBoardForm board={board} onClose={() => setIsOpen(false)} />);
    setIsOpen(true);
  }

  return (
    <>
      <Row md={4}>
        {ids.map((id) => (
          <Col key={id}>
            <Link to={`/boards/${id}`} className={'text-decoration-none'}>
              <Card bg="primary" text="white" className="mb-2">
                <Card.Body>
                  <Card.Title>{entities[id].title} </Card.Title>
                  <Card.Text>{entities[id].description}</Card.Text>
                  <div className="text-end">
                    <Button
                      variant="light"
                      size="sm"
                      onClick={(e) => handleClickEdit(entities[id], e)}
                    >
                      <img width="20" src={edit_icon} alt="edit" />
                    </Button>{' '}
                    <Button
                      variant="light"
                      size="sm"
                      onClick={(e) => handleClickDelete(String(id), e)}
                    >
                      <img width="20" src={delete_icon} alt="delete" />
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
      <ModalWindow modalTitle={modalTitle} show={isOpen} onHide={() => setIsOpen(false)}>
        {modalContent}
      </ModalWindow>
    </>
  );
}
