import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from 'store/authSlice';
import { updateBoard } from 'store/boardsSlice';
import { AppDispatch } from 'store/store';
import { Board } from 'store/types';

export function UpdateteBoardForm({ onClose, board }: { onClose: () => void; board: Board }) {
  const dispatch = useDispatch<AppDispatch>();
  const authState = useSelector(selectAuth);
  const { t } = useTranslation();
  const [title, setTitle] = useState(board.title);

  function submitHandler(e: React.SyntheticEvent) {
    e.preventDefault();
    dispatch(
      updateBoard({ boardId: board._id, owner: authState.auth._id ?? '', title, users: [] })
    );
    onClose();
  }

  return (
    <Form onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="createBoardFormTitle">
        <Form.Label>{t('board.board title')}</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter board title"
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="createBoardFormDesc">
        <Form.Label>{t('board.board description')}</Form.Label>
        <Form.Control type="text" placeholder="Enter board description" />
      </Form.Group>
      <Modal.Footer>
        <Button variant="secondary" type="reset" onClick={onClose}>
          {t('close')}
        </Button>
        <Button variant="primary" type="submit">
          {t('board.update board button')}
        </Button>
      </Modal.Footer>
    </Form>
  );
}
