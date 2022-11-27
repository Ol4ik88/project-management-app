import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'store/store';
import { Task } from 'components/task/task';
import { fetchTaskByUserId, selectTasks } from 'store/taskSlice';
import { ITask } from 'types/Interfaces';

type propsType = {
  userId: string | undefined;
};

export function UserTasks({ userId }: propsType) {
  const dispatch = useDispatch<AppDispatch>();
  const { entities, ids, error, statuses } = useSelector(selectTasks);
  const { t } = useTranslation();

  console.log(entities, ids);

  useEffect(() => {
    userId && dispatch(fetchTaskByUserId({ userId }));
  }, [dispatch, userId]);

  return (
    <div className="mb-2 text-center shadow" style={{ width: '18rem' }}>
      <div className="h5">{t('user-page.tasks')}</div>
      <div>
        {ids.map((id) => (
          <Task key={id} task={entities[id] as ITask} />
        ))}
      </div>
    </div>
  );
}
