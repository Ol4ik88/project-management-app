import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from 'store/authSlice';
import { AppDispatch } from 'store/store';
import { createTask, selectTasksByBoardId } from 'store/taskSlice';
import { IPropsCreateTaskForm } from './Form.type';
import PushMessage from 'components/pushMessage/PushMessage';

export function CreateTaskForm({ boardId, columnId, onClose }: IPropsCreateTaskForm) {
  const dispatch = useDispatch<AppDispatch>();
  const authState = useSelector(selectAuth);
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [show, setShow] = useState(false);
  const onHide = () => setShow(!show);
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
    onHide();
    setTimeout(() => {
      onClose();
    }, 2000);
  }

  function titleChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }

  function descriptionChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    setDescription(e.target.value);
  }

  return (
    <>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="createTaskFormTitle">
          <Form.Label>{t('board.task title')}</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter task title"
            value={title}
            onChange={titleChangeHandler}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="createTaskFormDesc">
          <Form.Label>{t('board.task description')}</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter task description"
            value={description}
            onChange={descriptionChangeHandler}
          />
        </Form.Group>
        <Modal.Footer>
          <Button variant="secondary" type="reset" onClick={onClose}>
            {t('close')}
          </Button>
          <Button variant="primary" type="submit">
            {t('create')}
          </Button>
        </Modal.Footer>
      </Form>
      <PushMessage text={t('board.create task push')} isShow={show} onHide={onHide} />
    </>
  );
}
