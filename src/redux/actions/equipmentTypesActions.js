import { message } from 'antd';
import axios from 'axios';

import actionTypes from '../actionTypes';

export const setIsloading = () => ({
  type: actionTypes.SET_EQUIPMENTTYPES_ISLOADING,
});

export const getEquipmentTypes = (auth) => async (dispatch) => {
  try {
    dispatch(setIsloading());
    const res = await axios.get('/RoomApi/EquipTypes', {
      headers: {
        Accesstoken: auth.Accesstoken,
        Client: auth.Client,
        Uid: auth.Uid,
      },
    });
    dispatch({ type: actionTypes.GET_EQUIPMENTTYPES, payload: res.data.Data });
  } catch (error) {
    console.log(error);
    message.error('Server error, please contact your administartor.');
  }
};

export const getEquipmentType = (auth, id) => async (dispatch) => {
  try {
    dispatch(setIsloading());
    const res = await axios.get(`/RoomApi/EquipType/SN/${id}`, {
      headers: {
        Accesstoken: auth.Accesstoken,
        Client: auth.Client,
        Uid: auth.Uid,
      },
    });
    dispatch({ type: actionTypes.GET_EQUIPMENTTYPE, payload: res.data.Data });
  } catch (error) {
    console.log(error);
    message.error('Server error, please contact your administartor.');
  }
};

export const createOrUpdateEquipmentType = (auth, type) => async (dispatch) => {
  try {
    dispatch(setIsloading());
    const res = await axios.post('/RoomApi/EquipType', type, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accesstoken: auth.Accesstoken,
        Client: auth.Client,
        Uid: auth.Uid,
      },
    });
    dispatch({
      type: actionTypes.CREATE_OR_UPDATE_EQUIPMENTTYPE,
      payload: res.data,
    });
    message.success('Equipment type create or update successful');
  } catch (error) {
    console.log(error);
    message.error('Server error, please contact your administartor.');
  }
};

export const deleteEquipmentType = (auth, id) => async (dispatch) => {
  try {
    dispatch(setIsloading());
    await axios.delete(`/RoomApi/EquipType/SN/${id}`, {
      headers: {
        Accesstoken: auth.Accesstoken,
        Client: auth.Client,
        Uid: auth.Uid,
      },
    });
    dispatch({ type: actionTypes.DELETE_EQUIPMENTTYPE, payload: id });
    message.success('Equipment type delete successful');
  } catch (error) {
    console.log(error);
    message.error('Server error, please contact your administartor.');
  }
};
