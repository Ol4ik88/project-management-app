//import { NewUser } from '../types/User';
import { IErrorResponse, IUser, IUserDto } from 'types/Interfaces';
import request from './request';
//import { DataForUserWord } from '../types/UserWordOptions';

//const base = 'http://localhost:8001/'; // локальный сервер
const base = 'https://kanban-api-6ca8.onrender.com/'; // сервер

const userSignIn = async (
  user: Omit<IUserDto, 'name'>
): Promise<{ token: string } | IErrorResponse> => {
  return request(`${base}auth/signin`, 'POST', JSON.stringify(user));
};

const userSignUp = async (user: IUserDto): Promise<IUser> => {
  return request(`${base}auth/signup`, 'POST', JSON.stringify(user));
};

const getUsers = async (): Promise<IUser[] | undefined> => {
  return await request(`${base}users`, 'GET');
};

const getUserById = async (userId: string): Promise<IUser | IErrorResponse> => {
  return await request(`${base}users/${userId}`, 'GET');
};

const updateUser = async (userId: string, newUser: IUserDto): Promise<IUser | IErrorResponse> => {
  return await request(`${base}users/${userId}`, 'PUT', JSON.stringify(newUser));
};

const deleteUser = async (userId: string) => {
  return await request(`${base}users/${userId}`, 'DELETE');
};

// const getBoards = async (group = 0, page = 0) => {
//   const res = await request(`${base}words?group=${group}&page=${page}`);
//   return res;
// };

// const getBoardById = async (id: string, token: string) => {
//   const res = await request(`${base}users/${id}`, 'GET', null, {
//     'Content-type': 'application/json',
//     Authorization: `Berear ${token}`,
//   });
//   return res;
// };

// const createBoard = async (user: NewUser) => {
//   return request(`${base}users`, 'POST', JSON.stringify(user));
// };

// const updateBoard = async (
//   id: string,
//   email: string,
//   password: string,
//   token: string,
//   name: string
// ) => {
//   await request(`${base}users/${id}`, 'PUT', JSON.stringify({ email, password, name }), {
//     'Content-type': 'application/json',
//     Authorization: `Berear ${token}`,
//   }); // Поменять логику запроса, когда дело дойдет до реализации функционала
// };

// const deleteBoard = async (id: string, token: string) => {
//   await request(`${base}users/${id}`, 'DELETE', null, {
//     'Content-type': 'application/json',
//     Authorization: `Berear ${token}`,
//   });
// };

// const getBoardsSet = async (group = 0, page = 0) => {
//   const res = await request(`${base}words?group=${group}&page=${page}`);
//   return res;
// };

// const getBoardsSetByUserId = async (group = 0, page = 0) => {
//   const res = await request(`${base}words?group=${group}&page=${page}`);
//   return res;
// };

export { userSignIn, userSignUp, getUsers, getUserById, updateUser, deleteUser };
