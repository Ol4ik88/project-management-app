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
import { getUsers, selectUsers } from 'store/userSlice';
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
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(0);
  const [idTask, setIdTask] = useState<EntityId>('');
  const [columnsInfo, setColumnsInfo] = useState<idAndTitle[]>([]);
  const [boardsList, setBoardsList] = useState<string[]>([]);

  const { users } = useSelector(selectUsers);
  const columns = useSelector(selectColumns);
  const { entities, ids, error, statuses } = useSelector(selectTasks);

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
    const boardId = entities[id]!.boardId;
    dispatch(fetchColumns({ boardId }));

    setIdTask(id);
    setTimeout(() => {
      setIsOpen(2);
    }, 1000);
  }

  useEffect(() => {
    userId && dispatch(fetchTaskByUserId({ userId }));
  }, [dispatch, userId]);

  useEffect(() => {
    if (!users.length) {
      //dispatch(getUsers());
    }
  }, [dispatch]);

  useEffect(() => {
    const columnsIdAndTitle = columns.ids.map((id: string) => {
      const title = (columns.entities[id] as IColumn).title;
      console.log('columns1=', columns);
      return { [id]: title };
    });
    console.log('columns2=', columns);
    setColumnsInfo(columnsIdAndTitle);
  }, [columns, idTask]);

  return (
    <div className="d-flex align-items-center justify-content-center">
      <div className="mb-2 text-center" style={{ width: '20rem' }}>
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
    </div>
  );
}
