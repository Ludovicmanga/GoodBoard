import { Avatar, IconButton, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BoardInList from "../../components/BoardInList/BoardInList";
import { handleSetActiveBoard } from "../../helpers/boards";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import styles from "./BoardCreation.module.scss";
import Add from "@mui/icons-material/Add";
import MainNavBar from "../../components/MainNavBar/MainNavBar";
import WelcomeMessage from "./WelcomeMessage/WelcomeMessage";
import { ChooseBoardContextInfos } from "../../components/ChooseBoardContextInfos/ChooseBoardContextInfos";
import { SwitchBoardForm } from "./SwitchBoardForm/SwitchBoardForm";

type BaseMenuProps = {
  pageMode: "page" | "modal";
};

const ChooseBoard = (props: BaseMenuProps) => {
  const generalPropertiesState = useAppSelector(
    (state) => state.generalProperties
  );

  const navigate = useNavigate();
  return (
    <>
      <MainNavBar />
      {generalPropertiesState.boardsList &&
      generalPropertiesState.boardsList.length > 0 ? (
        <div className={styles.container}>
          <div className={styles.ChooseBoardContextInfosContainer}>
            <ChooseBoardContextInfos title="Sélectionner un board" />
          </div>
          <div className={styles.ChooseBoardContentContainer}>
            <SwitchBoardForm handleCreate={() => navigate("/choose-board")} />
          </div>
        </div>
      ) : (
        <WelcomeMessage handleCreateBoard={() => navigate("/create-board")} />
      )}
    </>
  );
};

export default ChooseBoard;
