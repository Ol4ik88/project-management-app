import { IBoard, IErrorResponse } from 'types/Interfaces';
import request from './request';
import { URL } from '../../utils/constants';

const getBoards = async (token: string): Promise<IBoard[] | []> => {
  return await request(`${URL}boards`, 'GET', undefined, {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  });
};

const getBoardById = async (boardId: string, token: string): Promise<IBoard | IErrorResponse> => {
  return await request(`${URL}boards/${boardId}`, 'GET', undefined, {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  });
};

const createBoard = async (
  board: Omit<IBoard, '_id'>,
  token: string
): Promise<IBoard | IErrorResponse> => {
  return request(`${URL}boards`, 'POST', JSON.stringify(board), {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  });
};

const updateBoard = async (
  board: Omit<IBoard, '_id'>,
  boardId: string,
  token: string
): Promise<IBoard | IErrorResponse> => {
  return await request(`${URL}boards/${boardId}`, 'PUT', JSON.stringify(board), {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  });
};

const deleteBoard = async (boardId: string, token: string): Promise<IBoard> => {
  return await request(`${URL}boards/${boardId}`, 'DELETE', undefined, {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  });
};

const getBoardsSet = async (boardsId: string[], token: string): Promise<IBoard[]> => {
  return await request(`${URL}boardsSet/${boardsId}`, 'GET', undefined, {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  });
};

const getBoardsSetByUserId = async (userId: string, token: string): Promise<IBoard[]> => {
  return await request(`${URL}boardsSet/${userId}`, 'GET', undefined, {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  });
};

export default {
  getBoards,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard,
  getBoardsSetByUserId,
  getBoardsSet,
};
