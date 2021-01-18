import actionTypes from '../actionTypes';

const initialState = {
  isLoading: false,
  companies: [],
  selectCompany: null,
};

const companiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_COMPANIES_ISLOADING:
      return { ...state, isLoading: true };
    case actionTypes.GET_COMPANIES:
      return {
        ...state,
        companies: action.payload,
        selectCompany: null,
        isLoading: false,
      };
    case actionTypes.GET_COMPANY:
      return { ...state, selectCompany: action.payload, isLoading: false };
    case actionTypes.CREATE_OR_UPDATE_COMPANY:
      return {
        ...state,
        companies: [...state.companies, action.payload],
        isLoading: false,
      };
    default:
      return state;
  }
};

export default companiesReducer;
