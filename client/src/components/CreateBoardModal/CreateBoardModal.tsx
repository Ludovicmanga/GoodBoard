import { Avatar, Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSetActiveBoard, setBoardImageApiCall } from "../../helpers/boards";
import { websiteUrl } from "../../helpers/constants";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import ChooseBoardColor from "../ChooseBoardColor/ChooseBoardColor";
import styles from "./CreateBoardModal.module.scss";
import BoardIsPublicBtn from "../BoardIsPublicBtn/BoardIsPublicBtn";
import EmptyImage from "../EmptyImage/EmptyImage";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { setActiveBoardData } from "../../redux/features/activeBoardSlice";

type Props = {};

const CreateBoardModal = (props: Props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [themeColor, setThemeColor] = useState("blue");
  const [boardIsPublic, setBoardIsPublic] = useState(false);
  const [pictureUrl, setPictureUrl] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const generalPropertiesState = useAppSelector(state => state.generalProperties);
  const handleBoardCreation = async () => {
    const boardCreationResponse = await axios({
      url: `${websiteUrl}/api/board/create`,
      method: "post",
      data: {
        name,
        description,
        themeColor,
        boardIsPublic,
        pictureUrl,
        website,
      },
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
    const res = await setBoardImageApiCall(
      selectedFile,
      generalPropertiesState.activeBoard!
    );
    if (res.data.url) {
      dispatch(
        setActiveBoardData({
          picture: res.data.url,
        })
      );
    }
  }

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
      <ChooseBoardColor mode="creation" setThemeColor={setThemeColor} />
      <h2 className={styles.inputLabel}>Board logo</h2>
      <div className={styles.uploadImgBtnContainer}>
        { pictureUrl ? (
          <div>
            <BsFillCheckCircleFill color="#4BB543" size={40} />
          </div>
        ) : (<EmptyImage
          handleUploadedImage={handleUploadImageToBoard}
          height={30}
          width={30}
        />) }
      </div>
      <BoardIsPublicBtn
        boardIsPublic={boardIsPublic}
        handleChangeBoardStatus={handleChangeBoardStatus}
        isLoading={false}
      />
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
