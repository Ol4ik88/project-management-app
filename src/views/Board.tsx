import { BoardField } from 'components/board/boardField';
import { BoardTitle } from 'components/board/boardTitle';
import React from 'react';
import { Alert, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectBoards } from 'store/boardsSlice';

export function Board() {
  const { error, status } = useSelector(selectBoards);
  const { t } = useTranslation();
  const { boardId } = useParams();

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

      <BoardTitle boardId={boardId as string} />
      <BoardField boardId={boardId as string} />
    </Container>
  );
}
