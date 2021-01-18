import { message } from 'antd';
import axios from 'axios';

import actionTypes from '../actionTypes';

export const setIsloading = () => ({
  type: actionTypes.SET_USERS_ISLOADING,
});

export const getUsers = (auth) => async (dispatch) => {
  try {
    dispatch(setIsloading());
    const res = await axios.get('/AccountApi/Users', {
      headers: {
        Accesstoken: auth.Accesstoken,
        Client: auth.Client,
        Uid: auth.Uid,
      },
    });
    dispatch({ type: actionTypes.GET_USERS, payload: res.data.Data });
  } catch (error) {
    console.log(error);
    message.error('Server error, please contact your administartor.');
  }
};

export const getUser = (auth, id) => async (dispatch) => {
  try {
    dispatch(setIsloading());
    const res = await axios.get(`/AccountApi/User/SN/${id}`, {
      headers: {
        Accesstoken: auth.Accesstoken,
        Client: auth.Client,
        Uid: auth.Uid,
      },
    });
    dispatch({ type: actionTypes.GET_USER, payload: res.data.Data });
  } catch (error) {
    console.log(error);
    message.error('Server error, please contact your administartor.');
  }
};

export const createOrUpdateUser = (auth, user) => async (dispatch) => {
  try {
    dispatch(setIsloading());
    const res = await axios.post('/AccountApi/User', user, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accesstoken: auth.Accesstoken,
        Client: auth.Client,
        Uid: auth.Uid,
      },
    });
    dispatch({ type: actionTypes.CREATE_OR_UPDATE_USER, payload: res.data });
    message.success('User create or update successful');
  } catch (error) {
    console.log(error);
    message.error('Server error, please contact your administartor.');
  }
};

export const deleteUser = (auth, id) => async (dispatch) => {
  try {
    dispatch(setIsloading());
    await axios.delete(`/AccountApi/User/SN/${id}`, {
      headers: {
        Accesstoken: auth.Accesstoken,
        Client: auth.Client,
        Uid: auth.Uid,
      },
    });
    dispatch({ type: actionTypes.DELETE_USER, payload: id });
    message.success('User delete successful');
  } catch (error) {
    console.log(error);
    message.error('Server error, please contact your administartor.');
  }
};
