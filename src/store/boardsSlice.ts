import { createAsyncThunk, createSlice, createEntityAdapter, AnyAction } from '@reduxjs/toolkit';
import boardRequest from 'services/Request/boardRequest';
import { signOut } from './authSlice';
import { RootState } from './store';
import { Board, BoardsState, UpdateBoardProps } from './types';

function isRejectedAction(action: AnyAction) {
  return action.type.startsWith('boards/') && action.type.endsWith('rejected');
}
function isPendingAction(action: AnyAction) {
  return action.type.startsWith('boards/') && action.type.endsWith('/pending');
}

const boardsAdapter = createEntityAdapter<Board>({
  selectId: (board) => board._id,
});

const initialState = boardsAdapter.getInitialState<BoardsState>({
  status: 'idle',
  error: '',
  ids: [],
  entities: {},
  statuses: {},
  allBoardLoaded: false,
});

export const fetchUserBoards = createAsyncThunk<Board[], { userId: string }, { state: RootState }>(
  'boards/fetchUserBoards',
  async ({ userId }, thunkAPI) => {
    const token = thunkAPI.getState().auth.auth.token ?? '';
    const response = await boardRequest.getBoardsSetByUserId(userId, token);

    return response;
  }
);

export const fetchBoardById = createAsyncThunk<Board, { boardId: string }, { state: RootState }>(
  'boards/fetchBoardById',
  async ({ boardId }, thunkAPI) => {
    const token = thunkAPI.getState().auth.auth.token ?? '';

    return await boardRequest.getBoardById(boardId, token);
  }
);

export const createBoard = createAsyncThunk<Board, Omit<Board, '_id'>, { state: RootState }>(
  'boards/createBoard',
  async ({ title, description, owner, users }, thunkAPI) => {
    const token = thunkAPI.getState().auth.auth.token ?? '';
    const response = await boardRequest.createBoard({ owner, title, description, users }, token);

    return response;
  }
);
export const updateBoard = createAsyncThunk<Board, UpdateBoardProps, { state: RootState }>(
  'boards/updateBoard',
  async ({ boardId, title, description, owner, users }, thunkAPI) => {
    const token = thunkAPI.getState().auth.auth.token ?? '';
    const response = await boardRequest.updateBoard(
      boardId,
      { title, description, users, owner },
      token
    );

    return response;
  }
);

export const removeBoard = createAsyncThunk<Board, { boardId: string }, { state: RootState }>(
  'boards/removeBoard',
  async ({ boardId }, thunkAPI) => {
    const token = thunkAPI.getState().auth.auth.token ?? '';
    const response = await boardRequest.deleteBoard(boardId, token);
    return response;
  }
);

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    resetBoards(state) {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserBoards.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allBoardLoaded = true;
        boardsAdapter.upsertMany(state, action.payload);
      })
      .addCase(fetchBoardById.fulfilled, (state, action) => {
        state.statuses[action.meta.arg.boardId] = 'succeeded';
        boardsAdapter.upsertOne(state, action.payload);
      })
      .addCase(createBoard.fulfilled, (state, action) => {
        state.status = 'succeeded';
        boardsAdapter.upsertOne(state, action.payload);
      })
      .addCase(updateBoard.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { _id, ...changes } = action.payload;
        boardsAdapter.updateOne(state, { id: _id, changes });
      })
      .addCase(removeBoard.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { _id, ...changes } = action.payload;
        boardsAdapter.removeOne(state, _id);
      })
      .addCase(signOut.type, (state, action) => {
        boardsSlice.caseReducers.resetBoards(state);
      })
      .addMatcher(isPendingAction, (state, action) => {
        if (action.type !== 'boards/fetchBoardById/pending') {
          state.status = 'loading';
        } else {
          state.statuses[action.meta.arg.boardId] = 'loading';
        }
      })
      .addMatcher(isRejectedAction, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? '';
      });
  },
});

export const {} = boardsSlice.actions;

export const selectBoards = (state: RootState): BoardsState => state.boards;

export const boardsSelectors = boardsAdapter.getSelectors<RootState>((state) => state.boards);

export default boardsSlice.reducer;

export const { resetBoards } = boardsSlice.actions;
