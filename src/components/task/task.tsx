import React, { useState } from 'react';
import { Button, Card, Form, OverlayTrigger, Popover } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store/store';
import edit_icon from '../../assets/registaration_icon.svg';
import delete_icon from '../../assets/delete_icon.svg';
import info_icon from '../../assets/info_icon.svg';
import { ITask } from 'types/Interfaces';
import ModalWindow from 'components/modal/ModalWindow';

export const Task = (props: { task: ITask }) => {
  const { _id, title, order, boardId, columnId, description, userId, users } = props.task;
  //const {  } = useSelector();
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState(0);

  const modalTitle = isOpen === 1 ? t('editTask') : t('deleteTask');

  function editTask() {
    setIsOpen(1);
  }

  function deleteTask() {
    setIsOpen(2);
  }

  function infoTask() {}

  return (
    <>
      <Card className="shadow mb-2">
        <Card.Header as="h5" className="d-flex justify-content-between align-items-center">
          <OverlayTrigger
            trigger="click"
            placement="bottom"
            overlay={
              <Popover id={`popover-positioned-$"bottom"`} className="col-12">
                <Popover.Header as="h3">
                  {t('titleBoard')}: {title}
                </Popover.Header>
                <Popover.Body>
                  <p>
                    {t('id')} : {_id}
                  </p>
                  <p>
                    {t('title')} : {title}
                  </p>
                </Popover.Body>
              </Popover>
            }
          >
            <Button variant="muted" className="col-12 ">
              {title}
              {'  '}
              <img width="30" src={info_icon} alt="edit" />
            </Button>
          </OverlayTrigger>
        </Card.Header>

        <Card.Body>
          <Card.Text>{description}</Card.Text>
          <Form.Select aria-label="Default select example">
            {users.map((user) => (
              <option value={user} key={user}>
                {user}
              </option>
            ))}
          </Form.Select>
        </Card.Body>

        <Card.Footer className="d-flex justify-content-between align-items-center">
          <Button variant="light" className="col-3" onClick={editTask}>
            <img width="30" src={edit_icon} alt="edit" />
          </Button>

          <Button variant="light" className="col-3" onClick={deleteTask}>
            <img width="30" src={delete_icon} alt="delete" />
          </Button>
        </Card.Footer>
      </Card>

      {isOpen > 0 && (
        <ModalWindow modalTitle={modalTitle} show={isOpen > 0} onHide={() => setIsOpen(0)}>
          {isOpen === 1 ? <div> Редактирование tasks </div> : <div> Удаление tasks </div>}
        </ModalWindow>
      )}
    </>
  );
};
