import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'store/store';
import { fetchUserBoards, selectBoards } from 'store/boardsSlice';

export function Boards() {
  const dispatch = useDispatch<AppDispatch>();
  const { entities, ids } = useSelector(selectBoards);
  useEffect(() => {
    dispatch(fetchUserBoards({ userId: 'sdasdsad' }));
    console.log(entities);
  }, [dispatch]);
  return (
    <div>
      {ids.map((id) => (
        <div key={id}>{entities[id]?.title}</div>
      ))}
    </div>
  );
}
