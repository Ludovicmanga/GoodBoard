import Add from "@mui/icons-material/Add";
import { Avatar, Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSetActiveBoard } from "../../helpers/boards";
import { websiteUrl } from "../../helpers/constants";
import { setGeneralProperties } from "../../redux/features/generalPropertiesSlice";
import { useAppDispatch } from "../../redux/hooks";
import ChooseBoardColor from "../ChooseBoardColor/ChooseBoardColor";
import styles from "./CreateBoardModal.module.scss";

type Props = {};

const CreateBoardModal = (props: Props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [themeColor, setThemeColor] = useState('blue');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleBoardCreation = async () => {
    console.log({
      name,
      description,
      themeColor,
    }, ' is the description')
    const boardCreationResponse = await axios({
      url: `${websiteUrl}/api/board/create`,
      method: "post",
      data: {
        name,
        description,
        themeColor,
      },
      withCredentials: true,
    });
    if (boardCreationResponse.data) {
      handleSetActiveBoard(boardCreationResponse.data._id, dispatch, navigate);
    }
  };

  useEffect(() => {
    console.log(themeColor, ' is the theme colors')
  }, [themeColor])

  return (
    <>
      <TextField
        onChange={(e) => setName(e.target.value)}
        margin="normal"
        required
        fullWidth
        id="board-name"
        placeholder="Ex: Tesla"
        label="Name"
        name="board-name"
        autoFocus
        value={name}
      />
      <TextField
        onChange={(e) => setDescription(e.target.value)}
        margin="normal"
        required
        fullWidth
        id="board-description"
        placeholder="Ex: Tesla is a car company"
        label="Description"
        name="board-description"
        autoFocus
        value={description}
      />
      <TextField
        onChange={(e) => setWebsite(e.target.value)}
        margin="normal"
        fullWidth
        id="board-url"
        placeholder="Tesla.com"
        label="Website url"
        name="board-url"
        autoFocus
        value={website}
      />
      <ChooseBoardColor mode='creation' setThemeColor={setThemeColor} />
      <h2 className={styles.inputLabel}>Board logo</h2>
      <Avatar variant="rounded">
        <Add />
      </Avatar>
      <Button
        className={styles.submitBtn}
        onClick={handleBoardCreation}
        variant="contained"
      >
        Create board
      </Button>
    </>
  );
};

export default CreateBoardModal;