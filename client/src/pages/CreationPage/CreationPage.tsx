import React, { useEffect } from "react";
import styles from "./CreationPage.module.scss";
import CreateBoardModal from "../../components/CreateBoardModal/CreateBoardModal";
import { ChooseBoardContextInfos } from "../../components/ChooseBoardContextInfos/ChooseBoardContextInfos";

type CreationModalProps = {};

const CreationPage = (props: CreationModalProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.infosContainer}>
        <ChooseBoardContextInfos title="Création de votre board" />
      </div>
      <div className={styles.contentContainer}>
        <CreateBoardModal />
      </div>
    </div>
  );
};

export default CreationPage;
