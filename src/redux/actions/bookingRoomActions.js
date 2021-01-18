import { message } from 'antd';
import axios from 'axios';

import actionTypes from '../actionTypes';

export const setIsloading = () => ({
  type: actionTypes.SET_BOOKINGROOM_ISLOADING,
});

export const getBookingRoomByRoom = (auth, id) => async (dispatch) => {
  try {
    dispatch(setIsloading());
    const res = await axios.get(`/MeetingApi/Booking/Room/SN/${id}`, {
      headers: {
        Accesstoken: auth.Accesstoken,
        Client: auth.Client,
        Uid: auth.Uid,
      },
    });
    dispatch({
      type: actionTypes.GET_BOOKINGROOM_BY_ROOM,
      payload: res.data.Data,
    });
  } catch (error) {
    console.log(error);
    message.error('Server error, please contact your administartor.');
  }
};

export const getBookingRoomByMeeting = (auth, id) => async (dispatch) => {
  try {
    dispatch(setIsloading());
    const res = await axios.get(`/MeetingApi/Booking/Meeting/SN/${id}`, {
      headers: {
        Accesstoken: auth.Accesstoken,
        Client: auth.Client,
        Uid: auth.Uid,
      },
    });
    dispatch({
      type: actionTypes.GET_BOOKINGROOM_BY_MEETING,
      payload: res.data.Data,
    });
  } catch (error) {
    console.log(error);
    message.error('Server error, please contact your administartor.');
  }
};

export const getBookingRoom = (auth, id) => async (dispatch) => {
  try {
    dispatch(setIsloading());
    const res = await axios.get(`/MeetingApi/Booking/SN/${id}`, {
      headers: {
        Accesstoken: auth.Accesstoken,
        Client: auth.Client,
        Uid: auth.Uid,
      },
    });
    dispatch({ type: actionTypes.GET_BOOKINGROOM, payload: res.data.Data });
  } catch (error) {
    console.log(error);
    message.error('Server error, please contact your administartor.');
  }
};

export const createOrUpdateBookingRoom = (auth, evt) => async (dispatch) => {
  try {
    dispatch(setIsloading());
    const res = await axios.post('/MeetingApi/Booking', evt, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accesstoken: auth.Accesstoken,
        Client: auth.Client,
        Uid: auth.Uid,
      },
    });
    dispatch({
      type: actionTypes.CREATE_OR_UPDATE_BOOKINGROOM,
      payload: res.data,
    });
    message.success('Meeting event create or update successful');
  } catch (error) {
    console.log(error);
    message.error('Server error, please contact your administartor.');
  }
};

export const deleteBookingRoom = (auth, id) => async (dispatch) => {
  try {
    dispatch(setIsloading());
    await axios.delete(`/MeetingApi/Booking/SN/${id}`, {
      headers: {
        Accesstoken: auth.Accesstoken,
        Client: auth.Client,
        Uid: auth.Uid,
      },
    });
    dispatch({ type: actionTypes.DELETE_BOOKINGROOM, payload: id });
    message.success('Meeting event delete successful');
  } catch (error) {
    console.log(error);
    message.error('Server error, please contact your administartor.');
  }
};
