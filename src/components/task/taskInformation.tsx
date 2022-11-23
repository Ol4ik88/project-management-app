import React from 'react';
import { useTranslation } from 'react-i18next';
import { ITask } from 'types/Interfaces';

export const TaskInformation = (props: {
  task: ITask;
  userName: string;
  columnTitle: string;
  boardTitle: string;
}) => {
  const { description, users } = props.task;
  const { userName, columnTitle, boardTitle } = props;
  const { t } = useTranslation();

  return (
    <>
      <div className="border-bottom h5">
        {t('user')} {userName}
      </div>
      <div className="border-bottom h5">
        {t('inBoard')} {boardTitle}
      </div>
      <div className="border-bottom h5">
        {t('inColumn')} {columnTitle}
      </div>
      <div className="border-bottom h5">
        {t('description')} {description}
      </div>

      <div className="border-bottom h5">
        {t('users')}{' '}
        {users.map((user) => (
          <li key={user}>{user}</li>
        ))}
      </div>
    </>
  );
};
