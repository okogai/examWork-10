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

export const fetchOneNews = createAsyncThunk<News, string>(
  'news/fetchOneNews',
  async (id: string) => {
    const response = await axiosAPI.get(`news/${id}`);
    return response.data[0];
  }
);

export const createNews = createAsyncThunk<void, NewsMutation>(
  'news/createNews',
  async (news: NewsMutation) => {
    const formData = new FormData();
    formData.append('title', news.title);
    if (news.text) {
      formData.append('text', news.text);
    }
    if (news.image) {
      formData.append('image', news.image);
    }
    await axiosAPI.post("news", formData);
  },
);

export const deleteNews = createAsyncThunk<void, number>(
  'news/deleteNews',
  async (id: number) => {
    await axiosAPI.delete(`news/${id}`);
  }
);


