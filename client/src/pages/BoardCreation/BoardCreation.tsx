import {
  Avatar,
  Button,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BoardInList from "../../components/BoardInList/BoardInList";
import CreateBoardModal from "../../components/CreateBoardModal/CreateBoardModal";
import { handleSetActiveBoard } from "../../helpers/boards";
import { websiteUrl } from "../../helpers/constants";
import { Board } from "../../helpers/types";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import styles from "./BoardCreation.module.scss";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Add from "@mui/icons-material/Add";

type Props = {};

const BoardCreation = (props: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const boardId = useAppSelector(
    (state) => state.generalProperties.activeBoard
  );
  const [boardsList, setBoardsList] = useState<Board[]>([]);
  const [mode, setMode] = useState<"selection" | "creation">("selection");

  useEffect(() => {
    const getUserBoards = async () => {
      handleGetUserBoards();
    };
    getUserBoards();
  }, []);
  const handleGetUserBoards = async () => {
    const userBoardsResponse = await axios({
      url: `${websiteUrl}/api/board/get/user-boards`,
      withCredentials: true,
    });
    if (userBoardsResponse) {
      setBoardsList((currentBoardsList) => [
        ...currentBoardsList,
        ...userBoardsResponse.data,
      ]);
    }
  };

  return (
    <div>
      {mode === "selection" ? (
        <>
          {boardsList.length > 0 && (
            <>
              <h1
                className={`${styles.sectionTitle} ${styles.selectBoardTitle}`}
              >
                Select a board
              </h1>
              {boardsList.map((board) => {
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
            </>
          )}

          <h1 className={`${styles.sectionTitle} ${styles.createBoardTitle}`}>
            Create a board
          </h1>
          <Paper
            className={styles.createBoardBtnContainer}
            onClick={() => setMode("creation")}
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
              Create New Board
            </Typography>
          </Paper>
        </>
      ) : (
        <>
          <div>
            <div className={styles.stepBackContainer}>
              <IconButton
                onClick={() => setMode("selection")}
                className={styles.stepBackIcon}
              >
                <ArrowBackIcon />
              </IconButton>
            </div>
            <CreateBoardModal />
          </div>
        </>
      )}
    </div>
  );
};

export default BoardCreation;
