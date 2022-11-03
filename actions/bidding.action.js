import axios from '../helpers/axios';
import { biddingConstants } from './constants';
import { toast } from 'react-toastify';

export const postBid = (body, token) => async (dispatch) => {
  try {
    dispatch({ type: biddingConstants.POST_BID_REQUEST });
    const res = await axios.post(`/cars/placebid`, body, { headers: { Authorization: 'Bearer ' + token } });
    if (res.status === 200) {
      dispatch({ type: biddingConstants.POST_BID_SUCCESS, payload: res.data });

      if (res.data.message != 'Owner is trying to bid') {
        toast(res.data.message, { type: 'success' });
        window.location.reload();
      } else {
        toast('Owner cannot bid on the car!',{type:'warning'})
      }
    } else {
      dispatch({ type: biddingConstants.POST_BID_FAILURE });
      toast('Something went wrong.', { type: 'error' });
    }
  } catch (err) {
    dispatch({ type: biddingConstants.POST_BID_FAILURE });
    toast('Something went wrong.', { type: 'error' });
  }
};

export const postBidCheck = (body, token) => async (dispatch) => {
  try {
    const check = await axios.post(`/cars/placebidcheck`, body, { headers: { Authorization: 'Bearer ' + token } });
   return check.data
    // dispatch({ type: biddingConstants.POST_BID_REQUEST });
    // const res = await axios.post(`/cars/placebid`, body, { headers: { Authorization: 'Bearer ' + token } });
    // if (res.status === 200) {
    //   dispatch({ type: biddingConstants.POST_BID_SUCCESS, payload: res.data });

    //   if (res.data.message != 'Owner is trying to bid') {
    //     toast(res.data.message, { type: 'success' });
    //     window.location.reload();
    //   } else {
    //     toast('Owner cannot bid on the car!',{type:'warning'})
    //   }
    // } else {
    //   dispatch({ type: biddingConstants.POST_BID_FAILURE });
    //   toast('Something went wrong.', { type: 'error' });
    // }
  } catch (err) {
    dispatch({ type: biddingConstants.POST_BID_FAILURE });
    toast('Something went wrong.', { type: 'error' });
  }
};