import { all, fork, put, takeLatest } from "redux-saga/effects";
import CONSTANTS from "./CONSTANTS";
import actions from "./actions";

const baseUrl = "https://api.real-estate-manager.redberryinternship.ge/api/";

export function* getCities() {
  yield takeLatest(CONSTANTS.GET_CITIES, function* () {
    try {
      const url = baseUrl + "cities";
      const res = yield window.mainAxios.get(url);
      const data = res.data;
      console.log(data);

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

export default function* rootSaga() {
  yield all([fork(getCities)]);
}
