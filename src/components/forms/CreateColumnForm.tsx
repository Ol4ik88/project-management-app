import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { createColumn } from 'store/columnSlice';
import { AppDispatch } from 'store/store';
import { IPropsCreateColumnForm } from './Form.type';
import PushMessage from 'components/pushMessage/PushMessage';

export function CreateColumnForm({ boardId, onClose }: IPropsCreateColumnForm) {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [show, setShow] = useState(false);
  const onHide = () => setShow(!show);

  function submitHandler(e: React.SyntheticEvent) {
    e.preventDefault();
    dispatch(createColumn({ boardId, title, order: 0 }));
    onHide();
    setTimeout(() => {
      onClose();
    }, 2000);
  }
  function titleChangeHandler(e: ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }

  return (
    <>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="createBoardFormTitle">
          <Form.Label>{t('board.column title')}</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter column title"
            value={title}
            onChange={titleChangeHandler}
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
      <PushMessage text={t('board.create column push')} isShow={show} onHide={onHide} />
    </>
  );
}
