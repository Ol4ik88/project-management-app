import { BoardsList } from 'components/boardList/boardsList';
import React, { useEffect } from 'react';
import { Alert, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { boardsSelectors, fetchUserBoards, selectBoards } from 'store/boardsSlice';
import { AppDispatch } from 'store/store';

export function MainPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { error, status } = useSelector(selectBoards);
  const total = useSelector(boardsSelectors.selectTotal);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUserBoards({ userId: '6370ef864ae16c72a73aab15' }));
    }
  }, [dispatch]);

  return (
    <Container>
      {status === 'failed' && <Alert variant={'danger'}>{error}</Alert>}
      {status === 'loading' && <div>Loading...</div>}
      {total > 0 && status !== 'failed' && <BoardsList />}
      {total === 0 && status === 'succeeded' && (
        <Alert variant={'info'}>{t('no boards created')}</Alert>
      )}
    </Container>
  );
}
