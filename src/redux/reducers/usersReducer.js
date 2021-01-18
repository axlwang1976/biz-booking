import actionTypes from '../actionTypes';

const initialState = {
  isLoading: false,
  users: [],
  selectUser: null,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_USERS_ISLOADING:
      return { ...state, isLoading: true };
    case actionTypes.GET_USERS:
      return {
        ...state,
        users: action.payload,
        selectUser: null,
        isLoading: false,
      };
    case actionTypes.GET_USER:
      return { ...state, selectUser: action.payload, isLoading: false };
    case actionTypes.CREATE_OR_UPDATE_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
        isLoading: false,
      };
    case actionTypes.DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.ID !== action.payload),
        isLoading: false,
      };
    default:
      return state;
  }
};

export default usersReducer;
