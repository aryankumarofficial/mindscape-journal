import { createSlice } from "@reduxjs/toolkit";
import type { JournalEntryData } from "@repo/types/journal";
import { PURGE } from "redux-persist";
import { addJournalThunk, getJournalThunk } from "./journalThunk";

interface JournalState {
  journals: JournalEntryData[],
  loading: boolean;
  error: string | null;
}

const initialState: JournalState = {
  journals: [],
  loading: false,
  error: null
}

const journalSlice = createSlice({
  name: "journal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(PURGE, (state) => {
        state.journals = [];
      })

      // Add journal

      .addCase(addJournalThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addJournalThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.journals.push(action.payload);
        }
      })
      .addCase(addJournalThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getJournalThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getJournalThunk.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload)
          state.journals = action.payload;
      })
      .addCase(getJournalThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
  }
});

export default journalSlice.reducer;
