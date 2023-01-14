import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { websiteUrl } from "../../helpers/constants";

type Props = {};

const BoardCreation = (props: Props) => {
  const [name, setName] = useState("");
  const handleBoardCreation = async () => {
    const boardCreationResponse = await axios({
        url: `${websiteUrl}/api/board/create`,
        method: 'post',
        data: {
            name,
        },
        withCredentials: true,
    });
    if (boardCreationResponse.data.url) {
        console.log('created with url', boardCreationResponse.data.url);
    }
  };

  return (
    <div>
      <h1>Choose a name for your board</h1>
      <TextField
        onChange={(e) => setName(e.target.value)}
        margin="normal"
        required
        fullWidth
        id="board"
        label="Board name"
        name="board"
        autoFocus
        value={name}
      />
      <Button onClick={handleBoardCreation} variant="contained">
        Create board
      </Button>
    </div>
  );
};

export default BoardCreation;
