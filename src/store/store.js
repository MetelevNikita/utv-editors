import { configureStore } from "@reduxjs/toolkit";

// slice

import userSlice from "./userSlice";


const store = configureStore({
  reducer: {
    users: userSlice,
  }
})


export default store;