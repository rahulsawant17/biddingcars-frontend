import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";
import { checkSignin } from "../actions/auth.action";
import { Fragment, useEffect, useState } from "react";
import DashboardDrawer from "../components/DashboardDrawer";
import Reqsignin from "../components/Reqsignin";
import { userinfoConstants } from "../actions/constants";
import {
  Box,
  Button,
  Container,
  OutlinedInput,
  Paper,
  TextField,
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import CardDetails from "../components/CardDetails";
import { postUserinfo } from "../actions/userinfo.action";
export default function Profile() {
  const auth = useSelector((state) => state.auth);
  const userinfo = useSelector((state) => state.userinfo);
  const dispatch = useDispatch();
  const [disabledForm, setdisabledForm] = useState(true);
  const [data, setData] = useState({});
  useEffect(() => {
    dispatch(checkSignin());
    setData(userinfo)
  }, []);
  const [page, setPage] = useState("personaldetails")
  const pages = auth.role === "admin"
  ?[{name:'Personal Details',link:'personaldetails'}]:[{name:'Personal Details',link:'personaldetails'},
  {name:'Card Details',link:'carddetails'}];
  const handleEdit = () => {
    dispatch(postUserinfo(userinfo, auth.accessToken, userinfo))
  };
  const personaldetails=<Fragment>
  {/* <DashboardDrawer /> */}
  <Box
    className="profile-card"
    sx={{
      // marginLeft: "226px",
      marginLeft: { xs: "55px", sm: "150px", md: "240px" },
      width: { xs: "80vw", sm: "50vw", md: "40vw" },
      padding: "20px"
    }}
  >

    <Box className="gen-info" sx={{ marginTop: "10px" }}>
      <h3>User Information</h3>
      <Box sx={col}>
        <Box sx={rowhalf}>
          <Box sx={col2}>
            <label sx={txtlabel}>First Name</label>
            <TextField
              disabled={disabledForm}
              size="small"
              value={userinfo.firstName}
              onChange={() => {
                dispatch({
                  type: userinfoConstants.UPDATE_USERINFO,
                  state: { firstName: event.target.value },
                });
              }}
            />
          </Box>
          <Box sx={col2}>
            <label sx={txtlabel}>Last Name</label>
            <TextField disabled={disabledForm} size="small" value={userinfo.lastName}
              onChange={() => {
                dispatch({
                  type: userinfoConstants.UPDATE_USERINFO,
                  state: { lastName: event.target.value },
                });
              }} />
          </Box>
        </Box>
        <Box sx={rowfull}>
          <Box sx={col}>
            <label sx={txtlabel}>Email</label>
            <TextField disabled size="small" value={userinfo.email} />
          </Box>
        </Box>
      </Box>
    </Box>
    <Box className="gen-info" sx={{ marginTop: "40px" }}>
      <h3>Contact Information</h3>
      <Box sx={col}>
        <Box sx={rowfull}>
          <Box sx={col}>
            <label sx={txtlabel}>Address</label>
            <TextField disabled={disabledForm} size="small" value={userinfo.address}
              onChange={() => {
                dispatch({
                  type: userinfoConstants.UPDATE_USERINFO,
                  state: { address: event.target.value },
                });
              }} />
          </Box>
        </Box>
        <Box sx={rowhalf}>
          <Box sx={col2}>
            <label sx={txtlabel}>City</label>
            <TextField disabled={disabledForm} size="small" value={userinfo.city}
              onChange={() => {
                dispatch({
                  type: userinfoConstants.UPDATE_USERINFO,
                  state: { city: event.target.value },
                });
              }} />
          </Box>
          <Box sx={col2}>
            <label sx={txtlabel}>State</label>
            <TextField disabled={disabledForm} size="small" value={userinfo.state}
              onChange={() => {
                dispatch({
                  type: userinfoConstants.UPDATE_USERINFO,
                  state: { state: event.target.value },
                });
              }} />
          </Box>
        </Box>
        <Box sx={rowhalf}>
          <Box sx={col2}>
            <label sx={txtlabel}>Zip Code</label>
            <TextField disabled={disabledForm} size="small" value={userinfo.zipCode}
              onChange={() => {
                dispatch({
                  type: userinfoConstants.UPDATE_USERINFO,
                  state: { zipCode: event.target.value },
                });
              }} />
          </Box>
          <Box sx={col2}>
            <label sx={txtlabel}>Country</label>
            <TextField disabled={disabledForm} size="small" width='30px' value={userinfo.country}
              onChange={() => {
                dispatch({
                  type: userinfoConstants.UPDATE_USERINFO,
                  state: { country: event.target.value },
                });
              }} />
          </Box>
        </Box>
        <Box sx={rowfull}>
          <Box sx={col}>
            <label sx={txtlabel}>Mobile No</label>
            <TextField disabled={disabledForm} size="small" value={userinfo.mobile}
              onChange={() => {
                dispatch({
                  type: userinfoConstants.UPDATE_USERINFO,
                  state: { mobile: event.target.value },
                });
              }} />
          </Box>
        </Box>
      </Box>
    </Box>
    <Box sx={editbutton}>
      <Box sx={editbutton}>
        <Button
          // sx={{ display: `${btnDisplay}` }}
          sx={{display:disabledForm?'inline':'none'}}
          variant="contained"
          onClick={() => {
            setdisabledForm(false);
          }}
        >
          Edit
        </Button>

      <Button
        sx={{display:disabledForm?'none':'inline'}}
        marginLeft="10px"
        variant="contained"
        onClick={() => {
          handleEdit();
        }}
      >
        Update Changes
      </Button>
      <Button
        sx={{display:disabledForm?'none':'inline'}}
        variant="contained"
        onClick={() => {
          setdisabledForm(true);
          dispatch({
            type: userinfoConstants.UPDATE_USERINFO,
            state: data,
          });
        }}
      >
        Cancel
      </Button>
      </Box>
    </Box>
  </Box>
</Fragment>
  const step = () => {
    switch (page) {
      case "personaldetails":
        return personaldetails;
      case "carddetails":
        return <CardDetails/>;
    }
  };
  return !auth.authenticate ? (
    <Reqsignin />
  ) :
    ( <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardDrawer />
      <Box sx={{ width: "160px",marginLeft: { xs: "30px", sm: "150px", md: "230px" },}}>
        <List sx={{ display: "-webkit-box" }}>
          {pages.map((page) => (
            <ListItem key={page.name} disablePadding>
              <ListItemButton sx={{ textAlign: "center" }} onClick={()=>{setPage(page.link)
              }}>
                <ListItemText primary={page.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      {step()}
    </div>

    );
}

const col = {
  display: "flex",
  flexDirection: "column",
  marginLeft: "10px",
};
const col2 = {
  display: "flex",
  flexDirection: "column",
  marginLeft: "10px",
  width: { xs: "40vw", md: "20vw" },

};
const rowfull = {
  marginTop: "10px",
  alignItems: "center",
};
const rowhalf = {
  marginTop: "10px",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: 'space-between',
  // width:'36vw'
};
const txtlabel = { fontSize: "14px" };
const editbutton = {
  marginTop: "25px",
  display: "flex",
  flexDirection: "row-reverse",
  width: { xs: "63vw", md: "35vw" },
  justifyContent: "space-between",
  marginLeft: "20px",
};
