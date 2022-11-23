import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'store/store';
import edit_icon from '../../assets/registaration_icon.svg';
import delete_icon from '../../assets/delete_icon.svg';
import { Task } from 'components/task/task';
import ModalWindow from 'components/modal/ModalWindow';
import { IColumn, ITask } from 'types/Interfaces';
import { selectTasks, selectTasksByColumnId } from 'store/taskSlice';
import { CreateTaskForm } from 'components/forms/CreateTaskForm';

export const Column = ({ column }: { column: IColumn }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const { _id, title, order, boardId } = column;
  const [isOpen, setIsOpen] = useState(0);

  const {
    entities: tasksEntities,
    // ids: tasksIds,
    error: tasksError,
    statuses: tasksStatuses,
  } = useSelector(selectTasks);

  const tasksIds = useSelector(selectTasksByColumnId(_id));

  const modalTitle =
    isOpen === 1 ? t('editColumn') : isOpen === 2 ? t('deleteColumn') : t('createTask');

  function editColumn() {
    setIsOpen(1);
  }

  function deleteColumn() {
    setIsOpen(2);
  }

  function createTask() {
    setIsOpen(3);
  }

  return (
    <>
      <Card className="shadow p-0 m-2" style={{ width: '272px' }}>
        <Card.Header>
          {title}
          <Button variant="light" className="col-3 p-0" onClick={editColumn} size="sm">
            <img width="20" src={edit_icon} alt="edit" />
          </Button>

          <Button variant="light" className="col-3 p-0" onClick={deleteColumn} size="sm">
            <img width="20" src={delete_icon} alt="delete" />
          </Button>
        </Card.Header>

        <Card.Body className="p-1">
          {tasksIds.map((id) => (
            <Task key={id} task={tasksEntities[id] as ITask} />
          ))}
        </Card.Body>

        <Card.Footer>
          <Button variant="primary" size="sm" onClick={createTask} className="col-12">
            {t('addTask')}
          </Button>
        </Card.Footer>
      </Card>

      {isOpen > 0 && (
        <ModalWindow modalTitle={modalTitle} show={isOpen > 0} onHide={() => setIsOpen(0)}>
          {isOpen === 1 ? (
            <div> Редактирование списка </div>
          ) : isOpen === 2 ? (
            <div> Удаление списка </div>
          ) : (
            <CreateTaskForm boardId={boardId} columnId={_id} />
          )}
        </ModalWindow>
      )}
    </>
  );
};
