import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import styles from "./ShareBoardModal.module.scss";
import { Card, FormControlLabel, TextField } from "@mui/material";
import CopyToClipboardButton from "../../buttons/CopyToClipboardButton/CopyToClipboardButton";
import axios from "axios";
import { websiteUrl } from "../../../helpers/constants";
import { useAppSelector } from "../../../redux/hooks";
import { Switch } from 'antd';

type Props = {
  modalIsOpen: boolean;
  handleClose: () => void;
};

const ShareBoardModal = (props: Props) => {
  const [linkIsPublic, setLinkIsPublic] = useState(false);
  const [switchBtnIsLoading, setSwitchBtnIsLoading ] = useState(false);
  const boardId = useAppSelector(state => state.generalProperties.activeBoard);
  const [boardUrl, setBoardUrl] = useState('');

  const handleChangeLinkPublicStatus = (
    event: boolean
  ) => {
    setLinkIsPublic(event);
  };

  const handleSetBoardUrl = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBoardUrl(e.target.value);
  }

  const handleGetBoardShareableUrl = async () => {
    setSwitchBtnIsLoading(true);
    const urlResponse = await axios<{ url: string }>({
      url:`${websiteUrl}/api/board/get-share-url`,
      method: 'post',
      data: {
        publicStatus: linkIsPublic,
        boardId,
      }
    });
    if (urlResponse.data.url) {
      setBoardUrl(urlResponse.data.url);
    }
    setSwitchBtnIsLoading(false);
  }

  useEffect(() => {
    handleGetBoardShareableUrl();
  }, [linkIsPublic]);

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
              <div>{linkIsPublic ? "Board is public" : "Board is private"}</div>
              <Switch loading={switchBtnIsLoading} checked={linkIsPublic} onChange={handleChangeLinkPublicStatus} />
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
