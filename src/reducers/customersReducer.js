import {
  FETCH_SUCCESS,
  FETCHING_ERROR,
  WAITING_RESPONSE,
  SET_CURRENT_PAGE,
  SERVER_POST_RESPONSE
} from "../actions/actionTypes";

const initialState = {
  data: [],
  waitingResponse: false,
  listFetchingError: false,
  pagination: { currentPage: 1 },
  serverPostResponse: { status: "ready", mgs: "" }
};

export default function customersReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SUCCESS:
      return { ...state, data: action.data };
    case FETCHING_ERROR:
      return { ...state, listFetchingError: action.bool };
    case WAITING_RESPONSE:
      return { ...state, waitingResponse: action.bool };
    case SET_CURRENT_PAGE:
      return { ...state, pagination: { currentPage: action.page } };
    case SERVER_POST_RESPONSE:
      return { ...state, serverPostResponse: action.data };
    case "ASYNC_PENDING":
      return { ...state, waitingResponse: true };
    case "ASYNC_FULFILLED":
      return {
        ...state,
        data: action.payload.customers,
        waitingResponse: false
      };
    case "ASYNC_REJECTED":
      return {
        ...state,
        data: [],
        listFetchingError: true,
        waitingResponse: false
      };
    default:
      return state;
  }
}
