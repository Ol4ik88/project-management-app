import { IErrorResponse, IUser, IUserDto } from 'types/Interfaces';
import request from './request';
import { URL } from '../../utils/constants';

const userSignIn = async (user: Omit<IUserDto, 'name'>): Promise<string> => {
  const res: { token: string } = await request(`${URL}auth/signin`, 'POST', JSON.stringify(user));

  return res.token;
};

const userSignUp = async (user: IUserDto): Promise<IUser> => {
  return request(`${URL}auth/signup`, 'POST', JSON.stringify(user));
};

export default { userSignIn, userSignUp };
