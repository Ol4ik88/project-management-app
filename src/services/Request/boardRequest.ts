import { IBoard, IErrorResponse } from 'types/Interfaces';
import request from './request';
import { URL } from '../../utils/constants';

const getBoards = async (): Promise<IBoard[] | undefined> => {
  return await request(`${URL}boards`, 'GET');
};

const getBoardById = async (boardId: string, token: string): Promise<IBoard | IErrorResponse> => {
  return await request(`${URL}boards/${boardId}`, 'GET', undefined, {
    'Content-type': 'application/json',
    Authorization: `Berear ${token}`,
  });
};

const createBoard = async (board: Omit<IBoard, '_id'>): Promise<IBoard | IErrorResponse> => {
  return request(`${URL}boards`, 'POST', JSON.stringify(board));
};

const updateBoard = async (
  board: Omit<IBoard, '_id'>,
  boardId: string,
  token: string
): Promise<IBoard | IErrorResponse> => {
  return await request(`${URL}boards/${boardId}`, 'PUT', JSON.stringify(board), {
    'Content-type': 'application/json',
    Authorization: `Berear ${token}`,
  });
};

const deleteBoard = async (boardId: string, token: string) => {
  return await request(`${URL}boards/${boardId}`, 'DELETE', undefined, {
    'Content-type': 'application/json',
    Authorization: `Berear ${token}`,
  });
};

const getBoardsSet = async (boardsId: string[]): Promise<IBoard[]> => {
  return await request(`${URL}boardsSet/${boardsId}`, 'GET');
};

const getBoardsSetByUserId = async (userId: string): Promise<IBoard[]> => {
  return await request(`${URL}boardsSet/${userId}`, 'GET');
};

export {
  getBoards,
  getBoardById,
  createBoard,
  updateBoard,
  deleteBoard,
  getBoardsSetByUserId,
  getBoardsSet,
};
