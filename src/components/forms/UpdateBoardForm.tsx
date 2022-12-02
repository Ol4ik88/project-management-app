import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from 'store/authSlice';
import { updateBoard } from 'store/boardsSlice';
import { AppDispatch } from 'store/store';
import { Board } from 'store/types';
import { getUsers, selectUsers } from 'store/userSlice';

type Option = { value: string; label: string };

export function UpdateteBoardForm({ onClose, board }: { onClose: () => void; board: Board }) {
  const dispatch = useDispatch<AppDispatch>();

  const authState = useSelector(selectAuth);
  const { users } = useSelector(selectUsers);

  const { t } = useTranslation();

  const [title, setTitle] = useState(board.title);
  const [description, setDescription] = useState(board.description);
  const [usersSelect, setUsersSelect] = useState<string[]>([]);

  const animatedComponents = makeAnimated();
  const allNames = users.map((user) => ({ value: user._id, label: user.name }));
  const usersNames = allNames.filter((user) => board.users.indexOf(user.value) !== -1);

  useEffect(() => {
    if (!users.length) {
      dispatch(getUsers());
    }
  }, [dispatch]);

  function submitHandler(e: React.SyntheticEvent) {
    e.preventDefault();
    dispatch(
      updateBoard({
        boardId: board._id,
        owner: authState.auth._id ?? '',
        title,
        description,
        users: usersSelect,
      })
    );
    onClose();
  }

  const submitSelect = (option: readonly Option[]) => {
    setUsersSelect(option.map((user) => user.value));
  };

  return (
    <Form onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="createBoardFormTitle">
        <Form.Label>{t('board.title')}</Form.Label>
        <Form.Control
          type="text"
          placeholder={t('board.title placeholder')}
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="createBoardFormDesc">
        <Form.Label>{t('board.description')}</Form.Label>
        <Form.Control
          type="text"
          placeholder={t('board.description placeholder')}
          value={description}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="createBoardFormDesc">
        <Form.Label>{t('board.board users')}</Form.Label>
        <Select
          closeMenuOnSelect={false}
          components={animatedComponents}
          defaultValue={[...usersNames]}
          isMulti
          options={allNames}
          onChange={submitSelect}
        />
      </Form.Group>
      <Modal.Footer>
        <Button variant="primary" type="submit">
          {t('edit')}
        </Button>
        <Button variant="info" type="reset" onClick={onClose}>
          {t('close')}
        </Button>
      </Modal.Footer>
    </Form>
  );
}
