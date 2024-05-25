import {
  Chip,
  Fade,
  Modal,
  Paper,
  Skeleton,
  useMediaQuery,
} from "@mui/material";
import styles from "./ChangeLogDetailsModal.module.scss";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { getMonthForYear } from "../../../helpers/utils";
import ModalTemplate from "../ModalTemplate/ModalTemplate";
import { EmojiVotesContainer } from "../../EmojiVotesContainer/EmojiVotesContainer";
import { FeaturesLoadingSkeleton } from "../../FeaturesLoadingSkeleton/FeaturesLoadingSkeleton";
import { ChangelogBottom } from "../../ChangelogBottom/ChangelogBottom";

type Props = {
  modalIsOpen: boolean;
  handleClose: () => void;
};

const ChangeLogDetailsModal = (props: Props) => {
  const generalPropertiesState = useAppSelector(
    (state) => state.generalProperties
  );
  const changeLogItemsState = useAppSelector((state) => state.changeLog);

  const [creationDate, setCreationDate] = useState<Date>();

  const changeLogFound = changeLogItemsState.find(
    (changeL) =>
      changeL._id ===
      generalPropertiesState.changeLogDetailsModalOpen.changeLogId
  );

  const bigScreen = useMediaQuery("(min-width: 40rem)");

  useEffect(() => {
    if (changeLogFound && changeLogFound.createdAt) {
      const date = new Date(changeLogFound.createdAt);
      setCreationDate(date);
    }
  }, [changeLogFound]);
  return (
    <ModalTemplate
      {...props}
      width={bigScreen ? "40%" : "90%"}
      minHeight="40%"
      maxHeight="90%"
    >
      {changeLogFound ? (
        <>
          <Chip
            label={`${creationDate?.getDate()} ${getMonthForYear(
              creationDate?.getMonth()
            )} ${creationDate?.getFullYear()}`}
            sx={{
              background: "#e6fcf5",
              padding: "1rem",
            }}
          />
          <div className={styles.title}>{changeLogFound.title}</div>
          <p className={styles.details}>{changeLogFound.details}</p>
          <ChangelogBottom changelogData={changeLogFound} />
        </>
      ) : (
        <FeaturesLoadingSkeleton />
      )}
    </ModalTemplate>
  );
};

export default ChangeLogDetailsModal;
