import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectBoards, boardsSelectors, removeBoard } from 'store/boardsSlice';
import { Card, Col, Row, Button, ButtonToolbar } from 'react-bootstrap';
import { AppDispatch } from 'store/store';

export function BoardsList() {
  const dispatch = useDispatch<AppDispatch>();
  const { entities, ids } = useSelector(selectBoards);

  function handleClickDelete(boardId: string) {
    dispatch(removeBoard({ boardId }));
  }
  function handleClickEdit(boardId: string) {}

  return (
    <Row md={4}>
      {ids.map((id) => (
        <Col key={id}>
          <Card bg="primary" text="white" className="mb-2">
            <Card.Body>
              <Card.Title>{entities[id]?.title} </Card.Title>
              <Card.Text>{'description'}</Card.Text>
              <div className="text-end">
                <Button variant="success" size="sm" onClick={() => handleClickEdit(String(id))}>
                  edit
                </Button>{' '}
                <Button variant="danger" size="sm" onClick={() => handleClickDelete(String(id))}>
                  del
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
