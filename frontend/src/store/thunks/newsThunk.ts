import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosAPI from "../../utils/axiosAPI.ts";
import { News } from '../../types';

export const fetchAllNews = createAsyncThunk<News[], void>(
  'news/fetchAllNews',
  async () => {
    const response = await axiosAPI.get<News[]>('news');
    return response.data;
  }
);

export const fetchOneNews = createAsyncThunk<News[], string>(
  'news/fetchOneNews',
  async (id: string) => {
    const response = await axiosAPI.get<News[]>(`news/${id}`);
    return response.data;
  }
);


