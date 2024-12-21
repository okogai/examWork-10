import { configureStore } from "@reduxjs/toolkit";
import newsSlice from "../store/slices/newsSlice.ts";
import commentsSlice from "../store/slices/commentsSlice.ts";

export const store = configureStore({
  reducer: {
    news: newsSlice,
    comments: commentsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
