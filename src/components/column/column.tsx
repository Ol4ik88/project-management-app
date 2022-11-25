import React, { useEffect, useState } from 'react';
import { Button, Card, Row } from 'react-bootstrap';
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
import { DeleteWindow } from 'components/modal/DeleteWindow';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import './column.css';

export const Column = ({ column, isDragging }: { column: IColumn; isDragging?: boolean }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const { _id, title, order, boardId } = column;
  const [modalContent, setModalContent] = useState<React.ReactNode>();
  const [modalTitle, setModalTitle] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  const {
    entities: tasksEntities,
    // ids: tasksIds,
    error: tasksError,
    statuses: tasksStatuses,
  } = useSelector(selectTasks);

  const tasksIds = useSelector(selectTasksByColumnId(_id));

  const { attributes, listeners, setNodeRef, transform, transition, setActivatorNodeRef } =
    useSortable({
      id: column._id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : undefined,
  };

  const handleClickDelete = () => {
    setModalTitle(t('board.remove task title') ?? '');
    setModalContent(
      <DeleteWindow
        cancel={onHide}
        remove={() => {
          alert('удаление задачи');
        }}
        text={t('board.remove task message')}
      />
    );
    setIsOpen(true);
  };

  const handleClickEdit = () => {
    alert('изменить название столбца');
  };

  const handleClickCreate = () => {
    setModalTitle(t('board.create task') ?? '');
    setModalContent(<CreateTaskForm boardId={boardId} columnId={_id} onClose={onHide} />);
    setIsOpen(true);
  };

  const onHide = () => setIsOpen(false);

  return (
    <>
      <Card
        className="shadow p-0 me-2 mt-2"
        ref={setNodeRef}
        {...attributes}
        style={{ ...style, width: '272px' }}
        id={column._id}
      >
        <Card.Header ref={setActivatorNodeRef} {...listeners}>
          {title}
          <Button variant="light" className="col-3 p-0" size="sm" onClick={handleClickEdit}>
            <img width="20" src={edit_icon} alt="edit" />
          </Button>

          <Button variant="light" className="col-3 p-0" size="sm" onClick={handleClickDelete}>
            <img width="20" src={delete_icon} alt="delete" />
          </Button>
        </Card.Header>

        <Card.Body className="p-1 column">
          <Row className="column__content">
            {tasksIds.map((id) => (
              <Task key={id} task={tasksEntities[id] as ITask} />
            ))}
          </Row>
        </Card.Body>

        <Card.Footer>
          <Button variant="primary" size="sm" className="col-12" onClick={handleClickCreate}>
            {t('board.add task')}
          </Button>
        </Card.Footer>
      </Card>
      <ModalWindow modalTitle={modalTitle} show={isOpen} onHide={onHide}>
        {modalContent}
      </ModalWindow>
    </>
  );
};
