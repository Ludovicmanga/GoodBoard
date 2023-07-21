import { Avatar, IconButton } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import styles from "./EmptyImage.module.scss";
import Add from "@mui/icons-material/Add";

type Props = {
  handleUploadedImage: (selectedFile: File) => void;
  height: number;
  width: number;
};

const EmptyImage = (props: Props) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files?.[0]!);
  };
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadFile = async () => {
    if (selectedFile) {
      await props.handleUploadedImage(selectedFile);
    }
  };

  useEffect(() => {
    if (selectedFile) {
      handleUploadFile();
    }
  }, [selectedFile]);

  return (
    <div className={styles.container}>
      <Avatar
        sx={{
          height: props.height,
          width: props.width,
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
              ref={fileInputRef}
            />
            <Add sx={{ fontSize: 40 }} />
          </IconButton>
        </div>
      </Avatar>
    </div>
  );
};

export default EmptyImage;
