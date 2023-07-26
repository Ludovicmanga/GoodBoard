import { Avatar, IconButton, Typography } from "@mui/material";
import styles from "./BoardInList.module.scss";
import React from "react";
import { getFirstLetterInUpperCase } from "../../helpers/utils";

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
