import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import styles from "./ShareBoardModal.module.scss";
import {
  Button,
  Card,
  FormControlLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import CopyToClipboardButton from "../../buttons/CopyToClipboardButton/CopyToClipboardButton";
import axios from "axios";
import { websiteUrl } from "../../../helpers/constants";
import { useAppSelector } from "../../../redux/hooks";
import { Switch } from "antd";
import { validateEmail } from "../../../helpers/utils";

type Props = {
  modalIsOpen: boolean;
  handleClose: () => void;
};

const ShareBoardModal = (props: Props) => {
  const [linkIsPublic, setLinkIsPublic] = useState(false);
  const [switchBtnIsLoading, setSwitchBtnIsLoading] = useState(false);
  const boardId = useAppSelector(
    (state) => state.generalProperties.activeBoard
  );
  const [boardUrl, setBoardUrl] = useState("");
  const [wrongFormatAdminEmail, setWrongFormatAdminEmail] =
    useState<boolean>(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminEmailErrorHelperText, setAdminEmailEmailErrorHelperText] =
    useState<string>("");

  const handleChangeUserEmail = () => {
    if (adminEmail) {
      if (validateEmail(adminEmail)) {
        console.log("all good");
      } else {
        setWrongFormatAdminEmail(true);
        setAdminEmailEmailErrorHelperText("Wrong email format");

        setTimeout(() => {
          setWrongFormatAdminEmail(false);
          setAdminEmailEmailErrorHelperText("");
        }, 3000);
      }
    }
  };

  const handleChangeLinkPublicStatus = (event: boolean) => {
    setLinkIsPublic(event);
  };

  const handleSetBoardUrl = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setBoardUrl(e.target.value);
  };

  const handleGetBoardShareableUrl = async () => {
    setSwitchBtnIsLoading(true);
    const urlResponse = await axios<{ url: string }>({
      url: `${websiteUrl}/api/board/get-share-url`,
      method: "post",
      data: {
        publicStatus: linkIsPublic,
        boardId,
      },
    });
    if (urlResponse.data.url) {
      setBoardUrl(urlResponse.data.url);
    }
    setSwitchBtnIsLoading(false);
  };

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
            <div
              className={`${styles.sectionTitle} ${styles.inviteAdminSectionTitle}`}
            >
              Invite new admin
            </div>
            <div className={styles.textFieldWithBtnInsideContainer}>
              <OutlinedInput
                value={adminEmail}
                className={styles.outlinedInput}
                onChange={(e) => setAdminEmail(e.target.value)}
                size="small"
                placeholder="Add emails"
                error={wrongFormatAdminEmail}
                fullWidth
                endAdornment={
                  <Button
                    className={styles.inviteBtn}
                    onClick={handleChangeUserEmail}
                    variant="contained"
                  >
                    Invite
                  </Button>
                }
              />
            </div>

            <div
              className={`${styles.sectionTitle} ${styles.shareBoardSectionTitle}`}
            >
              Share your board with the world
            </div>
            <div className={styles.shareWithTheWorldSectionContainer}>
              <div className={styles.linkIsPublicContainer}>
                <div>
                  {linkIsPublic ? "Board is public" : "Board is private"}
                </div>
                <Switch
                  loading={switchBtnIsLoading}
                  checked={linkIsPublic}
                  onChange={handleChangeLinkPublicStatus}
                />
              </div>
              <div
                className={`${styles.textFieldWithBtnInsideContainer} ${styles.urlTextFieldContainer}`}
              >
                <OutlinedInput
                  value={boardUrl}
                  fullWidth
                  onChange={handleSetBoardUrl}
                  size="small"
                  readOnly={true}
                  className={styles.outlinedInput}
                  endAdornment={
                    <div className={styles.CopyToClipboardButtonContainer}>
                      <CopyToClipboardButton textToCopy={boardUrl} />
                    </div>
                  }
                />
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default ShareBoardModal;
