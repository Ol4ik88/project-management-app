import { IErrorResponse, IUser, IUserDto } from 'types/Interfaces';
import request from './request';
import { URL } from '../../utils/constants';

const getUsers = async (token: string): Promise<IUser[]> => {
  return await request(`${URL}users`, 'GET', undefined, {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  });
};

const getUserById = async (userId: string, token: string): Promise<IUser | IErrorResponse> => {
  return await request(`${URL}users/${userId}`, 'GET', undefined, {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  });
};

const updateUser = async (userId: string, newUser: IUserDto, token: string): Promise<IUser> => {
  return await request(`${URL}users/${userId}`, 'PUT', JSON.stringify(newUser), {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  });
};

const deleteUser = async (userId: string, token: string): Promise<IUser> => {
  return await request(`${URL}users/${userId}`, 'DELETE', undefined, {
    'Content-type': 'application/json',
    Authorization: `Bearer ${token}`,
  });
};

export default { getUsers, getUserById, updateUser, deleteUser };
