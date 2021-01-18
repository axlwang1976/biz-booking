import actionTypes from '../actionTypes';

const initialState = {
  isLoading: false,
  meetingRooms: [],
  selectMeetingRoom: null,
};

const meetingRoomsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_MEETINGROOMS_ISLOADING:
      return { ...state, isLoading: true };
    case actionTypes.GET_MEETINGROOMS:
      return {
        ...state,
        meetingRooms: action.payload,
        selectMeetingRoom: null,
        isLoading: false,
      };
    case actionTypes.GET_MEETINGROOM:
      return { ...state, selectMeetingRoom: action.payload, isLoading: false };
    case actionTypes.CREATE_OR_UPDATE_MEETINGROOM:
      return {
        ...state,
        meetingRooms: [...state.meetingRooms, action.payload],
        isLoading: false,
      };
    case actionTypes.DELETE_MEETINGROOM:
      return {
        ...state,
        meetingRooms: state.meetingRooms.filter(
          (meetingRoom) => meetingRoom.ID !== action.payload
        ),
        isLoading: false,
      };
    default:
      return state;
  }
};

export default meetingRoomsReducer;
