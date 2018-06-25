import {
  FETCHING_ERROR,
  FETCH_SUCCESS,
  SET_CURRENT_PAGE,
  WAITING_RESPONSE,
  SERVER_POST_RESPONSE
} from "./actionTypes";
import axios from "axios";

export const fetchCustomers = url => {
  return dispatch => {
    dispatch(waitingResponse(true));
    axios
      .get(url)
      .then(res => {
        if (res.status === 200 && !res.data.name) {
          dispatch(waitingResponse(false));
          dispatch(fetchSuccess(res.data.customers));
        } else {
          dispatch(waitingResponse(false));
          dispatch(fetchingError(true));
        }
      })
      .catch(error => {
        dispatch(waitingResponse(false));
        dispatch(fetchingError(true));
      });
  };
};
export const sendFormData = (url, data) => {
  return dispatch => {
    dispatch(waitingResponse(true));

    axios
      .post(url, data, {
        headers: { "Content-Type": "application/json" }
      })
      .then(res => {
        if (!res.data.success) {
          dispatch(waitingResponse(false));
          dispatch(
            serverPostResponse({
              status: res.data.response.status,
              msg: res.data.response.msg
            })
          );
        } else {
          dispatch(waitingResponse(false));
          dispatch(
            serverPostResponse({
              status: res.data.response.status,
              msg: res.data.response.msg
            })
          );
        }
      })
      .catch(function(error) {
        dispatch(waitingResponse(false));
        dispatch(
          serverPostResponse({
            status: "error",
            msg: "Ha ocurrido un error, por favor intente mas tarde"
          })
        );
      });
  };
};
export const setCurrentPage = page => ({ type: SET_CURRENT_PAGE, page });
export const fetchSuccess = data => ({ type: FETCH_SUCCESS, data });
export const waitingResponse = bool => ({ type: WAITING_RESPONSE, bool });
export const fetchingError = bool => ({ type: FETCHING_ERROR, bool });
export const serverPostResponse = data => ({
  type: SERVER_POST_RESPONSE,
  data
});