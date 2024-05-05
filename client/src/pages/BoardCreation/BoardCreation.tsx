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
import { CreationPage } from "./CreationPage/CreationPage";

type Props = {
  pageMode: "modal" | "page";
};

const BoardCreation = (props: Props) => {
  const [mode, setMode] = useState<"selection" | "creation">("selection");

  return (
    <div>
      {props.pageMode === "page" && <MainNavBar />}
      {mode === "selection" ? (
        <BaseMenu setMode={setMode} />
      ) : (
        <CreationPage setMode={setMode} />
      )}
    </div>
  );
};

type BaseMenuProps = {
  setMode: React.Dispatch<React.SetStateAction<"selection" | "creation">>;
};

const BaseMenu = (props: BaseMenuProps) => {
  const generalPropertiesState = useAppSelector(
    (state) => state.generalProperties
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <>
      {generalPropertiesState.boardsList &&
      generalPropertiesState.boardsList.length > 0 ? (
        <>
          <h1 className={`${styles.sectionTitle} ${styles.selectBoardTitle}`}>
            Sélectionner un board
          </h1>
          {generalPropertiesState.boardsList.map((board) => {
            return (
              <Paper
                key={board._id}
                onClick={() =>
                  handleSetActiveBoard(board._id, dispatch, navigate)
                }
                sx={{
                  cursor: "pointer",
                }}
                className={styles.boardInListContainer}
              >
                <BoardInList name={board.name} />
              </Paper>
            );
          })}
          <h1 className={`${styles.sectionTitle} ${styles.createBoardTitle}`}>
            Créer un board
          </h1>
          <Paper
            className={styles.createBoardBtnContainer}
            onClick={() => props.setMode("creation")}
            sx={{
              cursor: "pointer",
            }}
          >
            <IconButton className={styles.createBoardBtnIcon}>
              <Avatar className={styles.createBoardBtnAvatar} variant="rounded">
                <Add />
              </Avatar>
            </IconButton>
            <Typography variant="button" color="textSecondary">
              Créer un nouveau board
            </Typography>
          </Paper>
        </>
      ) : (
        <WelcomeMessage handleCreateBoard={() => props.setMode("creation")} />
      )}
    </>
  );
};

export default BoardCreation;
