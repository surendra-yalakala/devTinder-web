import { createSlice } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
  name: "requests",
  initialState: {
    requests: [],
  },
  reducers: {
    addRequests: (state, action) => {
      state.requests = action.payload;
    },
    removeRequest: (state, action) => {
      state.requests = state.requests.filter(
        (request) => request._id !== action.payload
      );
    },
  },
});

export const { addRequests, removeRequest } = requestsSlice.actions;
export default requestsSlice.reducer;
