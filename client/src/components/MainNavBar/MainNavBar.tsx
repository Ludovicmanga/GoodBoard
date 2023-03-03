import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import EventNoteIcon from "@mui/icons-material/EventNote";
import Menu from "@mui/material/Menu";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setGeneralProperties } from "../../redux/features/generalPropertiesSlice";
import { SettingsModal } from "../Modals/Settings/SettingsModal";
import axios from "axios";
import { setLoggedUserState } from "../../redux/features/loggedUserSlice";
import { useNavigate } from "react-router-dom";
import { websiteUrl } from "../../helpers/constants";
import SwitchBoardModal from "../Modals/FeatureRequestModal/SwitchBoard/SwitchBoardModal";
import ShareBoardModal from "../Modals/ShareBoard/ShareBoardModal";
import DarkModeToggle from "../buttons/DarkModeToggle/DarkModeToggle";
import styles from "./MainNavBar.module.scss";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const pages: string[] = [];

const MainNavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const generalPropertiesState = useAppSelector(
    (state) => state.generalProperties
  );

  const handleLogout = async () => {
    const response = await axios<{ loggedOut: boolean }>({
      url: `${websiteUrl}/api/users/logout`,
      method: "post",
      withCredentials: true,
    });
    if (response.data.loggedOut) {
      /*       localStorage.removeItem("board");
       */ dispatch(
        setLoggedUserState({
          user: null,
        })
      );
      navigate("/login");
      dispatch(
        setGeneralProperties({
          mainSnackBar: {
            isOpen: true,
            message: `Successful logout`,
          },
        })
      );
    }
  };

  const handleSettingsModal = () => {
    dispatch(
      setGeneralProperties({
        generalSettingsModalOpen: true,
      })
    );
  };

  const handleChangeBoard = () => {
    dispatch(
      setGeneralProperties({
        switchBoardModalOpen: true,
      })
    );
  };

  const handleDisplayIntegrations = () => {
    navigate("/integrations");
  };

  const handleShareBoard = () => {
    dispatch(
      setGeneralProperties({
        shareBoardModalOpen: true,
      })
    );
  };

  const settings = [
    {
      linkText: "My account",
      onClick: handleSettingsModal,
    },
    {
      linkText: "Switch board",
      onClick: handleChangeBoard,
    },
    {
      linkText: "Share your board",
      onClick: handleShareBoard,
    },
    {
      linkText: "Integrations",
      onClick: handleDisplayIntegrations,
    },
    {
      linkText: "Logout",
      onClick: handleLogout,
    },
  ];

  const handleCloseSettingsModal = () => {
    dispatch(
      setGeneralProperties({
        generalSettingsModalOpen: false,
      })
    );
  };

  const handleCloseSwitchModal = () => {
    dispatch(
      setGeneralProperties({
        switchBoardModalOpen: false,
      })
    );
  };

  const handleCloseShareBoardModal = () => {
    dispatch(
      setGeneralProperties({
        shareBoardModalOpen: false,
      })
    );
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <EventNoteIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            GOODBOARD
          </Typography>
          <EventNoteIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            GOODBOARD
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <div className={styles.darkModeBtnContainer}>
            <DarkModeToggle />
          </div>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Paramètres">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {/*                 <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                 */}{" "}
                <AccountCircleIcon sx={{ fontSize: 40, color: '#F6F6F6' }} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.linkText} onClick={setting.onClick}>
                  <Typography textAlign="center">{setting.linkText}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      <SettingsModal
        modalIsOpen={generalPropertiesState.generalSettingsModalOpen}
        handleClose={handleCloseSettingsModal}
      />
      <SwitchBoardModal
        modalIsOpen={generalPropertiesState.switchBoardModalOpen}
        handleClose={handleCloseSwitchModal}
      />
      <ShareBoardModal
        modalIsOpen={generalPropertiesState.shareBoardModalOpen}
        handleClose={handleCloseShareBoardModal}
      />
    </AppBar>
  );
};
export default MainNavBar;
