import { configureStore } from "@reduxjs/toolkit";
import superheroReduser from "./slices/superheroSlice";

export const store = configureStore({
  reducer: {
    sphero:superheroReduser
  },
});

export default store;
