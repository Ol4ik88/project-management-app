import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
  AnyAction,
  createSelector,
} from '@reduxjs/toolkit';
import columnRequest from 'services/Request/columnRequest';
import { RootState } from './store';
import { Column, ColumnsState, UpdateColumnProps } from './types';

function isRejectedAction(action: AnyAction) {
  return action.type.endsWith('rejected');
}
function isPendingAction(action: AnyAction) {
  return action.type.startsWith('columns/') && action.type.endsWith('/pending');
}

const columnsAdapter = createEntityAdapter<Column>({
  selectId: (column) => column._id,
  sortComparer: (a, b) => a.order - b.order,
});

const initialState = columnsAdapter.getInitialState<ColumnsState>({
  error: '',
  ids: [],
  entities: {},
  statuses: {},
});

export const fetchColumns = createAsyncThunk<Column[], { boardId: string }, { state: RootState }>(
  'columns/fetchColumns',
  async ({ boardId }, thunkAPI) => {
    const token = thunkAPI.getState().auth.auth.token ?? '';
    const response = await columnRequest.getColumns(boardId, token);

    return response;
  }
);

export const fetchColumnById = createAsyncThunk<
  Column,
  { boardId: string; columnId: string },
  { state: RootState }
>('columns/fetchColumnById', async ({ boardId, columnId }, thunkAPI) => {
  const token = thunkAPI.getState().auth.auth.token ?? '';
  const response = await columnRequest.getColumnById(boardId, columnId, token);
  return response;
});

export const createColumn = createAsyncThunk<Column, Omit<Column, '_id'>, { state: RootState }>(
  'columns/createColumn',
  async ({ boardId, title, order }, thunkAPI) => {
    const token = thunkAPI.getState().auth.auth.token ?? '';
    const response = await columnRequest.createColumn(boardId, { title, order }, token);

    return response;
  }
);
export const updateColumn = createAsyncThunk<Column, UpdateColumnProps, { state: RootState }>(
  'columns/updateColumn',
  async ({ boardId, columnId, title, order }, thunkAPI) => {
    const token = thunkAPI.getState().auth.auth.token ?? '';
    const response = await columnRequest.updateColumn(boardId, columnId, { title, order }, token);
    return response;
  }
);

export const removeColumn = createAsyncThunk<
  Column,
  { boardId: string; columnId: string },
  { state: RootState }
>('columns/removeColumn', async ({ boardId, columnId }, thunkAPI) => {
  const token = thunkAPI.getState().auth.auth.token ?? '';
  const response = await columnRequest.deleteColumn(boardId, columnId, token);
  return response;
});

export const changeColumnsOrders = createAsyncThunk<
  Column[],
  Pick<Column, '_id' | 'order'>[],
  { state: RootState }
>('columns/changeColumnsOrders', async (orderedList, thunkAPI) => {
  const token = thunkAPI.getState().auth.auth.token ?? '';
  const response = await columnRequest.changeColumnsOrders(orderedList, token);
  return response;
});

export const columnsSlice = createSlice({
  name: 'columns',
  initialState,
  reducers: {
    setColumnsOrder(state, action) {
      columnsAdapter.upsertMany(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchColumns.fulfilled, (state, action) => {
        columnsAdapter.upsertMany(state, action.payload);
        state.statuses[action.meta.arg.boardId] = 'succeeded';
      })
      .addCase(fetchColumnById.fulfilled, (state, action) => {
        columnsAdapter.upsertOne(state, action.payload);
        state.statuses[action.meta.arg.boardId] = 'succeeded';
      })
      .addCase(createColumn.fulfilled, (state, action) => {
        columnsAdapter.upsertOne(state, action.payload);
        state.statuses[action.meta.arg.boardId] = 'succeeded';
      })
      .addCase(updateColumn.fulfilled, (state, action) => {
        const { _id, ...changes } = action.payload;
        columnsAdapter.updateOne(state, { id: _id, changes });
        state.statuses[action.meta.arg.boardId] = 'succeeded';
      })
      .addCase(removeColumn.fulfilled, (state, action) => {
        const { _id, ...changes } = action.payload;
        columnsAdapter.removeOne(state, _id);
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

export const { setColumnsOrder } = columnsSlice.actions;
export const selectColumns = (state: RootState) => state.columns;

export const columnsSelectors = columnsAdapter.getSelectors<RootState>((state) => state.columns);

export const selectColumnsByBoardId = (boardId: string) =>
  createSelector(columnsSelectors.selectIds, columnsSelectors.selectEntities, (ids, entites) =>
    ids.filter((id) => entites[id]?.boardId === boardId)
  );

export default columnsSlice.reducer;
