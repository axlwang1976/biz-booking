import actionTypes from '../actionTypes';

const initialState = {
  isLoading: false,
  devices: [],
  selectDevice: null,
};

const devicesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_DEVICES_ISLOADING:
      return { ...state, isLoading: true };
    case actionTypes.GET_DEVICES:
      return {
        ...state,
        devices: action.payload,
        selectDevice: null,
        isLoading: false,
      };
    case actionTypes.GET_DEVICE:
      return { ...state, selectDevice: action.payload, isLoading: false };
    case actionTypes.CREATE_DEVICE:
      return {
        ...state,
        devices: [...state.devices, action.payload],
        isLoading: false,
      };
    case actionTypes.DELETE_DEVICE:
      return {
        ...state,
        devices: state.devices.filter((device) => device.ID !== action.payload),
        isLoading: false,
      };
    default:
      return state;
  }
};

export default devicesReducer;
