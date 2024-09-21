import { createReducer } from "@reduxjs/toolkit";
import CONSTANTS from "./CONSTANTS";

const saveFiltersToLocalStorage = (filters) => {
  localStorage.setItem("realEstateFilters", JSON.stringify(filters));
};

const loadFiltersFromLocalStorage = () => {
  const savedFilters = localStorage.getItem("realEstateFilters");
  return savedFilters ? JSON.parse(savedFilters) : {};
};

const initState = {
  cities: [],
  regions: [],
  realEstates: [],
  agents: [],
  selectedEstate: null,
  filters: loadFiltersFromLocalStorage(),
  filteredList: [],
  createAgent: {},
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
      saveFiltersToLocalStorage(state.filters);
    })
    .addCase(CONSTANTS.CLEAR_FILTERS, (state) => {
      state.filters = {};
      saveFiltersToLocalStorage(state.filters);
    })
    .addCase(CONSTANTS.CLEAR_INDIVIDUAL_FILTER, (state, action) => {
      const filterType = action.payload;
      switch (filterType) {
        case "regions":
          state.filters.regions = [];
          break;
        case "priceRange":
          state.filters.priceRange = {};
          break;
        case "areaRange":
          state.filters.areaRange = {};
          break;
        case "bedrooms":
          state.filters.bedrooms = null;
          break;
        default:
          break;
      }
      saveFiltersToLocalStorage(state.filters);
    })

    .addCase(CONSTANTS.SET_FILTERED_LIST, (state) => {
      let filteredList = state.realEstates;

      if (state.filters.regions?.length) {
        filteredList = filteredList.filter(
          (e) => state.filters.regions.indexOf(e.city.region_id) > -1
        );
      }

      if (state.filters.priceRange) {
        if (state.filters.priceRange.priceTo) {
          filteredList = filteredList.filter(
            (e) => e.price <= state?.filters?.priceRange?.priceTo
          );
        }
        if (state.filters.priceRange.priceFrom) {
          filteredList = filteredList.filter(
            (e) => e.price >= state?.filters?.priceRange?.priceFrom
          );
        }
      }

      if (state.filters.areaRange) {
        if (state.filters.areaRange.areaTo) {
          filteredList = filteredList.filter(
            (e) => e.area <= state?.filters?.areaRange?.areaTo
          );
        }
        debugger;
        if (state.filters.areaRange.areaFrom) {
          filteredList = filteredList.filter(
            (e) => e.area >= state?.filters?.areaRange?.areaFrom
          );
        }
      }
      debugger;

      if (state.filters.bedrooms) {
        if (state.filters.bedrooms === 4) {
          filteredList = filteredList.filter((e) => e.bedrooms >= 4);
        } else {
          filteredList = filteredList.filter(
            (e) => e.bedrooms === state.filters.bedrooms
          );
        }
      }
      state.filteredList = filteredList;
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
      state.realEstates = state.realEstates.concat(action.payload);
    })
    .addCase(CONSTANTS.REMOVE_ESTATE, (state, action) => {
      state.realEstates = state.realEstates.filter(
        ({ id }) => id.toString() !== action.id.toString()
      );
    })
);

export default reducer;
