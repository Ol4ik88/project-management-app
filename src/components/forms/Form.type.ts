export interface IPropsCreateColumnForm {
  boardId: string;
  onClose: () => void;
}

export interface IPropsCreateTaskForm {
  boardId: string;
  columnId: string;
  onClose: () => void;
}
