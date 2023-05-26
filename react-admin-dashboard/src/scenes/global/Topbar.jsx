import { Box,Button, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";

import { ColorModeContext, tokens } from "../../theme";

import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

import { useNavigate } from "react-router-dom";

const Topbar = ({setLogin}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();
  const handleclick = ()=>{
    localStorage.removeItem("token");
    console.log("User logged out")
    setLogin(false);
    navigate("/");
  }


  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      

      {/* ICONS */}
      <Box sx={{
          marginLeft: '75%',
          display: 'flex'
        }}>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
       
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
        <Button onClick={handleclick} variant="contained" color="inherit">Log out</Button>
      </Box>
    </Box>
  );
};

export default Topbar;
