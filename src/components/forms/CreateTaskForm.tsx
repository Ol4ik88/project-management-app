import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from 'store/authSlice';
import { AppDispatch } from 'store/store';
import { createTask, selectTasksByBoardId } from 'store/taskSlice';
import { IPropsCreateTaskForm } from './Form.type';

export function CreateTaskForm({ boardId, columnId, onClose }: IPropsCreateTaskForm) {
  const dispatch = useDispatch<AppDispatch>();
  const authState = useSelector(selectAuth);
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const tasksIds = useSelector(selectTasksByBoardId(boardId));

  function submitHandler(e: React.SyntheticEvent) {
    e.preventDefault();
    dispatch(
      createTask({
        boardId,
        columnId,
        title,
        description,
        order: tasksIds.length,
        userId: authState.auth._id ?? '',
        users: [],
      })
    );
    onClose();
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
        <Form.Label>{t('task.title')}</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder={t('task.title placeholder')}
          value={title}
          onChange={titleChangeHandler}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="createTaskFormDesc">
        <Form.Label>{t('task.description')}</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder={t('task.description placeholder')}
          value={description}
          onChange={descriptionChangeHandler}
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
