import CONSTANTS from "./CONSTANTS";

const actions = {
  getCities: (payload) => ({
    type: CONSTANTS.GET_CITIES,
    payload,
  }),
  setCities: (payload) => ({
    type: CONSTANTS.SET_CITIES,
    payload,
  }),

  getRegions: (payload) => ({
    type: CONSTANTS.GET_REGIONS,
    payload,
  }),
  setRegions: (payload) => ({
    type: CONSTANTS.SET_REGIONS,
    payload,
  }),

  getRealEstates: (payload) => ({
    type: CONSTANTS.GET_REAL_ESTATES,
    payload,
  }),
  setRealEstates: (payload) => ({
    type: CONSTANTS.SET_REAL_ESTATES,
    payload,
  }),

  getAgents: (payload) => ({
    type: CONSTANTS.GET_AGENTS,
    payload,
  }),
  setAgents: (payload) => ({
    type: CONSTANTS.SET_AGENTS,
    payload,
  }),
  getEstateById: (payload) => ({
    type: CONSTANTS.GET_ESTATE_BY_ID,
    payload,
  }),
  setSelectedEstate: (payload) => ({
    type: CONSTANTS.SET_SELECTED_ESTATE,
    payload,
  }),
  getFilters: (payload) => ({
    type: CONSTANTS.GET_FILTERS,
    payload,
  }),
  setFilters: (payload) => ({
    type: CONSTANTS.SET_FILTERS,
    payload,
  }),
  setFilteredList: (payload) => ({
    type: CONSTANTS.SET_FILTERED_LIST,
    payload,
  }),
  updateRegion: (payload) => ({
    type: CONSTANTS.UPDATE_REGION,
    payload,
  }),
  getCreateAgent: (payload) => ({
    type: CONSTANTS.GET_CREATE_AGENTS,
    payload,
  }),
  setCreateAgent: (payload) => ({
    type: CONSTANTS.SET_CREATE_AGENTS,
    payload,
  }),
  getCreateEstate: (payload) => ({
    type: CONSTANTS.GET_CREATE_ESTATE,
    payload,
  }),
  setCreateEstate: (payload) => ({
    type: CONSTANTS.SET_CREATE_ESTATE,
    payload,
  }),
  deleteEstate: (payload) => ({
    type: CONSTANTS.DELETE_ESTATE,
    payload,
  }),
  removeEstate: (payload) => ({
    type: CONSTANTS.REMOVE_ESTATE,
    payload,
  }),
  clearFilters: (payload) => ({
    type: CONSTANTS.CLEAR_FILTERS,
    payload,
  }),
};

export default actions;
