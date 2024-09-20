import { createReducer } from "@reduxjs/toolkit";
import CONSTANTS from "./CONSTANTS";

const initState = {
  cities: [],
  regions: [],
  realEstates: [],
  agents: [],
  selectedEstate: null,
  filters: {},
  filteredList: [],
  createAgent: {},
  createEstate: {}
};

const reducer = createReducer(initState, (builder) =>
  builder

    .addCase(CONSTANTS.SET_CITIES, (state, action) => {
      state.cities = action.payload;
    })
    .addCase(CONSTANTS.SET_REGIONS, (state, action) => {
      state.regions = action.payload;
    })
    .addCase(CONSTANTS.SET_REAL_ESTATES, (state, action) => {
      state.realEstates = action.payload;
    })
    .addCase(CONSTANTS.SET_AGENTS, (state, action) => {
      state.agents = action.payload;
    })
    .addCase(CONSTANTS.SET_SELECTED_ESTATE, (state, action) => {
      state.selectedEstate = action.payload;
    })
    .addCase(CONSTANTS.SET_FILTERS, (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      // console.log(state.filters);
    })
    .addCase(CONSTANTS.SET_FILTERED_LIST, (state) => {
      // TO-DO if logics
      if (!state.filters.regions?.length) {
        state.filteredList = state.realEstates;
      } else {
        state.filteredList = state.realEstates.filter(
          (e) => state.filters.regions.indexOf(e.city.region_id) > -1
        );
      }
    })
    .addCase(CONSTANTS.UPDATE_REGION, (state, action) => {
      console.log(action);

      state.regions = state.regions.map((region) => {
        if (region.id === action.payload.id) {
          return { ...region, isSelected: action.payload.isSelected };
        }
        return region;
      });
    })
    .addCase(CONSTANTS.SET_CREATE_AGENTS, (state, action) => {
      state.createAgent = action.payload;
    })
    .addCase(CONSTANTS.SET_CREATE_ESTATE, (state, action) => {
      state.createEstate = action.payload;
    })
);

export default reducer;
