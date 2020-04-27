import axios from "axios";
import { apiCallBegan, apiCallFailed, apiCallSuccess } from "../api";

const api = store => next => async action => {
  if (action.type !== apiCallBegan.type) return next(action);

  // call the api
  const { url, method, data, onStart, onSuccess, onError } = action.payload;
  if (onStart) store.dispatch({ type: onStart });
  next(action);

  try {
    const response = await axios.request({
      baseURL: "http://localhost:9001/api",
      url,
      method,
      data,
    });

    // generic action
    store.dispatch(apiCallSuccess(response.data));
    // Specific action
    if (onSuccess) store.dispatch({ type: onSuccess, payload: response.data });
  } catch (error) {
    store.dispatch(apiCallFailed(error.message));
    if (onError) store.dispatch({ type: onError, payload: error.message });
  }
};

export default api;
