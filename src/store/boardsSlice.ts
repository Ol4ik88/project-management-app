import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  createEntityAdapter,
  AnyAction,
} from '@reduxjs/toolkit';
import { RootState } from './store';
import { Board, BoardsState } from './types';
// type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;
function isRejectedAction(action: AnyAction) {
  return action.type.endsWith('rejected');
}
function isPendingAction(action: AnyAction) {
  return action.type.endsWith('/pending');
}

const boardsAdapter = createEntityAdapter<Board>({
  selectId: (board) => board._id,
});

const initialState = boardsAdapter.getInitialState<BoardsState>({
  status: 'idle',
  error: null,
  ids: [],
  entities: {},
});

export const fetchUserBoards = createAsyncThunk(
  'boards/fetchUserBoards',
  async ({ userId }: { userId: string }, thunkAPI) => {
    // const response = await api.getBoardsByUserId();
    return [{ _id: 'boardId', title: 'boardTitle', owner: 'ownerId', users: [] }];
  }
);

export const fetchBoardById = createAsyncThunk(
  'boards/fetchBoardById',
  async ({ boardId }: { boardId: string }, thunkAPI) => {
    // const response = await api.getBoardsByUserId();
    return { _id: 'boardId', title: 'boardTitle', owner: 'ownerId', users: [] };
  }
);
export const createBoard = createAsyncThunk(
  'boards/createBoard',
  async ({ title, owner, users }: { title: string; owner: string; users: string[] }, thunkAPI) => {
    // const response = await api.createBoard();
    return { _id: 'boardId', title: 'boardTitle', owner: 'ownerId', users: [] };
  }
);
export const updateBoard = createAsyncThunk(
  'boards/updateBoard',
  async ({ boardId }: { boardId: string }, thunkAPI) => {
    // const response = await api.updateBoard();
    return { _id: 'boardId', title: 'boardTitle', owner: 'ownerId', users: [] };
  }
);

export const removeBoard = createAsyncThunk(
  'boards/removeBoard',
  async ({ boardId }: { boardId: string }, thunkAPI) => {
    // const response = await api.removeBoard();
    return { _id: 'boardId', title: 'boardTitle', owner: 'ownerId', users: [] };
  }
);

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserBoards.fulfilled, (state, action) => {
        state.status = 'idle';
        boardsAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchBoardById.fulfilled, (state, action) => {
        state.status = 'idle';
        boardsAdapter.upsertOne(state, action.payload);
      })
      .addCase(createBoard.fulfilled, (state, action) => {
        state.status = 'idle';
        boardsAdapter.upsertOne(state, action.payload);
      })
      .addCase(updateBoard.fulfilled, (state, action) => {
        state.status = 'idle';
        const { _id, ...changes } = action.payload;
        boardsAdapter.updateOne(state, { id: _id, changes });
      })
      .addCase(removeBoard.fulfilled, (state, action) => {
        state.status = 'idle';
        const { _id, ...changes } = action.payload;
        boardsAdapter.removeOne(state, action.payload._id);
      })
      .addMatcher(isPendingAction, (state, action) => {
        state.status = 'loading';
      })
      .addMatcher(isRejectedAction, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? '';
      });
  },
});

export const {} = boardsSlice.actions;

export const selectBoards = (state: RootState) => state.boards;

export default boardsSlice.reducer;
