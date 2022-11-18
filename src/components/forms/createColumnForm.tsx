import React, { ChangeEvent, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { createColumn } from 'store/columnSlice';
import { AppDispatch } from 'store/store';

export function CreateColumnForm({ boardId }: { boardId: string }) {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const [title, setTitle] = useState('');

  function submitHandler(e: React.SyntheticEvent) {
    e.preventDefault();
    dispatch(createColumn({ boardId, title, order: 0 }));
  }
  function titleChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }

  return (
    <Form onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="createBoardFormTitle">
        <Form.Label>{t('board.column title')}</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter column title"
          value={title}
          onChange={titleChangeHandler}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
