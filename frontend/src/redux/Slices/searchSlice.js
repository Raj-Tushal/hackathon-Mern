import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    destination: "",
    dates: {},
    options: {},
  },
  reducers: {
    newSearch: (state, action) => {
      const { destination, dates, options } = action.payload;
      state.destination = destination || ""; // Set destination
      state.dates = dates || ""; // Set dates
      state.options = options || {}; // Set options
    },
  },
});

export const { newSearch } = searchSlice.actions;
export default searchSlice.reducer;
