import { BoardsList } from 'components/boardList/BoardsList';
import React, { useEffect } from 'react';
import { Alert, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuth } from 'store/authSlice';
import { boardsSelectors, fetchUserBoards, selectBoards } from 'store/boardsSlice';
import { AppDispatch } from 'store/store';
import { useAuthStatus } from 'utils/helpers/authHelper';
import Loading from 'components/layout/loading/Loading';

export function Boards() {
  const dispatch = useDispatch<AppDispatch>();
  const { error, status, allBoardLoaded } = useSelector(selectBoards);
  const authState = useSelector(selectAuth);
  const total = useSelector(boardsSelectors.selectTotal);
  const { t } = useTranslation();
  const { isAuth } = useAuthStatus();

  useEffect(() => {
    if (!allBoardLoaded && status !== 'loading' && isAuth()) {
      dispatch(fetchUserBoards({ userId: authState?.auth._id ?? '' }));
    }
  }, [dispatch, status]);

  return (
    <Container className="mt-5">
      {status === 'failed' && <Alert variant={'danger'}>{error}</Alert>}
      {status === 'loading' && <Loading />}
      {total > 0 && status !== 'failed' && <BoardsList />}
      {total === 0 && status === 'succeeded' && (
        <Alert variant={'info'}>{t('board.no boards created')}</Alert>
      )}
    </Container>
  );
}
