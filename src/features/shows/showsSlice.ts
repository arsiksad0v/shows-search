import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Show {
  id: number;
  name: string;
  summary: string;
  image: { medium: string; original: string };
}

interface ShowsState {
  shows: Show[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: ShowsState = {
  shows: [],
  status: 'idle',
  error: null,
};

export const fetchShows = createAsyncThunk('shows/fetchShows', async (query: string) => {
  const response = await axios.get(`http://api.tvmaze.com/search/shows?q=${query}`);
  return response.data.map((item: { show: Show }) => item.show);
});

const showsSlice = createSlice({
  name: 'shows',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShows.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchShows.fulfilled, (state, action: PayloadAction<Show[]>) => {
        state.status = 'succeeded';
        state.shows = action.payload;
      })
      .addCase(fetchShows.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export default showsSlice.reducer;