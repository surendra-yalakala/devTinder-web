import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connections",
  initialState: {
    connections: [],
  },
  reducers: {
    addConnections: (state, action) => {
      state.connections = action.payload;
    },
    clearConnections: (state) => {
      state.connections = [];
    },
  },
});

export const { addConnections, clearConnections } = connectionSlice.actions;
export default connectionSlice.reducer;
