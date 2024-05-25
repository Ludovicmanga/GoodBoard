import { ReactNode } from "react";
import styles from "./ContentWithSidebar.module.scss";
import { useMediaQuery } from "@mui/material";
import { SidebarNavBar } from "../SidebarNavBar/SidebarNavBar";
import MainNavBar from "../MainNavBar/MainNavBar";
import MainHero from "../MainHero/MainHero";
import { ContainerWIthThemeLinearGradient } from "../ContainerWIthThemeLinearGradient/ContainerWIthThemeLinearGradient";

export const ContentWithSidebar = (props: { children: ReactNode }) => {
  const bigScreen = useMediaQuery("(min-width: 40rem)");

  return (
    <div className={styles.allPageContainer}>
      {bigScreen && <SidebarNavBar />}
      <div className={styles.contentContainer}>
        <MainNavBar />
        <MainHero />
        <ContainerWIthThemeLinearGradient>
          {props.children}
        </ContainerWIthThemeLinearGradient>
      </div>
    </div>
  );
};
