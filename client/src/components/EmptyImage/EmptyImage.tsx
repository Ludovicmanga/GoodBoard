import { Avatar, IconButton } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import styles from "./EmptyImage.module.scss";
import Add from "@mui/icons-material/Add";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setGeneralProperties } from "../../redux/features/generalPropertiesSlice";

type Props = {
  handleUploadedImage: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void | Promise<void>;
  height: number;
  width: number;
};

const EmptyImage = (props: Props) => {
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const loggedUserState = useAppSelector((state) => state.loggedUser);

  const handleNoLoggedUser = () => {
    if (!loggedUserState.user) {
      dispatch(
        setGeneralProperties({
          cannotMakeActionModalOpen: true,
        })
      );
    }
  };

  return (
    <div className={styles.container}>
      <Avatar
        sx={{
          height: props.height,
          width: props.width,
          bgcolor: "white",
          border: "1px solid lightgray",
        }}
        variant="circular"
      >
        <div className={styles.iconAndTextContainer}>
          <IconButton
            aria-label="upload picture"
            component="label"
            onClick={handleNoLoggedUser}
          >
            <input
              onChange={props.handleUploadedImage}
              hidden
              accept="image/*"
              type="file"
              ref={fileInputRef}
              disabled={!loggedUserState.user}
            />
            <Add sx={{ fontSize: 40 }} />
          </IconButton>
        </div>
      </Avatar>
    </div>
  );
};

export default EmptyImage;
