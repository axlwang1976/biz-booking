import actionTypes from '../actionTypes';

const initialState = {
  isLoading: false,
  channels: [],
  selectChannel: null,
};

const channelsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_CHANNELS_ISLOADING:
      return { ...state, isLoading: true };
    case actionTypes.GET_CHANNELS:
      return {
        ...state,
        channels: action.payload,
        selectChannel: null,
        isLoading: false,
      };
    case actionTypes.GET_CHANNEL:
      return { ...state, selectChannel: action.payload, isLoading: false };
    case actionTypes.CREATE_OR_UPDATE_CHANNEL:
      return {
        ...state,
        channels: [...state.channels, action.payload],
        isLoading: false,
      };
    case actionTypes.DELETE_CHANNEL:
      return {
        ...state,
        channels: state.channels.filter(
          (channel) => channel.ID !== action.payload
        ),
        isLoading: false,
      };
    default:
      return state;
  }
};

export default channelsReducer;
