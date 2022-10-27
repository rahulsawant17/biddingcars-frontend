import { Box, Button } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment/moment';
import { AiOutlineDown, AiOutlineUp, AiOutlineMail } from 'react-icons/ai';
import { BiUserCircle } from 'react-icons/bi';
import { getHistory } from '../actions/timeline.action';

const AuctionHistory = ({ id }) => {
  const timeline = useSelector((state) => state.timeline);
  const dispatch = useDispatch();
  const ref = useRef(null);

  const [open, setOpen] = useState(false);

  const toIndianCurrency = (num) => {
    const curr = num?.toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
    });
    return curr;
  };

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [timeline]);

  return (
    <Box sx={{}}>
      <Button
        variant="outlined"
        color="secondary"
        sx={{
          width: '200px',
          m: '15px',
        }}
        onClick={() => {
          dispatch(getHistory(id));
          setOpen(!open);
        }}
      >
        bidding history&nbsp;&nbsp;{!open ? <AiOutlineDown /> : <AiOutlineUp />}
      </Button>

      {open
        ? timeline.currentHistory
            .slice(0)
            .reverse()
            .map((e, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  width: {
                    xs: '87vw',
                    sm: '100vw',
                    md: '45vw',
                  },
                  justifyContent: 'space-between',
                  mx: '15px',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center',color: 'text.secondary' }}>
                  <BiUserCircle size="2em" />
                  <Box sx={{ ml: '10px' }}>
                    <Box sx={{ fontSize: '17px', color: 'text.primary' }}>
                      {e.user.firstname}&nbsp;{e.user.lastname}
                    </Box>
                    <Box sx={{ fontSize: '12px', color: 'text.secondary', display: 'flex', alignItems: 'center' }}>
                      <AiOutlineMail size="12px" />
                      <Box>&nbsp;{e.user.email}</Box>
                    </Box>
                  </Box>
                </Box>
                <Box sx={{ fontSize: '17px', color: 'text.primary', mb: '10px' }}>
                  <Box sx={{ fontSize: '17px', color: 'text.primary', textAlign: 'right' }}>
                    {toIndianCurrency(e.bid)}
                  </Box>
                  <Box ref={ref} sx={{ fontSize: '12px', color: 'text.secondary', textAlign: 'right' }}>
                    {moment(e.time).fromNow()}
                  </Box>
                </Box>
              </Box>
            ))
        : null}
    </Box>
  );
};

export default AuctionHistory;
