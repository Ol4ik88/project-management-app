export type JwtPayload = { id: string; login: string; exp: number };

export type UserState = {
  _id?: string;
  login?: string;
  name?: string;
  token?: string;
  exp?: number;
};

export type AuthState = {
  auth: UserState;
  status?: string;
  error?: string | null;
};
export type Task = {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  columnId: string;
  description: string;
  userId: string;
  users: string[];
};

export type Column = {
  _id: string;
  title: string;
  order: number;
  boardId: string;
};

export type Board = {
  _id: string;
  title: string;
  owner: string;
  users: string[];
};

export type BoardsState = {
  ids: string[] | number[];
  entities: {
    [key: string]: Board;
  };
  status?: string;
  error?: string;
};

export type BoardPageState = {
  ids: string[] | number[];
  entities: {
    [key: string]: Board;
  };
  status?: string;
  error?: string;
};

export type ColumnsState = {
  ids: string[];
  entities: {
    [key: string]: Column;
  };
  error?: string;
  statuses: { [key: string]: string };
};

export type TasksState = {
  ids: string[] | number[];
  entities: {
    [key: string]: Task;
  };
  error?: string;
  statuses: { [key: string]: string };
};

export type SignUpProps = {
  name: string;
  login: string;
  password: string;
};

export type UpdateBoardProps = Omit<Board, '_id'> & { boardId: string };
export type UpdateColumnProps = Omit<Column, '_id'> & { columnId: string };
export type UpdateTaskProps = Omit<Task, '_id'> & { taskId: string; newColumnId: string };
