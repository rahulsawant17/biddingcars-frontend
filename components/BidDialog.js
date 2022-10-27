import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { Button,TextField , Paper, Typography } from '@mui/material';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import Image from 'next/image';
import {Dialog ,DialogActions ,DialogContent ,DialogContentText ,DialogTitle} from '@mui/material';
const BidDialog = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    auth.authenticate?setOpen(true):document.getElementById('signin-btn').click()
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
      <>
        <DialogTitle>Card Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your card details to continue your bid
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </>

  );
};

export default BidDialog;
