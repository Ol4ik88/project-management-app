import { Column } from 'components/column/column';
import { CreateColumnForm } from 'components/forms/CreateColumnForm';
import ModalWindow from 'components/modal/ModalWindow';
import React, { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { fetchColumns, selectColumns, selectColumnsByBoardId } from 'store/columnSlice';
import { AppDispatch } from 'store/store';
import {
  fetchTasksByBoardId,
  selectTasks,
  selectTasksByBoardId,
  selectTasksByColumnId,
} from 'store/taskSlice';
import { IColumn } from 'types/Interfaces';

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

  useEffect(() => {
    if (!columnsStatuses[boardId]) {
      dispatch(fetchColumns({ boardId }));
    }

    if (!tasksStatuses[boardId]) {
      dispatch(fetchTasksByBoardId({ boardId }));
      console.log('tasks');
    }
  }, [dispatch]);

  function createColumn() {
    setIsOpen(true);
  }

  return (
    <>
      <Container fluid className="d-flex align-items-start">
        {colIds.map((id) => (
          <Column key={id} column={colEntities[id] as IColumn} />
        ))}

        <Button
          variant="primary"
          size="sm"
          className="col-md-3 my-2"
          style={{ width: '272px' }}
          onClick={createColumn}
        >
          + {t('createColumn')}
        </Button>
      </Container>

      <ModalWindow modalTitle={t('createColumn')} show={isOpen} onHide={() => setIsOpen(false)}>
        <CreateColumnForm boardId={boardId} />
      </ModalWindow>
    </>
  );
};
