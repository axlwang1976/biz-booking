import actionTypes from '../actionTypes';

const initialState = {
  isLoading: false,
  equipments: [],
  selectEquipment: null,
};

const equipmentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_EQUIPMENTS_ISLOADING:
      return { ...state, isLoading: true };
    case actionTypes.GET_EQUIPMENTS:
      return {
        ...state,
        equipments: action.payload,
        selectEquipment: null,
        isLoading: false,
      };
    case actionTypes.GET_EQUIPMENT:
      return {
        ...state,
        selectEquipment: action.payload,
        isLoading: false,
      };
    case actionTypes.CREATE_OR_UPDATE_EQUIPMENT:
      return {
        ...state,
        equipments: [...state.equipments, action.payload],
        isLoading: false,
      };
    case actionTypes.DELETE_EQUIPMENT:
      return {
        ...state,
        equipments: state.equipments.filter(
          (equipment) => equipment.ID !== action.payload
        ),
        isLoading: false,
      };
    default:
      return state;
  }
};

export default equipmentsReducer;
