import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { useSelector, useDispatch } from "react-redux";
import Signin from "./Signin";
import { UISwitch } from "../pages/_app";
import Signup from "./Signup";
import { signout } from "../actions/auth.action";
import { userinfoConstants } from "../actions/constants";
import { useRouter } from "next/router";
import { AiFillCar } from "react-icons/ai";
import Logo from "./Logo";
import Forgotpassword from "./Forgotpassword";
const drawerWidth = 300;
const navItems = [
  { name: "Auctions", link: "/auctions" },
  { name: "List a car", link: "/list" },
  { name: "Dashboard", link: "/dashboard" },
];
function Navbar(props) {
  const router = useRouter();
  // console.log(router.pathname);
  const auth = useSelector((state) => state.auth);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const dispatch = useDispatch();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const [authScreen, setAuthScreen] = React.useState("login");
  const page = () => {
    switch (authScreen) {
      case 'login':
        return <Signin
        createAccount={
          <>
          <Button onClick={() => setAuthScreen("signup")}>
            Create account
          </Button>
          <Button onClick={() => setAuthScreen("forgotpassword")}>
            Forgot Password?
          </Button></>
        }
      />
      case 'signup':
        return <Signup
        login={
          <>
          <Button onClick={() => setAuthScreen("login")}>
            Already have an account?
          </Button>
          <Button onClick={() => setAuthScreen("forgotpassword")}>
            Forgot Password?
          </Button>
          </>
        }
      />
      case 'forgotpassword':
        return <Forgotpassword
        forgot={
          <>
          <Button onClick={() => setAuthScreen("login")}>
            Already have an account?
          </Button>
          <Button onClick={() => setAuthScreen("signup")}>
          Create account
        </Button></>
        }
      />
    }
  };
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 350 }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      {/* {authScreen === "login" ? (
        <Signin
          createAccount={
            <Button onClick={() => setAuthScreen("signup")}>
              Create account
            </Button>
          }
        />
      ) : (
        <Signup
          login={
            <Button onClick={() => setAuthScreen("login")}>
              Already have an account?
            </Button>
          }
        />
      )} */}
      {page()}
      <Divider />
    </Box>
  );

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography
        variant="h6"
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          my: "2em",
        }}
      >
        <Logo /> {auth.userName}
      </Typography>

      <List>
        {navItems.map((item, i) => (
          <ListItem key={i} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText
                primary={item.name}
                onClick={() => router.push(item.link)}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: { xs: "none", sm: "space-between" },
        alignItems: "center",
        borderBottom: "1px solid #2196f3",
        mx: 2,
        minHeight: "10vh",
      }}
    >
      <Box sx={{}}></Box>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ display: { sm: "none" }, px: 2 }}
      >
        <MenuIcon />
      </IconButton>
      <Typography
        onClick={() => router.push("/")}
        variant="h6"
        component="div"
        sx={{
          flexGrow: 1,
          cursor: "pointer",
        }}
      >
        <Logo />
        {auth.userName}
      </Typography>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          {navItems.map((item, i) => {
            {
              // console.log(item.link, router.pathname);
            }
            if (
              item.link === router.pathname ||
              (item.link.includes("auction") &&
                router.pathname.includes("auction"))
            ) {
              return (
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  key={i}
                  onClick={() => router.push(item.link)}
                  sx={{
                    height: "7vh",
                    fontSize: "1.1rem",
                    fontWeight: 500,
                    px: 2,
                    textTransform: "capitalize",
                    width: "120px",
                  }}
                >
                  {item.name}
                </Button>
              );
            } else {
              return (
                <Button
                  size="large"
                  key={i}
                  onClick={() => router.push(item.link)}
                  sx={{
                    height: "7vh",
                    fontSize: "1.1rem",
                    fontWeight: 500,
                    px: 2,
                    textTransform: "capitalize",
                    width: "120px",
                  }}
                >
                  {item.name}
                </Button>
              );
            }
          })}
        </Box>
        {auth.authenticate ? (
          <Box sx={{ display: "flex" }}>
            {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" /> */}
            <Button
              onClick={() => {
                dispatch(signout());
                dispatch({ type: userinfoConstants.GET_USERINFO_REQUEST });
              }}
              variant="outlined"
              size="large"
              sx={{
                height: "7vh",
                fontSize: "1.1rem",
                fontWeight: 500,
                mx: 3,
                textTransform: "capitalize",
                width: "100px",
              }}
            >
              Logout
            </Button>
          </Box>
        ) : null}
        {!auth.authenticate ? (
          <div>
            <Button
            id="signin-btn"
              variant="outlined"
              size="large"
              sx={{
                height: "7vh",
                fontSize: "1.1rem",
                fontWeight: 500,
                mx: 3,
                textTransform: "capitalize",
                width: "100px",
              }}
              onClick={toggleDrawer("right", true)}
            >
              Signin
            </Button>

            <Drawer
              anchor={"right"}
              open={state["right"]}
              onClose={toggleDrawer("right", false)}
            >
              {list("right")}
            </Drawer>
          </div>
        ) : null}
      </Box>

      <UISwitch />
      <Divider />

      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

Navbar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Navbar;
