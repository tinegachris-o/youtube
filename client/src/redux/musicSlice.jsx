import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentMusic : null,
  loading: false,
  error: false,
};

export const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.currentMusic = action.payload;
    },
    fetchFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    like: (state, action) => {
      if (!state.currentMusic.likes.includes(action.payload)) {
        state.currentMusic.likes.push(action.payload);
        state.currentMusic.dislikes.splice(
          state.currentMusic.dislikes.findIndex(
            (userId) => userId === action.payload
          ),
          1
        );
      }
    },
    dislike: (state, action) => {
      if (!state.currentMusic.dislikes.includes(action.payload)) {
        state.currentMusic.dislikes.push(action.payload);
        state.currentMusic.likes.splice(
          state.currentMusic.likes.findIndex(
            (userId) => userId === action.payload
          ),
          1
        );
      }
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFailure, like, dislike } =
  musicSlice.actions;

export default musicSlice.reducer;
