import React, { useEffect, useState } from 'react';
import { Button, Card, Form, OverlayTrigger, Popover } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store/store';
import edit_icon from '../../assets/registaration_icon.svg';
import delete_icon from '../../assets/delete_icon.svg';
import info_icon from '../../assets/info_icon.svg';
import { ITask } from 'types/Interfaces';
import ModalWindow from 'components/modal/ModalWindow';

export const TaskInformation = (props: { task: ITask }) => {
  const { _id, title, order, boardId, columnId, description, userId, users } = props.task;
  //const {  } = useSelector();
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState(0);

  useEffect(() => {}, []);

  return (
    <>
      <div className="border-bottom">
        {t('user')} {userId}
      </div>
      <div className="border-bottom">
        {t('inBoard')} {boardId}
      </div>
      <div className="border-bottom">
        {t('inColumn')}
        {columnId} 12345
      </div>
      <div className="border-bottom">
        {' '}
        {t('description')} {description}
      </div>

      <div className="border-bottom">
        {t('users')}{' '}
        {users.map((user) => (
          <li key={user}>{user}</li>
        ))}
      </div>
    </>
  );
};
