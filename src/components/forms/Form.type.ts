export interface IPropsCreateColumnForm {
  boardId: string;
  order?: number;
  onClose: () => void;
}

export interface IPropsCreateTaskForm {
  boardId: string;
  columnId: string;
  onClose: () => void;
}

export interface IPropsCreateBoardForm {
  onClose: () => void;
  showToast: () => void;
}
