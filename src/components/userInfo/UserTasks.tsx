import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'store/store';
import { fetchTaskByUserId, removeTask, selectTasks } from 'store/taskSlice';
import { IColumn } from 'types/Interfaces';
import { Button, Card } from 'react-bootstrap';
import delete_icon from '../../assets/delete_icon.svg';
import { DeleteWindow } from 'components/modal/DeleteWindow';
import ModalWindow from 'components/modal/ModalWindow';
import { TaskInformation } from 'components/task/taskInformation';
import { EntityId } from '@reduxjs/toolkit';
import { selectUsers } from 'store/userSlice';
import { selectBoards } from 'store/boardsSlice';
import { fetchColumns, selectColumns } from 'store/columnSlice';
import { BoardsList } from 'components/boardList/BoardsList';
import { Task } from 'store/types';

type propsType = {
  userId: string | undefined;
};

type idAndTitle = {
  [key: string]: string;
};

export function UserTasks({ userId }: propsType) {
  const dispatch = useDispatch<AppDispatch>();
  const { entities, ids, error, statuses } = useSelector(selectTasks);
  const { users } = useSelector(selectUsers);
  const columns = useSelector(selectColumns);
  // const boards = useSelector(selectBoards);
  // const columns = useSelector(selectColumns);
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(0);
  const [idTask, setIdTask] = useState<EntityId>('');

  const [columnsInfo, setColumnsInfo] = useState<idAndTitle[]>([]);
  const [boardsList, setBoardsList] = useState<string[]>([]);

  const modalTitle = isOpen === 1 ? t('task.delete') : t('task-info.task-info');

  function getUserBoards() {
    const boards = ids.map((id) => entities[id]!.boardId);
    setBoardsList(boards);
  }

  function deleteTask(id: EntityId) {
    setIdTask(id);
    setIsOpen(1);
  }

  function infoTask(id: EntityId) {
    setIdTask(id);
    setIsOpen(2);
  }

  useEffect(() => {
    userId && dispatch(fetchTaskByUserId({ userId }));
  }, [dispatch, userId]);

  const getUserBoardsCallback = useCallback(getUserBoards, [entities, ids]);

  useEffect(() => {
    getUserBoardsCallback();
    boardsList.forEach((boardId) => {
      if (!columns.statuses[boardId]) {
        dispatch(fetchColumns({ boardId }));
      }
    });
  }, [dispatch]);

  useEffect(() => {
    const columnsIdAndTitle = columns.ids.map((id: string) => {
      const title = (columns.entities[id] as IColumn).title;
      return { [id]: title };
    });

    setColumnsInfo(columnsIdAndTitle);

    console.log('boardsIdAndTitle=', columns);
  }, []);

  return (
    <>
      <div className="mb-2 text-center shadow" style={{ width: '18rem' }}>
        <div className="h5">{t('user-page.tasks')}</div>
        <div>
          {ids.map((id) => (
            <Card className="shadow-sm mb-2 flex-row" key={id}>
              <Card.Text className="flex-fill mb-0 p-1 btn" onClick={() => infoTask(id)}>
                {entities[id]?.title}
              </Card.Text>
              <Button variant="light" size="sm" className="p-0" onClick={() => deleteTask(id)}>
                <img width="15" src={delete_icon} alt="delete" />
              </Button>
            </Card>
          ))}
        </div>
      </div>
      <ModalWindow modalTitle={modalTitle} show={isOpen > 0} onHide={() => setIsOpen(0)}>
        {isOpen === 1 ? (
          <DeleteWindow
            cancel={() => setIsOpen(0)}
            remove={() =>
              dispatch(
                removeTask({
                  boardId: entities[idTask]!.boardId,
                  columnId: entities[idTask]!.columnId,
                  taskId: entities[idTask]!._id,
                })
              )
            }
            text={t('task.deleteTask')}
          />
        ) : (
          <TaskInformation
            task={entities[idTask]!}
            userName={userId!}
            usersList={users}
            columns={columnsInfo}
            cancel={() => setIsOpen(0)}
            boards={[]}
          />
        )}
      </ModalWindow>
    </>
  );
}
