import { IErrorResponse, IUser, IUserDto } from 'types/Interfaces';
import request from './request';
import { URL } from '../../utils/constants';

const getUsers = async (): Promise<IUser[] | undefined> => {
  return await request(`${URL}users`, 'GET');
};

const getUserById = async (userId: string): Promise<IUser | IErrorResponse> => {
  return await request(`${URL}users/${userId}`, 'GET');
};

const updateUser = async (userId: string, newUser: IUserDto): Promise<IUser | IErrorResponse> => {
  return await request(`${URL}users/${userId}`, 'PUT', JSON.stringify(newUser));
};

const deleteUser = async (userId: string) => {
  return await request(`${URL}users/${userId}`, 'DELETE');
};

export { getUsers, getUserById, updateUser, deleteUser };
