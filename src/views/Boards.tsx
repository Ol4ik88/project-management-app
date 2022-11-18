import { BoardsList } from 'components/boardList/boardsList';
import { CreateBoardForm } from 'components/forms/createBoardForm';
import React, { useEffect } from 'react';
import { Alert, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from 'store/authSlice';
import { boardsSelectors, fetchUserBoards, selectBoards } from 'store/boardsSlice';
import { AppDispatch } from 'store/store';

export function Boards() {
  const dispatch = useDispatch<AppDispatch>();
  const { error, status } = useSelector(selectBoards);
  const authState = useSelector(selectAuth);
  const total = useSelector(boardsSelectors.selectTotal);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUserBoards({ userId: authState?.auth._id ?? '' }));
    }
  }, [dispatch, status]);

  return (
    <Container className="mt-5">
      <CreateBoardForm />
      {status === 'failed' && <Alert variant={'danger'}>{error}</Alert>}
      {status === 'loading' && <div>Loading...</div>}
      {total > 0 && status !== 'failed' && <BoardsList />}
      {total === 0 && status === 'succeeded' && (
        <Alert variant={'info'}>{t('board.no boards created')}</Alert>
      )}
    </Container>
  );
}
