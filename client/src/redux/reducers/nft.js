import { createReducer } from "@reduxjs/toolkit";
import { mintNFTConstant } from "../actions/nftActions";

const initialState = {};

const nftReducer = createReducer(initialState, (builder) => {
  builder.addCase(mintNFTConstant, (state, action) => {});
});

export default nftReducer;
