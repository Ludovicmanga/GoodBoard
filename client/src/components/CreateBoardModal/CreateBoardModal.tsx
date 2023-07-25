import {
  Avatar,
  Button,
  TextField,
  useTheme,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSetActiveBoard } from "../../helpers/boards";
import { websiteUrl } from "../../helpers/constants";
import { useAppDispatch } from "../../redux/hooks";
import ChooseBoardColor from "../ChooseBoardColor/ChooseBoardColor";
import styles from "./CreateBoardModal.module.scss";
import EmptyImage from "../EmptyImage/EmptyImage";
import CheckIcon from "@mui/icons-material/Check";

type Props = {};

const CreateBoardModal = (props: Props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [themeColor, setThemeColor] = useState("blue");
  const [boardIsPublic, setBoardIsPublic] = useState(true);
  const [picture, setPicture] = useState<File>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleBoardCreation = async () => {
    const formData = new FormData();
    formData.append("image", picture || "");
    formData.append("name", name);
    formData.append("description", description);
    formData.append("themeColor", themeColor);
    formData.append("isPublic", boardIsPublic.toString());
    formData.append("companyWebsiteUrl", website);

    const boardCreationResponse = await axios({
      url: `${websiteUrl}/api/board/create`,
      method: "post",
      data: formData,
      withCredentials: true,
    });
    if (boardCreationResponse.data) {
      handleSetActiveBoard(boardCreationResponse.data._id, dispatch, navigate);
    }
  };

  const handleChangeBoardStatus = async (publicStatus: boolean) => {
    setBoardIsPublic(publicStatus);
  };

  const handleUploadImageToBoard = async (selectedFile: File) => {
    setPicture(selectedFile);
  };

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
        size="small"
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
        size="small"
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
        size="small"
      />
      <h2 className={styles.inputLabel}>Board color</h2>
      <ChooseBoardColor mode="creation" setThemeColor={setThemeColor} />
      <h2 className={styles.inputLabel}>Board logo</h2>
      <div className={styles.uploadImgBtnContainer}>
        {picture ? (
          <Avatar className={styles.colorPaletteBox} variant="rounded">
            <CheckIcon />
          </Avatar>
        ) : (
          <EmptyImage
            handleUploadedImage={handleUploadImageToBoard}
            height={30}
            width={30}
          />
        )}
      </div>
      <div className={styles.submitBtnContainer}>
        <Button
          className={styles.submitBtn}
          onClick={handleBoardCreation}
          variant="contained"
        >
          Create board
        </Button>
      </div>
    </>
  );
};

export default CreateBoardModal;
