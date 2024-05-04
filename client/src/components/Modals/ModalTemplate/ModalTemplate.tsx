import { Fade, IconButton, Modal, Paper } from "@mui/material";
import styles from "./ModalTemplate.module.scss";
import React, { ReactNode } from "react";
import { IoMdClose } from "react-icons/io";

type Props = {
  modalIsOpen: boolean;
  handleClose: () => void;
  children: ReactNode;
};

const ModalTemplate = (props: Props) => {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={props.modalIsOpen}
      onClose={props.handleClose}
      closeAfterTransition
    >
      <Fade in={props.modalIsOpen}>
        <Paper className={styles.modalContentContainer}>
          <IconButton
            className={styles.closeBtn}
            onClick={() => props.handleClose()}
          >
            <IoMdClose />
          </IconButton>
          {props.children}
        </Paper>
      </Fade>
    </Modal>
  );
};

export default ModalTemplate;
