import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { News } from '../../types';
import { RootState } from '../../app/store.ts';
import { createNews, fetchAllNews, fetchOneNews } from '../thunks/newsThunk.ts';

interface NewsState {
  newsList: News[];
  fullNews: News | null;
  fetchingNewsListLoading: boolean;
  fetchingOneNewsLoading: boolean;
  addNewsLoading: boolean;
}

const initialState: NewsState = {
  newsList: [],
  fullNews: null,
  fetchingNewsListLoading: false,
  fetchingOneNewsLoading: false,
  addNewsLoading: false
};

export const selectNewsList = (state: RootState) => state.news.newsList;
export const selectFullNews = (state: RootState) => state.news.fullNews;
export const selectNewsListLoading = (state: RootState) => state.news.fetchingNewsListLoading;
export const selectFullNewsLoading = (state: RootState) => state.news.fetchingOneNewsLoading;
export const selectAddNewsLoading = (state: RootState) => state.news.addNewsLoading;

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllNews.pending, (state) => {
        state.fetchingNewsListLoading = true;
      })
      .addCase(fetchAllNews.fulfilled, (state, action: PayloadAction<News[]>) => {
        state.fetchingNewsListLoading = false;
        state.newsList = action.payload;
      })
      .addCase(fetchAllNews.rejected, (state) => {
        state.fetchingNewsListLoading = false;
      })
      .addCase(fetchOneNews.pending, (state) => {
      state.fetchingOneNewsLoading = true;
      })
      .addCase(fetchOneNews.fulfilled, (state, action: PayloadAction<News>) => {
        state.fetchingOneNewsLoading = false;
        state.fullNews = action.payload;
      })
      .addCase(fetchOneNews.rejected, (state) => {
        state.fetchingOneNewsLoading = false;
      })
      .addCase(createNews.pending, (state) => {
        state.addNewsLoading = true;
      })
      .addCase(createNews.fulfilled, (state) => {
        state.addNewsLoading = false;
      })
      .addCase(createNews.rejected, (state) => {
        state.addNewsLoading = false;
      });
  }
});

export default newsSlice.reducer;
