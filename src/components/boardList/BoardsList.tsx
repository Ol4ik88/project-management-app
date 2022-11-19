import React, { MouseEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectBoards, removeBoard } from 'store/boardsSlice';
import { Card, Col, Row, Button, Modal } from 'react-bootstrap';
import { AppDispatch } from 'store/store';
import { Link } from 'react-router-dom';
import ModalWindow from 'components/modal/ModalWindow';
import { useTranslation } from 'react-i18next';
import './boardList.css';
import { UpdateteBoardForm } from 'components/forms/UpdateBoardForm';
import { Board } from 'store/types';

function RemoveBoardWindow({ cancel, remove }: { cancel: () => void; remove: () => void }) {
  const { t } = useTranslation();

  function handleReoveClick() {
    remove();
    cancel();
  }
  return (
    <>
      <div>{t('board.remove board message')}</div>
      <Modal.Footer>
        <Button variant="secondary" type="reset" onClick={cancel}>
          {t('cancel')}
        </Button>
        <Button variant="primary" type="submit" onClick={handleReoveClick}>
          {t('board.delete board button')}
        </Button>
      </Modal.Footer>
    </>
  );
}

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
      <RemoveBoardWindow
        cancel={() => setIsOpen(false)}
        remove={() => dispatch(removeBoard({ boardId }))}
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
            <Link to={`/boards/${id}`} className={'board-link'}>
              <Card bg="primary" text="white" className="mb-2">
                <Card.Body>
                  <Card.Title>{entities[id]?.title} </Card.Title>
                  <Card.Text>{'description'}</Card.Text>
                  <div className="text-end">
                    <Button
                      variant="warning"
                      size="sm"
                      onClick={(e) => handleClickEdit(entities[id], e)}
                    >
                      edit
                    </Button>{' '}
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={(e) => handleClickDelete(String(id), e)}
                    >
                      del
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
      {isOpen && (
        <ModalWindow modalTitle={modalTitle} show={isOpen} onHide={() => setIsOpen(false)}>
          {modalContent}
        </ModalWindow>
      )}
    </>
  );
}
