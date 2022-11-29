import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'store/store';
import { fetchTaskByUserId, removeTask, selectTasks } from 'store/taskSlice';
import { Button, Card } from 'react-bootstrap';
import delete_icon from '../../assets/delete_icon.svg';
import { DeleteWindow } from 'components/modal/DeleteWindow';
import ModalWindow from 'components/modal/ModalWindow';
import { EntityId } from '@reduxjs/toolkit';
import { getUsers, selectUsers } from 'store/userSlice';

type propsType = {
  userId: string | undefined;
};

export function UserTasks({ userId }: propsType) {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(0);
  const [idTask, setIdTask] = useState<EntityId>('');

  const { users } = useSelector(selectUsers);
  const { entities, ids, error, statuses } = useSelector(selectTasks);

  const modalTitle = isOpen === 1 ? t('task.delete') : t('task-info.task-info');

  function deleteTask(id: EntityId) {
    setIdTask(id);
    setIsOpen(1);
  }

  useEffect(() => {
    userId && dispatch(fetchTaskByUserId({ userId }));
  }, [dispatch, userId]);

  useEffect(() => {
    if (!users.length) {
      dispatch(getUsers());
    }
  }, [dispatch]);

  return (
    <div className="d-flex align-items-center justify-content-center">
      <div className="mb-2 text-center" style={{ width: '20rem' }}>
        <div className="h5">{t('user-page.tasks')}</div>
        <Card>
          <Card.Body>
            {ids.map((id) => (
              <Card.Text key={id}>
                <Card.Title className="d-grid gap-2">
                  <Button className="btn-block">{entities[id]?.boardId}</Button>
                </Card.Title>

                <Card.Text>
                  <Card className="shadow-sm mb-2 flex-row">
                    <Card.Text className="flex-fill mb-0 p-1 btn">{entities[id]?.title}</Card.Text>
                    <Button
                      variant="light"
                      size="sm"
                      className="p-0"
                      onClick={() => deleteTask(id)}
                    >
                      <img width="15" src={delete_icon} alt="delete" />
                    </Button>
                  </Card>
                </Card.Text>
              </Card.Text>
            ))}
          </Card.Body>
        </Card>
      </div>

      {/* <ModalWindow modalTitle={modalTitle} show={isOpen > 0} onHide={() => setIsOpen(0)}>
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
      </ModalWindow> */}
    </div>
  );
}
