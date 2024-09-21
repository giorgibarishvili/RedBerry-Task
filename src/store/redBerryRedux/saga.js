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
    const id = action?.payload?.id;

    if (id) {
      const url = `${baseUrl}real-estates/${id}`;
      const res = yield call(axiosInstance.get, url);
      const data = res.data;
      if (!data) {
        throw new Error("Invalid response data format");
      }

      yield put(actions.setSelectedEstate(data));
    }
  } catch (e) {
    yield put(actions.setSelectedEstate(null));
    console.error(e);
  }
}

export function* watchGetEstateById() {
  yield takeLatest(CONSTANTS.GET_ESTATE_BY_ID, getEstateById);
}

export function* getCreateAgent() {
  yield takeLatest(CONSTANTS.GET_CREATE_AGENTS, function* (action) {
    try {
      const { name, surname, email, phone, avatar } = action.payload;

      const formData = new FormData();
      formData.append("name", name);
      formData.append("surname", surname);
      formData.append("email", email);
      formData.append("phone", phone);
      if (avatar) {
        formData.append("avatar", avatar);
      }

      const url = baseUrl + "agents";
      const res = yield window.mainAxios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const data = res.data;

      if (!data || typeof data !== "object") {
        throw new Error("Invalid response data format");
      }

      yield put(actions.setCreateAgent(data));
    } catch (e) {
      yield put(actions.setCreateAgent([]));
      console.error(e);
    }
  });
}

export function* getCreateEstate() {
  yield takeLatest(CONSTANTS.GET_CREATE_ESTATE, function* (action) {
    try {
      const {
        address,
        image,
        region_id,
        description,
        city_id,
        zip_code,
        price,
        area,
        bedrooms,
        is_rental,
        agent_id,
        navigate
      } = action.payload;
      const formData = new FormData();
      formData.append("address", address);
      formData.append("region_id", region_id);
      formData.append("description", description);
      formData.append("city_id", city_id);
      formData.append("zip_code", zip_code);
      formData.append("price", price);
      formData.append("area", area);
      formData.append("bedrooms", bedrooms);
      formData.append("is_rental", is_rental);
      formData.append("agent_id", agent_id);
      if (image) {
        formData.append("image", image);
      }
      const url = baseUrl + "real-estates";
      const res = yield window.mainAxios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const data = res.data;

      if (!data || typeof data !== "object") {
        throw new Error("Invalid response data format");
      }
      yield put(actions.setCreateEstate(action.payload));
      navigate("/");
    } catch (e) {
      yield put(actions.setCreateEstate([]));
      console.error(e);
    }
  });
}
export function* deleteEstate() {
  yield takeLatest(CONSTANTS.DELETE_ESTATE, function* (action) {
    try {
      const url = `${baseUrl}real-estates/${action?.payload?.id}`;
      yield window.mainAxios.delete(url).then((r) => r.data);

      yield put(actions.removeEstate(action?.payload?.id));
      yield put(actions.setFilteredList());
    } catch (e) {
      console.error(e);
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(getCities),
    fork(getRegions),
    fork(getRealEstates),
    fork(getAgents),
    fork(getEstateById),
    fork(watchGetEstateById),
    fork(getCreateAgent),
    fork(getCreateEstate),
    fork(deleteEstate),
  ]);
}
