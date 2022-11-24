import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ITask } from 'types/Interfaces';

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
  const { description, users, columnId, boardId } = task;

  const { t } = useTranslation();

  const [title, setTitle] = useState(false);
  const [user, setUser] = useState(false);
  const [board, setBoard] = useState(false);
  const [column, setColumn] = useState(false);
  const [descript, setDescript] = useState(false);
  const [allUsers, setAllUsers] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const boardTitle = boards.filter((board) => Object.keys(board)[0] === boardId)[0].title;
  const columnTitle = columns.filter((column) => Object.keys(column)[0] === columnId)[0].title;

  useEffect(() => {
    setIsEdit(true);
  }, [title, user, board, column, descript, allUsers]);

  return (
    <>
      <div className="border-bottom">
        {!title ? (
          <div className="h5 d-flex justify-content-between align-items-center">
            {t('task-info.task')} {task.title}
            <Button variant="light" onClick={() => setTitle(true)}>
              ...
            </Button>
          </div>
        ) : (
          <div className="h5 d-flex justify-content-between align-items-center">
            <input type="text" className="form-control" id="inputTitle" value={task.title} />
            <Button onClick={() => setTitle(true)}>...</Button>
            <Button onClick={() => setTitle(true)}>...</Button>
          </div>
        )}
      </div>

      <div className="border-bottom">
        {!user ? (
          <div className="h5 d-flex justify-content-between align-items-center">
            {t('task-info.user')} {userName}
            <Button variant="light" onClick={() => setUser(true)}>
              ...
            </Button>
          </div>
        ) : (
          <div className="h5 d-flex justify-content-between align-items-center">
            <input type="text" className="form-control" id="inputUser" value={userName} />
            <Button onClick={() => setUser(true)}>...</Button>
            <Button onClick={() => setUser(true)}>...</Button>
          </div>
        )}
      </div>

      <div className="border-bottom">
        {!board ? (
          <div className="h5 d-flex justify-content-between align-items-center">
            {t('task-info.inBoard')} {boardTitle}
            <Button variant="light" onClick={() => setBoard(true)}>
              ...
            </Button>
          </div>
        ) : (
          <div className="h5 d-flex justify-content-between align-items-center">
            <select className="form-select" aria-label="Default select example">
              {boards.map((board) => (
                <option key={board.key} value={Object.keys(board)}>
                  {Object.values(board)}
                </option>
              ))}
            </select>
            {/* <input type="text" className="form-control" id="inputUser" value={boards[boardId]} /> */}
            <Button onClick={() => setUser(true)}>...</Button>
            <Button onClick={() => setUser(true)}>...</Button>
          </div>
        )}
      </div>

      <div className="border-bottom">
        {!column ? (
          <div className="h5 d-flex justify-content-between align-items-center">
            {t('task-info.inColumn')} {columnTitle}
            <Button variant="light" onClick={() => setColumn(true)}>
              ...
            </Button>
          </div>
        ) : (
          <div className="h5 d-flex justify-content-between align-items-center">
            <select className="form-select" aria-label="Default select example">
              {columns.map((column) => (
                <option key={column.key} value={Object.keys(column)}>
                  {Object.values(column)}
                </option>
              ))}
            </select>
            <Button onClick={() => setColumn(true)}>...</Button>
            <Button onClick={() => setColumn(true)}>...</Button>
          </div>
        )}
      </div>

      <div className="border-bottom">
        {!descript ? (
          <div className="h5 d-flex justify-content-between align-items-center">
            {t('task-info.description')} {description}
            <Button variant="light" onClick={() => setDescript(true)}>
              ...
            </Button>
          </div>
        ) : (
          <div className="h5 d-flex justify-content-between align-items-center">
            <input type="text" className="form-control" id="inputDescript" value={description} />
            <Button onClick={() => setUser(true)}>...</Button>
            <Button onClick={() => setUser(true)}>...</Button>
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
              ...
            </Button>
          </div>
        ) : (
          <div className="h5 d-flex justify-content-between align-items-center">
            <select className="form-select" aria-label="Default select example">
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
            <Button onClick={() => setUser(true)}>...</Button>
            <Button onClick={() => setUser(true)}>...</Button>
          </div>
        )}
      </div>
      {(title || user || board || column || descript || allUsers) && (
        <div className="d-flex justify-end align-items-center">
          <Button onClick={() => setUser(true)}>...</Button>
          <Button onClick={() => setUser(true)}>...</Button>
        </div>
      )}
    </>
  );
};
