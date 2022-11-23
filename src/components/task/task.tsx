import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'store/store';
import delete_icon from '../../assets/delete_icon.svg';
import { ITask } from 'types/Interfaces';
import ModalWindow from 'components/modal/ModalWindow';
import { TaskInformation } from './taskInformation';
import { fetchBoardById, selectBoards } from 'store/boardsSlice';
import { fetchColumns, selectColumns } from 'store/columnSlice';
import { fetchUserById, selectAuth } from 'store/authSlice';

export const Task = ({ task }: { task: ITask }) => {
  const { title, columnId, userId, boardId } = task;
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState(0);

  const modalTitle = isOpen === 1 ? t('deleteTask') : t('Task') + `: ${title}`;

  const boards = useSelector(selectBoards);
  const columns = useSelector(selectColumns);
  const { auth } = useSelector(selectAuth);

  useEffect(() => {
    dispatch(fetchBoardById({ boardId }));
    dispatch(fetchColumns({ boardId }));
    dispatch(fetchUserById({ userId }));
  }, [boardId, dispatch, userId]);

  function deleteTask() {
    setIsOpen(1);
  }

  function infoTask() {
    setIsOpen(2);
  }

  return (
    <>
      <Card className="shadow-sm mb-2 flex-row">
        <Card.Text className="flex-fill mb-0 p-1 btn" onClick={infoTask}>
          {title}
        </Card.Text>
        <Button variant="light" size="sm" className="p-0" onClick={deleteTask}>
          <img width="15" src={delete_icon} alt="delete" />
        </Button>
      </Card>

      {isOpen > 0 && (
        <ModalWindow modalTitle={modalTitle} show={isOpen > 0} onHide={() => setIsOpen(0)}>
          {isOpen === 1 ? (
            <div> Удаление tasks </div>
          ) : (
            <TaskInformation
              task={task}
              userName={auth.name || auth.login || userId}
              columnTitle={columns.entities[columnId].title}
              boardTitle={boards.entities[boardId].title}
            />
          )}
        </ModalWindow>
      )}
    </>
  );
};
