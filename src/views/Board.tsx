import { BoardField } from 'components/board/boardField';
import { BoardTitle } from 'components/board/boardTitle';
import React, { useEffect } from 'react';
import { Alert, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { boardsSelectors, fetchBoardById, selectBoards } from 'store/boardsSlice';
import { AppDispatch } from 'store/store';
import './Board.css';

export function Board() {
  const dispatch = useDispatch<AppDispatch>();
  const { entities, error, status, statuses } = useSelector(selectBoards);
  const { t } = useTranslation();
  const { boardId } = useParams();

  useEffect(() => {
    if (boardId && !statuses[boardId] && status !== 'succeeded') {
      dispatch(fetchBoardById({ boardId }));
    }
  }, [dispatch]);

  return (
    <>
      <Container fluid>
        {status === 'failed' && (
          <Alert className="text-center" variant={'danger'}>
            {error}
          </Alert>
        )}
        {boardId && statuses[boardId] === 'loading' && (
          <Alert className="text-center" variant={'info'}>
            {t('board.loading')}
          </Alert>
        )}

        {boardId && entities[boardId] && <BoardTitle board={entities[boardId]} />}
      </Container>
      <Container fluid className="board">
        {boardId && <BoardField boardId={boardId as string} />}
      </Container>
    </>
  );
}
