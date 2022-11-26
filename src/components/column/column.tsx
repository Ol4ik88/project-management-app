import React, { useEffect, useState, ChangeEvent } from 'react';
import { Button, Card, Form, Col, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'store/store';
import edit_icon from '../../assets/registaration_icon.svg';
import cancel_icon from '../../assets/cancel.svg';
import delete_icon from '../../assets/delete_icon.svg';
import { Task } from 'components/task/task';
import ModalWindow from 'components/modal/ModalWindow';
import { IColumn, ITask } from 'types/Interfaces';
import {
  changeTasksOrders,
  selectTasks,
  selectTasksByColumnId,
  setTasksOrder,
} from 'store/taskSlice';
import { CreateTaskForm } from 'components/forms/CreateTaskForm';
import { DeleteWindow } from 'components/modal/DeleteWindow';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { removeColumn, updateColumn } from 'store/columnSlice';
import './column.css';

export const Column = ({ column, isDragging }: { column: IColumn; isDragging?: boolean }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();
  const { _id, title, order, boardId } = column;
  const [modalContent, setModalContent] = useState<React.ReactNode>();
  const [modalTitle, setModalTitle] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const [isInput, setIsInput] = useState(false);
  const [inputTitle, setInputTitle] = useState(title);

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

  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleClickDelete = () => {
    setModalTitle(t('board.remove column title') ?? '');
    setModalContent(
      <DeleteWindow
        cancel={onHide}
        remove={() => {
          dispatch(removeColumn({ boardId, columnId: _id }));
        }}
        text={t('board.remove column message')}
      />
    );
    setIsOpen(true);
  };

  const handleClickEdit = () => {
    dispatch(updateColumn({ boardId, columnId: _id, title: inputTitle, order }));
    setIsInput(false);
  };

  const handleClickCancell = () => {
    setIsInput(false);
  };

  const handleClickTitle = () => {
    setIsInput(true);
  };

  function handlerChangeTitle(e: ChangeEvent<HTMLInputElement>) {
    setInputTitle(e.target.value);
  }

  const handleClickCreate = () => {
    setModalTitle(t('board.create task') ?? '');
    setModalContent(<CreateTaskForm boardId={boardId} columnId={_id} onClose={onHide} />);
    setIsOpen(true);
  };

  const onHide = () => setIsOpen(false);

  function handleDragTaskStart(event: DragStartEvent) {
    setActiveTaskId(String(event.active.id));
  }

  function handleDragTaskEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = tasksIds.indexOf(active.id);
      const newIndex = tasksIds.indexOf(over.id);
      const orderedTasksIds = arrayMove(tasksIds, oldIndex, newIndex);

      const orderedList = orderedTasksIds.reduce((accum, id, index) => {
        if (tasksEntities[id] && tasksEntities[id]?._id) {
          accum.push({
            _id: tasksEntities[id]?._id as string,
            order: index,
            columnId: tasksEntities[id]?.columnId,
          } as ITask);
        }
        return accum;
      }, [] as ITask[]);
      dispatch(setTasksOrder(orderedList));

      dispatch(changeTasksOrders(orderedList));
    }
    setActiveTaskId(null);
  }

  return (
    <>
      <Card
        className="shadow p-0 me-2 mt-2"
        ref={setNodeRef}
        {...attributes}
        style={{ ...style, width: '272px' }}
        id={column._id}
      >
        <Card.Header
          ref={setActivatorNodeRef}
          {...listeners}
          className="d-flex justify-content-between"
        >
          {!isInput ? (
            <>
              <Col onClick={handleClickTitle}>{title}</Col>
              <Button variant="light" className="p-0" size="sm" onClick={handleClickDelete}>
                <img width="20" src={delete_icon} alt="delete" />
              </Button>
            </>
          ) : (
            <Form onSubmit={handleClickEdit} className="row">
              <Col className="col-8 p-0">
                <Form.Control
                  required
                  type="text"
                  value={inputTitle}
                  onChange={handlerChangeTitle}
                />
              </Col>
              <Col className="col-4 px-1">
                <Button variant="light" type="submit" size="sm">
                  <img width="15" src={edit_icon} alt="edit" />
                </Button>
                <Button variant="light" type="reset" size="sm" onClick={handleClickCancell}>
                  <img width="15" src={cancel_icon} alt="cancel" />
                </Button>
              </Col>
            </Form>
          )}
        </Card.Header>

        <Card.Body className="p-1 column">
          <Row className="column__content">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCorners}
              onDragStart={handleDragTaskStart}
              onDragEnd={handleDragTaskEnd}
            >
              <SortableContext items={tasksIds} strategy={verticalListSortingStrategy}>
                {tasksIds.map((id) => (
                  <Task
                    key={id}
                    task={tasksEntities[id] as ITask}
                    isDragging={activeTaskId === id}
                  />
                ))}
              </SortableContext>
              <DragOverlay>
                {activeTaskId ? (
                  <Task key={activeTaskId} task={tasksEntities[activeTaskId] as ITask} />
                ) : null}
              </DragOverlay>
            </DndContext>
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
