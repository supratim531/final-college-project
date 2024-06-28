import { createReducer } from "@reduxjs/toolkit";
import {
  loginConstant,
  logoutConstant,
  updateStatusConstant,
} from "../actions/authActions";

const initialState = {
  status: "idle", // idle | pending | rejected | fulfilled
  wallet: "",
  balance: "",
  provider: null,
  signer: null,
  nftContract: null,
  businessContract: null,
  isWalletConnected: false,
};

const authReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loginConstant, (state, action) => {
      state.status = "fulfilled";
      state.wallet = action.payload.wallet;
      state.balance = action.payload.balance;
      state.provider = action.payload.provider;
      state.signer = action.payload.signer;
      state.nftContract = action.payload.nftContract;
      state.businessContract = action.payload.businessContract;
      state.isWalletConnected = true;
    })
    .addCase(logoutConstant, (state) => {
      state.status = "idle";
      state.wallet = "";
      state.balance = "";
      state.provider = null;
      state.signer = null;
      state.nftContract = null;
      state.businessContract = null;
      state.isWalletConnected = false;
    })
    .addCase(updateStatusConstant, (state, action) => {
      state.status = action.status;
    });
});

export default authReducer;
