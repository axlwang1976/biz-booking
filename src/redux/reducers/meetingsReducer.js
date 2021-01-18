import actionTypes from '../actionTypes';

const initialState = {
  isLoading: false,
  meetings: [],
  selectMeeting: null,
  roomsConflictInfo: [],
  currentMeetingNo: null,
};

const meetingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_MEETINGS_ISLOADING:
      return { ...state, isLoading: true };
    case actionTypes.GET_MEETINGS:
      return {
        ...state,
        meetings: action.payload,
        selectMeeting: null,
        isLoading: false,
        currentMeetingNo: null,
      };
    case actionTypes.GET_MEETING:
      return {
        ...state,
        selectMeeting: action.payload,
        isLoading: false,
        currentMeetingNo: null,
      };
    case actionTypes.CREATE_OR_UPDATE_MEETING:
      return {
        ...state,
        meetings: [...state.meetings, action.payload],
        isLoading: false,
        currentMeetingNo: action.payload.ID,
      };
    case actionTypes.DELETE_MEETING:
      return {
        ...state,
        meetings: state.meetings.filter(
          (meeting) => meeting.ID !== action.payload
        ),
        isLoading: false,
      };
    case actionTypes.CHECK_CONFLICT:
      return { ...state, roomsConflictInfo: action.payload, isLoading: false };
    default:
      return state;
  }
};

export default meetingsReducer;
