import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'store/store';
import delete_icon from '../../assets/delete_icon.svg';
import { IColumn, ITask } from 'types/Interfaces';
import ModalWindow from 'components/modal/ModalWindow';
import { TaskInformation } from './taskInformation';
import { fetchBoardById, fetchUserBoards, selectBoards } from 'store/boardsSlice';
import { fetchColumns, selectColumns } from 'store/columnSlice';
import { fetchUserById, selectAuth } from 'store/authSlice';
import { DeleteWindow } from 'components/modal/DeleteWindow';
import { removeTask } from 'store/taskSlice';
import { getUsers } from 'store/userSlice';

type idAndTitle = {
  [key: string]: string;
};

export const Task = ({ task }: { task: ITask }) => {
  const { title, columnId, userId, boardId, _id } = task;
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState(0);
  const [boardsInfo, setBoardsInfo] = useState<idAndTitle[]>([]);
  const [columnsInfo, setColumnsInfo] = useState<idAndTitle[]>([]);

  const modalTitle = isOpen === 1 ? t('task.delete') : t('task-info.task-info');

  const boards = useSelector(selectBoards);
  const columns = useSelector(selectColumns);
  const { auth } = useSelector(selectAuth);

  useEffect(() => {
    dispatch(fetchUserBoards({ userId }));
    dispatch(fetchColumns({ boardId }));
    dispatch(getUsers()); //! доделать
  }, [boardId, dispatch, userId]);

  useEffect(() => {
    const boardsIdAndTitle = boards.ids.map((id) => {
      const title = boards.entities[id].title;
      return { [id]: title };
    });

    const columnsIdAndTitle = columns.ids.map((id: string) => {
      const title = (columns.entities[id] as IColumn).title;
      return { [id]: title };
    });

    setBoardsInfo(boardsIdAndTitle);
    setColumnsInfo(columnsIdAndTitle);
  }, [boards.entities, boards.ids, columns.entities, columns.ids]);

  function deleteTask() {
    setIsOpen(1);
  }

  function infoTask() {
    setIsOpen(2);
  }

  const users = [
    {
      login: '123',
      name: 'Yura',
      _id: '637c8728d835ac65a9013aae',
    },
    {
      login: 'vasias',
      name: 'vasia',
      _id: '6380b33d3c8f23459e9ac6d2',
    },
  ];

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
            <DeleteWindow
              cancel={() => setIsOpen(0)}
              remove={() => dispatch(removeTask({ boardId, columnId, taskId: _id }))}
              text={t('task.deleteTask')}
            />
          ) : (
            <TaskInformation
              task={task}
              userName={auth.name || auth.login || userId}
              usersList={users}
              columns={columnsInfo}
              boards={boardsInfo}
              cancel={() => setIsOpen(0)}
            />
          )}
        </ModalWindow>
      )}
    </>
  );
};
