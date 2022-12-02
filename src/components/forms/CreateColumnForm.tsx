import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { createColumn } from 'store/columnSlice';
import { AppDispatch } from 'store/store';
import { IPropsCreateColumnForm } from './Form.type';

export function CreateColumnForm({ boardId, onClose, order = 0 }: IPropsCreateColumnForm) {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const [title, setTitle] = useState('');

  function submitHandler(e: React.SyntheticEvent) {
    e.preventDefault();
    dispatch(createColumn({ boardId, title, order }));
    onClose();
  }
  function titleChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }

  return (
    <Form onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="createBoardFormTitle">
        <Form.Label>{t('column.title')}</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder={t('column.title placeholder')}
          value={title}
          onChange={titleChangeHandler}
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
  );
}
