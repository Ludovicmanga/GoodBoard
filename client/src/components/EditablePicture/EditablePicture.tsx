import { Avatar, IconButton, Skeleton, useMediaQuery } from "@mui/material";
import styles from "./EditablePicture.module.scss";
import { Button } from "@mui/material";
import EmptyImage from "../EmptyImage/EmptyImage";
import { ReactNode, useEffect, useState } from "react";
import { QuestionMarkWithTooltip } from "../QuestionMarkWithTooltip/QuestionMarkWithTooltip";
import { Delete, Edit } from "@mui/icons-material";

export const EditablePicture = (props: {
  handleUpdate: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void | Promise<void>;
  handleDelete: () => Promise<void>;
  name: ReactNode;
  src: string;
  tooltipMessage?: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleUpdateWithLoading = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsLoading(true);
    await props.handleUpdate(e);
    setIsLoading(false);
  };

  const handleDeleteWithLoading = async () => {
    setIsLoading(true);
    await props.handleDelete();
    setIsLoading(false);
  };
  const bigScreen = useMediaQuery("(min-width: 40rem)");

  return (
    <>
      <h2 className={styles.sectionTitle}>
        <div className={styles.titleText}>{props.name}</div>
        {props.tooltipMessage && (
          <QuestionMarkWithTooltip message={props.tooltipMessage} />
        )}
      </h2>
      <div className={styles.picSectionContainer}>
        {isLoading ? (
          <Skeleton variant="circular" width={70} height={70} />
        ) : props.src ? (
          <Avatar
            src={props.src}
            variant="circular"
            sx={{
              width: 70,
              height: 70,
              border: "0.1px solid lightgray",
            }}
          />
        ) : (
          <EmptyImage
            handleUploadedImage={handleUpdateWithLoading}
            height={70}
            width={70}
          />
        )}
        <div className={styles.editOrRemovePicBtnsContainer}>
          {props.src ? (
            <>
              {bigScreen ? (
                <Button variant="contained" component="label">
                  <input
                    onChange={handleUpdateWithLoading}
                    hidden
                    accept="image/*"
                    type="file"
                  />
                  Mettre à jour la photo
                </Button>
              ) : (
                <IconButton>
                  <input
                    onChange={handleUpdateWithLoading}
                    onClick={() => console.log("clicked== s")}
                    hidden
                    accept="image/*"
                    type="file"
                  />
                  <Edit />
                </IconButton>
              )}

              {bigScreen ? (
                <Button
                  className={styles.removePicBtn}
                  onClick={handleDeleteWithLoading}
                  variant="outlined"
                  color="error"
                >
                  Supprimer la photo
                </Button>
              ) : (
                <IconButton onClick={handleDeleteWithLoading}>
                  <Delete />
                </IconButton>
              )}
            </>
          ) : (
            bigScreen && (
              <Button variant="contained" component="label">
                <input
                  onChange={handleUpdateWithLoading}
                  hidden
                  accept="image/*"
                  type="file"
                />
                Ajouter une photo
              </Button>
            )
          )}
        </div>
      </div>
    </>
  );
};
