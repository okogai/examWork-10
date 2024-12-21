import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Comment } from "../../types";

interface CommentsState {
  commentsList: Comment[];
}

const initialState: CommentsState = {
  commentsList: [],
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<Comment>) => {
      state.commentsList.push(action.payload);
    },
    deleteComment: (state, action: PayloadAction<string>) => {
      state.commentsList = state.commentsList.filter(
        (comment) => comment.id !== action.payload,
      );
    },
  },
});

export const { addComment, deleteComment } = commentsSlice.actions;
export default commentsSlice.reducer;
