import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store/store';
import edit_icon from '../../assets/registaration_icon.svg';
import delete_icon from '../../assets/delete_icon.svg';

export const Task = () => {
  //const {  } = useSelector();
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const title = 'TITLE BOARD';

  return (
    <Card className="shadow">
      <Card.Header as="h5">
        {title}
        <Button variant="light" className="col-3">
          <img width="30" src={edit_icon} alt="edit" />
        </Button>
        <Button variant="light" className="col-3">
          <img width="30" src={delete_icon} alt="delete" />
        </Button>
      </Card.Header>
      <Card.Body>
        <Card.Title>Special title treatment</Card.Title>
        <Card.Text>
          With supporting text below as a natural lead-in to additional content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
};
