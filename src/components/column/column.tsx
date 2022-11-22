import React, { useEffect, useState, useCallback } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'store/store';
import edit_icon from '../../assets/registaration_icon.svg';
import delete_icon from '../../assets/delete_icon.svg';
import { Task } from 'components/task/task';
import ModalWindow from 'components/modal/ModalWindow';
import { IColumn, ITask } from 'types/Interfaces';
import { fetchTasksByColumnId, selectTasks } from 'store/taskSlice';

export const Column = (props: { column: IColumn }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const { _id, title, order, boardId } = props.column;
  const { entities, error, statuses, ids } = useSelector(selectTasks);
  const [isOpen, setIsOpen] = useState(0);

  const modalTitle =
    isOpen === 1 ? t('editColumn') : isOpen === 2 ? t('deleteColumn') : t('createTask');

  const getCollumnsByBoardId = useCallback(() => {
    const arrayTasks: ITask[] = [];

    ids.map((id) => {
      if (entities[id]?.columnId === props.column._id) {
        arrayTasks.push(entities[id]!);
      }
    });

    return arrayTasks;
  }, [entities, ids]);

  useEffect(() => {
    dispatch(fetchTasksByColumnId({ boardId, columnId: _id }));
  }, [_id, boardId, dispatch, isOpen]);

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
      <Card className="shadow p-2 m-2">
        <Card.Header>
          {title}
          <Button variant="light" className="col-3" onClick={editColumn}>
            <img width="30" src={edit_icon} alt="edit" />
          </Button>

          <Button variant="light" className="col-3" onClick={deleteColumn}>
            <img width="30" src={delete_icon} alt="delete" />
          </Button>
        </Card.Header>

        <Card.Body>
          {getCollumnsByBoardId().map((task) => (
            <Task key={task._id} task={task} />
          ))}
        </Card.Body>

        <Card.Footer>
          <Button variant="primary" onClick={createTask} className="col-12">
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
            <div> Создание задачи </div>
          )}
        </ModalWindow>
      )}
    </>
  );
};
