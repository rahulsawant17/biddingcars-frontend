import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { signup, signin, googleSignIn } from "../actions/auth.action";
import { TextField, Button } from "@mui/material";
import AdminCheckbox from "./AdminCheckbox";
import Checkbox from '@mui/material/Checkbox';
// import RightDrawer from './RightDrawer';

const Signin = ({ createAccount }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(signin({ email, password ,role}));
  };
  const googleSign = () => {
    dispatch(googleSignIn());
  };
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "55vh",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <div>
              <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <TextField
                type="password"
                id="outlined-basic"
                label="Password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* <AdminCheckbox isadmin={<Checkbox onChange={(e) => {
              if(e.target.checked){
                setRole('admin')
              }
              else{
                setRole('user')
              }

        }} />}/> */}
            <Button
              type="submit"
              variant="outlined"
              sx={{
                height: "7vh",
                fontSize: "1.1rem",
                fontWeight: 500,
                mx: 3,
                textTransform: "capitalize",
                width: "100px",
              }}
            >
              Login
            </Button>
            {createAccount}
            {/* <a href="#">Forgot password?</a> */}
            <Button
              type="submit"
              onClick={() => {
                setEmail("dummy@gmail.com");
                setPassword("dummy123");
              }}
              variant="outlined"
            >
              Sign In Using Dummy Account
            </Button>
            <Button onClick={() => googleSign()} variant="outlined">
              Sign In With Google
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signin;
