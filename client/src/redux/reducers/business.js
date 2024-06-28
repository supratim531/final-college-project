import { createReducer } from "@reduxjs/toolkit";
import { fetchAllSongsConstant } from "../actions/businessActions";

const initialState = {
  tokens: [],
};

const businessReducer = createReducer(initialState, (builder) => {
  builder.addCase(fetchAllSongsConstant, (state, action) => {
    state.tokens = action.payload;
  });
});

export default businessReducer;
