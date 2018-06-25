import * as customerActionsTypes from "../actions/actionTypes";

const initialState = {
  data: [],
  waitingResponse: false,
  listFetchingError: false,
  pagination: { currentPage: 1 },
  serverPostResponse: { status: "ready", mgs: "" }
};

export default function customersReducer(state = initialState, action) {
  switch (action.type) {
    case customerActionsTypes.FETCH_SUCCESS:
      return { ...state, data: action.data };
    case customerActionsTypes.FETCHING_ERROR:
      return { ...state, listFetchingError: action.bool };
    case customerActionsTypes.WAITING_RESPONSE:
      return { ...state, waitingResponse: action.bool };
    case customerActionsTypes.SET_CURRENT_PAGE:
      return { ...state, pagination: { currentPage: action.page } };

    case customerActionsTypes.SERVER_POST_RESPONSE:
      return { ...state, serverPostResponse: action.data };
    default:
      return state;
  }
}
