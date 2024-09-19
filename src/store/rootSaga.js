import { all } from "redux-saga/effects";

import redBerry from "./redBerryRedux/saga";

export default function* rootSaga() {
  yield all([redBerry()]);
}
