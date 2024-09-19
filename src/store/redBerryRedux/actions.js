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
};

export default actions;
