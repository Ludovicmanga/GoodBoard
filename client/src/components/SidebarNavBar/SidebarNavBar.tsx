import {
  FaAccessibleIcon,
  FaAccusoft,
  FaLock,
  FaRegLightbulb,
  FaRegMap,
} from "react-icons/fa";
import styles from "./SidebarNavBar.module.scss";
import { ReactNode, useState } from "react";
import { List, ListItemButton, Paper, Tooltip, useTheme } from "@mui/material";
import { MdOutlineWatchLater } from "react-icons/md";
import { GoodboardLogo } from "../Logo/GoodboardLogo";
import { BtnWithCrown } from "../ShiningBtn/BtnWithCrown";
import { VscDebugDisconnect } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setGeneralProperties } from "../../redux/features/generalPropertiesSlice";
import { BillingPlan } from "../../helpers/types";

export const SidebarNavBar = () => {
  const theme = useTheme();

  return (
    <Paper
      className={styles.container}
      elevation={3}
      sx={{
        background: `linear-gradient(to right bottom, #FFFFFF, ${theme.palette.primary.light} 99%)`,
      }}
    >
      <SideBarContent />
    </Paper>
  );
};

export const SideBarContent = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [pagesList, setPagesList] = useState<
    {
      text: string;
      icon: ReactNode;
      onClick: () => void;
      disabledIfNoBusiness: boolean;
    }[]
  >([
    {
      text: "Idées",
      icon: <FaRegLightbulb />,
      onClick: () => navigate("/ideas"),
      disabledIfNoBusiness: false,
    },
    {
      text: "Roadmap",
      icon: <FaRegMap />,
      onClick: () => navigate("/roadmap"),
      disabledIfNoBusiness: true,
    },
    {
      text: "Changelog",
      icon: <MdOutlineWatchLater />,
      onClick: () => navigate("/changelog"),
      disabledIfNoBusiness: true,
    },
    {
      text: "Intégrations",
      icon: <VscDebugDisconnect />,
      onClick: () => navigate("/integrations"),
      disabledIfNoBusiness: true,
    },
  ]);

  const activeBoardState = useAppSelector((state) => state.activeBoard);

  return (
    <>
      <div className={styles.logoContainer}>
        <GoodboardLogo />
      </div>
      <List>
        {pagesList.map((page) => (
          <Tooltip
            title={
              activeBoardState.billingPlan !== BillingPlan.business &&
              page.disabledIfNoBusiness &&
              "Vous devez souscrire au plan Business pour débloquer cette fonctionnalité"
            }
          >
            <div>
              <SidebarItem
                text={page.text}
                icon={page.icon}
                onClick={page.onClick}
                disabledIfNoBusiness={page.disabledIfNoBusiness}
              />
            </div>
          </Tooltip>
        ))}
      </List>
      <div className={styles.changePlanContainer}>
        <BtnWithCrown
          onClick={() =>
            dispatch(
              setGeneralProperties({
                manageBoardModalOpen: {
                  isOpen: true,
                  initialStep: "pricings list",
                },
              })
            )
          }
          text="Changer mon plan"
        />
      </div>
    </>
  );
};

const SidebarItem = (props: {
  text: string;
  icon: ReactNode;
  onClick: () => void;
  disabledIfNoBusiness: boolean;
}) => {
  const activeBoardState = useAppSelector((state) => state.activeBoard);
  const featureIsDisabled =
    activeBoardState.billingPlan !== BillingPlan.business &&
    props.disabledIfNoBusiness;

  return (
    <ListItemButton
      className={styles.sidebarItemContainer}
      onClick={props.onClick}
      disabled={featureIsDisabled}
    >
      <div className={styles.textAndIconContainer}>
        <div className={styles.sidebarIconContainer}>{props.icon}</div>
        <div className={styles.sidebarTextContainer}>{props.text}</div>
      </div>
      {featureIsDisabled && <FaLock />}
    </ListItemButton>
  );
};
