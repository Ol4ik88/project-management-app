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
        {t('task-info.user')} {userName}
      </div>
      <div className="border-bottom h5">
        {t('task-info.inBoard')} {boardTitle}
      </div>
      <div className="border-bottom h5">
        {t('task-info.inColumn')} {columnTitle}
      </div>
      <div className="border-bottom h5">
        {t('task-info.description')} {description}
      </div>

      <div className="border-bottom h5">
        {t('task-info.users')}{' '}
        {users.map((user) => (
          <li key={user}>{user}</li>
        ))}
      </div>
    </>
  );
};
