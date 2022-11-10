export interface IUser {
  id: string;
  name: string;
  login: string;
}

export interface IBoard {
  id: string;
  title: string;
  owner: string;
  users: string[];
}

export interface IColumn {
  id: string;
  title: string;
  order: number;
  boardId: string;
}

export interface ITask {
  id: string;
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
