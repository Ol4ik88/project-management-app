import { Column } from 'components/column/column';
import { CreateColumnForm } from 'components/forms/CreateColumnForm';
import ModalWindow from 'components/modal/ModalWindow';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { fetchColumns, selectColumns } from 'store/columnSlice';
import { AppDispatch } from 'store/store';
import { IColumn } from 'types/Interfaces';

export const BoardField = (props: { boardId: string }) => {
  const boardId = props.boardId;
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { entities, ids } = useSelector(selectColumns);

  useEffect(() => {
    if (boardId) {
      dispatch(fetchColumns({ boardId }));
    }
  }, [boardId, dispatch, isOpen]);

  const getCollumnsByBoardId = useCallback(() => {
    const arrayColumns: IColumn[] = [];

    ids.map((id) => {
      if (entities[id]?.boardId === boardId) {
        arrayColumns.push(entities[id]!);
      }
    });

    return arrayColumns;
  }, [ids, entities, boardId]);

  function createColumn() {
    setIsOpen(true);
  }

  return (
    <>
      <Container className="d-flex align-items-start">
        {getCollumnsByBoardId().map((column) => (
          <Column key={column._id} column={column} />
        ))}

        <Button variant="primary" size="lg" className="col-md-3 my-2" onClick={createColumn}>
          + {t('createColumn')}
        </Button>
      </Container>

      {isOpen && (
        <ModalWindow modalTitle={t('createColumn')} show={isOpen} onHide={() => setIsOpen(false)}>
          <CreateColumnForm boardId={boardId} />
        </ModalWindow>
      )}
    </>
  );
};
