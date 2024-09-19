import { createReducer } from "@reduxjs/toolkit";
import CONSTANTS from "./CONSTANTS";

const initState = {
  cities: [],
};

const reducer = createReducer(initState, (builder) =>
  builder

    .addCase(CONSTANTS.SET_CITIES, (state, action) => {
      state.cities = action.payload;
    })

);

export default reducer;
