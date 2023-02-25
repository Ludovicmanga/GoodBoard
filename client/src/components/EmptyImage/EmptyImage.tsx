import { Avatar, Badge } from "@mui/material";
import React from "react";
import styles from "./EmptyImage.module.scss";
import Add from "@mui/icons-material/Add";


type Props = {};

const EmptyImage = (props: Props) => {
  const handleImageUpload = () => {};

  return (
    <div className={styles.container} onClick={handleImageUpload}>
      <Avatar
        sx={{
          height: 85,
          width: 85,
          bgcolor: 'white'
        }}
        variant='rounded'
      >
          <div className={styles.iconAndTextContainer}>
          <div className={styles.iconContainer}><Add sx={{ fontSize: 40 }} /></div>
          <div className={styles.iconText}>Add a picture</div>
          </div>
      </Avatar>
    </div>
  );
};

export default EmptyImage;
