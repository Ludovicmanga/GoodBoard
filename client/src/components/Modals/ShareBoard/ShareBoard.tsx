import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import styles from "./ShareBoardModal.module.scss";
import { Card, FormControlLabel, Switch, TextField } from "@mui/material";
import CopyToClipboardButton from "../../buttons/CopyToClipboardButton/CopyToClipboardButton";

type Props = {
  modalIsOpen: boolean;
  handleClose: () => void;
};

const ShareBoardModal = (props: Props) => {
  const [linkIsPublic, setLinkIsPublic] = useState(false);
  const [boardUrl, setBoardUrl] = useState('');
  const handleChangeLinkPublicStatus = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLinkIsPublic(event.target.checked);
  };

  const handleSetBoardUrl = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBoardUrl(e.target.value);
  }

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
          <Box className={styles.modalContentContainer}>
            <Card>
                <FormControlLabel
                  value="Private"
                  control={
                    <Switch
                      color="primary"
                      onChange={handleChangeLinkPublicStatus}
                      checked={linkIsPublic}
                    />
                  }
                  label={linkIsPublic ? "Board is public" : "Board is private"}
                  labelPlacement="start"
                />
                <div className={styles.urlSectionContainer}>
                  <TextField className={styles.urlTextField} value={boardUrl} onChange={handleSetBoardUrl} />
                  <div className={styles.CopyToClipboardButtonContainer}>
                    <CopyToClipboardButton textToCopy={boardUrl} />
                  </div>
                </div>
            </Card>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ShareBoardModal;
