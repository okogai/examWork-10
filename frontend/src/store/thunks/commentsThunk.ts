import { createAsyncThunk } from '@reduxjs/toolkit';
import { CommentMutation, IComment } from '../../types';
import axiosAPI from '../../utils/axiosAPI.ts';

export const fetchComments = createAsyncThunk<IComment[], string>(
  'comments/fetchComments',
  async (id) => {
    const response = await axiosAPI.get(`comments?news_id=${id}`);
    return response.data;
  }
);

export const createNewComment = createAsyncThunk<void, CommentMutation>(
  'comments/createNewComment',
  async (comment: CommentMutation) => {
    await axiosAPI.post("comments", comment);
  },
);

export const deleteComments = createAsyncThunk<void, string>(
  'comments/deleteComments',
  async (id: string) => {
    await axiosAPI.delete(`comments/${id}`);
  }
);