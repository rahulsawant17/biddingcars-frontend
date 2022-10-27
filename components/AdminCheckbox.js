import * as React from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';


export default function AdminCheckbox({isadmin}) {

  return (
    <FormGroup>
      <FormControlLabel control={isadmin} label="Login/Signup as an ADMIN" />
    </FormGroup>
  );
}
