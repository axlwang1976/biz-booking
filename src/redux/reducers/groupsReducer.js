import actionTypes from '../actionTypes';

const initialState = {
  isLoading: false,
  groups: [],
  selectGroup: null,
};

const groupsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_GROUPS_ISLOADING:
      return { ...state, isLoading: true };
    case actionTypes.GET_GROUPS:
      return {
        ...state,
        groups: action.payload,
        selectGroup: null,
        isLoading: false,
      };
    case actionTypes.GET_GROUP:
      return { ...state, selectGroup: action.payload, isLoading: false };
    case actionTypes.CREATE_OR_UPDATE_GROUP:
      return {
        ...state,
        groups: [...state.groups, action.payload],
        isLoading: false,
      };
    case actionTypes.DELETE_GROUP:
      return {
        ...state,
        groups: state.groups.filter((group) => group.ID !== action.payload),
        isLoading: false,
      };
    default:
      return state;
  }
};

export default groupsReducer;
