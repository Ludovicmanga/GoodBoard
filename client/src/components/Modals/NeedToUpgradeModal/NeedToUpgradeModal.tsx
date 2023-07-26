import { Backdrop, Button, Fade, Modal, Paper } from "@mui/material";
import styles from "./NeedToUpgradeModal.module.scss";
import React from "react";
import { upgradeImg } from "../../../helpers/constants";

type Props = {
  modalIsOpen: boolean;
  handleClose: () => void;
};

const NeedToUpgradeModal = (props: Props) => {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.modalIsOpen}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.modalIsOpen}>
          <Paper className={styles.modalContentContainer}>
            <div className={styles.imgContainer}>
              <img alt="cannot do action img" src={upgradeImg} height="170px" />
            </div>
            <div className={styles.infoTextContainer}>
              <div className={styles.infoTextTitle}>Upgrade your plan</div>
              <p className={styles.infoTextDetails}>
                You need to upgrade to be able to add more than 15 feature requests
              </p>
              <Button variant='outlined' onClick={() => console.log()}>Upgrade</Button>
            </div>
          </Paper>
        </Fade>
      </Modal>
    </div>
  );
};

export default NeedToUpgradeModal;
