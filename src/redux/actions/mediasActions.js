import { message } from 'antd';
import axios from 'axios';

import actionTypes from '../actionTypes';

export const setIsloading = () => ({ type: actionTypes.SET_MEDIAS_ISLOADING });

export const getMedias = (auth) => async (dispatch) => {
  try {
    dispatch(setIsloading());
    const res = await axios.get('/ContentApi/Medias', {
      headers: {
        Accesstoken: auth.Accesstoken,
        Client: auth.Client,
        Uid: auth.Uid,
      },
    });
    dispatch({ type: actionTypes.GET_MEDIAS, payload: res.data.Data });
  } catch (error) {
    console.log(error);
    message.error('Server error, please contact your administartor.');
  }
};

export const deleteMedia = (auth, id) => async (dispatch) => {
  try {
    dispatch(setIsloading());
    await axios.delete(`/ContentApi/Media/SN/${id}`, {
      headers: {
        Accesstoken: auth.Accesstoken,
        Client: auth.Client,
        Uid: auth.Uid,
      },
    });
    dispatch({ type: actionTypes.DELETE_MEDIA, payload: id });
  } catch (error) {
    console.log(error);
    message.error('Server error, please contact your administartor.');
  }
};
