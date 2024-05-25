import { Avatar, IconButton, Typography, useTheme } from "@mui/material";
import styles from "./BoardInList.module.scss";
import React from "react";
import { getFirstLetterInUpperCase } from "../../helpers/utils";

type Props = {
  name: string;
};

const BoardInList = (props: Props) => {
  const theme = useTheme();

  return (
    <>
      <IconButton>
        <Avatar
          className={styles.pictureAvatar}
          variant="circular"
          sx={{
            background: theme.palette.secondary.main,
          }}
        >
          <div className={styles.icon}>
            {getFirstLetterInUpperCase(props.name)}
          </div>
        </Avatar>
      </IconButton>
      <Typography
        variant="button"
        color="textSecondary"
        className={styles.text}
      >
        {props.name}
      </Typography>
    </>
  );
};

export default BoardInList;
