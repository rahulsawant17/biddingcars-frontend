import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import ListIcon from "@mui/icons-material/List";
const drawerWidth = 'auto';

export default function DashboardDrawer(props) {
  const router = useRouter();
  const { window } = props;
  const auth = useSelector((state) => state.auth);
  const navItems =
    auth.role === "admin"
      ? [
          { name: "Profile", link: "/profile", icon: AccountCircleIcon },
          { name: "My Listings", link: "/mylistings", icon: ListIcon },
          { name: "Settings", link: "/settings", icon: SettingsIcon },
          {
            name: "Verify Listings",
            link: "/verifylistings",
            icon: CheckBoxIcon,
          },
        ]
      : [
          { name: "Profile", link: "/profile", icon: AccountCircleIcon },
          { name: "My Listings", link: "/mylistings", icon: ListIcon },
          { name: "Settings", link: "/settings", icon: SettingsIcon },
        ];

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        sx={{
          width: '70px',
          // flexShrink: 0,
          "& .MuiDrawer-paper": {
            // width: drawerWidth,
            boxSizing: "border-box",
            marginTop: "10vh",
            paddingTop: "5vh",
          }
        }}
        variant="permanent"
        anchor="left"
      >
        <Box
          sx={{
            display: { xs: "none", sm: "block" },
            width: { xs: "55px", sm: "150px", md: "240px" },
            display: "flex",
            alignItems: "left",
            flexDirection: "column",
          }}
        >
          {navItems.map((item, i) => {
            // {console.log(item.link,router.pathname)}
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
                    width: "auto",
                    justifyContent: "left",
                    // alignItems: "left",
                  }}
                >
                  <IconButton
                    color="inherit"
                    edge="start"
                    sx={{ display: { sm: "" }, px: 2 }}
                  >{React.createElement(item.icon)}</IconButton>

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
                    width: "auto",
                    justifyContent: "left",
                    // alignItems: "left",
                  }}
                >
                  <IconButton
                    color="inherit"
                    edge="start"
                    sx={{ display: { sm: "" }, px: 2 }}
                  >{React.createElement(item.icon)}</IconButton>
                  {item.name}
                </Button>
              );
            }
          })}
        </Box>
      </Drawer>
    </Box>
  );
}
