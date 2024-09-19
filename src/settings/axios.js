import axios from "axios";

const instance = axios.create({
  // headers: {
  //   "content-type": "application/json",
  //   "ApplicationKey": process.env.REACT_APP_APP_KEY
  // },
});

instance.interceptors.request.use(
  (config) => {
    const token = "9d0491b9-c2fb-4c59-bb17-fdb6398cc360";

    // if (token != null && token !== "") {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    return config;
  },
  (error) => Promise.reject(error)
);

// instance.interceptors.response.use(
//   (response) => {
//     store.dispatch(commonActions.setAPICallExecuted())

//     return response;
//   },
// );

export default instance;
