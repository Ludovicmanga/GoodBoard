import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import EventNoteIcon from "@mui/icons-material/EventNote";
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
import ChangeBoardColorModal from "../Modals/ChangeBoardColorModal/ChangeBoardColorModal";
import ManageBoardModal from "../Modals/ManageBoardModal/ManageBoardModal";
import SettingsMenu from "../SettingsMenu/SettingsMenu";

const pages: {
  title: string;
  url: string;
}[] = [
  {
    title: "your ideas",
    url: `/user-feature-requests`,
  },
  {
    title: "our ideas",
    url: `/company-feature-requests`,
  },
  {
    title: "roadmap",
    url: `/roadmap`,
  },
  {
    title: "changelog",
    url: `/changelog`,
  },
];

const MainNavBar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [settingsRoleFiltered, setSettingsRoleFiltered] = useState<{
    linkText: string;
    onClick: () => void;
  }[]>([]);
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
      dispatch(
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

  const handleManageBoard = () => {
    dispatch(
      setGeneralProperties({
        manageBoardModalOpen: true,
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

  const settingsList = [
    {
      linkText: "My account",
      onClick: handleSettingsModal,
    },
    {
      linkText: "Manage this board",
      onClick: handleManageBoard,
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

  /*   const handleDisplayChangeBoardColor = () => {
    dispatch(
      setGeneralProperties({
        changeBoardColorModalOpen: true,
      })
    );
  }; */

  useEffect(() => {
    if (false) {
      setSettingsRoleFiltered(settingsList);
    } else {
      setSettingsRoleFiltered(
        settingsList.filter(
          (setting) =>
            setting.linkText !== "Manage this board" &&
            setting.linkText !== "Share your board" &&
            setting.linkText !== "Integrations"
        )
      );
    }
  }, []);

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

  const handleCloseManageBoardModal = () => {
    dispatch(
      setGeneralProperties({
        manageBoardModalOpen: false,
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

  const handleGoToLoginPage = () => navigate("/login");

  const loggedUser = useAppSelector((state) => state.loggedUser);

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
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                onClick={() => navigate(page.url)}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page.title}
              </Button>
            ))}
          </Box>
          <div className={styles.darkModeBtnContainer}>
            <DarkModeToggle />
          </div>
          {loggedUser.user ? (
            <SettingsMenu
              anchorElUser={anchorElUser}
              settings={settingsRoleFiltered}
              handleCloseUserMenu={handleCloseUserMenu}
              handleOpenUserMenu={handleOpenUserMenu}
            />
          ) : (
            <div onClick={handleGoToLoginPage} className={styles.logInBtn}>
              Log in
            </div>
          )}
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
      <ManageBoardModal
        modalIsOpen={generalPropertiesState.manageBoardModalOpen}
        handleClose={handleCloseManageBoardModal}
      />
      <ChangeBoardColorModal
        modalIsOpen={generalPropertiesState.changeBoardColorModalOpen}
        handleClose={() =>
          dispatch(
            setGeneralProperties({
              changeBoardColorModalOpen: false,
            })
          )
        }
      />
    </AppBar>
  );
};
export default MainNavBar;
