import { Fade, IconButton, Modal, Paper } from "@mui/material";
import styles from "./ModalTemplate.module.scss";
import React, { ReactNode, useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";

type Props = {
  modalIsOpen: boolean;
  handleClose: () => void;
  children: ReactNode;
  height?: string;
  width?: string;
  maxHeight?: string;
  minHeight?: string;
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
        <div className={styles.content}>
          <Paper
            className={styles.modalContentContainer}
            sx={{
              maxHeight: props.maxHeight,
              minHeight: props.minHeight,
              height: props.height,
              width: props.width,
              overflow: "scroll",
            }}
          >
            <IconButton className={styles.closeBtn} onClick={props.handleClose}>
              <IoMdClose />
            </IconButton>
            {props.children}
          </Paper>
        </div>
      </Fade>
    </Modal>
  );
};

export default ModalTemplate;
