import api from "@/services/api";
import { handleApiError } from "@/utils/handleApiError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { JournalPayload, JournalEntryData } from "@repo/types/index";


export const addJournalThunk = createAsyncThunk<
  JournalEntryData,
  JournalPayload
>(
  "journal/create",
  async (data, { rejectWithValue }) => {

    try {
      const res = await api.post("/journal", data);
      return res.data.journal;
    } catch (error: unknown) {
      return rejectWithValue(handleApiError(error));
    }

  }
)

export const getJournalThunk = createAsyncThunk<JournalEntryData[]>(
  "journal/fetch",
  async (_, { rejectWithValue }) => {
    try {
    const res = await api.get("/journal");
    return res.data.journals;
    } catch (error: unknown) {
      return rejectWithValue(error);
    }
  }
)
