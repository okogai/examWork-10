import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosAPI from "../../utils/axiosAPI.ts";
import { News, NewsMutation } from '../../types';

export const fetchAllNews = createAsyncThunk<News[], void>(
  'news/fetchAllNews',
  async () => {
    const response = await axiosAPI.get('news');
    return response.data;
  }
);

export const fetchOneNews = createAsyncThunk<News[], string>(
  'news/fetchOneNews',
  async (id: string) => {
    const response = await axiosAPI.get(`news/${id}`);
    return response.data;
  }
);

export const createNews = createAsyncThunk<void, NewsMutation>(
  'news/createNews',
  async (news: NewsMutation) => {
    await axiosAPI.post("news", news);
  },
);

export const deleteNews = createAsyncThunk<void, string>(
  'news/deleteNews',
  async (id: string) => {
    await axiosAPI.delete(`news/${id}`);
  }
);


