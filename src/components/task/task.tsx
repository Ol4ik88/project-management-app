import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from 'store/store';
import delete_icon from '../../assets/delete_icon.svg';
import { IColumn, ITask } from 'types/Interfaces';
import ModalWindow from 'components/modal/ModalWindow';
import { TaskInformation } from './taskInformation';
import { selectBoards } from 'store/boardsSlice';
import { selectColumns } from 'store/columnSlice';
import { selectAuth } from 'store/authSlice';
import { DeleteWindow } from 'components/modal/DeleteWindow';
import { removeTask } from 'store/taskSlice';
import { selectUsers } from 'store/userSlice';

type idAndTitle = {
  [key: string]: string;
};
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';

export const Task = ({
  task,
  isDragging,
  id,
}: {
  task: ITask;
  isDragging?: boolean;
  id?: string;
}) => {
  const { _id, title, boardId, columnId, userId } = task;
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState(0);
  const [boardsInfo, setBoardsInfo] = useState<idAndTitle[]>([]);
  const [columnsInfo, setColumnsInfo] = useState<idAndTitle[]>([]);

  const modalTitle = isOpen === 1 ? t('task.delete') : t('task-info.task-info');

  const boards = useSelector(selectBoards);
  const columns = useSelector(selectColumns);
  const { auth } = useSelector(selectAuth);
  const { users } = useSelector(selectUsers);

  useEffect(() => {
    const boardsIdAndTitle = boards.ids.map((id) => {
      const title = boards.entities[id].title;
      return { [id]: title };
    });

    const columnsIdAndTitle = columns.ids.map((id: string) => {
      const title = (columns.entities[id] as IColumn).title;
      return { [id]: title };
    });

    setBoardsInfo(boardsIdAndTitle);
    setColumnsInfo(columnsIdAndTitle);
  }, [boards.entities, boards.ids, columns.entities, columns.ids]);

  function deleteTask() {
    setIsOpen(1);
  }

  function infoTask() {
    setIsOpen(2);
  }

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: task._id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : undefined,
  };

  return (
    <div
      className="pb-2"
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      id={id || task._id}
    >
      <Card className="shadow-sm flex-row">
        <Card.Text className="flex-fill mb-0 p-1 btn" onClick={infoTask}>
          {title}
        </Card.Text>
        <Button variant="light" size="sm" className="p-0" onClick={deleteTask}>
          <img width="15" src={delete_icon} alt="delete" />
        </Button>
      </Card>

      <ModalWindow modalTitle={modalTitle} show={isOpen > 0} onHide={() => setIsOpen(0)}>
        {isOpen === 1 ? (
          <DeleteWindow
            cancel={() => setIsOpen(0)}
            remove={() => dispatch(removeTask({ boardId, columnId, taskId: _id }))}
            text={t('task.deleteTask')}
          />
        ) : (
          <TaskInformation
            task={task}
            userName={auth.name || auth.login || userId}
            usersList={users}
            columns={columnsInfo}
            boards={boardsInfo}
            cancel={() => setIsOpen(0)}
          />
        )}
      </ModalWindow>
    </div>
  );
};
