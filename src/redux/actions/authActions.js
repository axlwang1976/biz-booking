import axios from 'axios';
import { message } from 'antd';

import actionTypes from '../actionTypes';

export const setIsloading = () => ({
  type: actionTypes.SET_AUTH_ISLOADING,
});

export const login = (cred) => async (dispatch) => {
  try {
    dispatch(setIsloading());
    const res = await axios.post('/AuthApi/SignIn', cred, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });
    dispatch({
      type: actionTypes.LOG_IN,
      payload: {
        Accesstoken: res.headers.accesstoken,
        Client: res.headers.client,
        Uid: res.headers.uid,
      },
    });
    localStorage.setItem(
      'loginInfo',
      JSON.stringify({
        Accesstoken: res.headers.accesstoken,
        Client: res.headers.client,
        Uid: res.headers.uid,
      })
    );
  } catch (error) {
    message.error(error.response.data.message);
  }
};

export const authLogin = (Accesstoken, Client, Uid) => ({
  type: actionTypes.AUTH_LOG_IN,
  payload: { Accesstoken, Client, Uid },
});

export const logout = () => {
  window.localStorage.removeItem('loginInfo');
  return { type: actionTypes.LOG_OUT };
};
