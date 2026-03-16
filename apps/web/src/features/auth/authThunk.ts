import type {
  LoginUserPayload,
  RegisterUserPayload,
} from "@repo/types/user";

import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";
import type { SafeUser } from "@repo/types/db";
import { handleApiError } from "@/utils/handleApiError";

export const registerThunk = createAsyncThunk<
  SafeUser,
  RegisterUserPayload
>("auth/register", async (data, { rejectWithValue }) => {
  try {
    const res = await api.post("/auth/register", data);
    return res.data.data;
  } catch (error: unknown) {
    return rejectWithValue(handleApiError(error));
  }
});

export const loginUserThunk = createAsyncThunk<
  SafeUser,
  LoginUserPayload
>("auth/login", async (data, { rejectWithValue }) => {
  try {
    const res = await api.post("/auth/login", data);
    return res.data.data.user;
  } catch (error: unknown) {
  
    return rejectWithValue(handleApiError(error));
  }
});

export const fetchMeThunk = createAsyncThunk<
  SafeUser
>("auth/me", async (_, { rejectWithValue }) => {
  try {
    const res = await api.get("/auth/me");
    return res.data.data;
  }catch (error: unknown) {
  
    return rejectWithValue(handleApiError(error));
  }
});

export const logoutUserThunk = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await api.post("/auth/logout");
    } catch (error: unknown) {
      return rejectWithValue(handleApiError(error));
      
    }
  }
);