import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance, { AxiosError } from "axios";

// Popular and modern way of invoking the apis 
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
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      return rejectWithValue({ error: axiosError?.response });
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
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      return rejectWithValue({ error: axiosError?.response });
    }
  }
);

const deleteShortened = createAsyncThunk(
  "deleteShortened",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/urls/${id}`);
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      return rejectWithValue({ error: axiosError?.response });
    }
  }
);

const editShortened = createAsyncThunk(
  "editShortened",
  async (data: {id: string, url: string, ttlInSeconds: string}, { rejectWithValue }) => {
    try {
      const { id, url, ttlInSeconds } = data;

      const response = await axios.put(`/urls/${id}`, {
        url,
        ttlInSeconds
      });
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      return rejectWithValue({ error: axiosError?.response });
    }
  }
);

const addShortenerUrl = createAsyncThunk(
  "addShortenerUrl",
  async (data: {id: string, url: string, ttlInSeconds: string}, { rejectWithValue }) => {
    try {
      const { id, url, ttlInSeconds } = data;

      const response = await axios.post(`/urls/${id}`, {
        url,
        ttlInSeconds
      });
      return response.data;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      return rejectWithValue({ error: axiosError?.response });
    }
  }
);

const switchSides = createAsyncThunk(
  "switchSides",
  async (state: boolean) => {
    return state;
  }
);

const reset = createAction('reset');

export const apis = { getAllURLS, newShortenURL, deleteShortened, editShortened, addShortenerUrl, switchSides, reset };