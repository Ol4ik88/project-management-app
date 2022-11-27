import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from 'store/authSlice';
import { createBoard } from 'store/boardsSlice';
import { AppDispatch } from 'store/store';
import { IPropsCreateBoardForm } from './Form.type';

export function CreateBoardForm({ onClose, showToast }: IPropsCreateBoardForm) {
  const dispatch = useDispatch<AppDispatch>();
  const authState = useSelector(selectAuth);
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  function submitHandler(e: React.SyntheticEvent) {
    e.preventDefault();
    dispatch(createBoard({ owner: authState.auth._id ?? '', title, description, users: [] }));
    showToast();
    onClose();
  }

  return (
    <>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="createBoardFormTitle">
          <Form.Label>{t('board.board title')}</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter board title"
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="createBoardFormDesc">
          <Form.Label>{t('board.board description')}</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter board description"
            value={description}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Modal.Footer>
          <Button variant="primary" type="submit">
            {t('create')}
          </Button>
          <Button variant="info" type="reset" onClick={onClose}>
            {t('close')}
          </Button>
        </Modal.Footer>
      </Form>
    </>
  );
}
