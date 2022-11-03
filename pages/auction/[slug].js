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
import { postBid,postBidCheck } from '../../actions/bidding.action';
import { checkSignin } from '../../actions/auth.action';
import AuctionHistory from '../../components/AuctionHistory';
import moment from 'moment/moment';
import { io } from "socket.io-client";

const socket = io(`https://bidbackend.netlify.app`);
// const socket = io(`http://localhost:4000/.netlify/functions/socketIO`);

const AuctionDetail = () => {

  useEffect(() => {
    socket.on("bid_update", (data) => {
      console.log(data);
      setCar(data);
    });
  }, [socket]);

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

  const handleClickOpen = async () => {
    if(!auth.authenticate){
      document.getElementById('signin-btn').click();
    }else{
      const resdata= await dispatch(postBidCheck( {
        car,
        email: auth.userId,
        role: auth.role,
      },
      auth.accessToken))
      console.log(resdata)
      resdata?.check? resdata.isVerified?setOpen(true):toast('submit your address and card details for verification',{type:'warning'}):toast(resdata?.message,{ type: 'warning' })
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const placebid=()=>{
    dispatch(
      postBid(
        {
          car,
          email: auth.userId,
          role: auth.role,
          bid: newbid,
        },
        auth.accessToken,
      ),
    );
  }

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
              if (Number(newbid) > car?.currentBid) {
                setStep(2);
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
              setStep(1);
            }}
          >
            Back
          </Button>
          <Button
            onClick={() => {
              placebid();
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
        return bid();
      case 2:
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
              <Box sx={{ padding: '5px', textAlign: 'right' }}>{moment(car?.endTime).fromNow()}</Box>
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
