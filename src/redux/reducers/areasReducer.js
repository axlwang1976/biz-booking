import actionTypes from '../actionTypes';

const initialState = {
  isLoading: false,
  areas: [],
  selectArea: null,
};

const areasReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_AREAS_ISLOADING:
      return { ...state, isLoading: true };
    case actionTypes.GET_AREAS:
      return {
        ...state,
        areas: action.payload,
        selectArea: null,
        isLoading: false,
      };
    case actionTypes.GET_AREA:
      return { ...state, selectArea: action.payload, isLoading: false };
    case actionTypes.CREATE_OR_UPDATE_AREA:
      return {
        ...state,
        areas: [...state.areas, action.payload],
        isLoading: false,
      };
    case actionTypes.DELETE_AREA:
      return {
        ...state,
        areas: state.areas.filter((area) => area.ID !== action.payload),
        isLoading: false,
      };
    default:
      return state;
  }
};

export default areasReducer;
