import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { Column } from 'components/column/column';
import { CreateColumnForm } from 'components/forms/CreateColumnForm';
import ModalWindow from 'components/modal/ModalWindow';
import React, { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
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
  fetchTasksByBoardId,
  selectTasks,
  selectTasksByBoardId,
  selectTasksByColumnId,
} from 'store/taskSlice';
import { IColumn } from 'types/Interfaces';
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

  const {
    entities: tasksEntities,
    // ids: tasksIds,
    error: tasksError,
    statuses: tasksStatuses,
  } = useSelector(selectTasks);
  const tasksIds = useSelector(selectTasksByBoardId(boardId));

  const getTaskByColumnId = useSelector(selectTasksByColumnId);

  const [activeId, setActiveId] = useState<string | number | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    if (!columnsStatuses[boardId]) {
      dispatch(fetchColumns({ boardId }));
    }

    if (!tasksStatuses[boardId]) {
      dispatch(fetchTasksByBoardId({ boardId }));
    }
  }, [dispatch]);

  function createColumn() {
    setIsOpen(true);
  }

  const onHide = () => setIsOpen(false);

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
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
    setActiveId(null);
  }

  return (
    <>
      <Container fluid className="d-flex align-items-start board__content">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={colIds} strategy={horizontalListSortingStrategy}>
            {colIds.map((id) => (
              <Column key={id} column={colEntities[id] as IColumn} isDragging={activeId === id} />
            ))}
          </SortableContext>
          <DragOverlay>
            {activeId ? <Column key={activeId} column={colEntities[activeId] as IColumn} /> : null}
          </DragOverlay>
        </DndContext>
        <Button
          variant="primary"
          size="sm"
          className="col-md-3 my-2"
          style={{ width: '272px' }}
          onClick={createColumn}
        >
          + {t('board.create column')}
        </Button>
      </Container>

      <ModalWindow modalTitle={t('board.create column')} show={isOpen} onHide={onHide}>
        <CreateColumnForm boardId={boardId} onClose={onHide} order={colIds.length} />
      </ModalWindow>
    </>
  );
};
