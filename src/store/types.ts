export type AuthState = {
  auth: {
    _id?: string;
    login?: string;
    name?: string;
    token?: string;
    exp?: number;
  };
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
  // tasks: {
  //   [key: string]: Task;
  // };
};

export type Board = {
  _id: string;
  title: string;
  owner: string;
  users: string[];
  // columns?: {
  //   [key: string]: Column;
  // };
};

export type BoardsState = {
  ids: string[] | number[];
  entities: {
    [key: string]: Board;
  };
  status?: string;
  error?: string | null;
};

export type BoardPageState = {
  ids: string[] | number[];
  entities: {
    [key: string]: Board;
  };
  status?: string;
  error?: string | null;
};
