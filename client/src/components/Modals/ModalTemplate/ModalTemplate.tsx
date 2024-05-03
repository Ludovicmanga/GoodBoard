import { Fade, Modal, Paper } from "@mui/material";
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
            {/* <div className={styles.closeBtnContainer}>
              <IoMdClose
                className={styles.closeBtn}
                onClick={() => props.handleClose()}
              />
            </div> */}
            <IoMdClose
              className={styles.closeBtn}
              onClick={() => props.handleClose()}
            />
            {props.children}
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalTemplate;
