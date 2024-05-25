import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setGeneralProperties } from "../../redux/features/generalPropertiesSlice";
import { SettingsModal } from "../Modals/SettingsModal/SettingsModal";
import axios from "axios";
import { setLoggedUserState } from "../../redux/features/loggedUserSlice";
import { useNavigate } from "react-router-dom";
import { websiteUrl } from "../../helpers/constants";
import SwitchBoardModal from "../Modals/FeatureRequestModal/SwitchBoard/SwitchBoardModal";
import ShareBoardModal from "../Modals/ShareBoardModal/ShareBoardModal";
import DarkModeToggle from "../buttons/DarkModeToggle/DarkModeToggle";
import styles from "./MainNavBar.module.scss";
import ManageBoardModal from "../Modals/ManageBoardModal/ManageBoardModal";
import SettingsMenu from "../SettingsMenu/SettingsMenu";
import { BillingPlan, UserType } from "../../helpers/types";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import { GoodboardLogo } from "../Logo/GoodboardLogo";
import { SideBarContent } from "../SidebarNavBar/SidebarNavBar";

const allPages: {
  title: string;
  url: string;
}[] = [
  {
    title: "ideas",
    url: "/ideas",
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
  const [pagesList, setPagesList] = useState<{ title: string; url: string }[]>(
    []
  );
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loggedUser = useAppSelector((state) => state.loggedUser);
  const generalPropertiesState = useAppSelector(
    (state) => state.generalProperties
  );
  const activeBoardState = useAppSelector((state) => state.activeBoard);

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
            message: `Vous avez été déconnecté`,
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
        manageBoardModalOpen: {
          isOpen: true,
        },
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

  const [settingsList, setSettingsList] = useState([
    {
      linkText: "Mon compte",
      onClick: handleSettingsModal,
    },
    {
      linkText: "Gérer mon board",
      onClick: handleManageBoard,
    },
    {
      linkText: "Changer de board",
      onClick: handleChangeBoard,
    },
    {
      linkText: "Partager votre board",
      onClick: handleShareBoard,
    },
    {
      linkText: "Integrations",
      onClick: handleDisplayIntegrations,
    },
    {
      linkText: "Déconnexion",
      onClick: handleLogout,
    },
  ]);

  useEffect(() => {
    if (
      generalPropertiesState.boardsList &&
      generalPropertiesState.boardsList.length > 0
    ) {
      if (activeBoardState.billingPlan === BillingPlan.business) {
        if (loggedUser.user?.roleOnThisBoard === UserType.admin) {
          setSettingsRoleFiltered(settingsList);
        } else {
          setSettingsRoleFiltered(() =>
            settingsList.filter(
              (setting) =>
                setting.linkText !== "Gérer mon board" &&
                setting.linkText !== "Integrations"
            )
          );
        }
      } else {
        if (loggedUser.user?.roleOnThisBoard === UserType.admin) {
          setSettingsRoleFiltered(() =>
            settingsList.filter(
              (setting) => setting.linkText !== "Integrations"
            )
          );
        } else {
          setSettingsRoleFiltered(() =>
            settingsList.filter(
              (setting) =>
                setting.linkText !== "Gérer mon board" &&
                setting.linkText !== "Integrations"
            )
          );
        }
      }
    } else {
      setSettingsRoleFiltered(() =>
        settingsList.filter(
          (setting) =>
            setting.linkText === "Mon compte" ||
            setting.linkText === "Déconnexion"
        )
      );
    }
  }, [
    generalPropertiesState.activeBoard,
    loggedUser.user,
    activeBoardState.billingPlan,
    generalPropertiesState.boardsList,
    settingsList,
  ]);

  const [settingsRoleFiltered, setSettingsRoleFiltered] = useState<
    {
      linkText: string;
      onClick: () => void;
    }[]
  >([]);

  useEffect(() => {
    if (activeBoardState.billingPlan === BillingPlan.business) {
      setPagesList(allPages);
    } else {
      setPagesList([]);
    }
  }, [activeBoardState]);

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
        manageBoardModalOpen: {
          isOpen: false,
        },
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

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  return (
    <AppBar position="static" className={styles.container}>
      <Container maxWidth="xl">
        <Toolbar disableGutters className={styles.toolbar}>
          {/*  <GoodboardLogo /> */}
          {/*           <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {generalPropertiesState.boardsList &&
              generalPropertiesState.boardsList.length > 0 &&
              pagesList.map((page) => (
                <Button
                  key={page.title}
                  onClick={() => navigate(page.url)}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page.title}
                </Button>
              ))}
          </Box> */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerOpen}
            sx={{ display: { md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <div className={styles.right}>
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
          </div>
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
        modalIsOpen={generalPropertiesState.manageBoardModalOpen.isOpen}
        handleClose={handleCloseManageBoardModal}
      />
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={handleDrawerClose}
        sx={{ display: { md: "none" } }}
      >
        <SideBarContent />
      </Drawer>
    </AppBar>
  );
};
export default MainNavBar;
