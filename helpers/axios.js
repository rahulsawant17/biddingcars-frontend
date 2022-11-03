import axios from 'axios';
import { api } from './urlConfig';
import store from '../store';
import { authConstants } from '../actions/constants';
import { useSelector } from 'react-redux';

let token = false;
if (typeof window !== 'undefined') {
  token = window.localStorage.getItem('token');
}



// const auth = useSelector((state) => state.auth);

const axiosIntance = axios.create({
  baseURL: api,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// axiosIntance.interceptors.response.use(
//   (res) => {
//     return res;
//   },
//   (error) => {
//     // console.log(error.response);
//     const status = error.response ? error.response.status : 500;
//     if (status && status === 500) {
//       localStorage.clear();
//       store.dispatch({ type: authConstants.SIGNOUT_SUCCESS });
//     }
//     return Promise.reject(error);
//   },
// );

export default axiosIntance;
