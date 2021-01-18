import actionTypes from '../actionTypes';

const initialState = {
  isLoading: false,
  equipmentTypes: [],
  selectEquipmentType: null,
};

const equipmentTypesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_EQUIPMENTTYPES_ISLOADING:
      return { ...state, isLoading: true };
    case actionTypes.GET_EQUIPMENTTYPES:
      return {
        ...state,
        equipmentTypes: action.payload,
        selectEquipmentType: null,
        isLoading: false,
      };
    case actionTypes.GET_EQUIPMENTTYPE:
      return {
        ...state,
        selectEquipmentType: action.payload,
        isLoading: false,
      };
    case actionTypes.CREATE_OR_UPDATE_EQUIPMENTTYPE:
      return {
        ...state,
        equipmentTypes: [...state.equipmentTypes, action.payload],
        isLoading: false,
      };
    case actionTypes.DELETE_EQUIPMENTTYPE:
      return {
        ...state,
        equipmentTypes: state.equipmentTypes.filter(
          (type) => type.ID !== action.payload
        ),
        isLoading: false,
      };
    default:
      return state;
  }
};

export default equipmentTypesReducer;
