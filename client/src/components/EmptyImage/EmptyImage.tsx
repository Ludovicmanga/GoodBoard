import { Avatar, Badge, IconButton } from "@mui/material";
import React, { useState } from "react";
import styles from "./EmptyImage.module.scss";
import Add from "@mui/icons-material/Add";

type Props = {};

const EmptyImage = (props: Props) => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files?.[0]!);
  };

  return (
    <div className={styles.container}>
      <Avatar
        sx={{
          height: 85,
          width: 85,
          bgcolor: "white",
        }}
        variant="rounded"
      >
        <div className={styles.iconAndTextContainer}>
          <IconButton
            aria-label="upload picture"
            component="label"
          >
            <input hidden accept="image/*" type="file" />
            <Add sx={{ fontSize: 40 }} />
          </IconButton>
        </div>
      </Avatar>
    </div>
  );
};

export default EmptyImage;
