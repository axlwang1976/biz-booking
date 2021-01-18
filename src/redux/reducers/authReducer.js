import actionTypes from '../actionTypes';

const initialState = {
  isLoading: false,
  Accesstoken: null,
  Client: null,
  Uid: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_AUTH_ISLOADING:
      return { ...state, isLoading: true };
    case actionTypes.LOG_IN:
      return {
        ...state,
        Accesstoken: action.payload.Accesstoken,
        Client: action.payload.Client,
        Uid: action.payload.Uid,
        isLoading: false,
      };
    case actionTypes.AUTH_LOG_IN:
      return {
        ...state,
        Accesstoken: action.payload.Accesstoken,
        Client: action.payload.Client,
        Uid: action.payload.Uid,
        isLoading: false,
      };
    case actionTypes.LOG_OUT:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
