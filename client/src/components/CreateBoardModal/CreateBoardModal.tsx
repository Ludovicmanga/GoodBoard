import { Button, TextField, TextareaAutosize, useTheme } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSetActiveBoard } from "../../helpers/boards";
import { websiteUrl } from "../../helpers/constants";
import { useAppDispatch } from "../../redux/hooks";
import ChooseBoardColor from "../ChooseBoardColor/ChooseBoardColor";
import styles from "./CreateBoardModal.module.scss";
import { addBoardToList } from "../../redux/features/generalPropertiesSlice";
import { Board } from "../../helpers/types";

type Props = {};

const CreateBoardModal = (props: Props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [website, setWebsite] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [twitter, setTwitter] = useState("");
  const [themeColor, setThemeColor] = useState("blue");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleBoardCreation = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("themeColor", themeColor);
    formData.append("isPublic", true.toString());
    formData.append("companyWebsiteUrl", website);
    formData.append("instagramUrl", instagram);
    formData.append("facebookUrl", facebook);
    formData.append("twitterUrl", twitter);

    const boardCreationResponse = await axios<Board>({
      url: `${websiteUrl}/api/board/create`,
      method: "post",
      data: formData,
      withCredentials: true,
    });
    if (boardCreationResponse.data) {
      handleSetActiveBoard(boardCreationResponse.data._id, dispatch, navigate);
      dispatch(addBoardToList(boardCreationResponse.data));
    }
  };

  return (
    <>
      <TextField
        onChange={(e) => setName(e.target.value)}
        margin="normal"
        required
        fullWidth
        placeholder="Ex: Tesla"
        label="Nom du board"
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
        placeholder="Ex: Tesla est une entreprise d'automobiles"
        label="Description du board"
        name="board-description"
        autoFocus
        value={description}
        size="small"
        multiline
        minRows={3}
      />
      <TextField
        onChange={(e) => setWebsite(e.target.value)}
        margin="normal"
        fullWidth
        id="board-url"
        placeholder="Ex: https://www.Tesla.com"
        label="Adresse du site web"
        name="board-url"
        autoFocus
        value={website}
        size="small"
      />
      <TextField
        onChange={(e) => setInstagram(e.target.value)}
        margin="normal"
        fullWidth
        id="board-url"
        placeholder="Ex: elonmusk"
        label="Compte Instagram"
        name="board-url"
        autoFocus
        value={instagram}
        size="small"
      />
      <TextField
        onChange={(e) => setFacebook(e.target.value)}
        margin="normal"
        fullWidth
        id="board-url"
        placeholder="Ex: elonmusk"
        label="Profil Facebook"
        name="board-url"
        autoFocus
        value={facebook}
        size="small"
      />
      <TextField
        onChange={(e) => setTwitter(e.target.value)}
        margin="normal"
        fullWidth
        id="board-url"
        placeholder="Ex: elonmusk"
        label="Pseudo Twitter"
        name="board-url"
        autoFocus
        value={twitter}
        size="small"
      />
      <h2 className={styles.inputLabel}>Couleur du board</h2>
      <ChooseBoardColor mode="creation" setThemeColor={setThemeColor} />
      <div className={styles.submitBtnContainer}>
        <Button
          className={styles.submitBtn}
          onClick={handleBoardCreation}
          variant="contained"
        >
          Créer board
        </Button>
      </div>
    </>
  );
};

export default CreateBoardModal;
