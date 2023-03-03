import { Avatar, IconButton, Paper, Typography } from "@mui/material";
import styles from "./BoardInList.module.scss";
import React from "react";
import { MdAddPhotoAlternate } from "react-icons/md";
import { getFirstLetterInUpperCase } from "../../helpers/utils";
import Add from "@mui/icons-material/Add";

type Props = {
  name: string;
};

const BoardInList = (props: Props) => {
  return (
    <>
      <IconButton>
        <Avatar className={styles.pictureAvatar} variant="rounded">
        <div className={styles.icon}>{getFirstLetterInUpperCase(props.name)}</div>
        </Avatar>
      </IconButton>
      <Typography variant="button" color="textSecondary">
      {props.name}
      </Typography>
    </>
  );
};

export default BoardInList;
