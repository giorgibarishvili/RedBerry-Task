import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import CONSTANTS from "./CONSTANTS";
import actions from "./actions";
import axiosInstance from "../../settings/axios";

const baseUrl = "https://api.real-estate-manager.redberryinternship.ge/api/";

export function* getCities() {
  yield takeLatest(CONSTANTS.GET_CITIES, function* () {
    try {
      const url = baseUrl + "cities";
      const res = yield window.mainAxios.get(url);
      const data = res.data;

      if (!data || !Array.isArray(data)) {
        throw new Error("Invalid response data format");
      }

      yield put(actions.setCities(data));
    } catch (e) {
      yield put(actions.setCities([]));
      console.error(e);
    }
  });
}
export function* getRegions() {
  yield takeLatest(CONSTANTS.GET_REGIONS, function* () {
    try {
      const url = baseUrl + "regions";
      const res = yield window.mainAxios.get(url);
      const data = res.data;

      if (!data || !Array.isArray(data)) {
        throw new Error("Invalid response data format");
      }

      yield put(
        actions.setRegions(data.map((o) => ({ ...o, isSelected: false })))
      );
    } catch (e) {
      yield put(actions.setRegions([]));
      console.error(e);
    }
  });
}

export function* getRealEstates() {
  yield takeLatest(CONSTANTS.GET_REAL_ESTATES, function* () {
    try {
      const url = baseUrl + "real-estates";
      const res = yield window.mainAxios.get(url);
      const data = res.data;

      if (!data || !Array.isArray(data)) {
        throw new Error("Invalid response data format");
      }

      yield put(actions.setRealEstates(data));
      yield put(actions.setFilteredList());
    } catch (e) {
      yield put(actions.setRealEstates([]));
      console.error(e);
    }
  });
}

export function* getAgents() {
  yield takeLatest(CONSTANTS.GET_AGENTS, function* () {
    try {
      const url = baseUrl + "agents";
      const res = yield window.mainAxios.get(url);
      const data = res.data;

      if (!data || !Array.isArray(data)) {
        throw new Error("Invalid response data format");
      }

      yield put(actions.setAgents(data));
    } catch (e) {
      yield put(actions.setAgents([]));
      console.error(e);
    }
  });
}

export function* getEstateById(action) {
  try {
    const { id } = action.payload;
    const url = `${baseUrl}real-estates/${id}`;
    const res = yield call(axiosInstance.get, url);
    const data = res.data;

    if (!data) {
      throw new Error("Invalid response data format");
    }

    yield put(actions.setSelectedEstate(data));
  } catch (e) {
    yield put(actions.setSelectedEstate(null));
    console.error(e);
  }
}

export function* watchGetEstateById() {
  yield takeLatest(CONSTANTS.GET_ESTATE_BY_ID, getEstateById);
}

export default function* rootSaga() {
  yield all([
    fork(getCities),
    fork(getRegions),
    fork(getRealEstates),
    fork(getAgents),
    fork(getEstateById),
    fork(watchGetEstateById),
  ]);
}
