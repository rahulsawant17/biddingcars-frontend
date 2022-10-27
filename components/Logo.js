import { Box } from '@mui/material';
import React from 'react';
import { AiFillCar } from 'react-icons/ai';
import { RiAuctionLine, RiAuctionFill } from 'react-icons/ri';

const Logo = () => {
  return (
    <Box
      sx={{
        fontSize: { xs: '0.7em', sm: '0.6em', md: '1em' },
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        color: 'text.heading',
        letterSpacing: { xs: '0.5em', sm: '0.4em', md: '0.5em' },
        mx: { md: '0.5em' },
      }}
    >
      <Box sx={{mr:'1em'}}>BIDDING</Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        C<AiFillCar style={{ marginRight: '0.4em' }} />
        RS
      </Box>
    </Box>
  );
};

export default Logo;
