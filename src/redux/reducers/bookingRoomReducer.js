import actionTypes from '../actionTypes';

const initialState = {
  isLoading: false,
  bookingRoomInfo: [],
  bookingRoomInfoByRoom: [],
  bookingRoomInfoByMeeting: [],
  selectBookingRoomInfo: null,
};

const bookingRoomReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_BOOKINGROOM_ISLOADING:
      return { ...state, isLoading: true };
    case actionTypes.GET_BOOKINGROOM_BY_ROOM:
      return {
        ...state,
        bookingRoomInfoByRoom: action.payload,
        selectBookingRoomInfo: null,
        isLoading: false,
      };
    case actionTypes.GET_BOOKINGROOM_BY_MEETING:
      return {
        ...state,
        bookingRoomInfoByMeeting: action.payload,
        selectBookingRoomInfo: null,
        isLoading: false,
      };
    case actionTypes.GET_BOOKINGROOM:
      return {
        ...state,
        selectBookingRoomInfo: action.payload,
        isLoading: false,
      };
    case actionTypes.CREATE_OR_UPDATE_BOOKINGROOM:
      return {
        ...state,
        bookingRoomInfo: [...state.bookingRoomInfo, action.payload],
        isLoading: false,
      };
    case actionTypes.DELETE_BOOKINGROOM:
      return {
        ...state,
        bookingRoomInfo: state.bookingRoomInfo.filter(
          (info) => info.ID !== action.payload
        ),
        isLoading: false,
      };
    default:
      return state;
  }
};

export default bookingRoomReducer;
