import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addfeed: (state, action) => {
      return action.payload;
    },
    removeFromfeed: (state, action) => {
      const newFeed = state.filter((user) => user._id !== action.payload._id);
      return newFeed;
    },
  },
});

export const { addfeed, removeFromfeed } = feedSlice.actions;
export default feedSlice.reducer;
