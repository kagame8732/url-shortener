import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance, { AxiosError } from "axios";

const axios = axiosInstance.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  auth: {
    username: import.meta.env.VITE_USER,
    password: import.meta.env.VITE_PASSWORD,
  },
  headers: {
    "Content-Type": "application/json",
  },
});

const getAllURLS = createAsyncThunk(
  "getAllURLS",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/urls`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue({ error: error?.response });
    }
  }
);

const newShortenURL = createAsyncThunk(
  "newShortenURL",
  async (url: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/urls`, {
        url,
        ttlInSeconds: 5000,
      });
      return response.data;
    } catch (error: AxiosError | any) {
      return rejectWithValue({ error: error?.response });
    }
  }
);

const deleteShortened = createAsyncThunk(
  "deleteShortened",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/urls/${id}`);
      return response.data;
    } catch (error: AxiosError | any) {
      return rejectWithValue({ error: error?.response });
    }
  }
);

const reset = createAction('reset')

export const apis = { getAllURLS, newShortenURL, deleteShortened, reset };
