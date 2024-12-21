import { createAsyncThunk } from "@reduxjs/toolkit";
import { CommentMutation, IComment } from "../../types";
import axiosAPI from "../../utils/axiosAPI.ts";

export const fetchComments = createAsyncThunk<IComment[], string>(
  "comments/fetchComments",
  async (id) => {
    const response = await axiosAPI.get(`comments?news_id=${id}`);
    if (response.data){
      return response.data;
    } else {
      return [];
    }
  },
);

export const createNewComment = createAsyncThunk<void, CommentMutation>(
  "comments/createNewComment",
  async (comment: CommentMutation) => {
    await axiosAPI.post("comments", comment);
  },
);

export const deleteComments = createAsyncThunk<void, number>(
  "comments/deleteComments",
  async (id: number) => {
    await axiosAPI.delete(`comments/${id}`);
  },
);
