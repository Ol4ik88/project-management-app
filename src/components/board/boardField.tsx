import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  pointerWithin,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { Column } from 'components/column/column';
import { CreateColumnForm } from 'components/forms/CreateColumnForm';
import ModalWindow from 'components/modal/ModalWindow';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeColumnsOrders,
  fetchColumns,
  selectColumns,
  selectColumnsByBoardId,
  setColumnsOrder,
} from 'store/columnSlice';
import { AppDispatch } from 'store/store';
import {
  changeTasksOrders,
  fetchTasksByBoardId,
  selectTasks,
  selectTasksByBoardId,
  selectTasksByColumnId,
  setTasksOrder,
} from 'store/taskSlice';
import { getUsers, selectUsers } from 'store/userSlice';
import { IColumn, ITask } from 'types/Interfaces';
import './boardField.css';

export const BoardField = ({ boardId }: { boardId: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const {
    entities: colEntities,
    // ids: columnsIds,
    error: columnsError,
    statuses: columnsStatuses,
  } = useSelector(selectColumns);
  const colIds = useSelector(selectColumnsByBoardId(boardId));
  const { users } = useSelector(selectUsers);

  const {
    entities: tasksEntities,
    // ids: tasksIds,
    error: tasksError,
    statuses: tasksStatuses,
  } = useSelector(selectTasks);
  const tasksIds = useSelector(selectTasksByBoardId(boardId));

  const getTaskByColumnId = useSelector(selectTasksByColumnId);

  const [activeColId, setActiveColId] = useState<string | null>(null);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

  useEffect(() => {
    if (!columnsStatuses[boardId]) {
      dispatch(fetchColumns({ boardId }));
    }

    if (!tasksStatuses[boardId]) {
      dispatch(fetchTasksByBoardId({ boardId }));
    }

    if (!users.length) {
      dispatch(getUsers());
    }
  }, [dispatch]);

  function createColumn() {
    setIsOpen(true);
  }

  const onHide = () => setIsOpen(false);

  const startContainer = useRef('');
  const overElement = useRef<{ over: string; active: string }>({ over: '', active: '' });

  function handleDragStart(event: DragStartEvent) {
    if (colIds.includes(event.active.id)) {
      setActiveColId(String(event.active.id));
    }
    if (tasksIds.includes(event.active.id)) {
      startContainer.current = tasksEntities[event.active.id]?.columnId ?? '';
      setActiveTaskId(String(event.active.id));
    }
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (over?.id == null || colIds.includes(active.id)) {
      return;
    }
    if (over?.id === active.id) {
      return;
    }
    if (overElement.current.over == over?.id) {
      return;
    }
    const activeContainerId = tasksEntities[active.id]?.columnId;
    const overContainerId = tasksEntities[over?.id]?.columnId
      ? tasksEntities[over?.id]?.columnId
      : over.id;

    if (!activeContainerId || !overContainerId) {
      return;
    }

    overElement.current = { over: String(over.id) ?? '', active: String(active.id) ?? '' };

    if (activeContainerId !== overContainerId) {
      const activeIndex = tasksIds.indexOf(active.id);
      const overIndex = tasksIds.indexOf(over.id);
      if (overContainerId === over.id) {
        dispatch(
          setTasksOrder([
            {
              _id: active.id as string,
              order: tasksIds.length,
              columnId: overContainerId,
            } as ITask,
          ])
        );
      } else {
        const orderedTasksIds = arrayMove(tasksIds, activeIndex, overIndex);
        const orderedList = orderedTasksIds.reduce((accum, id, index) => {
          if (
            tasksEntities[id] &&
            tasksEntities[id]?._id &&
            (tasksEntities[id]?.columnId === overContainerId || id === active.id)
          ) {
            accum.push({
              _id: id,
              order: index,
              columnId: overContainerId,
            } as ITask);
          }
          return accum;
        }, [] as ITask[]);
        dispatch(setTasksOrder(orderedList));
      }
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (colIds.includes(active.id) && over && active.id !== over.id) {
      const oldIndex = colIds.indexOf(active.id);
      const newIndex = colIds.indexOf(over.id);
      const orderedColumnsIds = arrayMove(colIds, oldIndex, newIndex);

      const orderedList = orderedColumnsIds.reduce((accum, id, index) => {
        if (colEntities[id] && colEntities[id]?._id) {
          accum.push({ _id: colEntities[id]?._id as string, order: index } as IColumn);
        }
        return accum;
      }, [] as IColumn[]);
      dispatch(setColumnsOrder(orderedList));

      dispatch(changeColumnsOrders(orderedList));
    }

    if (
      tasksIds.includes(active.id) &&
      over &&
      (active.id !== over.id || startContainer.current !== tasksEntities[active.id]?.columnId)
    ) {
      const oldIndex = tasksIds.indexOf(active.id);
      const newIndex = tasksIds.indexOf(over.id);
      const orderedTasksIds = arrayMove(tasksIds, oldIndex, newIndex);

      const activeContainerId = tasksEntities[active.id]?.columnId;
      const overContainerId = tasksEntities[over?.id]?.columnId
        ? tasksEntities[over?.id]?.columnId
        : over.id;

      const orderedList = orderedTasksIds.reduce((accum, id, index) => {
        if (
          tasksEntities[id] &&
          tasksEntities[id]?._id &&
          tasksEntities[id]?.columnId === activeContainerId
        ) {
          accum.push({
            _id: tasksEntities[id]?._id as string,
            order: index,
            columnId: overContainerId,
          } as ITask);
        }
        return accum;
      }, [] as ITask[]);
      dispatch(setTasksOrder(orderedList));
      dispatch(changeTasksOrders(orderedList));
    }
    setActiveColId(null);
    setActiveTaskId(null);
    startContainer.current = '';
    overElement.current = { over: '', active: '' };
  }

  return (
    <>
      <Container fluid className="d-flex align-items-start board__content">
        <DndContext
          sensors={sensors}
          collisionDetection={pointerWithin}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
        >
          <SortableContext items={colIds} strategy={horizontalListSortingStrategy}>
            {colIds.map((id) => (
              <Column
                key={id}
                column={colEntities[id] as IColumn}
                isDragging={activeColId === id}
                activeTaskId={activeTaskId}
              />
            ))}
          </SortableContext>

          <Button
            variant="info"
            size="sm"
            className="col-md-3 my-2 shadow"
            style={{ width: '272px' }}
            onClick={createColumn}
          >
            + {t('board.create column')}
          </Button>
          <DragOverlay>
            {activeColId ? (
              <div style={{ height: '300px' }}>
                <Column column={colEntities[activeColId] as IColumn} />
              </div>
            ) : null}
            {activeTaskId ? (
              <Card className="shadow-sm mb-2 flex-row">
                <Card.Text className="flex-fill mb-0 p-1 btn">
                  {tasksEntities[activeTaskId].title}
                </Card.Text>
              </Card>
            ) : null}
          </DragOverlay>
        </DndContext>
      </Container>
      <ModalWindow modalTitle={t('board.create column')} show={isOpen} onHide={onHide}>
        <CreateColumnForm boardId={boardId} onClose={onHide} order={colIds.length} />
      </ModalWindow>
    </>
  );
};
