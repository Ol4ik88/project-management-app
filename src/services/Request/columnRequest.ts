import { IColumn } from 'types/Interfaces';
import request from './request';
import { URL } from '../../utils/constants';

const getColumns = async (boardId: string, token: string): Promise<IColumn[]> => {
  return await request(`${URL}boards/${boardId}/columns`, 'GET', undefined, {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  });
};

const getColumnById = async (
  boardId: string,
  columnId: string,
  token: string
): Promise<IColumn> => {
  return await request(`${URL}boards/${boardId}/columns/${columnId}`, 'GET', undefined, {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  });
};

const createColumn = async (
  boardId: string,
  column: Omit<IColumn, '_id' | 'boardId'>,
  token: string
): Promise<IColumn> => {
  return request(`${URL}boards/${boardId}/columns/`, 'POST', JSON.stringify(column), {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  });
};

const updateColumn = async (
  boardId: string,
  columnId: string,
  column: Omit<IColumn, '_id' | 'boardId'>,
  token: string
): Promise<IColumn> => {
  return await request(
    `${URL}boards/${boardId}/columns/${columnId}`,
    'PUT',
    JSON.stringify(column),
    {
      'Content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  );
};

const deleteColumn = async (boardId: string, columnId: string, token: string): Promise<IColumn> => {
  return await request(`${URL}boards/${boardId}/columns/${columnId}`, 'DELETE', undefined, {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  });
};

const changeColumnsOrders = async (
  orderedList: Pick<IColumn, '_id' | 'order'>[],
  token: string
): Promise<IColumn[]> => {
  return await request(`${URL}columnsSet`, 'PATCH', JSON.stringify(orderedList), {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  });
};

export default {
  getColumns,
  getColumnById,
  createColumn,
  updateColumn,
  deleteColumn,
  changeColumnsOrders,
};
