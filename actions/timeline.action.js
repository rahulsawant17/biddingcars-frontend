import axios from '../helpers/axios';
import { timelineConstants } from './constants';
import { toast } from 'react-toastify';
import { signout } from './auth.action';

export const getTimeline = () => async (dispatch) => {
  try {
    dispatch({ type: timelineConstants.GET_TIMELINE_REQUEST });
    const res = await axios.get(`/cars`);
    if (res.status === 200) {
      dispatch({ type: timelineConstants.GET_TIMELINE_SUCCESS, payload: res.data });
      // toast('Live Auctions loaded', { type: 'success' })
    } else {
      dispatch({ type: timelineConstants.GET_TIMELINE_FAILURE });
      toast('Something went wrong.', { type: 'error' })
    }
  } catch (err) {
    dispatch({ type: timelineConstants.GET_TIMELINE_FAILURE });
    toast('Something went wrong.', { type: 'error' })
  }
};

export const getHistory = (id) => async (dispatch) => {
  try {
    dispatch({ type: timelineConstants.GET_HISTORY_REQUEST });
    const res = await axios.get(`/cars/${id}/history`);
    if (res.status === 200) {
      dispatch({ type: timelineConstants.GET_HISTORY_SUCCESS, payload: res.data.history.timeline });
      // toast('Live Auctions loaded', { type: 'success' })
    } else {
      dispatch({ type: timelineConstants.GET_HISTORY_FAILURE });
      toast('Something went wrong.', { type: 'error' })
    }
  } catch (err) {
    dispatch({ type: timelineConstants.GET_HISTORY_FAILURE });
    toast('Something went wrong.', { type: 'error' })
  }
};

export const getMyListing = (email,token) => async (dispatch) => {
  try {
    dispatch({ type: timelineConstants.GET_MYLISTING_REQUEST });
    const res = await axios.get(`/cars/mylistings/${email}`
    ,{ headers: { Authorization: "Bearer " + token }});
    if (res.status === 200) {
      dispatch({ type: timelineConstants.GET_MYLISTING_SUCCESS, payload: res.data });
      // toast('Live Auctions loaded', { type: 'success' })
    } else {
      if(res.code=='auth/id-token-expired'){
        toast('Session Expired .Sign in again', { type: 'error' })
          dispatch(signout())
      }
      dispatch({ type: timelineConstants.GET_MYLISTING_FAILURE });
      toast('Something went wrong.', { type: 'error' })
    }
  } catch (err) {
    dispatch({ type: timelineConstants.GET_MYLISTING_FAILURE });
    toast('Something went wrong.', { type: 'error' })
  }
};

export const getMyBids = (email,token) => async (dispatch) => {
  try {
    dispatch({ type: timelineConstants.GET_MYBID_REQUEST });
    const res = await axios.get(`/cars/mybids/${email}`,{ headers: { Authorization: "Bearer " + token }});
    if (res.status === 200) {
      dispatch({ type: timelineConstants.GET_MYBID_SUCCESS, payload: res.data });
      // toast('Live Auctions loaded', { type: 'success' })
    } else {
      dispatch({ type: timelineConstants.GET_MYBID_FAILURE });
      toast('Something went wrong.', { type: 'error' })
    }
  } catch (err) {
    dispatch({ type: timelineConstants.GET_MYBID_FAILURE });
    toast('Something went wrong.', { type: 'error' })
  }
};