import type { LoginUserPayload, RegisterUserPayload } from "@repo/types/user";
import { createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../services/api";
const registerThunk = createAsyncThunk(
  "auth/register",
  async (data: RegisterUserPayload) => {
    const res = await api.post("/auth/register", data);
    return res.data.data;
  }
)

const loginUserThunk = createAsyncThunk(
  "auth/login",
  async (data: LoginUserPayload) => {
    const res = await api.post("/auth/login", data);

    return res.data.data.user;
  }
)

const fetchMeThunk = createAsyncThunk(
  "auth/me",
  async () => {
    const res = await api.get("/auth/me");

    return res.data.data;
  }
);

const logoutUserThunk = createAsyncThunk(
  "auth/logout",
  async () => {
    await api.post("/auth/logout");
  }
);

export {
  registerThunk,
  loginUserThunk,
  fetchMeThunk,
  logoutUserThunk
}
