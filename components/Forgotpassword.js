import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { signup, signin,resetPassword } from "../actions/auth.action";
import { TextField, Button, Card, Alert } from '@mui/material';
const Forgotpassword = ({ forgot }) => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(resetPassword({ email}));
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
              height: "38vh",
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

            <Button
              type="submit"
              variant="outlined"
              sx={{
                height: "7vh",
                fontSize: "1.1rem",
                fontWeight: 500,
                mx: 3,
                textTransform: "capitalize",
                width: "200px",
              }}
            >
              Reset Password
            </Button>
            {forgot}

          </div>
        </div>
      </form>
    </div>
  );
};

export default Forgotpassword;
