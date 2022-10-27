import { useSelector, useDispatch } from "react-redux";
import  {  checkSignin } from "../actions/auth.action";
import { useEffect } from "react";
import Reqsignin from "./Reqsignin";
export default function Requireauth(Children) {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkSignin());
  }, []);

 return auth.authenticate?<Children/>:<Reqsignin/>

}
