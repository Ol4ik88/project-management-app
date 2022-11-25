import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ITask, IUser } from 'types/Interfaces';
import yes_icon from '../../assets/yes_icon.svg';
import no_icon from '../../assets/no_icon.svg';
import dots_icon from '../../assets/dots_icon.svg';
import { updateTask } from 'store/taskSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store/store';

type propsType = {
  task: ITask;
  userName: string;
  columns: idAndTitle[];
  boards: idAndTitle[];
  usersList: IUser[];
  cancel: () => void;
};

type idAndTitle = {
  [key: string]: string;
};

export const TaskInformation = ({ task, userName, columns, usersList, cancel }: propsType) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const { columnId, boardId, _id, userId } = task;

  const infoForRender = {
    title: task.title,
    order: task.order,
    columnTitle: getColumnTitle(columns),
    description: task.description,
    users: task.users,
  };

  const [title, setTitle] = useState(false);
  const [column, setColumn] = useState(false);
  const [descript, setDescript] = useState(false);
  const [allUsers, setAllUsers] = useState(false);
  const [taskData, setTaskData] = useState(infoForRender);

  function getColumnTitle(columns: idAndTitle[]) {
    return columns.filter((column) => Object.keys(column)[0] === columnId)[0][columnId];
  }

  function resetData() {
    setTaskData(infoForRender);
    cancel();
  }

  function saveData() {
    const { columnTitle, title, order, description, users } = taskData;
    const column = columns.filter((column) => Object.values(column)[0] === columnTitle)[0];
    const newColumnId = Object.keys(column)[0];

    dispatch(
      updateTask({
        boardId,
        columnId,
        taskId: _id,
        title,
        order,
        description,
        newColumnId,
        userId,
        users,
      })
    );

    cancel();
  }

  function idUserInName(users: string[]) {
    return users.map((userId) => {
      return usersList.filter((user) => user._id === userId)[0].name;
    });
  }

  return (
    <>
      <div className="border-bottom h5 pb-2">
        {t('task-info.user')} {userName}
      </div>

      <div className="border-bottom">
        {!title ? (
          <div className="h5 d-flex justify-content-between align-items-center">
            {t('task-info.task')} {taskData.title}
            <Button variant="light" onClick={() => setTitle(true)}>
              <img width="15" src={dots_icon} alt="dots" />
            </Button>
          </div>
        ) : (
          <div className="h5 d-flex justify-content-between align-items-center">
            {t('task-info.task')}
            <input
              type="text"
              className="form-control"
              id="inputTitle"
              value={taskData.title}
              onChange={(e) => {
                setTaskData({ ...taskData, title: e.target.value });
              }}
            />
            <Button variant="light" onClick={() => setTitle(false)}>
              <img width="15" src={yes_icon} alt="yes" />
            </Button>
          </div>
        )}
      </div>

      <div className="border-bottom">
        {!column ? (
          <div className="h5 d-flex justify-content-between align-items-center">
            {t('task-info.inColumn')} {taskData.columnTitle}
            <Button variant="light" onClick={() => setColumn(true)}>
              <img width="15" src={dots_icon} alt="dots" />
            </Button>
          </div>
        ) : (
          <div className="h5 d-flex justify-content-between align-items-center">
            {t('task-info.inColumn')}
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => setTaskData({ ...taskData, columnTitle: e.target.value })}
            >
              <option> {t('task-info.select')}</option>
              {columns.map((column) => (
                <option key={column.key} value={Object.values(column)}>
                  {Object.values(column)}
                </option>
              ))}
            </select>
            <Button variant="light" onClick={() => setColumn(false)}>
              <img width="15" src={yes_icon} alt="yes" />
            </Button>
          </div>
        )}
      </div>

      <div className="border-bottom">
        {!descript ? (
          <div className="h5 d-flex justify-content-between align-items-center">
            <div style={{ wordWrap: 'break-word' }} className="flex-column">
              <div> {t('task-info.description')}</div>
              <div> {taskData.description}</div>
            </div>

            <Button variant="light" onClick={() => setDescript(true)}>
              <img width="15" src={dots_icon} alt="dots" />
            </Button>
          </div>
        ) : (
          <div className="h5 d-flex justify-content-between align-items-center">
            <div> {t('task-info.description')}</div>
            <textarea
              className="form-control"
              id="inputDescript"
              value={taskData.description}
              onChange={(e) => {
                setTaskData({ ...taskData, description: e.target.value });
              }}
            />
            <Button variant="light" onClick={() => setDescript(false)}>
              <img width="15" src={yes_icon} alt="yes" />
            </Button>
          </div>
        )}
      </div>

      <div className="border-bottom">
        {!allUsers ? (
          <div className="h5 d-flex justify-content-between align-items-center">
            {t('task-info.users')}{' '}
            <div>
              {idUserInName(taskData.users).map((user) => (
                <li key={user}>{user}</li>
              ))}
            </div>
            <Button variant="light" onClick={() => setAllUsers(true)}>
              <img width="15" src={dots_icon} alt="dots" />
            </Button>
          </div>
        ) : (
          <div className="h5 d-flex justify-content-between align-items-center">
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={(e) =>
                setTaskData({ ...taskData, users: [...taskData.users, e.target.value] })
              }
            >
              <option> {t('task-info.select')}</option>
              {usersList.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name}
                </option>
              ))}
            </select>
            <Button variant="light" onClick={() => setAllUsers(false)}>
              <img width="15" src={yes_icon} alt="yes" />
            </Button>
          </div>
        )}
      </div>

      {
        <div className="d-flex flex-row-reverse align-items-center gap-2">
          <Button variant="outline-secondary" onClick={saveData}>
            <img width="15" src={yes_icon} alt="yes" />
          </Button>
          <Button variant="outline-secondary" onClick={resetData}>
            <img width="15" src={no_icon} alt="no" />
          </Button>
        </div>
      }
    </>
  );
};
