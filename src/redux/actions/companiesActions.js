import { message } from 'antd';
import axios from 'axios';

import actionTypes from '../actionTypes';

export const setIsloading = () => ({
  type: actionTypes.SET_COMPANIES_ISLOADING,
});

export const getCompanies = (auth) => async (dispatch) => {
  try {
    dispatch(setIsloading());
    const res = await axios.get('/CompanyApi/Companies', {
      headers: {
        Accesstoken: auth.Accesstoken,
        Client: auth.Client,
        Uid: auth.Uid,
      },
    });
    dispatch({ type: actionTypes.GET_COMPANIES, payload: res.data.Data });
  } catch (error) {
    console.log(error);
    message.error('Server error, please contact your administartor.');
  }
};

export const getCompany = (auth, id) => async (dispatch) => {
  try {
    dispatch(setIsloading());
    const res = await axios.get(`/CompanyApi/Company/ID/${id}`, {
      headers: {
        Accesstoken: auth.Accesstoken,
        Client: auth.Client,
        Uid: auth.Uid,
      },
    });
    dispatch({ type: actionTypes.GET_COMPANY, payload: res.data.Data });
  } catch (error) {
    console.log(error);
    message.error('Server error, please contact your administartor.');
  }
};

export const createOrUpdateCompany = (auth, newCompany) => async (dispatch) => {
  try {
    dispatch(setIsloading());
    const res = await axios.post('/CompanyApi/Company', newCompany, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accesstoken: auth.Accesstoken,
        Client: auth.Client,
        Uid: auth.Uid,
      },
    });
    dispatch({ type: actionTypes.CREATE_OR_UPDATE_COMPANY, payload: res.data });
    message.success('Company create or update successful');
  } catch (error) {
    console.log(error);
    message.error('Server error, please contact your administartor.');
  }
};
