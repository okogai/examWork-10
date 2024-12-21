import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IComment } from '../../types';
import { fetchComments } from '../thunks/commentsThunk.ts';
import { RootState } from '../../app/store.ts';

interface CommentsState {
  commentsList: IComment[];
  fetchingComments: boolean;
}

const initialState: CommentsState = {
  commentsList: [],
  fetchingComments: false
};

export const selectComments = (state: RootState) => state.comments.commentsList;
export const selectFetchingComments = (state: RootState) => state.comments.fetchingComments;

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.fetchingComments = true;
      })
      .addCase(fetchComments.fulfilled, (state, action: PayloadAction<IComment[]>) => {
        state.fetchingComments = false;
        state.commentsList = action.payload;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.fetchingComments = false;
      });
  }
});

export default commentsSlice.reducer;
