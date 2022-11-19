import { Column } from 'components/column/column';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { fetchColumns, selectColumns } from 'store/columnSlice';
import { AppDispatch } from 'store/store';

export const BoardField = (props: { boardId: string }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { entities, error, statuses, ids } = useSelector(selectColumns);
  const boardId = props.boardId;

  // [
  //   {
  //     _id: 'Column id',
  //     title: 'Column title',
  //     order: 1,
  //     boardId: 'Id of boards',
  //   },
  // ];

  useEffect(() => {
    if (status === 'idle' && boardId) {
      dispatch(fetchColumns({ boardId }));
    }
  }, [boardId, dispatch]);

  return (
    <>
      <h1>boardField</h1>
      <Column />
    </>
  );
};
