import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button,TextField,Box , Paper, Typography } from '@mui/material';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import Image from 'next/image';
import {Dialog ,DialogActions ,DialogContent ,DialogContentText ,DialogTitle} from '@mui/material';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import { addCardInfo } from '../actions/userinfo.action';
const CardDetails = () => {
  const auth = useSelector((state) => state.auth);
  const userinfo = useSelector((state) => state.userinfo);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    cardnumber: 0,
    name: '',
    expiry: '',
    cvv: 0,
    cardtype: '',
  });
  const handleClickOpen = () => {
    auth.authenticate?setOpen(true):document.getElementById('signin-btn').click()
  };
  const clearNumber = (value = '') => {
    return value.replace(/\D+/g, '');
  };
  const formatCreditCardNumber = (value) => {
    return value.slice(0, 12);
  };
  const formatCVV = (value, prevValue, allValues = {}) => {
    const clearValue = clearNumber(value);
    let maxLength = 4;

    if (allValues.number) {
      const issuer = Payment.fns.cardType(allValues.number);
      maxLength = issuer === 'amex' ? 4 : 3;
    }

    return clearValue.slice(0, maxLength);
  };

  const formatExpirationDate = (value) => {
    const clearValue = clearNumber(value);

    if (clearValue.length >= 3) {
      return `${clearValue.slice(0, 2)}/${clearValue.slice(2, 4)}`;
    }

    return clearValue;
  };
  const handleSubmit = () => {
    dispatch(addCardInfo(state,auth.accessToken,userinfo))
  };
  const handleInputChange = ({ target }) => {
    if (target.name === 'cardnumber') {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === 'expiry') {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === 'cvv') {
      target.value = formatCVV(target.value);
    } else if (target.name === 'cardtype') {
      target.value = target.value;
    }
    setState({ ...state, [target.name]: target.value });
  };
  return (
    <Box
    className="profile-card"
    sx={{
      // marginLeft: "226px",
      marginLeft: { xs: "55px", sm: "150px", md: "240px" },
      width: { xs: "80vw", sm: "50vw", md: "40vw" },
      padding: "20px"
    }}
  >

    <DialogContent>
      <br />
      <FormControl>
        <FormLabel id="">Card Type</FormLabel>
        <RadioGroup row name="row-card-group">
          <FormControlLabel
            value="debitCard"
            name="cardtype"
            control={<Radio />}
            label="Debit Card"
            onChange={handleInputChange}
          />
          <FormControlLabel
            name="cardtype"
            value="creditCard"
            control={<Radio />}
            label="Credit Card"
            onChange={handleInputChange}
          />
        </RadioGroup>
      </FormControl>
      <TextField
      sx={{ mt: '10px', mr: '20px' }}
        margin="dense"
        id="outlined-basic"
        name="name"
        label="Name on Card"
        type="text"
        fullWidth
        size="small"
        onChange={handleInputChange}
      />
      <TextField
        sx={{ mt: '10px', mr: '20px' }}
        id="outlined-basic"
        label="Card Number"
        name="cardnumber"
        pattern="[\d| ]{16,22}"
        type="number"
        fullWidth
        size="small"
        onChange={handleInputChange}
      />
      <div>
        <TextField
          sx={{ width: '30%', mt: '10px', mr: '20px' }}
          id="outlined-basic"
          label="Expiry Date"
          name="expiry"
          pattern="\d\d/\d\d"
          onChange={handleInputChange}
          size="small"
        />
        <TextField
          sx={{ width: '30%', mt: '10px', mr: '20px' }}
          id="outlined-basic"
          label="CVV"
          name="cvv"
          type="password"
          size="small"
          onChange={handleInputChange}
        />
      </div>
    </DialogContent>
    <DialogActions>
      <Button
      variant="contained"
        onClick={() => {handleSubmit()
        }}
      >
        Submit
      </Button>
    </DialogActions>
  </Box>

  );
};

export default CardDetails;
