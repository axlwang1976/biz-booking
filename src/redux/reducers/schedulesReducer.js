import actionTypes from '../actionTypes';

const initialState = {
  isLoading: false,
  schedules: [],
  selectSchedule: null,
};

const schedulesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_SCHEDULES_ISLOADING:
      return { ...state, isLoading: true };
    case actionTypes.GET_SCHEDULES:
      return {
        ...state,
        schedules: action.payload,
        selectSchedule: null,
        isLoading: false,
      };
    case actionTypes.GET_SCHEDULE:
      return { ...state, selectSchedule: action.payload, isLoading: false };
    case actionTypes.CREATE_OR_UPDATE_SCHEDULE:
      return {
        ...state,
        schedules: [...state.schedules, action.payload],
        isLoading: false,
      };
    case actionTypes.DELETE_SCHEDULE:
      return {
        ...state,
        schedules: state.schedules.filter(
          (schedule) => schedule.ID !== action.payload
        ),
        isLoading: false,
      };
    default:
      return state;
  }
};

export default schedulesReducer;
