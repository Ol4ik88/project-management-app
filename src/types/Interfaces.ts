export interface IUser {
  _id: string;
  name: string;
  login: string;
}

export interface IBoard {
  _id: string;
  title: string;
  owner: string;
  users: string[];
}

export interface IColumn {
  _id: string;
  title: string;
  order: number;
  boardId: string;
}

export interface ITask {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  columnId: string;
  description: string;
  userId: number;
  users: string[];
}

export interface IErrorResponse {
  statusCode: number;
  message: string;
}
