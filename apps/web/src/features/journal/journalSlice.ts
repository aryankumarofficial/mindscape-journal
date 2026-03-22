import { createSlice } from "@reduxjs/toolkit";
import type { JournalEntryData } from "@repo/types/journal";
import { PURGE } from "redux-persist";
import { addJournalThunk, deleteJournalThunk, getJournalThunk } from "./journalThunk";

interface JournalState {
  journals: JournalEntryData[],
  _backup: JournalEntryData[] | null,
  loading: boolean;
  error: string | null;
}

const initialState: JournalState = {
  journals: [],
  _backup: null,
  loading: false,
  error: null
}

const journalSlice = createSlice({
  name: "journal",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearJournals: (state) => {
      state.journals = [];
      state._backup = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(PURGE, (state) => {
        state.journals = [];
        state.error = null;
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
      
      // fetch journals
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
  
      // delete journal
      .addCase(deleteJournalThunk.pending, (state,action) => {
        state.loading = true;
        state.error = null;
        const { id } = action.meta.arg;
        state._backup = [...state.journals];
        state.journals = state.journals.filter(
          (journal) => journal.id !== id
        );
      })
      .addCase(deleteJournalThunk.fulfilled, (state) => {
        state.loading = false;
        state._backup = null;
      })
      .addCase(deleteJournalThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.journals = state._backup!;
      })
  }
});

export default journalSlice.reducer;

export const { clearError, clearJournals } = journalSlice.actions;