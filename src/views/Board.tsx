import { BoardField } from 'components/board/boardField';
import { BoardTitle } from 'components/board/boardTitle';
import React, { useEffect } from 'react';
import { Alert, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectAuth } from 'store/authSlice';
import { boardsSelectors, fetchUserBoards, selectBoards } from 'store/boardsSlice';
import { AppDispatch } from 'store/store';

export function Board() {
  const dispatch = useDispatch<AppDispatch>();
  const { error, status } = useSelector(selectBoards);
  const authState = useSelector(selectAuth);
  const { t } = useTranslation();
  const { boardId } = useParams();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUserBoards({ userId: authState?.auth._id ?? '' }));
    }
  }, [dispatch]);

  return (
    <Container className="mt-5 w-100 h-100">
      {status === 'failed' && (
        <Alert className="text-center" variant={'danger'}>
          {error}
        </Alert>
      )}
      {status === 'loading' && (
        <Alert className="text-center" variant={'info'}>
          {t('board.loading')}
        </Alert>
      )}

      <BoardTitle />
      <BoardField />
    </Container>
  );
}
