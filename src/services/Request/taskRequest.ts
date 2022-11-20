import { ITask } from 'types/Interfaces';
import request from './request';
import { URL } from '../../utils/constants';

const getTasksByBoardId = async (boardId: string, token: string): Promise<ITask[]> => {
  return await request(`${URL}tasksSet/${boardId}`, 'GET', undefined, {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  });
};

const getTasksByColumnId = async (
  boardId: string,
  columnId: string,
  token: string
): Promise<ITask[]> => {
  return await request(`${URL}boards/${boardId}/columns/${columnId}/tasks`, 'GET', undefined, {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  });
};

const getTaskById = async (
  boardId: string,
  columnId: string,
  taskId: string,
  token: string
): Promise<ITask> => {
  return await request(
    `${URL}boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
    'GET',
    undefined,
    {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  );
};

const createTask = async (
  boardId: string,
  columnId: string,
  task: Omit<ITask, '_id' | 'boardId' | 'columnId'>,
  token: string
): Promise<ITask> => {
  return request(`${URL}boards/${boardId}/columns/${columnId}`, 'POST', JSON.stringify(task), {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  });
};

const updateTask = async (
  boardId: string,
  columnId: string,
  taskId: string,
  task: Omit<ITask, '_id' | 'boardId'>,
  token: string
): Promise<ITask> => {
  return await request(
    `${URL}boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
    'PUT',
    JSON.stringify(task),
    {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  );
};

const deleteTask = async (
  boardId: string,
  columnId: string,
  taskId: string,
  token: string
): Promise<ITask> => {
  return await request(
    `${URL}boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
    'DELETE',
    undefined,
    {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  );
};

export default {
  getTasksByColumnId,
  getTasksByBoardId,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
