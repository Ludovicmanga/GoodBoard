import { Avatar, Badge, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import styles from "./EmptyImage.module.scss";
import Add from "@mui/icons-material/Add";
import axios from "axios";
import { websiteUrl } from "../../helpers/constants";

type Props = {};

const EmptyImage = (props: Props) => {
  const [selectedFile, setSelectedFile] = useState<File>();
  const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files?.[0]!);
  };

  const handleUploadFile = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      await axios.post(`${websiteUrl}/api/board/upload-image`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data", // Make sure to set the correct content type for file uploads
        },
      });
      console.log("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  useEffect(() => {
    if (selectedFile) {
      handleUploadFile()
    }
  }, [selectedFile]);

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
          <IconButton aria-label="upload picture" component="label">
            <input
              onChange={handleSelectFile}
              hidden
              accept="image/*"
              type="file"
            />
            <Add sx={{ fontSize: 40 }} />
          </IconButton>
        </div>
      </Avatar>
    </div>
  );
};

export default EmptyImage;
