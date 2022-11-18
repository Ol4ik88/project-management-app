import React, { useEffect } from 'react';
import { Accordion, Button, Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBoardById, selectBoards } from 'store/boardsSlice';
import { AppDispatch } from 'store/store';

export const BoardTitle = (props: { boardId: string }) => {
  const boardId = props.boardId;
  const {} = useSelector(selectBoards);
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchBoardById({ boardId }));
  }, [boardId, dispatch]);

  return (
    <Container>
      <Row>
        <Col xs={7}>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Имя доски</Accordion.Header>
              <Accordion.Body>Описание доски</Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>

        <Col className="row justify-content-around">
          <Button className="col-5 h-100" variant="primary">
            {t('edit')}
          </Button>

          <Button className="col-5 h-100" variant="primary">
            {t('delete')}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
