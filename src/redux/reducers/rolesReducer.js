import actionTypes from '../actionTypes';

const initialState = {
  isLoading: false,
  roles: [],
  selectRole: null,
};

const rolesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ROLES_ISLOADING:
      return { ...state, isLoading: true };
    case actionTypes.GET_ROLES:
      return {
        ...state,
        roles: action.payload,
        selectRole: null,
        isLoading: false,
      };
    case actionTypes.GET_ROLE:
      return { ...state, selectRole: action.payload, isLoading: false };
    case actionTypes.CREATE_OR_UPDATE_ROLE:
      return {
        ...state,
        roles: [...state.roles, action.payload],
        isLoading: false,
      };
    case actionTypes.DELETE_ROLE:
      return {
        ...state,
        roles: state.roles.filter((role) => role.ID !== action.payload),
        isLoading: false,
      };
    default:
      return state;
  }
};

export default rolesReducer;
