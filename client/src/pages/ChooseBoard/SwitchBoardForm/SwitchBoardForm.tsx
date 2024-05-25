import { Avatar, IconButton, Paper, Typography } from "@mui/material";
import styles from "./SwitchBoardForm.module.scss";
import BoardInList from "../../../components/BoardInList/BoardInList";
import { Add } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { handleSetActiveBoard } from "../../../helpers/boards";
import { useNavigate } from "react-router-dom";

export const SwitchBoardForm = (props: { handleCreate: () => void }) => {
  const generalPropertiesState = useAppSelector(
    (state) => state.generalProperties
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div>
      <h1 className={`${styles.sectionTitle} ${styles.selectBoardTitle}`}>
        Sélectionner un board
      </h1>
      {generalPropertiesState.boardsList.map((board) => {
        return (
          <Paper
            key={board._id}
            onClick={() => handleSetActiveBoard(board._id, dispatch, navigate)}
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
        Ou
      </h1>
      <Paper
        className={styles.createBoardBtnContainer}
        onClick={props.handleCreate}
        sx={{
          cursor: "pointer",
        }}
      >
        <IconButton className={styles.createBoardBtnIcon}>
          <Avatar className={styles.createBoardBtnAvatar} variant="circular">
            <Add />
          </Avatar>
        </IconButton>
        <Typography
          variant="button"
          color="textSecondary"
          className={styles.textBtn}
        >
          Créer un nouveau board
        </Typography>
      </Paper>
    </div>
  );
};
