import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  createEntityAdapter,
  AnyAction,
  createSelector,
} from '@reduxjs/toolkit';
import taskRequest from 'services/Request/taskRequest';
import { RootState, store } from './store';
import { Task, TasksState, UpdateTaskProps } from './types';

function isRejectedAction(action: AnyAction) {
  return action.type.startsWith('tasks/') && action.type.endsWith('rejected');
}
function isPendingAction(action: AnyAction) {
  return action.type.startsWith('tasks/') && action.type.endsWith('/pending');
}

const tasksAdapter = createEntityAdapter<Task>({
  selectId: (task) => task._id,
  sortComparer: (a, b) => a.order - b.order,
});

const initialState = tasksAdapter.getInitialState<TasksState>({
  error: '',
  ids: [],
  entities: {},
  statuses: {},
});

export const fetchTasksByBoardId = createAsyncThunk<
  Task[],
  { boardId: string },
  { state: RootState }
>('tasks/fetchTasksByBoardId', async ({ boardId }, thunkAPI) => {
  const token = thunkAPI.getState().auth.auth.token ?? '';
  const response = await taskRequest.getTasksByBoardId(boardId, token);

  return response;
});

export const fetchTasksByColumnId = createAsyncThunk<
  Task[],
  { boardId: string; columnId: string },
  { state: RootState }
>('tasks/fetchTasksByColumnId', async ({ boardId, columnId }, thunkAPI) => {
  const token = thunkAPI.getState().auth.auth.token ?? '';
  const response = await taskRequest.getTasksByColumnId(boardId, columnId, token);

  return response;
});

export const fetchTaskById = createAsyncThunk<
  Task,
  { boardId: string; columnId: string; taskId: string },
  { state: RootState }
>('tasks/fetchTaskById', async ({ boardId, columnId, taskId }, thunkAPI) => {
  const token = thunkAPI.getState().auth.auth.token ?? '';
  const response = await taskRequest.getTaskById(boardId, columnId, taskId, token);
  return response;
});

export const createTask = createAsyncThunk<Task, Omit<Task, '_id'>, { state: RootState }>(
  'tasks/createTask',
  async ({ boardId, columnId, title, order, description, userId, users }, thunkAPI) => {
    const token = thunkAPI.getState().auth.auth.token ?? '';
    const response = await taskRequest.createTask(
      boardId,
      columnId,
      { title, order, description, userId, users },
      token
    );

    return response;
  }
);
export const updateTask = createAsyncThunk<Task, UpdateTaskProps, { state: RootState }>(
  'tasks/updateTask',
  async (
    { boardId, columnId, taskId, title, order, description, newColumnId, userId, users },
    thunkAPI
  ) => {
    const token = thunkAPI.getState().auth.auth.token ?? '';
    const response = await taskRequest.updateTask(
      boardId,
      columnId,
      taskId,
      { title, order, description, columnId: newColumnId, userId, users },
      token
    );
    return response;
  }
);

export const removeTask = createAsyncThunk<
  Task,
  { boardId: string; columnId: string; taskId: string },
  { state: RootState }
>('tasks/removeTask', async ({ boardId, columnId, taskId }, thunkAPI) => {
  const token = thunkAPI.getState().auth.auth.token ?? '';
  const response = await taskRequest.deleteTask(boardId, columnId, taskId, token);
  return response;
});

export const changeTasksOrders = createAsyncThunk<
  Task[],
  Pick<Task, '_id' | 'order' | 'columnId'>[],
  { state: RootState }
>('columns/changeTasksOrders', async (orderedList, thunkAPI) => {
  const token = thunkAPI.getState().auth.auth.token ?? '';
  const response = await taskRequest.changeTasksOrders(orderedList, token);
  return response;
});

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasksOrder(state, action) {
      tasksAdapter.upsertMany(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasksByBoardId.fulfilled, (state, action) => {
        tasksAdapter.upsertMany(state, action.payload);
        state.statuses[action.meta.arg.boardId] = 'succeeded';
      })
      .addCase(fetchTasksByColumnId.fulfilled, (state, action) => {
        tasksAdapter.upsertMany(state, action.payload);
        state.statuses[action.meta.arg.boardId] = 'succeeded';
      })
      .addCase(fetchTaskById.fulfilled, (state, action) => {
        tasksAdapter.upsertOne(state, action.payload);
        state.statuses[action.meta.arg.boardId] = 'succeeded';
      })
      .addCase(createTask.fulfilled, (state, action) => {
        tasksAdapter.upsertOne(state, action.payload);
        state.statuses[action.meta.arg.boardId] = 'succeeded';
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const { _id, ...changes } = action.payload;
        tasksAdapter.updateOne(state, { id: _id, changes });
        state.statuses[action.meta.arg.boardId] = 'succeeded';
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        const { _id, ...changes } = action.payload;
        tasksAdapter.removeOne(state, _id);
        state.statuses[action.meta.arg.boardId] = 'succeeded';
      })
      .addMatcher(isPendingAction, (state, action) => {
        state.statuses[action.meta.arg.boardId] = 'loading';
      })
      .addMatcher(isRejectedAction, (state, action) => {
        state.error = action.error.message ?? '';
        state.statuses[action.meta.arg.boardId] = 'failed';
      });
  },
});

export const { setTasksOrder } = tasksSlice.actions;

export const selectTasks = (state: RootState) => state.tasks;

export const tasksSelectors = tasksAdapter.getSelectors<RootState>((state) => state.tasks);

export const selectTasksByBoardId = (boardId: string) =>
  createSelector(tasksSelectors.selectIds, tasksSelectors.selectEntities, (ids, entites) =>
    ids.filter((id) => entites[id]?.boardId === boardId)
  );

export const selectTasksByColumnId = (columnId: string) =>
  createSelector(tasksSelectors.selectIds, tasksSelectors.selectEntities, (ids, entites) =>
    ids.filter((id) => entites[id]?.columnId === columnId)
  );

export default tasksSlice.reducer;
