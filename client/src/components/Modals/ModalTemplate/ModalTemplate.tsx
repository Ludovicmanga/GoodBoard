import { Fade, Modal, Paper } from "@mui/material";
import styles from "./ModalTemplate.module.scss";
import React, { ReactNode, useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/hooks";

type Props = {
  modalIsOpen: boolean;
  handleClose: () => void;
  children: ReactNode;
};

const ModalTemplate = (props: Props) => {
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
            {props.children}
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalTemplate;
