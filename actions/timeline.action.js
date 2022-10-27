import axios from '../helpers/axios';
import { timelineConstants } from './constants';
import { toast } from 'react-toastify';

export const getTimeline = () => async (dispatch) => {
  try {
    dispatch({ type: timelineConstants.GET_TIMELINE_REQUEST });
    const res = await axios.get(`/cars`);
    if (res.status === 200) {
      // console.log(res.data)
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
      console.log(res.data.history.timeline)
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
