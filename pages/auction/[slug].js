import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { Button, TextField, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { getTimeline,getHistory } from '../../actions/timeline.action';
import Image from 'next/image';
import BidDialog from '../../components/BidDialog';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import { toast } from 'react-toastify';
import { postBid } from '../../actions/bidding.action';
import { checkSignin } from '../../actions/auth.action';
import AuctionHistory from '../../components/AuctionHistory';

const AuctionDetail = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    query: { slug },
  } = router;
  const timeline = useSelector((state) => state.timeline);
  const auth = useSelector((state) => state.auth);
  const [car, setCar] = useState(null);
  useEffect(() => {
    dispatch(checkSignin());
    dispatch(getTimeline());
  }, []);

  useEffect(() => {
    setCar(timeline.timeline.filter((e) => e._id === slug)[0]);
  }, [slug, timeline]);

  const toIndianCurrency = (num) => {
    const curr = num?.toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
    });
    return curr;
  };
  const [open, setOpen] = React.useState(false);
  const [step, setStep] = useState(1);
  const [newbid, setNewbid] = useState();
  const [state, setState] = React.useState({
    cardnumber: '',
    name: '',
    expiry: '',
    cvv: '',
    cardtype: '',
    focused: '',
  });

  const handleClickOpen = () => {
    auth.authenticate ? setOpen(true) : document.getElementById('signin-btn').click();
  };
  const handleClose = () => {
    setOpen(false);
    dispatch(
      postBid(
        {
          car,
          email: auth.userId,
          bid: newbid,
        },
        auth.accessToken,
      ),
    );
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

  const carSnippets = {
    width: {
      xs: '100%',
      sm: '100%',
      md: '46%',
    },
    height: {
      xs: '100%',
      sm: '15%',
      md: '15%',
    },
    p: '5px',
    mx: '10px',
    my: '5px',
  };

  const innerSnippet = {
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    fontSize: { xs: '1.2rem', sm: '1.2rem', md: '1.3rem' },
  };

  const innerSnippetUpper = {
    padding: '5px',
    fontWeight: '600',
    borderBottom: '1px solid lightgray',
  };

  const carAttributes = {
    display: 'flex',
    width: '100&',
    justifyContent: 'space-between',
    fontSize: '17px',
    mt: '10px',
  };
  const carddetails = () => {
    return (
      <>
        <DialogTitle>Card Details</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter your card details to continue your bid</DialogContentText>
          <br />
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
            autoFocus
            margin="dense"
            id="outlined-basic"
            name="name"
            label="Name on Card"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleInputChange}
          />
          <TextField
            // autoFocus
            id="outlined-basic"
            label="Card Number"
            name="cardnumber"
            pattern="[\d| ]{16,22}"
            variant="standard"
            // margin="dense"
            type="number"
            fullWidth
            onChange={handleInputChange}
          />
          <div>
            <TextField
              sx={{ width: '20%', mt: '10px', mr: '20px' }}
              id="outlined-basic"
              label="Expiry Date"
              name="expiry"
              pattern="\d\d/\d\d"
              variant="standard"
              onChange={handleInputChange}
              // type="number"
              // value={modelYear}
              // onChange={(e) => setModelYear(e.target.value)}
            />
            <TextField
              sx={{ width: '20%', mt: '10px', mr: '20px' }}
              id="outlined-basic"
              label="CVV"
              name="cvv"
              variant="standard"
              type="password"
              onChange={handleInputChange}
              // value={modelYear}
              // onChange={(e) => setModelYear(e.target.value)}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              setStep(2);
            }}
          >
            Next
          </Button>
        </DialogActions>
      </>
    );
  };
  const bid = () => {
    return (
      <>
        <DialogTitle>Current Bid:₹ {car?.currentBid}</DialogTitle>
        <DialogContent>
          <DialogContentText>Place a bid greater than the current bid</DialogContentText>
          <br />
          <br />

          <TextField
            autoFocus
            margin="dense"
            id="name"
            value={newbid}
            label="Enter your Bid"
            type="text"
            fullWidth
            variant="standard"
            onChange={(event) => {
              setNewbid(event.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setStep(1);
            }}
          >
            Back
          </Button>
          <Button
            onClick={() => {
              if (Number(newbid) > car?.currentBid) {
                setStep(3);
              } else {
                toast('Bid amount should be greater than the current bid', { type: 'warning' });
              }
            }}
          >
            Next
          </Button>
        </DialogActions>
      </>
    );
  };
  const confirmbid = () => {
    return (
      <>
        <DialogTitle>Comfirm Bid</DialogTitle>
        <DialogContent>
          <DialogContentText>Please Confirm your bid amount and place the bid</DialogContentText>
          <br />
          <br />
          <DialogContentText>Current Bid : ₹ {car?.currentBid}</DialogContentText>
          <br />
          <br />
          <DialogContentText>Your Bid : ₹ {newbid}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setStep(2);
            }}
          >
            Back
          </Button>
          <Button
            onClick={() => {
              handleClose();
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </>
    );
  };
  const page = () => {
    switch (step) {
      case 1:
        return carddetails();
      case 2:
        return bid();
      case 3:
        return confirmbid();
    }
  };
  return (
    <div>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <Box
          sx={{
            width: {
              xs: '100vw',
              sm: '60vw',
              md: '50vw',
            },
          }}
        >
          <Typography variant="h4">
            {car?.modelYear} {car?.carCompany} {car?.modelName}
          </Typography>
          <Box sx={{ mt: { xs: '2vh', sm: '12vh', md: '6vh' } }}>
            <Carousel>
              {car?.photos.map((item, index) => (
                <Image
                  key={index}
                  src={item}
                  width="16"
                  height="9"
                  layout="responsive"
                  alt={car?.modelName}
                  style={{ borderRadius: '10px' }}
                />
              ))}
            </Carousel>
          </Box>
        </Box>
        <Box
          sx={{
            width: {
              xs: '100vw',
              sm: '30vw',
              md: '40vw',
            },
            height: '',
            mx: 'auto',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}
        >
          <Paper variant="outlined" sx={carSnippets}>
            <Paper variant="outlined" sx={innerSnippet}>
              <Box sx={innerSnippetUpper}>Current Bid</Box>

              <Box sx={{ padding: '5px', textAlign: 'right' }}>{toIndianCurrency(car?.currentBid)}</Box>
            </Paper>
          </Paper>
          <Paper variant="outlined" sx={carSnippets}>
            <Paper variant="outlined" sx={innerSnippet}>
              <Box sx={innerSnippetUpper}>Time left</Box>
              <Box sx={{ padding: '5px', textAlign: 'right' }}>08:24:50:90</Box>
            </Paper>
          </Paper>
          <Paper variant="outlined" sx={carSnippets}>
            <Paper variant="outlined" sx={innerSnippet}>
              <Box sx={innerSnippetUpper}>Total Bids</Box>
              <Box sx={{ padding: '5px', textAlign: 'right' }}>{(car?.numberOfBids)?(car?.numberOfBids):0}</Box>
            </Paper>
          </Paper>
          <Paper variant="outlined" sx={carSnippets}>
            <Button
              onClick={handleClickOpen}
              variant="contained"
              color="secondary"
              sx={{
                width: '100%',
                p: '15px',
                fontSize: { xs: '25px', sm: '20px', md: '36px' },
              }}
            >
              Place Bid
            </Button>
            
          </Paper>
          <Dialog open={open} onClose={handleClose}>
            {page()}
          </Dialog>
          <Box
            sx={{
              display: { xs: 'none', sm: 'none', md: 'block' },
              p: '15px',
              width: '100%',
            }}
          >
            <Box sx={{ fontSize: '25px' }}>Details</Box>
            <Box sx={carAttributes}>
              <Box sx={{ color: 'text.secondary' }}>Company</Box>
              <Box sx={{ color: 'text.primary' }}>{car?.carCompany} </Box>
            </Box>
            <Box sx={carAttributes}>
              <Box sx={{ color: 'text.secondary' }}>Model Name</Box>
              <Box sx={{ color: 'text.primary' }}>{car?.modelName} </Box>
            </Box>
            <Box sx={carAttributes}>
              <Box sx={{ color: 'text.secondary' }}>Model Year</Box>
              <Box sx={{ color: 'text.primary' }}>{car?.modelYear} </Box>
            </Box>
            <Box sx={carAttributes}>
              <Box sx={{ color: 'text.secondary' }}>Color</Box>
              <Box sx={{ color: 'text.primary' }}>{car?.color}</Box>
            </Box>
            <Box sx={carAttributes}>
              <Box sx={{ color: 'text.secondary' }}>Kilometers Driven</Box>
              <Box sx={{ color: 'text.primary' }}>{car?.kilometersDriven} Km</Box>
            </Box>
            <Box sx={carAttributes}>
              <Box sx={{ color: 'text.secondary' }}>Base Price</Box>
              <Box sx={{ color: 'text.primary' }}>{toIndianCurrency(car?.basePrice)} </Box>
            </Box>
            <Box sx={carAttributes}>
              <Box sx={{ color: 'text.secondary' }}>Sticker Price</Box>
              <Box sx={{ color: 'text.primary' }}>{toIndianCurrency(car?.fullPrice)} </Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: { xs: 'block', sm: 'block', md: 'none' },
            p: '15px',
            width: '100%',
          }}
        >
          {/* <Box>{car?.description}</Box> */}
          <Box sx={{ fontSize: '25px' }}>Details</Box>
          <Box sx={carAttributes}>
            <Box sx={{ color: 'text.secondary' }}>Company</Box>
            <Box sx={{ color: 'text.primary' }}>{car?.carCompany} </Box>
          </Box>
          <Box sx={carAttributes}>
            <Box sx={{ color: 'text.secondary' }}>Model Name</Box>
            <Box sx={{ color: 'text.primary' }}>{car?.modelName} </Box>
          </Box>
          <Box sx={carAttributes}>
            <Box sx={{ color: 'text.secondary' }}>Model Year</Box>
            <Box sx={{ color: 'text.primary' }}>{car?.modelYear} </Box>
          </Box>
          <Box sx={carAttributes}>
            <Box sx={{ color: 'text.secondary' }}>Color</Box>
            <Box sx={{ color: 'text.primary' }}>{car?.color}</Box>
          </Box>
          <Box sx={carAttributes}>
            <Box sx={{ color: 'text.secondary' }}>Kilometers Driven</Box>
            <Box sx={{ color: 'text.primary' }}>{car?.kilometersDriven} Km</Box>
          </Box>
          <Box sx={carAttributes}>
            <Box sx={{ color: 'text.secondary' }}>Base Price</Box>
            <Box sx={{ color: 'text.primary' }}>{toIndianCurrency(car?.basePrice)} </Box>
          </Box>
          <Box sx={carAttributes}>
            <Box sx={{ color: 'text.secondary' }}>Sticker Price</Box>
            <Box sx={{ color: 'text.primary' }}>{toIndianCurrency(car?.fullPrice)} </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Box
            sx={{
              p: '15px',
              width: {
                xs: '100vw',
                sm: '100vw',
                md: '45vw',
              },
              fontSize: '18px',
              color: 'text.primary',
            }}
          >
            <Box sx={{ fontSize: '22px', color: 'text.secondary', mb: '10px' }}>Description</Box>
            {car?.description}
          </Box>
          <Box
            sx={{
              p: '15px',
              width: {
                xs: '100vw',
                sm: '100vw',
                md: '45vw',
              },
              fontSize: '18px',
              color: 'text.primary',
            }}
          >
            <Box sx={{ fontSize: '22px', color: 'text.secondary', mb: '10px' }}>Condition</Box>
            {car?.condition}
          </Box>
          <Box></Box>
          <AuctionHistory id={car?._id} />
        </Box>
      </Box>
    </div>
  );
};

export default AuctionDetail;
