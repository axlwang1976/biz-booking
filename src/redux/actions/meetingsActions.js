import { message } from 'antd';
import axios from 'axios';

import actionTypes from '../actionTypes';

export const setIsloading = () => ({
  type: actionTypes.SET_MEETINGS_ISLOADING,
});

export const getMeetings = (auth) => async (dispatch) => {
  try {
    dispatch(setIsloading());
    const res = await axios.get('/MeetingApi/Meetings', {
      headers: {
        Accesstoken: auth.Accesstoken,
        Client: auth.Client,
        Uid: auth.Uid,
      },
    });
    dispatch({ type: actionTypes.GET_MEETINGS, payload: res.data.Data });
  } catch (error) {
    console.log(error);
    message.error('Server error, please contact your administartor.');
  }
};

export const getMeeting = (auth, id) => async (dispatch) => {
  try {
    dispatch(setIsloading());
    const res = await axios.get(`/MeetingApi/Meeting/SN/${id}`, {
      headers: {
        Accesstoken: auth.Accesstoken,
        Client: auth.Client,
        Uid: auth.Uid,
      },
    });
    dispatch({ type: actionTypes.GET_MEETING, payload: res.data.Data });
  } catch (error) {
    console.log(error);
    message.error('Server error, please contact your administartor.');
  }
};

export const createOrUpdateMeeting = (auth, meeting) => async (dispatch) => {
  try {
    dispatch(setIsloading());
    const res = await axios.post('/MeetingApi/Meeting', meeting, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accesstoken: auth.Accesstoken,
        Client: auth.Client,
        Uid: auth.Uid,
      },
    });
    dispatch({
      type: actionTypes.CREATE_OR_UPDATE_MEETING,
      payload: res.data.Data,
    });
    message.success('Meeting create or update successful');
  } catch (error) {
    console.log(error);
    message.error('Server error, please contact your administartor.');
  }
};

export const deleteMeeting = (auth, id) => async (dispatch) => {
  try {
    dispatch(setIsloading());
    await axios.delete(`/MeetingApi/Meeting/SN/${id}`, {
      headers: {
        Accesstoken: auth.Accesstoken,
        Client: auth.Client,
        Uid: auth.Uid,
      },
    });
    dispatch({ type: actionTypes.DELETE_MEETING, payload: id });
    message.success('Meeting delete successful');
  } catch (error) {
    console.log(error);
    message.error('Server error, please contact your administartor.');
  }
};

export const checkConflict = (auth, startTime, stopTime) => async (
  dispatch
) => {
  try {
    dispatch(setIsloading());
    const res = await axios.get(
      `/MeetingApi/BookingCheck/${startTime}/${stopTime}`,
      {
        headers: {
          Accesstoken: auth.Accesstoken,
          Client: auth.Client,
          Uid: auth.Uid,
        },
      }
    );
    dispatch({ type: actionTypes.CHECK_CONFLICT, payload: res.data.Data });
  } catch (error) {
    console.log(error);
    message.error('Server error, please contact your administartor.');
  }
};
