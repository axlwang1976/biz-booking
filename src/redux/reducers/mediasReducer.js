import actionTypes from '../actionTypes';

const initialState = {
  isLoading: false,
  medias: [],
};

const mediasReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_MEDIAS_ISLOADING:
      return { ...state, isLoading: true };
    case actionTypes.GET_MEDIAS:
      return {
        ...state,
        medias: action.payload,
        isLoading: false,
      };
    case actionTypes.DELETE_MEDIA:
      return {
        ...state,
        medias: state.medias.filter((media) => media.ID !== action.payload),
        isLoading: false,
      };
    default:
      return state;
  }
};

export default mediasReducer;
