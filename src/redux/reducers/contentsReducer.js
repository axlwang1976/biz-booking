import actionTypes from '../actionTypes';

const initialState = {
  isLoading: false,
  contents: [],
  selectContent: null,
};

const contentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CONTENTS_ISLOADING:
      return { ...state, isLoading: true };
    case actionTypes.GET_CONTENTS:
      return {
        ...state,
        contents: action.payload,
        selectContent: null,
        isLoading: false,
      };
    case actionTypes.GET_CONTENT:
      return { ...state, selectContent: action.payload, isLoading: false };
    case actionTypes.CREATE_OR_UPDATE_CONTENT:
      return {
        ...state,
        contents: [...state.contents, action.payload],
        isLoading: false,
      };
    case actionTypes.DELETE_CONTENT:
      return {
        ...state,
        contents: state.contents.filter(
          (content) => content.ID !== action.payload
        ),
        isLoading: false,
      };
    default:
      return state;
  }
};

export default contentsReducer;
