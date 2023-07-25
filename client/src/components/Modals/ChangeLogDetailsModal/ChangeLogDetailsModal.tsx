import { Fade, Modal, Paper } from "@mui/material";
import styles from "./ChangeLogDetailsModal.module.scss";
import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { getMonthForYear } from "../../../helpers/utils";

type Props = {
  modalIsOpen: boolean;
  handleClose: () => void;
};

const ChangeLogDetailsModal = (props: Props) => {
  const generalPropertiesState = useAppSelector(
    (state) => state.generalProperties
  );
  const [creationDate, setCreationDate] = useState<Date>();

  useEffect(() => {
    if (generalPropertiesState.changeLogDetailsModalOpen.createdAt) {
      const date = new Date(
        generalPropertiesState.changeLogDetailsModalOpen.createdAt
      );
      setCreationDate(date);
    }
  }, [generalPropertiesState.changeLogDetailsModalOpen.createdAt]);
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.modalIsOpen}
        onClose={props.handleClose}
        closeAfterTransition
      >
        <Fade in={props.modalIsOpen}>
          <Paper className={styles.modalContentContainer}>
            <div className={styles.timestamp}>
              Created on:{" "}
              {`${getMonthForYear(creationDate?.getMonth() )} ${creationDate?.getDate()} ${creationDate?.getFullYear()}`}
            </div>
            <div className={styles.title}>
              {generalPropertiesState.changeLogDetailsModalOpen.title.slice(
                0,
                50
              )}
              {generalPropertiesState.changeLogDetailsModalOpen.title.length >
                50 && "..."}
            </div>
            <p className={styles.details}>
              {generalPropertiesState.changeLogDetailsModalOpen.details}
            </p>
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
};

export default ChangeLogDetailsModal;
