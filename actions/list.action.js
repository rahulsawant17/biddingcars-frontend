import { listConstants } from "./constants";
import axios from "../helpers/axios";
import { toast } from 'react-toastify';


export const listCar = (form,token,userinfo) => async (dispatch) => {
    try {
      dispatch({ type: listConstants.POST_LIST_REQUEST });
      console.log('form',form,userinfo)
      const res = await axios.post(`/cars/add`,form
      ,{ headers: { Authorization: "Bearer " + token ,user:JSON.stringify(userinfo)}});
      if (res.status === 200) {
        dispatch({ type: listConstants.POST_LIST_SUCCESS, payload: res.data });
        toast('Car resistered for approval !', { type: 'success' })
      } else {
        dispatch({ type: listConstants.POST_LIST_FAILURE });
        toast('Registration unsuccessfull', { type: 'error' })
      }
    } catch (err) {
      dispatch({ type: listConstants.POST_LIST_FAILURE });
      toast('Registration unsuccessfull', { type: 'error' })
    }
  };


  export const verifyCar = (id,status,token,userinfo) => async (dispatch) => {
    try {
      const res = await axios.post(`/cars/verify/${id}`,{status:status}
      ,{ headers: { Authorization: "Bearer " + token ,user:JSON.stringify(userinfo)}});
      if (res.status === 200) {
        toast('Car approved successfully !', { type: 'success' })
      } else {
        toast('Car approval unsuccessfull', { type: 'error' })
      }
    } catch (err) {
      toast('Car approval unsuccessfull', { type: 'error' })
    }
  };

  export const rejectCar = (id,status,token,userinfo) => async (dispatch) => {
    try {
      const res = await axios.post(`/cars/reject/${id}`,{status:status}
      ,{ headers: { Authorization: "Bearer " + token ,user:JSON.stringify(userinfo)}});
      if (res.status === 200) {
        toast('Car rejected successfully !', { type: 'success' })
      } else {
        toast('Car reject unsuccessfull', { type: 'error' })
      }
    } catch (err) {
      toast('Car reject unsuccessfull', { type: 'error' })
    }
  };