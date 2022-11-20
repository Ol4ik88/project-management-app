import { Column } from 'components/column/column';
import { CreateColumnForm } from 'components/forms/CreateColumnForm';
import ModalWindow from 'components/modal/ModalWindow';
import React, { useEffect, useState } from 'react';
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
  //const { entities, error, statuses, ids } = useSelector(selectColumns);

  const columns: IColumn[] = [
    {
      _id: '123',
      title: 'Column title1',
      order: 1,
      boardId: boardId,
    },
    {
      _id: '456',
      title: 'Column title2',
      order: 2,
      boardId: boardId,
    },
    {
      _id: '789',
      title: 'Column title3',
      order: 3,
      boardId: boardId,
    },
  ];

  useEffect(() => {
    if (boardId) {
      //dispatch(fetchColumns({ boardId }));
      //! колонок нет, получаем [] и выкидывает из авторизации
    }
  }, [boardId, dispatch, isOpen]);

  function createColumn() {
    setIsOpen(true);
  }

  return (
    <>
      <Container className="d-flex align-items-start">
        {columns.map((column) => (
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
        //! не создаются колонки
      )}
    </>
  );
};
