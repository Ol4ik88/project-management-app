import React, { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectBoards, boardsSelectors, removeBoard } from 'store/boardsSlice';
import { Card, Col, Row, Button, ButtonToolbar } from 'react-bootstrap';
import { AppDispatch } from 'store/store';
import { Link } from 'react-router-dom';

export function BoardsList() {
  const dispatch = useDispatch<AppDispatch>();
  const { entities, ids } = useSelector(selectBoards);

  function handleClickDelete(boardId: string, e: MouseEvent) {
    e.preventDefault();
    dispatch(removeBoard({ boardId }));
  }
  function handleClickEdit(boardId: string, e: MouseEvent) {}

  return (
    <Row md={4}>
      {ids.map((id) => (
        <Col key={id}>
          <Link to={`/boards/${id}`}>
            <Card bg="primary" text="white" className="mb-2">
              <Card.Body>
                <Card.Title>{entities[id]?.title} </Card.Title>
                <Card.Text>{'description'}</Card.Text>
                <div className="text-end">
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={(e) => handleClickEdit(String(id), e)}
                  >
                    edit
                  </Button>{' '}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={(e) => handleClickDelete(String(id), e)}
                  >
                    del
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      ))}
    </Row>
  );
}
