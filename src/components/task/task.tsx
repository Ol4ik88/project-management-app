import React, { useEffect, useState } from 'react';
import { Button, Card, Form, OverlayTrigger, Popover } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store/store';
import edit_icon from '../../assets/registaration_icon.svg';
import delete_icon from '../../assets/delete_icon.svg';
import info_icon from '../../assets/info_icon.svg';
import { ITask } from 'types/Interfaces';
import ModalWindow from 'components/modal/ModalWindow';
import { TaskInformation } from './taskInformation';
import { getBoardById } from 'store/boardsSlice';
import { fetchColumns } from 'store/columnSlice';

export const Task = ({ task }: { task: ITask }) => {
  const { _id, title, order, columnId, description, userId, users } = task;
  const boardId = '637cbfd3d835ac65a9013ae4';
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState(0);

  const modalTitle =
    isOpen === 1 ? t('editTask') : isOpen === 2 ? t('deleteTask') : t('Task') + `: ${title}`;

  useEffect(() => {
    dispatch(getBoardById({ boardId }));
    dispatch(fetchColumns({ boardId }));
  }, [isOpen]);

  function editTask() {
    setIsOpen(1);
  }

  function deleteTask() {
    setIsOpen(2);
  }

  function infoTask() {
    setIsOpen(3);
  }

  return (
    <>
      <Card className="shadow-sm mb-2 flex-row">
        <Card.Text className="flex-fill mb-0 p-1">{title} </Card.Text>
        <Button variant="light" size="sm" className="p-0" onClick={deleteTask}>
          <img width="15" src={delete_icon} alt="delete" />
        </Button>
      </Card>

      {isOpen > 0 && (
        <ModalWindow modalTitle={modalTitle} show={isOpen > 0} onHide={() => setIsOpen(0)}>
          {isOpen === 1 ? (
            <div> Редактирование tasks </div>
          ) : isOpen === 1 ? (
            <div> Удаление tasks </div>
          ) : (
            <TaskInformation task={props.task} />
          )}
        </ModalWindow>
      )}
    </>
  );
};
