import React from "react";
import MainNavBar from "../../components/MainNavBar/MainNavBar";
import MainHero from "../../components/MainHero/MainHero";

import styles from "./ChangeLog.module.scss";
import ChangeLogBox from "../../components/ChangeLogBox/ChangeLogBox";

type Props = {};

const ChangeLog = (props: Props) => {
  return (
    <>
      <MainNavBar />
      <MainHero />
      <div className={styles.pageTitleContainer}>
        <div className={styles.container}>
          <div className={styles.dateTitle}>January 2022</div>
          <div className={styles.changeLogBoxContainer}>
            <ChangeLogBox />
          </div>
          <div className={styles.changeLogBoxContainer}>
            <ChangeLogBox />
          </div>
          <div className={styles.changeLogBoxContainer}>
            <ChangeLogBox />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangeLog;
