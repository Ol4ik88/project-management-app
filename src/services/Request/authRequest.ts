import { IErrorResponse, IUser, IUserDto } from 'types/Interfaces';
import request from './request';
import { URL } from '../../utils/constants';

const userSignIn = async (
  user: Omit<IUserDto, 'name'>
): Promise<{ token: string } | IErrorResponse> => {
  return request(`${URL}auth/signin`, 'POST', JSON.stringify(user));
};

const userSignUp = async (user: IUserDto): Promise<IUser> => {
  return request(`${URL}auth/signup`, 'POST', JSON.stringify(user));
};

export { userSignIn, userSignUp };
