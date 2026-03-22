import api from "@/services/api";
import { handleApiError } from "@/utils/handleApiError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { JournalPayload, JournalEntryData, DeleteJournalPayload, DeleteJournalResponse } from "@repo/types/index";


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

type GetPayload = {
  userId:string
}

export const getJournalThunk = createAsyncThunk<
  JournalEntryData[],
  GetPayload
>(
  "journal/fetch",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const res = await api.get(`/journal/${userId}`);
      return res.data.journals;
    } catch (error: unknown) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const deleteJournalThunk = createAsyncThunk<
  DeleteJournalResponse,
  DeleteJournalPayload
  >(
  "journal/delete",
    async (data, { rejectWithValue }) => {
      try {
        const res = await api.delete(`/journal/${data.id}`);
        return res.data.data;
      } catch (error: unknown) {
        return rejectWithValue(handleApiError(error));
    }
  }
)
