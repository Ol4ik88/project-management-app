import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ITask } from 'types/Interfaces';
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
};

type idAndTitle = {
  [key: string]: string;
};

export const TaskInformation = ({ task, userName, columns, boards }: propsType) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();

  const { users, columnId, boardId, _id, userId } = task;

  const infoForRender = {
    title: task.title,
    order: task.order,
    boardTitle: getBoardTitle(boards),
    columnTitle: getColumnTitle(columns),
    description: task.description,
    users: [''],
  };

  const [title, setTitle] = useState(false);
  const [board, setBoard] = useState(false);
  const [column, setColumn] = useState(false);
  const [descript, setDescript] = useState(false);
  const [allUsers, setAllUsers] = useState(false);
  const [taskData, setTaskData] = useState(infoForRender);

  function getBoardTitle(boards: idAndTitle[]) {
    return boards.filter((board) => Object.keys(board)[0] === boardId)[0][boardId];
  }

  function getColumnTitle(columns: idAndTitle[]) {
    return columns.filter((column) => Object.keys(column)[0] === columnId)[0][columnId];
  }

  function resetData() {
    setTaskData(infoForRender);
  }

  function saveData() {
    const { boardTitle, columnTitle, title, order, description } = taskData;
    //const board = boards.filter((board) => Object.values(board)[0] === boardTitle)[0];
    //const newBoardId = Object.keys(board)[0];
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
        {!board ? (
          <div className="h5 d-flex justify-content-between align-items-center">
            {t('task-info.inBoard')} {taskData.boardTitle}
            <Button variant="light" onClick={() => setBoard(true)}>
              <img width="15" src={dots_icon} alt="dots" />
            </Button>
          </div>
        ) : (
          <div className="h5 d-flex justify-content-between align-items-center">
            {t('task-info.inBoard')}
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => setTaskData({ ...taskData, boardTitle: e.target.value })}
            >
              <option disabled> {t('task-info.select')}</option>
              {boards.map((board) => (
                <option key={board.key} value={Object.values(board)}>
                  {Object.values(board)}
                </option>
              ))}
            </select>
            {/* <input type="text" className="form-control" id="inputUser" value={boards[boardId]} /> */}
            <Button variant="light" onClick={() => setBoard(false)}>
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
              <option disabled> {t('task-info.select')}</option>
              {columns.map((column) => (
                <option key={column.key} value={Object.values(column)}>
                  {Object.values(column)}
                </option>
              ))}
            </select>
            <Button variant="light" onClick={() => setColumn(false)}>
              {' '}
              <img width="15" src={yes_icon} alt="yes" />
            </Button>
          </div>
        )}
      </div>

      <div className="border-bottom">
        {!descript ? (
          <div className="h5 d-flex justify-content-between align-items-center">
            <div style={{ wordWrap: 'break-word' }}>
              {t('task-info.description')} {taskData.description}
            </div>

            <Button variant="light" onClick={() => setDescript(true)}>
              <img width="15" src={dots_icon} alt="dots" />
            </Button>
          </div>
        ) : (
          <div className="h5 d-flex justify-content-between align-items-center">
            {t('task-info.description')}
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
            {users.map((user) => (
              <li key={user}>{user}</li>
            ))}
            <Button variant="light" onClick={() => setAllUsers(true)}>
              <img width="15" src={dots_icon} alt="dots" />
            </Button>
          </div>
        ) : (
          <div className="h5 d-flex justify-content-between align-items-center">
            <select className="form-select" aria-label="Default select example">
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
            <Button variant="light" onClick={() => setAllUsers(false)}>
              <img width="15" src={yes_icon} alt="yes" />
            </Button>
          </div>
        )}
      </div>
      {/* (title || user || board || column || descript || allUsers) && */}
      {
        <div className="d-flex justify-end align-items-center">
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
