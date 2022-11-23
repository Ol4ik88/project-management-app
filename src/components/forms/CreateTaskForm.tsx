import React, { ChangeEvent, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from 'store/authSlice';
import { createBoard } from 'store/boardsSlice';
import { AppDispatch } from 'store/store';
import { createTask } from 'store/taskSlice';

export function CreateTaskForm({ boardId, columnId }: { boardId: string; columnId: string }) {
  const dispatch = useDispatch<AppDispatch>();
  const authState = useSelector(selectAuth);
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  function submitHandler(e: React.SyntheticEvent) {
    e.preventDefault();
    dispatch(
      createTask({
        boardId,
        columnId,
        title,
        description,
        order: 0,
        userId: authState.auth._id ?? '',
        users: [],
      })
    );
  }

  function titleChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }

  function descriptionChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    setDescription(e.target.value);
  }

  return (
    <Form onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="createTaskFormTitle">
        <Form.Label>{t('board.task title')}</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={titleChangeHandler}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="createTaskFormDesc">
        <Form.Label>{t('board.task description')}</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter task description"
          value={description}
          onChange={descriptionChangeHandler}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}
