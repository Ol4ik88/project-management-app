import { BoardField } from 'components/board/boardField';
import { BoardTitle } from 'components/board/boardTitle';
import React, { useEffect } from 'react';
import { Alert, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { boardsSelectors, fetchBoardById, selectBoards } from 'store/boardsSlice';
import { AppDispatch } from 'store/store';
import { useAuthStatus } from 'utils/helpers/authHelper';
import './Board.css';

export function Board() {
  const dispatch = useDispatch<AppDispatch>();
  const { entities, error, status, statuses } = useSelector(selectBoards);
  const { t } = useTranslation();
  const { boardId } = useParams();
  const { isAuth } = useAuthStatus();

  useEffect(() => {
    if (boardId && !statuses[boardId] && status !== 'succeeded' && isAuth()) {
      dispatch(fetchBoardById({ boardId }));
    }
  }, [dispatch]);

  return (
    <>
      {isAuth() && (
        <>
          <Container fluid>
            {status === 'failed' && (
              <Alert className="text-center" variant={'danger'}>
                {error}
              </Alert>
            )}
            {boardId && statuses[boardId] === 'loading' && status !== 'failed' && (
              <Alert className="text-center" variant={'info'}>
                {t('board.loading')}
              </Alert>
            )}
          </Container>
          {boardId && entities[boardId] && status !== 'failed' && (
            <>
              <Container fluid>
                <BoardTitle board={entities[boardId]} />
              </Container>
              <Container fluid className="board">
                <BoardField boardId={boardId as string} />
              </Container>
            </>
          )}
        </>
      )}
    </>
  );
}
