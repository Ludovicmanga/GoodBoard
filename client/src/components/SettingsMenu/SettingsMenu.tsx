import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAppSelector } from "../../redux/hooks";

type Props = {
  anchorElUser: HTMLElement | null;
  handleCloseUserMenu: () => void;
  settings: {
    linkText: string;
    onClick: () => void;
  }[];
  handleOpenUserMenu: (event: React.MouseEvent<HTMLElement>) => void;
};

const SettingsMenu = (props: Props) => {
  const loggedUser = useAppSelector((state) => state.loggedUser).user;
  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Paramètres">
        <IconButton onClick={props.handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
            alt="user pic"
            src={loggedUser?.picture}
            sx={{
              background: "white",
              width: "40px",
              height: "40px",
              "& img": {
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "50%", // If you want a circular Avatar
              },
            }}
          />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={props.anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(props.anchorElUser)}
        onClose={props.handleCloseUserMenu}
      >
        {props.settings.map((setting) => (
          <MenuItem key={setting.linkText} onClick={setting.onClick}>
            <Typography textAlign="center">{setting.linkText}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default SettingsMenu;
