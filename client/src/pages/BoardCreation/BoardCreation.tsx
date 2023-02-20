import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { websiteUrl } from "../../helpers/constants";
import { Board } from "../../helpers/types";
import { setGeneralProperties } from "../../redux/features/generalPropertiesSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

type Props = {};

const BoardCreation = (props: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const boardId = useAppSelector(state => state.generalProperties.activeBoard);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [boardsList, setBoardsList] = useState<Board[]>([]);

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
  const handleBoardCreation = async () => {
    const boardCreationResponse = await axios({
      url: `${websiteUrl}/api/board/create`,
      method: "post",
      data: {
        name,
        description,
      },
      withCredentials: true,
    });
    if (boardCreationResponse.data) {
      setBoardsList((currentBoardsList) => [
        ...currentBoardsList,
        boardCreationResponse.data,
      ]);
    }
  };

  const handleSetActiveBoard = (boardId: string) => {
    localStorage.setItem("board", boardId);
    dispatch(
      setGeneralProperties({
        activeBoard: boardId,
      })
    );
    navigate("/");
    dispatch(
      setGeneralProperties({
        switchBoardModalOpen: false,
      })
    );
  };

  return (
    <div>
      <h1>Choose a board</h1>

      {boardsList.map((board) => {
        return (
          <div key={board._id}>
            <div>{board.name}</div>
            <div>{board.description}</div>
            <button onClick={() => handleSetActiveBoard(board._id)}>
              Select
            </button>
          </div>
        );
      })}

      <h1>Create a board</h1>
      <h2>Choose a name for your board</h2>
      <TextField
        onChange={(e) => setName(e.target.value)}
        margin="normal"
        required
        fullWidth
        id="board-name"
        label="Board name"
        name="board-name"
        autoFocus
        value={name}
      />
      <h2>Choose a description for your board</h2>
      <TextField
        onChange={(e) => setDescription(e.target.value)}
        margin="normal"
        required
        fullWidth
        id="board-description"
        label="Board description"
        name="board-description"
        autoFocus
        value={description}
      />
      <Button onClick={handleBoardCreation} variant="contained">
        Create board
      </Button>
    </div>
  );
};

export default BoardCreation;
