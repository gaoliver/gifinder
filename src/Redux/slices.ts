import { GIFProps } from '@/@types/models';
import { createSlice } from '@reduxjs/toolkit';

export interface AppState {
  favourites: GIFProps[];
}

const initialState: AppState = {
  favourites: [],
};

const gifSlice = createSlice({
  name: 'gifs',
  initialState,
  reducers: {
    saveFavourite: (state, action) => {
      const existingIndex = state.favourites.findIndex(
        gif => gif.id === action.payload.id,
      );

      if (existingIndex !== -1) {
        state.favourites.splice(existingIndex, 1);
      } else {
        state.favourites.push(action.payload);
      }
    },
  },
});

export const actions = gifSlice.actions;

export default gifSlice.reducer;
