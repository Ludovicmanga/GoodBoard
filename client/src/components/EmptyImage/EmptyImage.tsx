import { Avatar, Badge } from "@mui/material";
import React from "react";
import styles from "./EmptyImage.module.scss";
import { MdAddPhotoAlternate } from "react-icons/md";


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
          <MdAddPhotoAlternate className={styles.icon} />
      </Avatar>
    </div>
  );
};

export default EmptyImage;
