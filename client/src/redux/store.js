import { configureStore } from "@reduxjs/toolkit";
import nft from "./reducers/nft";
import auth from "./reducers/auth";
import business from "./reducers/business";

const store = configureStore({
  reducer: {
    nft,
    auth,
    business,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
