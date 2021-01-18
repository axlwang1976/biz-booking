import { message } from 'antd';
import axios from 'axios';

import actionTypes from '../actionTypes';

export const setIsloading = () => ({
  type: actionTypes.SET_AREAS_ISLOADING,
});

export const getAreas = (auth) => async (dispatch) => {
  try {
    dispatch(setIsloading());
    const res = await axios.get('/RoomApi/Areas', {
      headers: {
        Accesstoken: auth.Accesstoken,
        Client: auth.Client,
        Uid: auth.Uid,
      },
    });
    dispatch({ type: actionTypes.GET_AREAS, payload: res.data.Data });
  } catch (error) {
    console.log(error);
    message.error('Server error, please contact your administartor.');
  }
};

export const getArea = (auth, id) => async (dispatch) => {
  try {
    dispatch(setIsloading());
    const res = await axios.get(`/RoomApi/Area/SN/${id}`, {
      headers: {
        Accesstoken: auth.Accesstoken,
        Client: auth.Client,
        Uid: auth.Uid,
      },
    });
    dispatch({ type: actionTypes.GET_AREA, payload: res.data.Data });
  } catch (error) {
    console.log(error);
    message.error('Server error, please contact your administartor.');
  }
};

export const createOrUpdateArea = (auth, area) => async (dispatch) => {
  try {
    dispatch(setIsloading());
    const res = await axios.post('/RoomApi/Area', area, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accesstoken: auth.Accesstoken,
        Client: auth.Client,
        Uid: auth.Uid,
      },
    });
    dispatch({ type: actionTypes.CREATE_OR_UPDATE_AREA, payload: res.data });
    message.success('Area create or update successful');
  } catch (error) {
    console.log(error);
    message.error('Server error, please contact your administartor.');
  }
};

export const deleteArea = (auth, id) => async (dispatch) => {
  try {
    dispatch(setIsloading());
    await axios.delete(`/RoomApi/Area/SN/${id}`, {
      headers: {
        Accesstoken: auth.Accesstoken,
        Client: auth.Client,
        Uid: auth.Uid,
      },
    });
    dispatch({ type: actionTypes.DELETE_AREA, payload: id });
    message.success('Area delete successful');
  } catch (error) {
    console.log(error);
    message.error('Server error, please contact your administartor.');
  }
};
